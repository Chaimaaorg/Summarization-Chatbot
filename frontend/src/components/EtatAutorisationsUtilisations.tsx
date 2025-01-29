import { Markdown } from "./CodeView/Markdown"

const EtatAutorisationsUtilisations = ({ data }: any) => {


const lignes_autorisations_utilisations = data.lignes_autorisations_utilisations
const commentaire = data.commentaire

    return (
        <>
        <div style={{ display: "flex", alignItems: "initial", justifyContent: "center", flexDirection: "column", padding: "1rem" }}>
            <div>
            <h1 className="mb-5 font-bold text-1xl" style={{ color: "#475463" }}>
            Etat des autorisations / Utilisations (Lignes formelles) (Kdh)
                </h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border-collapse border border-gray-500">
                        <thead className="bg-[#475463] text-white">
                            <tr>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Ligne</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Réf Arrangement</th>

                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Nature Autorisation (AT/AF)</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Autorisations au {data.date_autorisations}</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Utilisations au {data.date_utilisations}</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Condition appliquée en %</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Echéance ligne</th>
                            </tr>

                        </thead>
                        <tbody>
                            {lignes_autorisations_utilisations.map((ligne, idx) => (
                                <tr key={idx} className="border border-gray-500 text-center" >
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.ligne}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.ref_arr}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.aut_nature}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.aut}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.uti}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.condition_appliquee}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.echeance}</td>
                                </tr>
                            ))}
                            <tr>
                            <td className="border border-gray-500 px-4 py-2 bg-[#475463] text-center font-semibold" style={{ color: 'white' }} colSpan={3}>Total</td>
                            <td className="border border-gray-500 px-4 py-2" style={{ color: 'black' }} >{data.total_autorisations}</td>
                            <td className="border border-gray-500 px-4 py-2" style={{ color: 'black' }} >{data.total_utilisations}</td>
                            <td className="border border-gray-500 px-4 py-2 bg-[#475463] text-center font-semibold" colSpan={2}></td>

                            </tr>

                        </tbody>
                        <tfoot >
                            <tr>
                                <td colSpan="1" className="bg-[#475463] border border-gray-500 px-4 py-2 text-left">
                                    <strong style={{color:"white"}}>Commentaires</strong> <br />

                                </td>
                                <td colSpan="6" className="border border-gray-500 px-4 py-2 text-left" style={{ color: "#475463" }}>
                                <div className="px-5">
                                    <Markdown text={commentaire} />
                                </div>

                                </td>

                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>


        </>
    )
}

export default EtatAutorisationsUtilisations
