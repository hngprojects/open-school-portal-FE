import React from "react"
import { Check } from "lucide-react"

const PasswordResetSuccess = () => {
  return (
    <article className="mx-auto flex h-full max-w-108.5 flex-col items-center justify-center gap-6.5">
      <div className="bg-secondary flex h-22.25 w-22.25 items-center justify-center rounded-full font-bold text-white">
        <Check size={60} />
      </div>

      <section className="space-y-2.5 text-center">
        <h4 className="text-primary text-2xl leading-9.5 font-semibold lg:text-[2.25rem]">
          Password Reset
        </h4>
        <p className="text-primary/70 text-sm leading-none font-normal">
          Instructions have been sent to your email on how to reset your password and will
          expire in <span className="font-bold">10 minutes.</span>
        </p>
      </section>
    </article>
  )
}

export default PasswordResetSuccess
