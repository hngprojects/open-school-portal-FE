"use client"

import { ItemLoader } from "../../../_components/sub-loader"
import { ItemsError } from "../../../_components/loading-error"
import EmptyState from "../../../_components/empty-state"
import { useGetSubjects } from "../_hooks/use-subjects"
import { useState } from "react"
import SubjectManagement from "./subjects-list"
import NewSubjectDialog from "./new-subject-dialog"
import AddedSubjectSuccess from "./add-subject-success"

export default function SubjectsPageContent() {
  const { data: subjects, isLoading, isError, error, refetch } = useGetSubjects()
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState<boolean | string>(false)

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
      ) : !subjects || subjects.length === 0 ? (
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
          onAddSubject={handleAddSubject}
          currentPage={1}
          totalPages={1}
          totalItems={subjects.length}
          onPageChange={() => {}}
        />
      )}

      <NewSubjectDialog
        open={showCreateDialog}
        setOpen={setShowCreateDialog}
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

  function handleAssignSubject(name: string) {
    console.log("Assign subject:", name)
    setShowCreateDialog(false)
  }
}
