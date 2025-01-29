import { Markdown } from "./CodeView/Markdown"

const EtatRelationGaranties = ({ data }: any) => {


    const mouvements_confies_net = data?.mouvements_confies_net
    const mouvements_internationaux = data?.mouvements_internationaux
    const garanties_actuelles = data?.garanties_actuelles


    return (
        <>
        {/* // mouvements confies net Table 1 */}
        <div style={{ display: "flex", alignItems: "initial", justifyContent: "center", flexDirection: "column", padding: "1rem" }}>
            <div>
            <h1 className="mb-5 font-bold text-1xl" style={{ color: "#475463" }}>
                   Mouvements confiés en net (Kdh)
                </h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border-collapse border border-gray-500 ">
                        <thead className="bg-[#475463] text-white">
                            <tr>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Comptes</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Solde Actuel</th>
                                <th className="border border-gray-500 px-4 py-2" colSpan={2} style={{color:'white'}}>{data.year_n2}</th>
                                <th className="border border-gray-500 px-4 py-2" colSpan={2} style={{color:'white'}}>{data.year_n1}</th>
                                <th className="border border-gray-500 px-4 py-2" colSpan={2} style={{color:'white'}}>{data.year_n}</th>
                            </tr>
                            <tr>
                                <th className="border border-gray-500 px-4 py-2"></th>
                                <th className="border border-gray-500 px-4 py-2"></th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Solde moyen</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Mouvement net Crédit</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Solde moyen</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Mouvement net Crédit</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Solde moyen</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Mouvement net Crédit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mouvements_confies_net?.lignes.map((ligne, idx) => (
                                <tr key={idx} className="border border-gray-500 bg-[#F4F7F8] text-center" >
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.compte}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.solde_actuel}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.solde_moyen_year_n_2}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.mouvement_net_credit_year_n_2}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.solde_moyen_year_n_1}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.mouvement_net_credit_year_n_1}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.solde_moyen_year_n}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.mouvement_net_credit_year_n}</td>
                                </tr>
                            ))}
                            <tr className="bg-[#475463] text-white">
                                <td className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Pourcentage du CA</td>
                                <td className="border border-gray-500 px-4 py-2"></td>
                                <td className="border border-gray-500 px-4 py-2"></td>
                                <td className="border border-gray-500 px-4 py-2" style={{color:'white'}}>{mouvements_confies_net.pourcentage_ca_mouvement_net_credit_year_n_2}</td>
                                <td className="border border-gray-500 px-4 py-2"></td>
                                <td className="border border-gray-500 px-4 py-2" style={{color:'white'}}>{mouvements_confies_net.pourcentage_ca_mouvement_net_credit_year_n_1}</td>
                                <td className="border border-gray-500 px-4 py-2"></td>
                                <td className="border border-gray-500 px-4 py-2" style={{color:'white'}}>{mouvements_confies_net.pourcentage_ca_mouvement_net_credit_year_n}</td>
                            </tr>
                        </tbody>
                        <tfoot  >
                            <tr>
                                <td colSpan="1" className="border border-gray-500 px-4 py-2 text-left bg-[#475463]" >
                                    <strong style={{color:'white'}}>Commentaires (Analyse des flux en net)</strong> <br />

                                </td>
                                <td colSpan="7" className=" px-6 py-4 font-light" style={{ color: "#475463" }}>
                                <div className="px-5">
                                    <Markdown text={mouvements_confies_net.commentaire} />
                                </div>


                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>



        </div>

        {/* </ mouvements_internationaux */}

        <div style={{ display: "flex", alignItems: "initial", justifyContent: "center", flexDirection: "column", padding: "1rem" }}>
            <div>
            <h1 className="mb-5 font-bold text-1xl" style={{ color: "#475463" }}>
                Mouvements à l&apos;international (Kdh)
                </h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border-collapse border border-gray-500">
                        <thead className="bg-[#475463] text-white">
                            <tr>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Comptes</th>


                                <th className="border border-gray-500 px-4 py-2" colSpan={4} style={{color:'white'}}>Mouvements à l&apos;import</th>

                                <th className="border border-gray-500 px-4 py-2" colSpan={4} style={{color:'white'}}>Mouvements à l&apos;export</th>
                            </tr>
                            <tr>
                            <th className="border border-gray-500 px-4 py-2"></th>

                                <th className="border border-gray-500 px-4 py-2" style={{color:"white"}}>{data.year_n2}</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:"white"}}>{data.year_n1}</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:"white"}}>{data.year_n}</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:"white"}}>Variation N-1 /N en %</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:"white"}}>{data.year_n2}</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:"white"}}>{data.year_n1}</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:"white"}}>{data.year_n}</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:"white"}}>Variation N-1 /N en %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mouvements_internationaux?.lignes?.map((ligne, idx) => (
                                <tr key={idx} className="border border-gray-500 text-center" >
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: 'black' }}>{ligne.compte}</td>

                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.mouvement_import_year_n_2}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.mouvement_import_year_n_1}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.mouvement_import_year_n}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.variation_mouvement_import_n_n_1}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.mouvement_export_year_n_2}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.mouvement_export_year_n_1}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.mouvement_export_year_n}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: "#475463" }}>{ligne.variation_mouvement_export_n_n_1}</td>
                                </tr>
                            ))}

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="1" className="border border-gray-500 px-4 py-2 text-left bg-[#475463]" >
                                    <strong style={{color:'white'}}>Commentaires</strong> <br />

                                </td>
                                <td colSpan="8" className=" px-6 py-4 font-light" style={{ color: "#475463" }}>
                                <div className="px-5">
                                    <Markdown text={mouvements_internationaux.commentaire} />
                                </div>


                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>



        </div>

        {/* </ Garanties actuelles */}

        <div style={{ display: "flex", alignItems: "initial", justifyContent: "center", flexDirection: "column", padding: "1rem" }}>
            <div>
            <h1 className="mb-5 font-bold text-1xl" style={{ color: "#475463" }}>
                Garanties actuelles
                </h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border-collapse border border-gray-500 text-center">
                        <thead className="bg-[#475463] text-white">
                            <tr>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Garantie</th>
                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}}>Etat</th>

                                <th className="border border-gray-500 px-4 py-2" style={{color:'white'}} >Motifs d&apos;irrégularité et actions de régularisation</th>


                            </tr>

                        </thead>
                        <tbody>
                            {garanties_actuelles?.map((ligne, idx) => (
                                <tr key={idx} className="border border-gray-500" >
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: '#475463' }}>{ligne.garantie}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: '#475463' }}>{ligne.etat}</td>
                                    <td className="border border-gray-500 px-4 py-2" style={{ color: '#475463' }}>{ligne.motif}</td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>



        </div>

        </>
    )
}

export default EtatRelationGaranties
