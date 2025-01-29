import { env } from "~/env.mjs"
import { useEffect, useState } from "react"
const Bilan = ({ data }: any | undefined) => {
  const [transformedData, setTransformedData] = useState<[]>([])

  useEffect(() => {
    const transformedDataTmp: any = []

    const content = JSON.parse(data)
    const financials = content["JESA International"]
    for (const metric in financials) {
      for (const year in financials[metric]) {
        transformedDataTmp.push({
          Company: "JESA International",
          Metric: metric,
          Year: year,
          Value: financials[metric][year],
        })
      }
    }
    setTransformedData(transformedDataTmp)
  }, [data])

  const columnsNames = ["KMAD", "2020", "2021", "Variation N-1/N-2", "2022", "Variation N/N-1"]

  const rowsNames = [
    "Chiffre d'affaires",
    "Frais Financiers / CA (%)",
    "Résultat d’Exploitation",
    "Résultat net",
    "CAF",
  ]

  const autoCalculateFields = (a: number, b: number) => {
    return (((a - b) / b) * 100).toFixed(0)
  }

  const getValue = (year: string, metric: string): string | "NaN" => {
    return transformedData?.find((data: any) => data.Year === year && data.Metric === metric)?.Value ?? "NaN"
  }

  const getCellValue = (year: string, metric: string) => {
    let yearA: number
    let yearB: number
    if (year.includes("N-1/N-2")) {
      yearA = 2021
      yearB = 2020
    } else if (year.includes("N/N-1")) {
      yearA = 2022
      yearB = 2021
    } else {
      const valeur = (parseInt(getValue(year, metric).replace(/\s/g, "")) / 1000).toFixed(0)
      return new Intl.NumberFormat("fr-FR").format(parseInt(valeur))
    }
    const valueA = getValue(yearA.toString(), metric)
    const valueB = getValue(yearB.toString(), metric)

    if (valueA === "NaN" || valueB === "NaN") return "NaN"

    return autoCalculateFields(parseInt(valueA.replace(/\s/g, "")), parseInt(valueB.replace(/\s/g, ""))) + " %"
  }

  const exportToWord = async () => {
    await fetch(`${env.NEXT_PUBLIC_API_URL}/word/generate_docx`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: JSON.parse(data) }),
    })
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
  return (
    <>
      {
        <div className="relative overflow-x-auto p-6">
          {/* <Header/> */}
          <div className="flex justify-between">
            <h1 className="pb-6 font-bold" style={{ color: "white" }}>
              Analyse financière
            </h1>
            <button
              type="button"
              className="mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onClick={exportToWord}
            >
              Generate Document
            </button>
          </div>
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-red-500 text-xs uppercase text-gray-700 dark:bg-red-700 dark:text-gray-400">
              <tr>
                {columnsNames?.map((colName, index) => {
                  return (
                    <th key={`${index}-col`} scope="col" className="px-6 py-3">
                      {colName}
                    </th>
                  )
                })}
              </tr>
            </thead>

            <tbody>
              {rowsNames?.map((rowName, index) => {
                return (
                  <>
                    <tr key={`${index}-row`} className="dark:bg-white-800 border-b bg-white dark:border-gray-700">
                      {columnsNames?.map((colName, index) => {
                        return index === 0 ? (
                          <>
                            <th key={`${index}-col-row`} scope="col" className="px-6 py-3" style={{ color: "black" }}>
                              {rowName}
                            </th>
                          </>
                        ) : (
                          <>
                            <th scope="col" className="px-6 py-3" style={{ color: "black" }}>
                              {getCellValue(colName, rowName)}
                            </th>
                          </>
                        )
                      })}
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      }
    </>
  )
}

export default Bilan
