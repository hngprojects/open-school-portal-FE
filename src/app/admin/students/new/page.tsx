import { Button } from "@/components/ui/button"
import NewStudentForm from "./components/new-student-form"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

export default function AddNewStudent() {
  return (
    <div className="w-full space-y-8 bg-white p-4 py-6 pb-10 md:p-10 md:py-14">
      <div>
        <div className="mb-4 md:mb-0 md:hidden">
          <Button asChild variant="ghost" size="icon">
            <Link href="/admin/students">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <h1 className="mb-2 text-xl font-bold text-gray-900">Add New Student</h1>
        <p className="text-gray-600">Enter details of the new student.</p>
      </div>
      <div className="md:px-8">
        <NewStudentForm />
      </div>
    </div>
  )
}
