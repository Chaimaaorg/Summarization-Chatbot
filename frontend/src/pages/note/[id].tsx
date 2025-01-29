import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import { APPLICATION_TITLE, LOGO_SRC } from "~/utils"
import AnalyseFinanciere from "~/components/AnalyseFinanciere"
import IdentificationSociete from "~/components/IdentificationSociete"
import PresentationSociete from "~/components/PresentationSociete"
import EtatRelationGaranties from "~/components/EtatRelationGaranties"
import EtatAutorisationsUtilisations from "~/components/EtatAutorisationsUtilisations"
import ObjetDemande from "~/components/ObjetDemande"
import ExecutiveSummary from "~/components/ExecutiveSummary"
import Link from "next/link"

const sectionComponents = {
  section1: IdentificationSociete,
  section2: PresentationSociete,
  section3: AnalyseFinanciere,
  section4: EtatRelationGaranties,
  section5: EtatAutorisationsUtilisations,
  section6: ObjetDemande,
  section7: ExecutiveSummary
}

const sections = [
  { id: "section1", title: "Identification de la société", icon: "IdentificationIcon", key: 'identification_societe' },
  { id: "section2", title: "Présentation de la société", icon: "PresentationChartLineIcon", key: 'presentation_societe' },
  { id: "section3", title: "Analyse financière", icon: "ChartBarIcon", key: 'analyse_financiere' },
  { id: "section4", title: "Etat de la relation et des garanties", icon: "ShieldCheckIcon", key: 'etat_relation_garanties' },
  { id: "section5", title: "Etat des autorisations / utilisations", icon: "ClipboardListIcon", key: 'etat_autorisations_utilisations' },
  { id: "section6", title: "Objet de la demande du centre d'affaires", icon: "DocumentTextIcon", key: 'objet_demande' },
  { id: "section7", title: "Synthèse", icon: "DocumentTextIcon", key: 'synthese' },
]

const icons = {
  IdentificationIcon: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="h-5 w-5" {...props}>
      <path
        fill-rule="evenodd"
        d="M4 16.5v-13h-.25a.75.75 0 0 1 0-1.5h12.5a.75.75 0 0 1 0 1.5H16v13h.25a.75.75 0 0 1 0 1.5h-3.5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5H4Zm3-11a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM11 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm.5 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"
        clip-rule="evenodd"
      />
    </svg>
  ),
  PresentationChartLineIcon: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="h-5 w-5" {...props}>
      <path
        fillRule="evenodd"
        d="M2 3.5a.5.5 0 01.5-.5H4a1 1 0 011-1h10a1 1 0 011 1h1.5a.5.5 0 01.5.5V14a2 2 0 11-4 0H6a2 2 0 11-4 0V3.5zm3 5A.5.5 0 015.5 8h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM8 12.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm3-3a.5.5 0 00-.5-.5H8a.5.5 0 000 1h2.5a.5.5 0 00.5-.5zm-5-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5z"
        clipRule="evenodd"
      />
    </svg>
  ),
  ChartBarIcon: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="h-5 w-5" {...props}>
      <path d="M5 3v18H3V3h2zm4 10v8H7v-8h2zm4-6v14h-2V7h2zm4 8v6h-2v-6h2zm4-4v10h-2V11h2z" />
    </svg>
  ),
  ShieldCheckIcon: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="h-5 w-5" {...props}>
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm1 11H11v-1a1 1 0 00-1-1H9v-2a3 3 0 013-3h0a3 3 0 013 3v2h-1a1 1 0 00-1 1v1zm-1-7a2 2 0 11-2-2 2 2 0 012 2z" />
    </svg>
  ),
  ClipboardListIcon: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="h-5 w-5" {...props}>
      <path
        fillRule="evenodd"
        d="M9 2a1 1 0 00-1 1v1H6a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1h-2V3a1 1 0 00-1-1H9zm-1 1a2 2 0 014 0v1h2a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2V3zm2 9a1 1 0 10-2 0 1 1 0 002 0zm-.293 2.707a1 1 0 011.414 0l3-3a1 1 0 10-1.414-1.414L10 12.586l-1.293-1.293a1 1 0 10-1.414 1.414l2 2z"
        clipRule="evenodd"
      />
    </svg>
  ),
  DocumentTextIcon: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="h-5 w-5" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a2 2 0 012-2h4a2 2 0 012 2h4a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V7a2 2 0 012-2h4zm2-1a1 1 0 00-1 1v1h6V5a1 1 0 00-1-1H8zm-5 3v10h14V7H3zm9 5a1 1 0 112 0 1 1 0 01-2 0zm-4 0a1 1 0 112 0 1 1 0 01-2 0z"
        clipRule="evenodd"
      />
    </svg>
  ),
}




const Note = () => {
  const router = useRouter()
  const { id } = router.query

  async function fetchProposition() {
    try {

      let tmpSectionsData = {}
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/by-num/${id}`)

      if (!res.ok) {
        throw new Error("Network response was not ok")
      }

      const tmpTransformData = []
      const data = await res.json()


      let content



      content = JSON.parse(data?.data?.content)

      const proposition: any = content.proposition

        for (const metric in proposition) {
          if (proposition.hasOwnProperty(metric))
            tmpTransformData.push({
              Metric: metric,
              Year: "NaN",
              Value: proposition[metric],
            })
        }


        const annee_n = tmpTransformData?.find((data: any) => data.Year === "NaN" && data.Metric === "annee_n")?.Value.toString() ?? ""
        const annee_n_2 = tmpTransformData?.find((data: any) => data.Year === "NaN" && data.Metric === "annee_n_2")?.Value.toString() ?? ""
        const annee_n_1 = tmpTransformData?.find((data: any) => data.Year === "NaN" && data.Metric === "annee_n_1")?.Value.toString() ?? ""


        const mapYearKey = (year: string) => {
          if (year === "year_n") return annee_n
          else if (year === "year_n_1") return annee_n_1
          else if (year === "year_n_2") return annee_n_2
          else if (year === "variation_n_1_n_2") return "Variation N-1/N-2"
          else if (year === "variation_n_n_1") return "Variation N/N-1"
        }



        const mapRowKey = (key: string) => {
          if (key === "chiffres_affaires") return "Chiffres d'affaires"
          else if (key === "frais_financiers_ca") return "Frais Financiers / CA (%)"
          else if (key === "resultat_exploitation") return "Résultat d'exploitation"
          else if (key === "resultat_net") return "Résultat net"
          else if (key === "caf") return "Capacité d'autofinancement"
          else if (key === "capital") return "Capital"
          else if (key === "bfdr") return "BFDR"
          else if (key === "fdr") return "FDR"
          else if (key === "tresorerie_nette") return "Trésorerie nette"
          else if (key === "fonds_propres_nets") return "Fonds propres nets"
          else if (key === "endettement") return "Endettement"
          else if (key === "mlt") return "MLT"
          else if (key === "ct") return "CT"
          else if (key === "total_bilan") return "Total bilan"
          else if (key === "fpn_tb") return "FPN/TB (%)"
          else if (key === "eb_tb") return "EB/TB (%)"
          else if (key === "dlmt_kp") return "DLMT/KP (%)"
          else if (key === "cca_nb") return "CCA NB"
          else if (key === "clients_ca") return "Clients/CA (jours)"
          else if (key === "fournisseurs_achats") return "Fournisseurs/ Achats (jours)"
          else if (key === "immobilisations_nettes") return "Immobilisations nettes"
          else if (key === "amortissements") return "Amortissements"
          else if (key === "stocks") return "Stocks"
          else if (key === "tresorerie_actif") return "Trésorerie- actif"
          else if (key === "total_actif") return "Total actif"
          else if (key === "dettes_bancaires_mlt") return "Dettes bancaires MLT"
          else if (key === "capitaux_permanents") return "Capitaux permanents"
          else if (key === "autres_dettes_ct") return "Autres Dettes CT"
          else if (key === "dettes_bancaires_ct") return "Dettes bancaires CT"
          else if (key === "total_passif") return "Total passif"
        }



        const activite_et_rentabilite = content.analyse_financiere.activite_et_rentabilite

        for (const metric in activite_et_rentabilite) {
          if (metric === "commentaire") continue
          for (const year in activite_et_rentabilite[metric]) {
            tmpTransformData.push({
              Metric: mapRowKey(metric),
              Year: mapYearKey(year),
              Value: activite_et_rentabilite[metric][year],
            })
          }
        }
        tmpTransformData.push({
          Metric: "activite_et_rentabilite",
          Year: "NaN",
          Value: activite_et_rentabilite["commentaire"],
        })


        const structure_financiere = content.analyse_financiere.structure_financiere
        for (const metric in structure_financiere) {
          if (metric === "commentaire") continue
          for (const year in structure_financiere[metric]) {
            tmpTransformData.push({
              Metric: mapRowKey(metric),
              Year: mapYearKey(year),
              Value: structure_financiere[metric][year],
            })
          }
        }
        tmpTransformData.push({
          Metric: "structure_financiere",
          Year: "NaN",
          Value: structure_financiere["commentaire"],
        })

        const passif_n = content.analyse_financiere.actif_passif_n.passif_n
        for (const metric in passif_n) {

          tmpTransformData.push({
            Metric: mapRowKey(metric),
            Year: "NaN",
            Value: passif_n[metric],
          })

        }

        const actif_n = content.analyse_financiere.actif_passif_n.actif_n
        for (const metric in actif_n) {
          tmpTransformData.push({
            Metric: mapRowKey(metric),
            Year: "NaN",
            Value: actif_n[metric],
          })
        }

        tmpTransformData.push({
          Metric: "actif_passif_n",
          Year: "NaN",
          Value: content.analyse_financiere.actif_passif_n["commentaire"],
        })

        const objet_demande_data = {
          ...content["objet_demande_lignes_sollicitees"],
          objet_demande: content["objet_demande"]
        }
        tmpSectionsData = {
          'identification_societe': content["identification_societe"],
          'presentation_societe': content["presentation_societe"],
          'analyse_financiere': tmpTransformData,
          'etat_relation_garanties': content["etat_relation_garanties"],
          'etat_autorisations_utilisations': content["etat_autorisations_utilisations"],
          'objet_demande': objet_demande_data,
          'synthese': content['executive_summary']
        }

        setSectionsData(tmpSectionsData)

    } catch (err) {
      console.error("Error fetching proposition:", err)
    }
  }



  const [sectionsData, setSectionsData] = useState<any>()

  useEffect(() => {
    fetchProposition()
  }, [id])

  return (
    <>
      {
        <div className="flex" style={{ backgroundColor: '#F4F7F8' }}>
          <div className="h-screen w-1/3 border-r-2  border-dotted border-gray-400 p-4">
            <ul className="mt-10 space-y-2 font-medium">
              <div className="mb-10 flex justify-center">
                <Link href={"/"}>
                  <Image src={LOGO_SRC} width={100} height={100} alt={APPLICATION_TITLE} />
                </Link>
              </div>

              {sections.map((section, index) => (
                <a
                  key={`tr-${index}-${section.id}`}
                  href={`#${section.id}`}
                  className="group flex items-center rounded-lg p-2 hover:bg-gray-100"
                >
                  {icons[section.icon]({})}

                  <span
                    key={`span-${index}`}
                    className="ms-3 whitespace-nowrap font-semibold"
                    style={{ color: "black" }}
                  >
                    {section.title}
                  </span>
                </a>
              ))}
            </ul>
          </div>

          <div className="flex h-screen w-2/3 flex-col">
            <div className="fixed z-10 w-3/4 p-8 shadow">
              <div className="flex ">
                <h1 className="ml-4  font-extrabold" style={{ fontFamily: "Arial", color: "black" }}>
                  Numéro de proposition:
                  <div className="font-light"> {id}</div>

                </h1>
              </div>
            </div>
            <div className="overflow-y-auto p-8 space-y-6 mt-32">
              <>
                {sectionsData && sections.map((section, index) => {
                  const Component = sectionComponents[section.id]


                  return (
                    <div key={section.id} id={section.id} className="p-2 shadow-xl" style={{ backgroundColor: 'white' }}>
                      <Component data={sectionsData[section.key]} />
                    </div>
                  )
                })}

              </>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Note
