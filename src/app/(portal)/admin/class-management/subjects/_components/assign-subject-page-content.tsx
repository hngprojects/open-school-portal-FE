"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ItemLoader } from "../../../_components/sub-loader"
import { ItemsError } from "../../../_components/loading-error"
import AssignSubjectForm from "./assign-subject-form"
import AssignSubjectSuccess from "./assign-subject-success"
import NotFound from "@/app/not-found"
import { useGetSubject } from "../_hooks/use-subjects"
import { useGetClasses } from "@/app/(portal)/teacher/_hooks/use-results"

export default function AssignSubjectPageContent() {
  const subject_id = useParams().subject_id as string
  const router = useRouter()
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const {
    data: subject,
    isLoading: isLoadingSubject,
    isError: isErrorSubject,
    error: errorSubject,
    refetch: refetchSubject,
  } = useGetSubject(subject_id)

  const {
    data: classes,
    isLoading: isLoadingClasses,
    isError: isErrorClasses,
    error: errorClasses,
    refetch: refetchClasses,
  } = useGetClasses()

  const isLoading = isLoadingSubject || isLoadingClasses
  const isError = isErrorSubject || isErrorClasses
  const error = errorSubject || errorClasses

  if (!subject_id) {
    return <NotFound />
  }

  return (
    <>
      {isLoading ? (
        <ItemLoader item="Classes" />
      ) : isError ? (
        <ItemsError
          item="Classes"
          reload={() => {
            refetchSubject()
            refetchClasses()
          }}
          errorMessage={error?.message || "An unexpected error occurred."}
        />
      ) : !subject ? (
        <ItemsError
          item="Subject"
          reload={refetchSubject}
          errorMessage="Subject not found"
        />
      ) : !classes || classes.length === 0 ? (
        <ItemsError
          item="Classes"
          reload={refetchClasses}
          errorMessage="No classes available"
        />
      ) : (
        <AssignSubjectForm
          subject={subject}
          classes={classes}
          onSuccess={handleSuccess}
        />
      )}

      <AssignSubjectSuccess
        open={showSuccessDialog}
        setOpen={setShowSuccessDialog}
        onGoHome={handleGoHome}
      />
    </>
  )

  function handleSuccess() {
    setShowSuccessDialog(true)
  }

  function handleGoHome() {
    router.push("/admin/class-management/subject")
  }
}
