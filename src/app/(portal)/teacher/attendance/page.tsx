"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { SuccessModal } from "@/components/dashboard/success-modal"
import { Loader2 } from "lucide-react"
import StudentRow from "./_components/student-row"
import { format } from "date-fns"

/* TYPES */
interface Student {
  id: string
  name: string
  present: boolean
}

interface Attendance {
  date: string
  students: Student[]
}

/* COMPONENT */
const AttendancePage = () => {
  const today = format(new Date(), "yyyy-MM-dd")

  const [selectedDate, setSelectedDate] = useState<string>(today)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Initialize attendance state directly
  const [attendance, setAttendance] = useState<Attendance>(() => {
    const dummyStudents: Student[] = [
      { id: "1", name: "John Alex", present: false },
      { id: "2", name: "Mary Jonah", present: false },
      { id: "3", name: "Samuel Victor", present: false },
      { id: "4", name: "Ade Victor", present: false },
      { id: "5", name: "Badejo Boku", present: false },
      { id: "6", name: "Seyi Funmi", present: false },
      { id: "7", name: "Bakare Victor", present: false },
      { id: "8", name: "Victor Blessing", present: false },
      { id: "9", name: "Samuel Victor", present: false },
    ]

    // Load from localStorage if available
    const studentsWithSaved = dummyStudents.map((student) => ({
      ...student,
      // present: localStorage.getItem(`attendance_${today}_${student.id}`) === "true",
    }))

    return { date: today, students: studentsWithSaved }
  })

  // const isToday = selectedDate === today
  const isLocked = false

  const toggleStudent = (id: string) => {
    setAttendance((prev) => ({
      ...prev,
      students: prev.students.map((s) =>
        s.id === id ? { ...s, present: !s.present } : s
      ),
    }))
  }

  const markAllPresent = () => {
    setAttendance((prev) => ({
      ...prev,
      students: prev.students.map((s) => ({ ...s, present: true })),
    }))
  }

  const handleSubmit = () => {
    setSubmitting(true)

    attendance.students.forEach((s) => {
      localStorage.setItem(
        `attendance_${selectedDate}_${s.id}`,
        s.present ? "true" : "false"
      )
    })

    setTimeout(() => {
      setSubmitting(false)
      setModalOpen(true)
    }, 700)
  }

  const anyChecked = attendance.students.some((s) => s.present)

  return (
    <div className="space-y-6 p-6">
      {/* HEADER + DATE PICKER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold">Attendance</h1>

        <div className="flex items-center gap-2">
          Date
          <input
            type="date"
            value={selectedDate}
            max={today}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-md border px-2 py-1 text-sm"
          />
        </div>
      </div>

      {/* STUDENT LIST */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {attendance.students.map((student) => (
          <StudentRow
            key={student.id}
            student={student}
            isLocked={isLocked}
            toggleStudent={toggleStudent}
          />
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid max-w-lg grid-cols-2 gap-2 space-y-3 lg:gap-10">
        <Button
          variant="outline"
          size="lg"
          className="w-full py-5"
          onClick={markAllPresent}
        >
          Mark All Present
        </Button>

        <Button
          size="lg"
          className="w-full bg-red-600 py-5 text-white hover:bg-red-700"
          onClick={handleSubmit}
          disabled={submitting || !anyChecked}
        >
          {submitting ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            "Submit Attendance"
          )}
        </Button>
      </div>

      {/* SUCCESS MODAL */}
      <SuccessModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Attendance Submitted"
        message="Your attendance for today has been recorded successfully."
        onAction={() => setModalOpen(false)}
      />
    </div>
  )
}

export default AttendancePage
