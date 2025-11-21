import { LogoSvg } from "../../public/svgs/logo-svg"

const Logo = () => {
  return (
    <div className="flex items-center">
      <LogoSvg className="h-7 w-7" />

      <span className="text-accent text-sm font-bold tracking-wider uppercase md:text-base">
        schoolbase
      </span>
    </div>
  )
}

export default Logo
