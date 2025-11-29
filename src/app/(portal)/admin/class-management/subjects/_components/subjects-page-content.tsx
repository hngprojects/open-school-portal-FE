"use client"

import { ItemLoader } from "../../../_components/sub-loader"
import { ItemsError } from "../../../_components/loading-error"
import EmptyState from "../../../_components/empty-state"
import { useGetSubjects } from "../_hooks/use-subjects"
import { useState } from "react"
import SubjectManagement from "./subjects-list"
import { NewSubjectDialog, EditSubjectDialog } from "./new-subject-dialog"
import AddedSubjectSuccess from "./add-subject-success"
import { useRouter } from "next/navigation"


export default function SubjectsPageContent() {
  const [search, setSearch] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const { data: subjectsData, isLoading, isError, error, refetch } = useGetSubjects({
    page: currentPage,
    search: search || undefined,
  })
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editSubjectID, setEditSubjectID] = useState<string | null>(null)
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean | string>(false)
  const { data: subjects, pagination } = subjectsData || {};
  const router = useRouter();

  return (
    <>
      {isLoading ? (
        <ItemLoader item="Subjects" />
      ) : isError ? (
        <ItemsError
          item="Subjects"
          reload={refetch}
          errorMessage={error?.message || "An unexpected error occurred."}
        />
      ) : !subjects || (subjects.length === 0 && !search) ? (
        <EmptyState
          title="No Subjects Created yet"
          description="Add Subjects."
          buttonText="Add Subjects"
          buttonHref="/admin/subject-management/subject/new"
          buttonOnClick={handleAddSubject}
        />
      ) : (
        // Render existing subjects here when available
        <SubjectManagement
          subjects={subjects}
          onEditSubject={handleEditSubject}
          onAssignSubject={handleAssignSubject}

          searchQuery={search}
          setSearchQuery={setSearch}
          currentPage={currentPage || 1}
          totalPages={pagination?.total_pages || 1}
          totalItems={pagination?.total || 0}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      )}

      <NewSubjectDialog
        open={showCreateDialog}
        setOpen={setShowCreateDialog}
        onSuccess={setShowSuccessDialog}
      />
      
      <EditSubjectDialog
        open={!!editSubjectID}
        subjectID={editSubjectID as string}
        setOpen={() => setEditSubjectID(null)}
        onSuccess={setShowSuccessDialog}
      />

      <AddedSubjectSuccess
        open={!!showSuccessDialog}
        setOpen={setShowSuccessDialog}
        onNextAction={() => {
          handleAssignSubject(showSuccessDialog as string)
        }}
      />
    </>
  )

  function handleAddSubject() {
    setShowCreateDialog(true)
  }

  function handleEditSubject(subjectID: string) {
    setEditSubjectID(subjectID)
  }

  function handleAssignSubject(subjectID: string) {
    router.push(`/admin/class-management/subjects/${subjectID}/assign`)
  }
}
