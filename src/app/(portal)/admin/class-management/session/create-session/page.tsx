import React from "react"
import CreateSessionForm from "../../../_components/sessions/create-session-form"

const CreateSessionPage = async () => {
  // You can fetch default values server-side here if needed
  const defaultValues = {
    academicSession: "",
    startDate: "",
    endDate: "",
  }

  return <CreateSessionForm defaultValues={defaultValues} />
}

export default CreateSessionPage
