"use client"

import EmptyState from "../../_components/empty-state"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import { useGetClassesInfo } from "../_hooks/use-classes"
import { ItemLoader } from "../_components/sub-loader"
import { ItemsError } from "../_components/loading-error"
import ExistingClasses from "../../_components/classes/existing-classes"

const Page = () => {
  const { data: classesInfo, isLoading, isError, error, refetch } = useGetClassesInfo()
  const classItems = classesInfo && classesInfo.items

  // flatten out the classes with group names
  const classes =
    classItems &&
    classItems.map((item) => ({
      ...item,
      arms: item.classes.map((arm) => ({
        id: arm.id,
        name: arm.arm,
      })),
    }))

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
            buttonHref="/admin/class-management/class/new"
          />
        ) : (
          // Render existing classes here when available
          <ExistingClasses classesData={classes} />
        )}
      </div>
    </div>
  )
}

export default Page
