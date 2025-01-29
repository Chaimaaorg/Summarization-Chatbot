import { useState } from "react"
import {
  Tabs,
  TabsHeader,
} from "@material-tailwind/react";

interface PopUpFormProps {
  onClose: () => void
  launchNoteGeneration: (clientName: string) => void
  launchDataExtraction: (formData: any) => void
  showLoader: boolean
}

const yamlExample = `
sources:
  - doc_type: 'bilan'
    file_name: 'bilan_mock_data.pdf'
    doc_format: 'simplifie'
    pages:
      - page_num: 0
        page_type: 'actif'
      - page_num: 1
        page_type: 'passif'
      - page_num: 2
        page_type: 'cpc'
  - doc_type: 'rc'
    file_name: 'ABHS_Registre_du_Commerce.pdf'
  - doc_type: 'balance_fournisseur'
    file_name: 'balance_fournisseur.pdf'
  - doc_type: 'balance_client'
    file_name: 'balance_client.pdf'
  - doc_type: 'inforisk'
    file_name: '1126986.pdf'
    pages:
      - page_num: 2
        page_type: 'fiche_synthetique'
      - page_num: 19
        page_type: 'representants_legaux'
`;

const PopupForm = ({ onClose, launchNoteGeneration, launchDataExtraction, showLoader }: PopUpFormProps) => {
  const [clientName, setClientName] = useState("")
  const [files, setFiles] = useState<File[]>([]);
  const [showExample, setShowExample] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Oui');
  const launchExtractionProcess = async () => {

    const formData = new FormData();
    for (let i = 0; i < files?.length; i++) {
      formData.append('files', files[i] as File)
    }
    launchDataExtraction(formData);
    setFiles([])
  };

  const upload_files = async (e) => {


    const newFiles = Array.from(e.target.files || []) as File[];

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);

  }

  const toggleExample = () => {
    setShowExample(!showExample);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center rounded-lg">
      <div className="bg-[#F4F7F9]  p-4 ">
        <h2 className="mb-6 text-center text-2xl font-bold" style={{ color: "black" }}>
          Créer une note d&apos;évaluation
        </h2>

        <input
          type="text"
          placeholder="Nom du client"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="mb-4 w-full border bg-white p-2"
          style={{ color: "black" }}
        />

        <p className="mb-4 text-center text-lg text-gray-600" style={{ color: "black" }}>
          Avez-vous reçu des pièces justificatives supplémentaires de la part du client?
        </p>

        <div className="mb-6 flex flex-col items-center">


        </div>
        <Tabs value="html">
          <TabsHeader className="flex justify-around border border-gray-800" >
            {[{ label: "Oui", value: "Oui" }, { label: "Non", value: "Non" }].map(({ label, value }) => (
              <div
              key={value}
              onClick={() => setSelectedTab(value)}
              className={`px-4 py-2 font-semibold cursor-pointer ${selectedTab === value ? 'active-tab text-black' : 'text-gray-900'}
              `}

              style={{ color: selectedTab === value ? 'green' : 'black' }}

            >
              {label}
            </div>

            ))}
          </TabsHeader>




{ selectedTab === 'Oui' && (
              <div className="modal p-4">

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Pièces Justificatives
                  </label>
                  <input
                    style={{ color: "black" }}
                    type="file"
                    multiple
                    onChange={(e) => upload_files(e)}
                    className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-gray-200"
                  />
                </div>

                <hr className="my-4 border-gray-300" />


                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    eden.json
                  </label>
                  <input
                    style={{ color: "black" }}
                    type="file"
                    accept=".json"
                    onChange={(e) => upload_files(e)}
                    className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-gray-200"
                  />
                </div>


                <hr className="my-4 border-gray-300" />


                <div className="mb-4 ">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    data.yml
                  </label>
                  <div className="flex justify-center">
                    <input
                      style={{ color: "black" }}
                      type="file"
                      accept=".yml"
                      onChange={(e) => upload_files(e)}
                      className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-gray-200"
                    />
                    <button
                      type="button"
                      onClick={toggleExample}
                      className="ml-2 text-white bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2"
                    >
                      {showExample ? 'Hide Example' : 'Show Example'}
                    </button>
                  </div>
                </div>
                {showExample && (
                  <div className="bg-gray-100 rounded-lg border border-gray-300 max-h-32 overflow-y-auto">
                    <pre className="whitespace-pre-wrap">
                      {yamlExample}
                    </pre>
                  </div>
                )}
                <button
                  className="w-full rounded-md bg-green-500 py-2 font-semibold text-white transition-all hover:bg-green-600"
                  onClick={launchExtractionProcess}
                >
                  {showLoader && (
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
                  )}

                  Télécharger les pièces justificatives
                </button>
              </div>
)}


{ selectedTab === 'Non' && (

              <div className="mt-6">
                <button
                  className="w-full rounded-lg bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600 focus:outline-none"
                  onClick={() => {
                    launchNoteGeneration(clientName)
                  }}
                >
                  {showLoader && (
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
                  )}
                  Générer la note
                </button>
              </div>


)}
          {/* </TabsBody> */}
        </Tabs>

        <div className="mt-2 text-center">
          <button className="text-gray-500 underline" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopupForm
