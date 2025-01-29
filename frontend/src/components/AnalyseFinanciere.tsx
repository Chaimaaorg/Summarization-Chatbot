import { Markdown } from "./CodeView/Markdown"

const AnalyseFinanciere = ({ data }: any) => {


  const annee_n = data?.find((data: any) => data.Year === "NaN" && data.Metric === "annee_n")?.Value ?? ""
  const annee_n_2= data?.find((data: any) => data.Year === "NaN" && data.Metric === "annee_n_2")?.Value ?? ""
  const annee_n_1= data?.find((data: any) => data.Year === "NaN" && data.Metric === "annee_n_1")?.Value ?? ""

  const columnsNames = ["Kdh", annee_n_2, annee_n_1, "Variation N-1/N-2", annee_n, "Variation N/N-1"]


  const rowsNames = [
    "Chiffres d'affaires",
    "Frais Financiers / CA (%)",
    "Résultat d'exploitation",
    "Résultat net",
    "Capacité d'autofinancement",
  ]

  const rowNamesStructure = [
    "Capital",
    "FDR",
    "BFDR",
    "Trésorerie nette",
    "Fonds propres nets",
    "Endettement",
    "MLT",
    "CT",
    "Total bilan",
    "FPN/TB (%)",
    "EB/TB (%)",
    "DLMT/KP (%)",
    "CCA NB",
    "Clients/CA (jours)",
    "Fournisseurs/ Achats (jours)",
  ]

  const colNameTable3 = ["Actif N", "Montant en (KDH)"]
  const rowNamesTable3 = ["Immobilisations nettes", "Amortissements", "Stocks", "Trésorerie- actif", "Total actif"]

  const colNameTable4 = ["Passif N", "Montant en (KDH)"]
  const rowNamesTable4 = [
    "Fonds propres nets",
    "Dettes bancaires MLT",
    "Capitaux permanents",
    "Autres Dettes CT",
    "Dettes bancaires CT",
    "Total passif",
  ]

  const isGrayCell = (colName: string, rowName: string) => {
    return (
      ["Variation N-1/N-2", "Variation N/N-1"].includes(colName) &&
      [
        "FPN/TB (%)",
        "EB/TB (%)",
        "DLMT/KP (%)",
        "CCA NB",
        "Clients/CA (jours)",
        "Fournisseurs/ Achats (jours)",
      ].includes(rowName)
    )
  }
  const getCommentaire = (metric: string): any => {
    return data?.find((data: any) => data.Metric === metric)?.Value
  }
  const getValue = (year: string, metric: string): string | "N/A" => {
    const value = data?.find((data: any) => data.Year === year && data.Metric === metric)?.Value
    return value !== undefined ? value : "N/A"
  }

  const getCellStyle = (colName: string, rowName: string) => {
    if (isGrayCell(colName, rowName)) return { backgroundColor: "#c8c9cc" }
    else return { color: "#475463" }
  }

  const getCellValue = (year: string, metric: string) => {
    const value = getValue(year, metric)
    if (value === "NaN")
      return (
        <div className="group relative inline-block">
          <span
            className="inline-block h-5 w-5 cursor-pointer rounded-full border border-red-500 text-center font-bold leading-5 text-red-500"
            style={{ color: "red" }}
          >
            !
          </span>
          <span
            className="absolute  bottom-full left-1/2 w-40 -translate-x-1/2 translate-y-2 transform rounded-md bg-red-200 p-2 text-xs opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ color: "#8B1F08" }}
          >
            Échec de l&apos;extraction
          </span>
        </div>
      )
    else return value
  }

  const renderTable = (title: string, rowNames: string[], columnsNames: string[]) => (
    <>
      <h1 className="mb-5 font-bold text-1xl" style={{ color: "#475463" }}>
        {title}
      </h1>
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right">
        <thead className="text-xs uppercase text-gray-700  bg-gray-500">
          <tr>
            {columnsNames.map((colName, index) => (
              <th
                key={`${index}-col`}
                scope="col"
                className="dark:border-gray-70 border-b bg-[#475463] px-6 py-4 font-semibold"
                style={{ color: "white" }}
              >
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowNames.map((rowName, rowIndex) => (
            <tr key={`${rowIndex}-row`} className=" border-b  bg-[#F4F7F8]">
              {columnsNames.map((colName, colIndex) => {
                return (
                  <th
                    key={`${colIndex}-col-row`}
                    scope="col"
                    className="px-6 py-3 font-light"
                    style={getCellStyle(colName, rowName)}
                  >
                    {isGrayCell(colName, rowName) ? null : colIndex === 0 ? (
                      rowName
                    ) : getCellValue(colName, rowName) === "N/A" ? (
                      <h1 style={{ color: "bg-[#475463]" }}>{"N/A"}</h1>
                    ) : (
                      <> {getCellValue(colName, rowName)}</>
                    )}
                  </th>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

  const passif_actif = (title: string, rowNames: string[], columnsNames: string[]) => (
    <>
      <h1 className="mb-5 font-bold text-1xl" style={{ color: "#475463" }}>
        {title}
      </h1>
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="text-xs uppercase text-gray-700  dark:text-gray-400">
          <tr>
            {columnsNames.map((colName, index) => (
              <th
                key={`${index}-col`}
                scope="col"
                className="dark:border-gray-70 border-b bg-[#475463] px-6 py-4 font-light"
                style={{ color: "white" }}
              >
                {colName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowNames.map((rowName, rowIndex) => (
            <tr key={`${rowIndex}-row`} className="dark:border-gray-70 border-b bg-[#F4F7F8]">
              {columnsNames.map((colName, colIndex) => (
                <th
                  key={`${colIndex}-col-row`}
                  scope="col"
                  className="px-6 py-3 font-light"
                  style={{ color: "gray" }}
                >
                  {colIndex === 0 ? (
                    rowName
                  ) : getCellValue("NaN", rowName) === "N/A" ? (
                    <>{"N/A"}</>
                  ) : (
                    <h1 style={{ color: "black" }}> {getCellValue("NaN", rowName)}</h1>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

  return (
    <div className="p-10">

   {renderTable("Activité et rentabilité", rowsNames, columnsNames)}

      <div className="mt-5 py-6 " >

        <div className="font-bold flex items-center space" style={{ color: "#475463" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          Commentaires
        </div>



        <div >
        <div className="py-4 px-2">
          <Markdown text={getCommentaire("activite_et_rentabilite")} />
          </div>
          <div className="font-bold flex items-center mt-3" style={{ color: "#475463" }}>
        </div>

        </div>

      </div>

      {renderTable("Structure financière", rowNamesStructure, columnsNames)}

      <div className="mt-5 p-4">
        <div className="font-bold flex items-center space" style={{ color: "#475463" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          Commentaires
        </div>


        <div >
          <div className="py-4 px-2">
          <Markdown text={getCommentaire("structure_financiere")} />
          </div>

        </div>
      </div>


      <div className="container mx-auto mt-5 flex space-x-6">
        {passif_actif("", rowNamesTable3, colNameTable3)}

        {passif_actif("", rowNamesTable4, colNameTable4)}
      </div>

      <div className="py-4 px-2">
      <div className="font-bold flex items-center space" style={{ color: "#475463" }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          Commentaires
        </div>
          <Markdown text={getCommentaire("actif_passif_n")} />
          </div>

    </div>
  )
}

export default AnalyseFinanciere
