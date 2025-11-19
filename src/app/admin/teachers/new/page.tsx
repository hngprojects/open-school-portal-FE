import { ArrowLeftIcon } from "lucide-react"
import NewTeacherForm from "./components/new-teacher-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AddNewTeacher() {
  return (
    <div className="mb-10 w-full space-y-8 bg-white p-4 py-6 md:p-10 md:py-14">
      <div>
        <div className="mb-4 md:mb-0 md:hidden">
          <Button asChild variant="ghost" size="icon">
            <Link href="/admin/teachers">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <h1 className="mb-2 text-xl font-bold text-gray-900">Add New Teacher</h1>
        <p className="text-gray-600">Enter details of the new teacher.</p>
      </div>
      <div className="md:px-8">
        <NewTeacherForm />
      </div>
    </div>
  )
}
