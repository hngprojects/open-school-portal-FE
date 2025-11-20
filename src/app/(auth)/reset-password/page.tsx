import { Suspense } from "react"
import PasswordReset from "../_components/password-reset"

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PasswordReset />
    </Suspense>
  )
}

export default ResetPasswordPage
