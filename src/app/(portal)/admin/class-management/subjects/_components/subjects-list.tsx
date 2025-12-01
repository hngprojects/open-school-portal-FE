"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreVertical, Pencil, BookOpen, Trash2, SearchIcon } from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { useDeleteSubject } from "../_hooks/use-subjects"
import { toast } from "sonner"
import { useState } from "react"

interface Subject {
  id: string
  name: string
  // department: string
}

const SubjectManagement = ({
  subjects,
  onAssignSubject,
  onEditSubject,
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: {
  subjects: Subject[]
  onAssignSubject: (subjectID: string) => void
  onEditSubject: (subjectID: string) => void
  currentPage: number
  totalPages: number
  totalItems: number
  onPageChange?: (page: number) => void
}) => {
  const [searchQuery, setSearchQuery] = useState("")
  const deleteSubject = useDeleteSubject().mutateAsync
  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        {/* search bar */}
        <div className="relative my-4 w-full">
          <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#64748B]" />
          <Input
            placeholder="Search Sessions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-h-10 w-full max-w-[20rem] border pl-8"
          />
        </div>
      </div>

      <article className="py-5">
        {/* Subjects List */}
        <section className="space-y-3">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject, id) => (
              <div
                key={id}
                className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex-1">
                  <h5 className="text-base font-semibold text-gray-900">
                    {subject.name}
                  </h5>
                  {/* <p className="text-text-secondary mt-1 text-sm">{subject.department}</p> */}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="size-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => handleEdit(subject)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleAssign(subject)}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Assign
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleDelete(subject)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))
          ) : (
            <div className="mx-auto mt-7 flex max-w-[400px] flex-col items-center gap-3.5 rounded-xl border border-dashed bg-gray-50 px-4 py-14">
              <div className="text-accent bg-accent/10 flex size-14 items-center justify-center rounded-full">
                <Search className="size-7" />
              </div>
              <h5 className="text-primary text-center text-xl font-semibold">
                No Subjects Found
              </h5>
              <p className="text-text-secondary text-center text-sm">
                Try adjusting your search or create a new subject
              </p>
            </div>
          )}
        </section>

        {/* Pagination */}
        {filteredSubjects.length > 0 && (
          <Pagination
            itemName="Subjects"
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={onPageChange ?? (() => {})}
            className="mt-6"
          />
        )}
      </article>
    </div>
  )

  function handleEdit(subject: Subject) {
    onEditSubject(subject.id)
  }
  function handleAssign(subject: Subject) {
    onAssignSubject(subject.id)
  }
  async function handleDelete(subject: Subject) {
    try {
      await deleteSubject(subject.id)
      toast.success(`Subject "${subject.name}" deleted successfully.`)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        return
      }
      toast.error(`Failed to delete subject "${subject.name}". Please try again.`)
    }
  }
}

export default SubjectManagement
