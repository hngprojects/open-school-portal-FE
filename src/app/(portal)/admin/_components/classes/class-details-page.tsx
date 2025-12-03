"use client"

import { ArrowLeftIcon } from "lucide-react"
import { useParams } from "next/navigation"
import { SubjectsLoadingSkeleton } from "./subjects-loading-skeleton"
import { ItemsError } from "../loading-error"
import EmptyState from "../empty-state"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  useGetClass,
  useGetSubjectsForClass,
} from "../../class-management/_hooks/use-classes"
import { ClassSubject } from "@/lib/classes"
import { useGetTeacher } from "../../teachers/_hooks/use-teachers"
import AssignSubjectsDialog from "./assign-subject-to-class-dialog"
import { useState } from "react"

export default function ViewClassSubjects() {
  const { classID } = useParams<{ classID: string }>()
  const [showDialog, setShowDialog] = useState(false)

  const {
    data: classData,
    isLoading: isLoadingClass,
    isError: isErrorClass,
    error: errorClass,
    refetch: refetchClass,
  } = useGetClass(classID)

  const {
    data: subjectsInfo,
    isLoading: isLoadingSubjects,
    isError: isErrorSubjects,
    error: errorSubjects,
    refetch: refetchSubjects,
  } = useGetSubjectsForClass(classID)
  const subjects = subjectsInfo && subjectsInfo.payload

  const isLoading = isLoadingClass || isLoadingSubjects
  const isError = isErrorClass || isErrorSubjects
  const error = errorClass || errorSubjects

  return (
    <div>
      <Button asChild className="bg-gray-100" variant="ghost" size="icon">
        <Link
          href="/admin/class-management/class"
          aria-label="Go back to classes"
          className="flex"
        >
          <ArrowLeftIcon className="size-5" />
        </Link>
      </Button>

      <section className="mt-5 lg:ml-10">
        <div className="flex flex-col items-start justify-between space-y-3 md:flex-row">
          <DashboardTitle
            heading="Class Subjects"
            description="View the subjects assigned to this class"
          />
          <Button className="h-10 w-full md:w-auto" onClick={() => setShowDialog(true)}>
            Assign Subjects
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <SubjectsLoadingSkeleton />
          </div>
        ) : isError ? (
          <ItemsError
            item="Class subjects"
            reload={() => {
              if (isErrorClass) {
                refetchClass()
              }
              if (isErrorSubjects) {
                refetchSubjects()
              }
            }}
            errorMessage={error?.message || "An unexpected error occurred."}
          />
        ) : !classData ? (
          <ItemsError item="Class" reload={refetchClass} errorMessage="Class not found" />
        ) : (
          <div>
            {/* Session and Class Info */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900">
                {classData.academicSession.name} Academic Session
              </p>
            </div>

            {/* Subjects Label */}
            <h3 className="text-sm font-medium text-gray-700">
              Subjects for {classData.name}
            </h3>

            {!subjects || subjects.length === 0 ? (
              <EmptyState
                title="No Subjects Assigned"
                description="This class has no subjects assigned yet."
                buttonText="Assign Subjects"
                buttonHref={`/admin/class-management/class/${classID}/assign-subjects`}
                buttonOnClick={() => setShowDialog(true)}
              />
            ) : (
              <div className="mt-5 space-y-3">
                {subjects.map((subject) => (
                  <SubjectCard key={subject.id} subject={subject} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <AssignSubjectsDialog
        open={showDialog}
        setOpen={setShowDialog}
        classId={classID}
        className={classData?.name || ""}
      />
    </div>
  )
}

function SubjectCard({ subject }: { subject: ClassSubject }) {
  const { data: teacher } = useGetTeacher(subject.teacher?.id)

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Subject Info */}
      <div className="flex-1">
        <h4 className="text-base font-semibold text-gray-900">{subject.subject.name}</h4>
        <p className="text-sm text-gray-600">
          {teacher ? <> Assigned to: {teacher?.full_name}</> : "No Teacher Assigned"}
        </p>
      </div>

      <div />
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVerticalIcon className="size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <UserPlusIcon className="mr-2 h-4 w-4" />
            {teacher ? "Unassign Teacher" : "Assign Teacher"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  )
}
