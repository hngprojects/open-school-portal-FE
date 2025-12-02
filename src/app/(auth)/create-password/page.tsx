import { Suspense } from "react"
import PasswordCreate from "../_components/password-create"
import Loading from "@/app/loading"

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <PasswordCreate />
    </Suspense>
  )
}

export default ResetPasswordPage
