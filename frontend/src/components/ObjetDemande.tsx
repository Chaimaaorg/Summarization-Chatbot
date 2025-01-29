import { Markdown } from "./CodeView/Markdown"

const ObjetDemande = ({ data }: any) => {

    return (
        <>
            <div style={{ display: "flex", alignItems: "initial", justifyContent: "center", flexDirection: "column", padding: "1rem" }}>
                <div>
                    <h1 className="mb-5 font-bold text-1xl" style={{ color: "#475463" }}>
                        Lignes sollicitées (Kdh)
                    </h1>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border-collapse border border-gray-500 text-center">
                            <thead className="bg-[#475463] text-white">
                                <tr>
                                    <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Ligne</th>
                                    <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Réf Arrangement</th>
                                    <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Autorisations sollicitées par l&apos;agence</th>
                                    <th className="border border-gray-500 px-4 py-2" style={{color:'white'}} >Conditions proposées agence (%)</th>
                                </tr>

                            </thead>
                            <tbody>
                                <tr> <td colSpan={4} style={{ color: 'black' }} className="border border-gray-500 px-4 py-2">Par décaissement </td></tr>
                                <tr> <td colSpan={4} style={{ color: 'black' }} className="border border-gray-500 px-4 py-2">Court terme </td></tr>
                                {data?.lignes_ct?.map((ligne, idx) => (
                                    <tr key={idx} className="border border-gray-500" >
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.ligne}</td>
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.ref_arr}</td>
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.autorisations_sollicitees}</td>
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.conditions_proporesses}</td>
                                    </tr>
                                ))}

                                <tr> <td colSpan={4} style={{ color: 'black' }} className="border border-gray-500 px-4 py-2">Moyen  et Long Terme </td></tr>
                                {data?.lignes_mlt?.map((ligne, idx) => (
                                    <tr key={idx} className="border border-gray-500" >
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.ligne}</td>
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.ref_arr}</td>
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.autorisations_sollicitees}</td>
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.conditions_proporesses}</td>
                                    </tr>
                                ))}

                                <tr>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: 'black' }}>Total Décaissement </td>

                                    <td className="border border-gray-500 px-4 py-2"></td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{data.decaiss_lignes_tot_aut}</td>

                                    <td className="border border-gray-500 px-4 py-2" ></td>

                                </tr>
                                <tr> <td colSpan={4} style={{ color: 'black' }} className="border border-gray-500 px-4 py-2">Par Signature </td></tr>
                                {data?.sign_lignes?.map((ligne, idx) => (
                                    <tr key={idx} className="border border-gray-500" >
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.ligne}</td>
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.ref_arr}</td>
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.autorisations_sollicitees}</td>
                                        <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.conditions_proporesses}</td>
                                    </tr>
                                ))}


                                <tr> <td className="border border-gray-500 px-4 py-2" style={{ color: "black" }}>Total Signature </td>

                                    <td className="border border-gray-500 px-4 py-2"></td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{data.sign_lignes_tot_aut}</td>

                                    <td className="border border-gray-500 px-4 py-2" ></td></tr>

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="1" className="bg-[#475463] border border-gray-500 px-4 py-2 text-left" >
                                        <strong style={{color:"white"}}>Commentaires</strong> <br />

                                    </td>
                                    <td colSpan="3" className="border border-gray-500 px-4 py-2 text-left">
                                    <div className="px-5">
                                    <Markdown text={data?.commentaire} />
                                </div>
                                    </td>

                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>



            </div>


            <div>


            </div>


            <div style={{ display: "flex", alignItems: "initial", justifyContent: "center", flexDirection: "column", padding: "1rem" }}>


                <div>


                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border-collapse border border-gray-500">
                            <thead className="bg-[#475463] ">
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-500 px-4 py-2 bg-[#475463] text-center" style={{color:'white'}}>Objet de la demande </td>

                                    <div className="px-5">
                                    <Markdown text={data.objet_demande} />
                                </div>
                                </tr>
                                <tr> <td className="border border-gray-500 px-4 py-2  bg-[#475463]" style={{color:'white'}}>Avis du centre d’affaires </td>
                                    <td className="border border-gray-500 px-4 py-2">{data.avis_centre_affaires}</td>
                                </tr>




                            </tbody>

                        </table>
                    </div>
                </div>



            </div>


        </>
    )
}

export default ObjetDemande
