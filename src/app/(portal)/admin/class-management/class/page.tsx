"use client"

import EmptyState from "../../_components/empty-state"
// import ExistingClasses from "../../_components/classes/existing-classes"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import { useGetClasses } from "../_hooks/use-classes"
import { ItemLoader } from "../_components/sub-loader"
import { ItemsError } from "../_components/loading-error"

const page = () => {
  const { data: classesInfo, isLoading, isError, error, refetch } = useGetClasses()
  const classGroups = classesInfo && classesInfo.data

  // flatten out the classes with group names
  const flatClasses =
    classGroups &&
    classGroups
      .map((group) =>
        group.classes.map((cls) => ({
          id: cls.id,
          name: `${group.name} ${cls.arm}`,
          description: `Academic Session: ${group.academicSession.name}`,
        }))
      )
      .flat()
  const classes = classesInfo && flatClasses

  return (
    <div className="bg-[#FAFAFA] px-2 pt-4 lg:px-4">
      {/* empty state */}
      <div className="p-5">
        <DashboardTitle
          heading="Create Classes"
          description="View, manage, or create classes"
        />
        {isLoading || !classes ? (
          <ItemLoader item="Classes" />
        ) : isError ? (
          <ItemsError
            item="Classes"
            reload={refetch}
            errorMessage={error?.message || "An unexpected error occurred."}
          />
        ) : classes && classes.length === 0 ? (
          <EmptyState
            title="No Classes Assigned yet"
            description="Add Classes to make the session active."
            buttonText="Add Classes"
            buttonHref="/admin/class-management/class/add-class"
          />
        ) : (
          // Render existing classes here when available
          <div>
            {classes.map((classItem) => (
              <div key={classItem.id} className="mb-4 rounded bg-white p-4 shadow">
                <h3 className="text-lg font-semibold">{classItem.name}</h3>
                <p className="text-sm text-gray-600">{classItem.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default page
