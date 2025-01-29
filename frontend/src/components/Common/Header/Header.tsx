// routes
import Image from "next/image"

const Header = ({ title }: any) => {
  return (
    <>
      <div>
        <h1>{title}</h1>
        <Image src="/images/awb_logo_desktop.png" alt="AWB logo" width={75} height={32} />
      </div>
    </>
  )
}

export default Header
