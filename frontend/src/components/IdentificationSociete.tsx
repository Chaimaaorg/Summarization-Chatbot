import React from "react"

type SocieteDataEntry = {
  Year: string
  Metric: string
  Value: string
}

interface IdentificationSocieteProps {
  data: any
}

const IdentificationSociete = ({ data }: IdentificationSocieteProps) => {
  const table1Rows = [
    {
      label: "Raison sociale",
      value: data.raison_sociale
    },
    {
      label: "Date de création",
      value: data.date_creation,
    },
    { label: "Nom du Gérant", value: data.nom_gerant },
    { label: "Actionnaires", value: data.actionnaires},
    {
      label: "Groupe d’appartenance",
      value: data.groupe_appartenance,
    },
    {
      label: "Secteur d’activité",
      value: data.secteur_activite,
    },
    { label: "Ecosystème de la société", value: data.ecosysteme_societe },
    { label: "Adresse", value: data.adresse },
    { label: "Capital", value: data.capital },
  ]

  const table2Rows = [
    { label: "N Dossier", value: data.num_dossier },
    {
      label: "Identifiant Client",
      value: data.id_client,
    },
    {
      label: "Objet de la demande",
      value: data.objet_demande,
    },
    { label: "Code Agence", value: data.code_agence },
    { label: "Agence", value: data.agence },
    { label: "Réseau", value: data.reseau },
    {
      label: "Responsable Réseau",
      value: data.responsable_reseau,
    },
    { label: "Région", value: data.region },
    {
      label: "Forme juridique",
      value: data.forme_juridique,
    },
  ]



  const Table = ({ rows }: any) => (
    <div className="flex-1 bg-white p-4">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <tbody>
          {rows?.map((row, index: number) => (
            <tr key={index} className="dark:border-gray-70 border-b bg-[#F4F7F8]">
              <td className="px-6 py-3 font-light" style={{ color: "black" }}>
                {row.label}
              </td>
              <td className="px-6 py-4 font-light" style={{ color: 'black' }}>
                {row.label === "Actionnaires" ? (
                  <>
                  <ul className="list-disc pl-5">
                    {row.value?.map((actionnaire: any, idx) => (
                      <li key={`key-${idx}`} style={{color:"black"}}> {actionnaire} </li>
                    ))}
                  </ul>
                  </>
                ) : (
                  <>
                    {row.value}
                  </>
                )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
  return (

    <div className="p-10">
      <div className="container mx-auto flex ">
        <Table rows={table1Rows} />
        <Table rows={table2Rows} />
      </div>
      <div className="container mx-auto flex space-x-8 bg-white  p-3">

        {/* first section */}
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <tbody>
            <tr className="bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Rating année N
              </td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Année Rating
              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3 font-light" style={{ color: "black" }}>
                {data.rating_annee_n}
              </td>
            </tr>
            <tr className="bg-[#F4F7F8] ">
              <td className="dark:border-gray-70 border-r px-6  py-3 font-light" style={{ color: "black" }}></td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Rating Système
              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3  font-light" style={{ color: "black" }}>
                {data.rating_systeme}
              </td>
            </tr>
            <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
              <td
                className="dark:border-gray-70 border-b border-r px-6 py-3 font-light"
                style={{ color: "black" }}
              ></td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Rating Agréé
              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3  font-light" style={{ color: "black" }}>
                {data.rating_agree}
              </td>
            </tr>
            <tr className="bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6  py-3  font-light" style={{ color: "black" }}>
                PNB affaire en Kdh
              </td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                N-1
              </td>
              <td className="dark:border-gray-70 border-b px-6  py-3 font-light" style={{ color: "black" }}>
                {data.pnb_affaire_year_n_1}
              </td>
            </tr>
            <tr className="bg-[#F4F7F8]">
              <td
                className="dark:border-gray-70 border-b border-r  px-6 py-3 font-light"
                style={{ color: "black" }}
              ></td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                N
              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3  font-light" style={{ color: "black" }}>
                {data.pnb_affaire_year_n}
              </td>
            </tr>
            <tr className="bg-[#F4F7F8] ">
              <td className="dark:border-gray-70 border-r px-6  py-3 font-light" style={{ color: "black" }}>
                PNB Groupe en Kdh
              </td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                N-1
              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3  font-light" style={{ color: "black" }}>
                {data.pnb_groupe_year_n_1}
              </td>
            </tr>
            <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6  py-3 font-light" style={{ color: "black" }}></td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                N
              </td>
              <td className="px-6 py-3 font-light" style={{ color: "black" }}>
                {data.pnb_groupe_year_n}
              </td>
            </tr>
          </tbody>
        </table>
        {/* second section */}
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <tbody>
            <tr className="bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Autorisation / Utilisation de la relation en Kdh{" "}
              </td>
              <td
                className="dark:border-gray-70 border-b border-r  px-6 py-3  font-light"
                style={{ color: "black" }}
              >
                Total Autorisation
              </td>
              <td className="dark:border-gray-70 border-b px-6  py-3 font-light" style={{ color: "black" }}>
                {data.total_autorisation}
              </td>
            </tr>
            <tr className="bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6 py-3   font-light" style={{ color: "black" }}>
                {" "}
              </td>
              <td className="dark:border-gray-70 border-r px-6 py-3  font-light" style={{ color: "black" }}>
                Total Utilisation{" "}
              </td>
              <td className="px-6 py-3 font-light " style={{ color: "black" }}>
                {data.total_utilisation}
              </td>
            </tr>
            <tr className="boder-r dark:border-gray-70 border-b bg-[#F4F7F8]">
              <td
                className="dark:border-gray-70 border-b border-r px-6 py-3  font-light"
                style={{ color: "black" }}
              ></td>
              <td className="dark:border-gray-70 border-r px-6 py-3   font-light" style={{ color: "black" }}></td>
              <td className="px-6 py-3 font-light" style={{ color: "black" }}></td>
            </tr>
            <tr className="bg-[#F4F7F8] ">
              <td className="dark:border-gray-70 border-r px-6 py-3  font-light" style={{ color: "black" }}>
                Exonération sur Commission AT/ AF{" "}
              </td>
              <td className="px-6 py-3 font-light " style={{ color: "black" }}>
                {data.exoneration_at_af}
              </td>
              <td className="px-6 py-3 font-light " style={{ color: "black" }}></td>
            </tr>
            <tr className="bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6 py-3  font-light" style={{ color: "black" }}>
                {" "}
              </td>
              <td className="px-6 py-3 font-light " style={{ color: "black" }}></td>
              <td className="px-6 py-3 font-light" style={{ color: "black" }}></td>
            </tr>
            <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6 py-3  font-light" style={{ color: "black" }}></td>
              <td className="px-6 py-3 font-light " style={{ color: "black" }}></td>
              <td className="px-6 py-3 font-light" style={{ color: "black" }}></td>
            </tr>
            <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6 py-3  font-light" style={{ color: "black" }}>
                Conditions de date de valeur{" "}
              </td>
              <td className="px-6 py-3 font-light " style={{ color: "black" }}>
                {data.conditions_date_valeur}
              </td>
              <td className="px-6 py-3 font-light" style={{ color: "black" }}></td>
            </tr>
          </tbody>
        </table>
        {/* third section */}

      </div>
      <div className="container mx-auto flex space-x-8 bg-white  p-3">

        {/* first section */}
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <tbody>
            <tr className="bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Crédit de bureau
              </td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                De la société
              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3 font-light" style={{ color: "black" }}>
                {data.credit_bureau_societe}
              </td>
            </tr>
            <tr className="bg-[#F4F7F8] ">
              <td className="dark:border-gray-70 border-r px-6  py-3 font-light" style={{ color: "black" }}></td>
              <td className="dark:border-gray-70  border-r px-6 py-3 font-light" style={{ color: "black" }}>
                De l’actionnaire principal / Gérant
              </td>
              <td className="dark:border-gray-70  px-6 py-3  font-light" style={{ color: "black" }}>
                {data.credit_bureau_actionnaire_principal}
              </td>
            </tr>
            <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
              <td
                className="dark:border-gray-70 border-b border-r px-6 py-3 font-light"
                style={{ color: "black" }}
              ></td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>

              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3  font-light" style={{ color: "black" }}>

              </td>
            </tr>
            <tr className="bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6  py-3  font-light" style={{ color: "black" }}>
                Informations sur le FDC figurant du Modèle 7
              </td>
              <td className="dark:border-gray-70  border-r px-6 py-3 font-light" style={{ color: "black" }}>

              </td>
              <td className="dark:border-gray-70 px-6  py-3 font-light" style={{ color: "black" }}></td>
            </tr>
            <tr className="bg-[#F4F7F8]">
              <td
                className="dark:border-gray-70 border-b border-r  px-6 py-3 font-light"
                style={{ color: "black" }}
              ></td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>

              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3  font-light" style={{ color: "black" }}></td>
            </tr>

          </tbody>
        </table>
        {/* second section */}
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <tbody>
            <tr className="bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6 py-3 font-light" style={{ color: "black" }}>
                SCIP _ Chèques (Kdh)
              </td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Montant total chqs régularisés
              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3 font-light" style={{ color: "black" }}>
                {data?.chq_regularise}
              </td>
            </tr>
            <tr className="bg-[#F4F7F8] ">
              <td className="dark:border-gray-70 border-r px-6  py-3 font-light" style={{ color: "black" }}></td>
              <td className="dark:border-gray-70  border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Montant total chqs non régularisés
              </td>
              <td className="dark:border-gray-70  px-6 py-3  font-light" style={{ color: "black" }}>
                {data.chq_nregularise}
              </td>
            </tr>
            <tr className="dark:border-gray-70 border-b bg-[#F4F7F8]">
              <td
                className="dark:border-gray-70 border-b border-r px-6 py-3 font-light"
                style={{ color: "black" }}
              ></td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>

              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3  font-light" style={{ color: "black" }}>

              </td>
            </tr>
            <tr className="bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6  py-3  font-light" style={{ color: "black" }}>
                SCIP _ LCN (Kdh)
              </td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Montant total LCN régularisés
              </td>
              <td className="dark:border-gray-70 px-6 border-b  py-3 font-light" style={{ color: "black" }}>
                {data.lcn_regularise}
              </td>
            </tr>
            <tr className="bg-[#F4F7F8]">
              <td
                className="dark:border-gray-70 border-b border-r  px-6 py-3 font-light"
                style={{ color: "black" }}
              >
              </td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Montant total LCN non régularisés


              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3  font-light" style={{ color: "black" }}>        {data.lcn_nregularise}</td>
            </tr>

            <tr className="bg-[#F4F7F8]">
              <td className="dark:border-gray-70 border-r px-6  py-3  font-light" style={{ color: "black" }}>
                Impayés effets à l’escompte (Kdh)
              </td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Nombre
              </td>
              <td className="dark:border-gray-70 px-6 border-b  py-3 font-light" style={{ color: "black" }}>
                {data.nombre_effet}
              </td>
            </tr>
            <tr className="bg-[#F4F7F8]">
              <td
                className="dark:border-gray-70 border-b border-r  px-6 py-3 font-light"
                style={{ color: "black" }}
              ></td>
              <td className="dark:border-gray-70 border-b border-r px-6 py-3 font-light" style={{ color: "black" }}>
                Montant total


              </td>
              <td className="dark:border-gray-70 border-b px-6 py-3  font-light" style={{ color: "black" }}>
                {data.montant_effet}
              </td>
            </tr>

          </tbody>
        </table>


      </div>
      <div className="container mx-auto flex ">
        {data?.societes_du_groupe?.length !== 0 && (<table className="min-w-full text-sm border-collapse border border-gray-500">
          <thead className="bg-[#475463] text-white">
            <tr>
              <th className="border border-gray-500 px-4 py-2" style={{ color: 'white' }}>Détail du groupe</th>
              <th className="border border-gray-500 px-4 py-2" style={{ color: 'white' }}>Rating Agrée</th>

              <th className="border border-gray-500 px-4 py-2" style={{ color: 'white' }}>Total Autorisation en Kdh</th>
              <th className="border border-gray-500 px-4 py-2" style={{ color: 'white' }}>Total utilisation en Kdh</th>

            </tr>

          </thead>
          <tbody>
            {data?.societes_du_groupe.map((groupe, idx) => (
              <tr key={idx} className="border border-gray-500 text-center" >
                <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{groupe.detail_du_groupe}</td>
                <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{groupe.rating}</td>
                <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{groupe.total_autorisation}</td>
                <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{groupe.total_utilisation}</td>
              </tr>
            ))}
            <tr>
              <td className="border border-gray-500 px-4 py-2 bg-[#475463] text-center font-semibold text-center" style={{ color: 'white' }} colSpan={2}>Total général du groupe</td>
              <td className="border border-gray-500 px-4 py-2 text-center" style={{ color: "#475463" }} >{data.societe_total_autorisation}</td>
              <td className="border border-gray-500 px-4 py-2 text-center" style={{ color: "#475463" }} >{data.societe_total_utilisation}</td>

            </tr>

          </tbody>

        </table>)
        }

      </div>
    </div>
  )
}

export default IdentificationSociete
