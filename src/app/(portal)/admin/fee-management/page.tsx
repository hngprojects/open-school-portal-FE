import React from "react"
import FeeComponentTable from "./_components/fee-component-table"
// import EmptyState from "./_components/empty-state"

const FeeManagement = () => {
  return (
    <div className="w-full px-8 py-10">
      <FeeComponentTable />
      {/* <EmptyState /> */}
    </div>
  )
}

export default FeeManagement
