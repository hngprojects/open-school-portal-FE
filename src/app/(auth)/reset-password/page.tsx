import { Suspense } from "react"
import PasswordResetForm from "../_components/password-reset"

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PasswordResetForm />
    </Suspense>
  )
}

export default ResetPasswordPage
