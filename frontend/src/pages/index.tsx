import { type NextPage } from "next"
import Image from "next/image"
import { actions, APPLICATION_TITLE, LOGO_SRC, NOTES_LIST } from "~/utils/constants"
import { useEffect, useState } from "react"
import { PlusIcon } from "@heroicons/react/solid"
import { v4 as uuid } from "uuid"
import ndjsonStream from "can-ndjson-stream"
import { env } from "~/env.mjs"
import { generateUUID } from "~/utils"
import type { Message } from "~/types"
import { ICreatorRole } from "~/api-client"
import { useSettingStore } from "~/stores"
import { useSession } from "next-auth/react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/router"
import PopupForm from "~/components/PopupForm"
import Toast from "~/components/Toast"
const Home: NextPage = () => {
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)
  const [notesList, setNotesList] = useState<any[]>([])
  const settingsStore = useSettingStore()
  const { data: session } = useSession()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [showLoader, setShowLoader] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string>("")

  const [showToast, setShowToast] = useState(false)

  const [msgToast, setMsgToast] = useState("")

  const handleShowToast = (msg: string) => {
    setShowToast(true)
    setMsgToast(msg)
    setTimeout(() => setShowToast(false), 5000)
  }

  const handleSelectChange = (e: any, noteId: string) => {
    if (e.target.value === actions.VIEW) {
      router.push(`/note/${noteId}`)
    } else if (e.target.value === actions.DOWNLOAD) {
      exportToWord(noteId)
    }
  }

  const handleCreateFolder = () => {
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  async function fetchNotes() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/propositions`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      const formattedNoteList = data.map((prop: any) => ({
        ...prop,
        data: {
          ...prop.data,
          content: prop.data.content === "" ? "" : JSON.parse(prop.data.content),
        },
      }))
      setNotesList(formattedNoteList)
    } catch (error) {
      console.error("Error fetching data:", error)
      setError("Failed to load data")
    } finally {
      setLoading(false)
    }
  }

  const launchDataExtraction = async (formData: any) => {
    setShowLoader(true)
    const res = await fetch(`${env.NEXT_PUBLIC_EXTRACT_DATA_ENDPOINT}`, {
        method: "POST",
        body: formData,
    })
    const content = await res.json()
    await fetch(`${env.NEXT_PUBLIC_API_URL}/chat/upload_json_file`, {
      method: "POST",
      body: JSON.stringify({ extracted_fields: content }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    setShowLoader(false)
    handleShowToast("Données extraites avec succès")
  }

  const launchNoteGeneration = async () => {
    let formatedMessageList = []

    const message: Message = {
      id: generateUUID(),
      conversationId: "", //tmp
      creatorId: "", //tmp
      creatorRole: ICreatorRole.AGENT,
      createdAt: Date.now(),
      content: "launch actif data extraction tool",
      events: [],
      status: "LOADING",
    }
    const llmEvents = message.events.filter((event) => event.data_type === "llm")
    formatedMessageList.unshift({
      role: "user",
      content: `${message.content}${llmEvents.map((event) => event.data).join("/n")}`,
    })

    try {
      setShowLoader(true)
      const rawRes = await fetch(`${env.NEXT_PUBLIC_API_URL}/chat/agent`, {
        method: "POST",
        body: JSON.stringify({
          messages: formatedMessageList, //[framdani] !To refactor
          api_key: localStorage.getItem("openaiApiKey") || undefined,
          org_id: localStorage.getItem("openaiOrgId") || undefined,
          conversation_id: "d1128740-93ed-4740-a78e-aa8540bc5089",
          new_message_id: "deca7c25-077d-4e6f-85a1-186582d20843",
          user_email: session?.user?.name || "no-auth",
          settings: {
            data: settingsStore.setting,
            version: settingsStore.setting.version,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!rawRes.ok) {
        console.error(rawRes)
        let errorMessage = "Failed to request message, please check your network."
        try {
          const res = await rawRes.json()
          errorMessage = res.error.message
        } catch (error) {
          // do nth
        }

        return
      }

      // Handle successful response
      const data = rawRes.body
      if (!data) {
        toast.error("No data return")
        return
      }
      const reader = ndjsonStream(data).getReader()
      let done = false
      while (!done) {
        const { value } = await reader.read()
        // done: readerDone
        if (value) {
          const { data_type, data, metadata } = value

          if (data && data.length > 0) {
            if (data_type === "output") {
              const { result } = metadata
              done = true
              setShowLoader(false)
              return result
            }
          }
        }
      }
    } catch (error: any) {
      // Handle any errors that occurred during the fetch request
      console.error("Error:", error.message)
    }
  }

  const handleSave = async (clientName: string) => {
    const noteId = uuid()
    const existingNoteIds = localStorage.getItem("noteIds")
    let noteIdsList = []
    if (existingNoteIds) noteIdsList = JSON.parse(existingNoteIds)
    noteIdsList.push(noteId)
    localStorage.setItem("noteIds", JSON.stringify(noteIdsList))

    const result = await launchNoteGeneration()
    setShowPopup(false)
    handleShowToast("Note générée avec succès.")
    await createClient(clientName, result ?? "")
  }

  const exportToWord = async (noteId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/by-num/${noteId}`)

    if (!res.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await res.json()
    let content
    if (data) {
      content = JSON.parse(data?.data?.content)
    }

    if (content) {
      await fetch(`${env.NEXT_PUBLIC_API_URL}/word/generate_docx/${noteId}`
      )
        .then((response) => response.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.style.display = "none"
          a.href = url
          a.download = "generated_data.docx"
          document.body.appendChild(a)
          a.click()
          window.URL.revokeObjectURL(url)
        })
        .catch((error) => {
          console.error("Error:", error)
        })
    }
  }

  async function createClient(name: string, value: string) {
    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/chat/create-client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        value: value,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || "Failed to create client")
    }

    const result = await response.json()
    fetchNotes()
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="relative overflow-x-auto bg-white p-6">
      <header style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <Image src={LOGO_SRC} width={100} height={100} alt={APPLICATION_TITLE} />
        <h1
          style={{
            fontFamily: "Arial",
            fontSize: "1.5rem",
            fontWeight: "light",
            textAlign: "center",
            marginLeft: "1rem",
            color: "black",
          }}
        >
          Crédit Memo GenAI
        </h1>
      </header>
      <div className="p-6">
        <div className="flex justify-between">
          {showToast && <Toast id="toast-success" message={msgToast} onClose={() => setShowToast(false)} />}


          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
            </div>

          </div>
          <div className="flex justify-between">
            <button
              onClick={handleCreateFolder}
              className=" flex items-center rounded-full bg-orange-500 px-4 py-4 font-semilight text-white"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Créer une note
            </button>
          </div>
        </div>
        {showPopup && (
          <PopupForm
            onClose={handleClosePopup}
            launchNoteGeneration={handleSave}
            launchDataExtraction={launchDataExtraction}
            showLoader={showLoader}
          />
        )}

        <div className="mt-10 overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400 table-auto border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-70 text-xs uppercase bg-[#34495E]">
                <th
                  scope="col"
                  className="dark:border-gray-70 border-b px-1 py-3 font-extrabold"
                  style={{ color: "white" }}
                >
                  Numéro de proposition
                </th>
                <th
                  scope="col"
                  className="dark:border-gray-70 border-b px-1 py-3 font-extrabold"
                  style={{ color: "white" }}
                >
                  Nom du client
                </th>
                <th
                  scope="col"
                  className="dark:border-gray-70 border-b px-1 py-3 font-extrabold"
                  style={{ color: "white" }}
                >
                  Identifiant du client
                </th>
                <th
                  scope="col"
                  className="dark:border-gray-70 border-b px-1 py-3 font-extrabold"
                  style={{ color: "white" }}
                >
                  Statut
                </th>
                <th
                  scope="col"
                  className="dark:border-gray-70 border-b px-1 py-3 font-extrabold"
                  style={{ color: "white" }}
                ></th>
              </tr>
            </thead>
            <tbody>
              {NOTES_LIST?.map((note: any, index: number) => {
                return (
                  <tr key={`${note.id}`} className="border-b bg-[#F4F7F8]">
                    <th
                      scope="row"
                      className="dark:border-gray-70 border-b bg-[#F4F7F8] px-6 py-4 font-light  text-gray-900"

                      style={{ color: "#2C3E50" }}
                    >
                      {note.noteId}
                    </th>
                    <th
                      scope="row"
                      className="dark:border-gray-70 border-b bg-[#F4F7F8] px-1 py-4 font-light text-gray-900"
                      style={{ color: "#2C3E50" }}
                    >
                      {note.data.clientName}
                    </th>
                    <th
                      scope="row"
                      className="dark:border-gray-70 border-b bg-[#F4F7F8] px-1 py-4 font-light text-gray-900"
                      style={{ color: "#2C3E50" }}
                    >
                      {note.data.clientId}
                    </th>
                    <th
                      scope="row"
                      className="dark:border-gray-70 border-b bg-[#F4F7F8] px-1 py-4 font-bold text-green-500"
                      style={{ color: "green" }}
                    >

                      <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center h-5 w-5 rounded-full border-2 border-green-600 bg-white mr-2">
                          <svg
                            className="h-4 w-4 text-green"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        Approuvée
                      </div>
                    </th>
                    <th
                      className="dark:border-gray-70 border-b bg-[#F4F7F8] px-1 py-1 font-bold  text-gray-900"
                      style={{ color: "black" }}
                    >
                      <div className="relative flex space-x-4">
                        <div className="relative inline-flex items-center">
                          <select className="absolute inset-0 h-10 w-10 bg-transparent text-transparent">
                            <option></option>
                            <option value="view">Consulter</option>
                            <option value="download">Télécharger</option>
                          </select>
                          <div className="inline-flex items-center rounded-lg bg-[#F4F7F8] p-2 text-center text-sm font-medium  text-gray-700">
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 4 15"
                            >
                              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                )
              })}
              {notesList?.map((note: any) => {
                return (
                  <tr key={`${note.id}-tr`} className="border-b bg-[#F4F7F8] dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      className="dark:border-gray-70 border-b bg-[#F4F7F8] px-1 py-4 font-light  text-gray-900"
                      style={{ color: "#2C3E50" }}
                    >
                      {note?.noteId}
                    </th>
                    <th
                      scope="row"
                      className="dark:border-gray-70 border-b  bg-[#F4F7F8] px-1 py-4 font-light text-gray-900 "
                      style={{ color: "#2C3E50" }}
                    >
                      {note?.data?.clientName}
                    </th>
                    <th
                      scope="row"
                      className="dark:border-gray-70 border-b  bg-[#F4F7F8] px-1 py-4 font-light text-gray-900"
                      style={{ color: "#2C3E50" }}
                    >
                      {note?.data?.clientId}
                    </th>
                    <th
                      scope="row"
                      className="dark:border-gray-70 border-b  bg-[#F4F7F8] px-1 py-4 font-light text-gray-900"
                      style={{ color: "orange" }}
                    >
                       <div className="flex items-center space-x-2">
                        <div className="flex items-center justify-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-orange">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
                        </svg>

                        </div>
                        En attente de validation
                      </div>
                    </th>
                    <th
                      className="dark:border-gray-70 border-b  bg-[#F4F7F8] px-1 py-4 font-light  text-gray-900"
                      style={{ color: "black" }}
                    >
                      <div className="relative flex space-x-4">
                        <div className="relative inline-flex items-center">
                          <select
                            className="absolute inset-0 h-10 w-10 bg-transparent text-transparent"
                            value={selectedOption}
                            onChange={(e) => handleSelectChange(e, note.noteId)}
                          >
                            <option></option>
                            <option value="view">Consulter</option>
                            <option value="download">Télécharger</option>
                          </select>
                          <div className="inline-flex items-center rounded-lg bg-[#F4F7F8] p-2 text-center text-sm font-medium text-gray-700 dark:bg-[#F4F7F8]">
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 4 15"
                            >
                              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home
