import React from "react"
import Image from "next/image"

const Forgot_Password = () => {
  return (
    <div className="flex flex-1 items-center justify-center min-[1400px]:-ml-[500px]">
      <div className="flex w-full max-w-[432px] flex-col items-center">
        {/* Logo */}
        <div className="max-lg:mt-[60px] lg:-mt-[230px]">
          <Image
            src="/assets/images/auth/desktop-school-logo.png"
            alt="School Logo"
            width={250}
            height={250}
            className="h-14 w-14 min-[1400px]:h-[250px] min-[1400px]:w-[250px] sm:h-[152px] sm:w-[152px]"
          />
        </div>

        {/* Success Message */}
        <div className="mb-[26px] flex flex-col items-center max-lg:mt-[233px] lg:mt-[171px]">
          <Image
            src="/assets/images/auth/checkmark.png"
            alt="checkmark"
            width={89}
            height={89}
            className="mb-4"
          />

          <h2 className="mb-3 text-center font-sans text-2xl leading-[38px] font-semibold text-[#2D2D2D] min-[1400px]:text-3xl">
            Password Reset
          </h2>
          <p className="text-center font-sans text-sm leading-[17px] text-[#2D2D2DB2] min-[1400px]:text-[16px]">
            Instructions have been sent to your email on how to reset your password and
            will expire in <span className="font-bold">10 minutes</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Forgot_Password
