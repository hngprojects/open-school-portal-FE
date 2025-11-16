import React from "react"
import Image from "next/image"

const Forgot_Password = () => {
  return (
    <div className="flex flex-1 items-center  justify-center min-[1400px]:-ml-[500px]">
      <div className="max-w-[432px] w-full flex flex-col items-center">
        {/* Logo */}
        <div className="max-lg:mt-[60px] lg:-mt-[230px]">
          <Image
            src="/assets/images/auth/desktop-school-logo.png"
            alt="School Logo"
            width={250}
            height={250}
            className="w-14 h-14 sm:w-[152px] sm:h-[152px] min-[1400px]:w-[250px] min-[1400px]:h-[250px]"
          />
        </div>

        {/* Success Message */}
        <div className="flex flex-col   items-center  max-lg:mt-[233px] lg:mt-[171px] mb-[26px]">
          <Image
            src="/assets/images/auth/checkmark.png"
            alt="checkmark"
            width={89}
            height={89}
            className="mb-4"
          />
          
          <h2 className="text-center mb-3 font-sans font-semibold text-2xl leading-[38px] min-[1400px]:text-3xl text-[#2D2D2D]">
            Password Reset
          </h2>
          <p className="text-center font-sans text-sm min-[1400px]:text-[16px] leading-[17px] text-[#2D2D2DB2]">
            Instructions have been sent to your email on how to reset your password and
            will expire in <span className="font-bold">10 minutes</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Forgot_Password