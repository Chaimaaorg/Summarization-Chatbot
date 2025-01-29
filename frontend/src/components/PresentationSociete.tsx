import { Markdown } from "./CodeView/Markdown"

const PresentationSociete = ({ data }: any) => {



  const faits_marquants = data?.faits_marquants_societe
  const principaux_fournisseurs = data?.principaux_fournisseurs


  const caracteristiques_secteur_activite = data?.caracteristiques_secteur_activite



  const principaux_clients = data?.principaux_clients
  const principaux_concurrents = data?.principaux_concurrents

  const description_moyens_exploitation = data?.description_moyens_exploitation


  return (
    <div className="p-10">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-[#475463]  text-xs uppercase text-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 font-light" style={{ color: "white" }}>
              {/* Description */}
            </th>
            <th className="px-6 py-3 font-light" style={{ color: "white" }}>
              {/* Details */}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
            <td className="border-r px-6 py-3 font-light" style={{ color: "black" }}>
              Date d&apos;entrée en relation
            </td>
            <td className="px-8 py-4 font-light" style={{ color: "black" }}>
              {data?.date_entree_relation}
            </td>
          </tr>
          <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
            <td className="border-r px-6 py-3 font-light" style={{ color: "black" }}>
              Faits marquants de la société
            </td>
            <td className="px-6 py-4 font-light" style={{ color: "black" }}>
              {" "}
              <div className="px-5">
              <Markdown text={faits_marquants ?? ""} />
              </div>
            </td>
          </tr>
          <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
            <td className="border-r px-6 py-3 font-light" style={{ color: "#475463" }}>
              Caractéristiques du secteur d&apos;activité
            </td>
             <td className="px-6 py-4 font-light" style={{ color: "#475463" }}>
              <div className="px-5">
              <Markdown text={caracteristiques_secteur_activite} />
              </div>


            </td>
          </tr>
          <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
            <td className="border-r px-6 py-3 font-light" style={{ color: "#475463" }}>
              Principaux clients (mode de règlement)
            </td>
            <td className="px-6 py-4 font-light" style={{ color: "#475463" }}>
              <div className="px-5">
              <Markdown text={principaux_clients} />
              </div>

            </td>
          </tr>
          <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
            <td className="border-r px-6 py-3 font-light" style={{ color: "#475463" }}>
              Principaux fournisseurs (mode de règlement)
            </td>
            <td className="px-6 py-4 font-light" style={{ color: "#475463" }}>
              <div className="px-5">
              <Markdown text={principaux_fournisseurs} />
              </div>


            </td>
          </tr>
          <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
            <td className="border-r px-6 py-3 font-light" style={{ color: "#475463" }}>
              Principaux concurrents
            </td>
            <div className="px-5">
              <Markdown text={principaux_concurrents} />
              </div>
          </tr>
          <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
            <td className="border-r px-6 py-3 font-light" style={{ color: "#475463" }}>
              Description des moyens d&apos;exploitation
            </td>
            <td className="px-6 py-4 font-light" style={{ color: "#475463" }}>
            <div className="px-5">
              <Markdown text={description_moyens_exploitation} />
              </div>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default PresentationSociete
