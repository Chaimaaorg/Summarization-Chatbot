export const APPLICATION_TITLE = "AWB"
export const LOGO_SRC = "/images/awb.png"
export const LOGO_FULL_SRC = "/images.png"
export const LOGO_FULL_DARK_SRC = "/images.png"

export const INITIAL_CLIENT_IDS = ["client1", "client2", "client3"]

export const NOTES_LIST = [
  {
    noteId: "1",
    data: {
      clientId: "clientId_1",
      clientName: "OCP Solutions",
      content: {
        "Company X": {
          "Chiffre d'affaires": { "2018": 1000, "2019": 2000, "2020": 3000, "2021": 4000, "2022": 5000 },
          "Résultat net": { "2018": 100, "2019": 200, "2020": 300, "2021": 400, "2022": 500 },
          EBE: { "2018": 10, "2019": 20, "2020": 30, "2021": 40, "2022": 50 },
          "Auto-Financement": { "2018": 1, "2019": 2, "2020": 3, "2021": 4, "2022": 5 },
        },
      },
    },
  },
  {
    noteId: "2",
    data: {
      clientId: "clientId_2",
      clientName: "Jesa International",
      content: {
        "Company X": {
          "Chiffre d'affaires": { "2018": 1000, "2019": 2000, "2020": 3000, "2021": 4000, "2022": 5000 },
          "Résultat net": { "2018": 100, "2019": 200, "2020": 300, "2021": 400, "2022": 500 },
          EBE: { "2018": 10, "2019": 20, "2020": 30, "2021": 40, "2022": 50 },
          "Auto-Financement": { "2018": 1, "2019": 2, "2020": 3, "2021": 4, "2022": 5 },
        },
      },
    },
  },
]

export enum actions {
  VIEW = "view",
  DOWNLOAD = "download",
}
