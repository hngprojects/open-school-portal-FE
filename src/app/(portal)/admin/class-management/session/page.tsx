import React from "react"
// import EmptyState from "../../_components/sessions/empty-state"
import SessionsPage from "../../_components/sessions/sessions-page"

const page = () => {
  return (
    <div className="bg-[#FAFAFA] px-2 py-4 lg:px-4">
      <SessionsPage />
      {/* <EmptyState /> */}
    </div>
  )
}

export default page
