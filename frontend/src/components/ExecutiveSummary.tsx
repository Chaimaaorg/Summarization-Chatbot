import { Markdown } from "./CodeView/Markdown"

const ExecutiveSummary = ({ data }: any)  => {

    return (
        <div style={{  padding: "1rem" }}>
            <h1 className="font-extrabold text-center p-2"  style={{color: "white", backgroundColor:'#475463'}}>Synthèse</h1>
            <div className="px-5">
                <Markdown text={data} />
            </div>
        </div>


    )
}

export default ExecutiveSummary
