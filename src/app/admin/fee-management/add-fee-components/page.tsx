import FeeComponentsForm from "./components/fee-components-form"

export const metadata = {
  title: "Add Fee Components",
}

export default function AddFeeComponentsPage() {
  return (
    <div className="container max-w-5xl py-10">
      <FeeComponentsForm />
    </div>
  )
}
