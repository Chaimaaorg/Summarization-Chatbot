import type { NextPage } from "next"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { ICreatorRole } from "~/api-client"
import { StreamingDataTypeEnum } from "~/api-client/models/StreamingDataTypeEnum"
import { StreamingSignalsEnum } from "~/api-client/models/StreamingSignalsEnum"
import type { Message } from "~/types/Message.types"
import { generateUUID } from "~/utils"
import { env } from "~/env.mjs"
import { useSettingStore } from "~/stores"
import ndjsonStream from "can-ndjson-stream"
import { toast } from "react-hot-toast"
import Bilan from "../bilan"

const Launcher: NextPage = () => {
  const [result, setResult] = useState<string>()
  const { data: session } = useSession()
  const settingsStore = useSettingStore()

  const [isButtonVisible, setIsButtonVisible] = useState<Boolean>(true)
  const [onFinish, setOnFinish] = useState<Boolean>(false)

  const [showLoader, setShowLoader] = useState(false)

  useEffect(() => {
    setResult(result)
  }, [result])

  const launchProcess = async () => {
    let output = ""
    let formatedMessageList = []

    setShowLoader(true)

    const message: Message = {
      id: generateUUID(),
      conversationId: "", //tmp
      creatorId: "", //tmp
      creatorRole: ICreatorRole.AGENT,
      createdAt: Date.now(),
      content: "Launch generation de la note",
      // content: "launch actif data extraction tool",
      events: [],
      status: "LOADING",
    }
    const llmEvents = message.events.filter((event) => event.data_type === "llm")
    formatedMessageList.unshift({
      role: "user",
      content: `${message.content}${llmEvents.map((event) => event.data).join("/n")}`,
    })

    try {
      const rawRes = await fetch(`${env.NEXT_PUBLIC_API_URL}/chat/agent`, {
        method: "POST",
        body: JSON.stringify({
          messages: formatedMessageList, // To refactor later
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
        credentials: "include",
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
        const { value, done: readerDone } = await reader.read()
        if (value) {
          const { data_type, data, metadata } = value
          if (data && data.length > 0) {
            if (data_type === StreamingDataTypeEnum.SIGNAL) {
              if (data === StreamingSignalsEnum.START) {
                message.runId = metadata?.run_id
              } else if (data === StreamingSignalsEnum.LLM_END) {
                message.events.push({
                  data_type: "llm",
                  data: message.content,
                  metadata: {},
                })
                message.content = ""
              } else {
                message.events.push(value)
              }
            } else if (data_type === "llm") {
              output = output + data

              setResult(output)
            } else {
              message.events.push(value)
            }
          }
        }
        done = readerDone
      }
      setOnFinish(true)
      setIsButtonVisible(false)
      setShowLoader(false)
    } catch (error: any) {
      // Handle any errors that occurred during the fetch request
      console.error("Error:", error.message)
    }
  }
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        {isButtonVisible && !showLoader && (
          <button
            type="button"
            onClick={launchProcess}
            className="mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Launch Processing
          </button>
        )}

        {/* Bilan en props data */}

        <div className="flex flex-col items-center justify-center">
          {showLoader && (
            <button
              disabled
              type="button"
              className="me-2 inline-flex items-center rounded-lg bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-500 dark:bg-yellow-400 dark:hover:bg-yellow-400 dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="me-3 inline h-4 w-4 animate-spin text-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Processing...
            </button>
          )}
          {!onFinish && <h2 style={{ color: "white" }}>{result}</h2>}
        </div>

        {!isButtonVisible && <Bilan data={result} />}
      </div>
    </>
  )
}

export default Launcher
