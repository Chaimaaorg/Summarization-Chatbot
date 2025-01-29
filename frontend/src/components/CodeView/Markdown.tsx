import { type ReactElement } from "react"

import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

interface Props {
  text: string
  messageId?: string
  conversationId?: string
}

export const Markdown = (props: Props) => {
  const { text, messageId, conversationId } = props

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        pre({ className, children, ...props }) {
          const child = children[0] as ReactElement
          const match = /language-(\w+)/.exec(child.props.className || "")
          const language = match ? match[1] : "code"

          const code = child.props.children[0].replace("\n", " ").trim()
          return (

            <pre>
              {/* <CodeBlock
                style={{ color: "#475463" }}
                key={Math.random()}
                language={language || "code"}
                value={code}
                messageId={""}
                conversationId={""}
                {...props}
              /> */}
            </pre>
          )

        },
        p({ children }) {
          return (
            <p className="my-0" style={{ color: "#475463"}}>
              {children}
            </p>
          )
        },
        a({ children }) {
          return (
            <a className="my-0" style={{ color: "#475463" }}>
              {children}
            </a>
          )
        },
        h1({ children }) {
          return (
            <h1 className="font-bold" style={{ color: "#475463" , textDecoration:"underline"}}>
              {children}
            </h1>
          )
        },
        h2({ children }) {
          return (
            <h2 className="m-2 font-semibold" style={{ color: "#475463" }}>
              {children}
            </h2>
          )
        },
        h3({ children }) {
          return (
            <h3 className="m-2 font-semibold" style={{color: "#475463"}}>
              {children}
            </h3>
          )
        },
        h4({ children }) {
          return (
            <h4 className="m-2" style={{ color: "yellow" }}>
              {children}
            </h4>
          )
        },
        h5({ children }) {
          return (
            <h5 className="m-2" style={{ color:"#475463"}}>
              {children}
            </h5>
          )
        },
        h6({ children }) {
          return (
            <h6 className="m-2" style={{ color: "#475463" }}>
              {children}
            </h6>
          )
        },
        li({ children }) {
          return  <div className="px-4"><li className="p-1" style={{ color: "#475463" }}>{children}</li></div>
        },
        strong({ children }) {
          return (
            <strong className="m-2" style={{color: "#475463", textDecoration:"underline"}}>
              {children}
            </strong>
          )
        },
      }}
    >
      {text}
    </ReactMarkdown>
  )
}
