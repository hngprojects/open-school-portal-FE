"use client"

import React from "react"
import { useRouter } from "next/navigation"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import { ArrowLeft } from "lucide-react"
import AddClassForm from "../../../_components/classes/add-class-form"

const AddClass = () => {
  const router = useRouter()

  return (
    <div className="p-4">
      <button
        onClick={() => router.back()}
        className="flex cursor-pointer items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
        aria-label="Go back"
      >
        <ArrowLeft className="size-5" />
      </button>

      <section className="mt-5 lg:ml-10">
        <DashboardTitle
          heading="Add New Class"
          description="Enter the details of the new teacher"
        />

        <AddClassForm />
      </section>
    </div>
  )
}

export default AddClass
// import React from "react"
// import DashboardTitle from "@/components/dashboard/dashboard-title"
// import { ArrowLeft } from "lucide-react"
// import AddClassForm from "../../../_components/classes/add-class-form"

// const AddClass = () => {
//   return (
//     <div className="p-4">
//       <ArrowLeft />

//       <section className="mt-5 lg:ml-10">
//         <DashboardTitle
//           heading="Add New Class"
//           description="Enter the details of the new teacher"
//         />

//         <AddClassForm />
//       </section>
//     </div>
//   )
// }

// export default AddClass
