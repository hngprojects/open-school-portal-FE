import DashboardTitle from "@/components/dashboard/dashboard-title"
import SubjectsPageContent from "./_components/subjects-page-content"

const SubjectPage = () => {
  return (
    <div className="bg-[#FAFAFA] px-2 pt-4 lg:px-4">
      {/* empty state */}
      <div className="p-5">
        <DashboardTitle
          heading="Subjects"
          description="View, manage, or create subjects "
        />

        <SubjectsPageContent />
      </div>
    </div>
  )
}

export default SubjectPage
