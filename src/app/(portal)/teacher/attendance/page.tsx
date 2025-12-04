import ComingSoon from "@/components/coming-soon"
import React from "react"

const page = () => {
  return (
    <div>
      <ComingSoon />
    </div>
  )
}

export default page

// "use client"

// import React, { useState, useEffect } from "react"
// import { format } from "date-fns"
// import { Button } from "@/components/ui/button"
// import { SuccessModal } from "@/components/dashboard/success-modal"
// import { Loader2, Lock } from "lucide-react"
// import StudentRow from "./_components/student-row"
// import { useAuthStore } from "@/store/auth-store"
// import { useGetStudents } from "@/lib/students/hooks"
// import {
//   AttendanceAPI,
//   SubmitAttendancePayload,
//   AttendanceRecord,
// } from "@/lib/attendance"
// import { useMutation, UseMutationResult } from "@tanstack/react-query"

// /* ------------------------------------------------------
//    TYPES
// ------------------------------------------------------ */

// interface Student {
//   id: string
//   name: string
//   present?: boolean
// }

// interface AttendancePageProps {
//   classId: string
// }

// interface AttendanceState {
//   [studentId: string]: boolean
// }

// /* ------------------------------------------------------
//    COMPONENT
// ------------------------------------------------------ */

// const AttendancePage: React.FC<AttendancePageProps> = ({ classId }) => {
//   const [selectedDate, setSelectedDate] = useState<string>(
//     format(new Date(), "yyyy-MM-dd")
//   )
//   const [modalOpen, setModalOpen] = useState<boolean>(false)
//   const [attendanceState, setAttendanceState] = useState<AttendanceState>({})

//   const { user } = useAuthStore()

//   // Fetch students
//   const { data: students, isLoading: studentsLoading } = useGetStudents({ page: 1 })

//   // Initialize attendance state
//   useEffect(() => {
//     if (!students) return
//     const initialState: AttendanceState = {}
//     students.forEach((s) => {
//       initialState[s.id] = false
//     })
//     setAttendanceState(initialState)
//   }, [students])

//   // Submit attendance mutation
//   const mutation: UseMutationResult<
//     {
//       message: string
//       status_code: number
//       data: { marked: number; updated: number; total: number }
//     },
//     Error,
//     SubmitAttendancePayload
//   > = useMutation({
//     mutationFn: (payload: SubmitAttendancePayload) =>
//       AttendanceAPI.markDailyAttendance(payload),
//     onSuccess: () => {
//       setModalOpen(true)
//     },
//     onError: (err: Error) => {
//       console.error(err)
//       alert(err.message || "Failed to submit attendance")
//     },
//   })

//   const isToday = selectedDate === format(new Date(), "yyyy-MM-dd")
//   const isLocked = !isToday || mutation.isSuccess

//   if (studentsLoading || !students) {
//     return (
//       <div className="flex h-64 items-center justify-center">
//         <Loader2 className="h-6 w-6 animate-spin text-red-600" />
//       </div>
//     )
//   }

//   /* ------------------------------------------------------
//      HANDLERS
//   ------------------------------------------------------ */

//   const toggleStudent = (id: string) => {
//     if (isLocked) return
//     setAttendanceState((prev) => ({ ...prev, [id]: !prev[id] }))
//   }

//   const markAllPresent = () => {
//     if (isLocked) return
//     const updated: AttendanceState = {}
//     students.forEach((s) => (updated[s.id] = true))
//     setAttendanceState(updated)
//   }

//   const handleSubmit = () => {
//     if (!classId) return alert("Class ID is required")

//     const attendanceRecords: AttendanceRecord[] = students.map((s) => ({
//       student_id: s.id,
//       status: attendanceState[s.id] ? "PRESENT" : "ABSENT",
//     }))

//     const payload: SubmitAttendancePayload = {
//       class_id: classId,
//       date: selectedDate,
//       attendance_records: attendanceRecords,
//     }

//     mutation.mutate(payload)
//   }

//   return (
//     <div className="space-y-6 p-6">
//       {/* HEADER + DATE PICKER */}
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <h1 className="text-2xl font-semibold">Attendance</h1>

//         <div className="flex justify-between gap-5">
//           <div className="flex items-center gap-2">
//             Date
//             <input
//               type="date"
//               value={selectedDate}
//               max={format(new Date(), "yyyy-MM-dd")}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="rounded-md border px-2 py-1 text-sm"
//             />
//           </div>

//           {isLocked && (
//             <div className="flex items-center gap-2 text-sm text-red-600">
//               <Lock size={16} />
//               Locked
//             </div>
//           )}
//         </div>
//       </div>

//       {/* STUDENT LIST */}
//       <div className="space-y-4">
//         {students.map((student) => (
//           <StudentRow
//             key={student.id}
//             student={{ ...student, present: attendanceState[student.id] }}
//             isLocked={isLocked}
//             toggleStudent={toggleStudent}
//           />
//         ))}
//       </div>

//       {/* ACTION BUTTONS */}
//       {!isLocked && (
//         <div className="grid grid-cols-2 gap-2 space-y-3 lg:gap-10">
//           <Button
//             variant="outline"
//             size="lg"
//             className="w-full py-5"
//             onClick={markAllPresent}
//           >
//             Mark All Present
//           </Button>

//           <Button
//             size="lg"
//             className="w-full bg-red-600 py-5 text-white hover:bg-red-700"
//             onClick={handleSubmit}
//             disabled={mutation.isPending}
//           >
//             {mutation.isPending ? (
//               <Loader2 className="h-5 w-5 animate-spin" />
//             ) : (
//               "Submit Attendance"
//             )}
//           </Button>
//         </div>
//       )}

//       {/* SUCCESS MODAL */}
//       <SuccessModal
//         open={modalOpen}
//         onOpenChange={setModalOpen}
//         title="Attendance Submitted"
//         message="Your attendance for today has been recorded successfully."
//         onAction={() => setModalOpen(false)}
//       />
//     </div>
//   )
// }

// export default AttendancePage

// // "use client"

// // import { useState } from "react"
// // import { format } from "date-fns"
// // import { Button } from "@/components/ui/button"
// // import { SuccessModal } from "@/components/dashboard/success-modal"
// // import { Loader2, Lock } from "lucide-react"
// // import StudentRow from "./_components/student-row"
// // import { useAuthStore } from "@/lib/store/auth"
// // import { useGetStudents } from "@/lib/students/hooks"
// // import {
// //   AttendanceAPI,
// //   SubmitAttendancePayload,
// //   AttendanceRecord,
// // } from "@/lib/attendance"
// // import { useMutation } from "@tanstack/react-query"

// // /* ------------------------------------------------------
// //    COMPONENT
// // ------------------------------------------------------ */

// // const AttendancePage = ({ classId }: { classId: string }) => {
// //   const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"))
// //   const [modalOpen, setModalOpen] = useState(false)
// //   const [attendanceState, setAttendanceState] = useState<Record<string, boolean>>({})

// //   const { user } = useAuthStore()

// //   // Fetch students for this class
// //   const { data: students, isLoading: studentsLoading } = useGetStudents({ page: 1 })

// //   // Initialize attendance state when students load
// //   React.useEffect(() => {
// //     if (!students) return
// //     const initial: Record<string, boolean> = {}
// //     students.forEach((s) => {
// //       initial[s.id] = false
// //     })
// //     setAttendanceState(initial)
// //   }, [students])

// //   // Submit attendance mutation
// //   const mutation = useMutation({
// //     mutationFn: (payload: SubmitAttendancePayload) =>
// //       AttendanceAPI.markDailyAttendance(payload),
// //     onSuccess: () => {
// //       setModalOpen(true)
// //     },
// //     onError: (err: any) => {
// //       console.error(err)
// //       alert(err?.message || "Failed to submit attendance")
// //     },
// //   })

// //   const isToday = selectedDate === format(new Date(), "yyyy-MM-dd")
// //   const isLocked = !isToday || mutation.isSuccess

// //   if (studentsLoading || !students) {
// //     return (
// //       <div className="flex h-64 items-center justify-center">
// //         <Loader2 className="h-6 w-6 animate-spin text-red-600" />
// //       </div>
// //     )
// //   }

// //   const toggleStudent = (id: string) => {
// //     if (isLocked) return
// //     setAttendanceState((prev) => ({ ...prev, [id]: !prev[id] }))
// //   }

// //   const markAllPresent = () => {
// //     if (isLocked) return
// //     const updated: Record<string, boolean> = {}
// //     students.forEach((s) => (updated[s.id] = true))
// //     setAttendanceState(updated)
// //   }

// //   const handleSubmit = async () => {
// //     if (!classId) return alert("Class ID is required")

// //     const attendanceRecords: AttendanceRecord[] = students.map((s) => ({
// //       student_id: s.id,
// //       status: attendanceState[s.id] ? "PRESENT" : "ABSENT",
// //     }))

// //     mutation.mutate({
// //       class_id: classId,
// //       date: selectedDate,
// //       attendance_records: attendanceRecords,
// //     })
// //   }

// //   return (
// //     <div className="space-y-6 p-6">
// //       {/* HEADER + DATE PICKER */}
// //       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
// //         <h1 className="text-2xl font-semibold">Attendance</h1>

// //         <div className="flex justify-between gap-5">
// //           <div className="flex items-center gap-2">
// //             Date
// //             <input
// //               type="date"
// //               value={selectedDate}
// //               max={format(new Date(), "yyyy-MM-dd")}
// //               onChange={(e) => setSelectedDate(e.target.value)}
// //               className="rounded-md border px-2 py-1 text-sm"
// //             />
// //           </div>

// //           {isLocked && (
// //             <div className="flex items-center gap-2 text-sm text-red-600">
// //               <Lock size={16} />
// //               Locked
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* STUDENT LIST */}
// //       <div className="space-y-4">
// //         {students.map((student) => (
// //           <StudentRow
// //             key={student.id}
// //             student={{ ...student, present: attendanceState[student.id] }}
// //             isLocked={isLocked}
// //             toggleStudent={toggleStudent}
// //           />
// //         ))}
// //       </div>

// //       {/* ACTION BUTTONS */}
// //       {!isLocked && (
// //         <div className="grid grid-cols-2 gap-2 space-y-3 lg:gap-10">
// //           <Button
// //             variant="outline"
// //             size="lg"
// //             className="w-full py-5"
// //             onClick={markAllPresent}
// //           >
// //             Mark All Present
// //           </Button>

// //           <Button
// //             size="lg"
// //             className="w-full bg-red-600 py-5 text-white hover:bg-red-700"
// //             onClick={handleSubmit}
// //             disabled={mutation.isPending}
// //           >
// //             {mutation.isPending ? (
// //               <Loader2 className="h-5 w-5 animate-spin" />
// //             ) : (
// //               "Submit Attendance"
// //             )}
// //           </Button>
// //         </div>
// //       )}

// //       {/* SUCCESS MODAL */}
// //       <SuccessModal
// //         open={modalOpen}
// //         onOpenChange={setModalOpen}
// //         title="Attendance Submitted"
// //         message="Your attendance for today has been recorded successfully."
// //         onAction={() => setModalOpen(false)}
// //       />
// //     </div>
// //   )
// // }

// // export default AttendancePage

// // // "use client"

// // // import { useEffect, useState } from "react"
// // // import { Button } from "@/components/ui/button"
// // // import { SuccessModal } from "@/components/dashboard/success-modal"
// // // import { Loader2, Lock } from "lucide-react"
// // // import StudentRow from "./_components/student-row"
// // // import { format } from "date-fns"

// // // /* ------------------------------------------------------
// // //    TYPES
// // // ------------------------------------------------------ */

// // // type Student = {
// // //   id: string
// // //   name: string
// // //   present: boolean
// // // }

// // // type AttendanceResponse = {
// // //   date: string
// // //   submitted: boolean
// // //   submittedAt?: string
// // //   students: Student[]
// // // }

// // // type SubmitResponse = {
// // //   success: boolean
// // // }

// // // /* ------------------------------------------------------
// // //    SIMULATED API CALLS
// // // ------------------------------------------------------ */

// // // async function fetchAttendanceByDate(date: string): Promise<AttendanceResponse> {
// // //   return new Promise((resolve) => {
// // //     setTimeout(() => {
// // //       const isToday = format(new Date(), "yyyy-MM-dd") === date
// // //       resolve({
// // //         date,
// // //         submitted: !isToday && Math.random() > 0.5, // past dates may be locked
// // //         submittedAt: !isToday ? "08:32 AM" : undefined,
// // //         students: [
// // //           { id: "1", name: "John Alex", present: Math.random() > 0.5 },
// // //           { id: "2", name: "Mary Jonah", present: Math.random() > 0.5 },
// // //           { id: "3", name: "Samuel Victor", present: Math.random() > 0.5 },
// // //           { id: "4", name: "Ade Victor", present: Math.random() > 0.5 },
// // //           { id: "5", name: "Badejo Boku", present: Math.random() > 0.5 },
// // //           { id: "6", name: "Seyi Funmi", present: Math.random() > 0.5 },
// // //           { id: "7", name: "Bakare Victor", present: Math.random() > 0.5 },
// // //           { id: "8", name: "Victor Blessing", present: Math.random() > 0.5 },
// // //           { id: "9", name: "Samuel Victor", present: Math.random() > 0.5 },
// // //         ],
// // //       })
// // //     }, 700)
// // //   })
// // // }

// // // async function submitAttendance(students: Student[]): Promise<SubmitResponse> {
// // //   return new Promise((resolve) => {
// // //     setTimeout(() => resolve({ success: true }), 1000)
// // //   })
// // // }

// // // /* ------------------------------------------------------
// // //    COMPONENT
// // // ------------------------------------------------------ */

// // // const AttendancePage = () => {
// // //   const [loading, setLoading] = useState<boolean>(true)
// // //   const [attendance, setAttendance] = useState<AttendanceResponse | null>(null)
// // //   const [selectedDate, setSelectedDate] = useState<string>(
// // //     format(new Date(), "yyyy-MM-dd")
// // //   )
// // //   const [modalOpen, setModalOpen] = useState<boolean>(false)
// // //   const [submitting, setSubmitting] = useState<boolean>(false)

// // //   /* Load Attendance whenever date changes */

// // //   useEffect(() => {
// // //     const load = async () => {
// // //       setLoading(true) // moved inside async
// // //       const data = await fetchAttendanceByDate(selectedDate)
// // //       setAttendance(data)
// // //       setLoading(false)
// // //     }
// // //     load()
// // //   }, [selectedDate])

// // //   /* Toggle student checkbox */
// // //   const toggleStudent = (id: string) => {
// // //     if (!attendance) return

// // //     setAttendance((prev) =>
// // //       prev
// // //         ? {
// // //             ...prev,
// // //             students: prev.students.map((student) =>
// // //               student.id === id ? { ...student, present: !student.present } : student
// // //             ),
// // //           }
// // //         : prev
// // //     )
// // //   }

// // //   /* Mark all present */
// // //   const markAllPresent = () => {
// // //     if (!attendance) return

// // //     setAttendance((prev) =>
// // //       prev
// // //         ? {
// // //             ...prev,
// // //             students: prev.students.map((student) => ({ ...student, present: true })),
// // //           }
// // //         : prev
// // //     )
// // //   }

// // //   /* Submit attendance */
// // //   const handleSubmit = async () => {
// // //     if (!attendance) return
// // //     if (!classId) return alert("Class ID is required")

// // //     setSubmitting(true)

// // //     try {
// // //       const payload: SubmitAttendancePayload = {
// // //         class_id: classId, // provide current class ID
// // //         date: selectedDate,
// // //         attendance_records: attendance.students.map((s) => ({
// // //           student_id: s.id,
// // //           status: s.present ? "PRESENT" : "ABSENT",
// // //         })),
// // //       }

// // //       const response = await AttendanceAPI.markDailyAttendance(payload)

// // //       if (response.status_code === 200) {
// // //         setModalOpen(true)
// // //         setAttendance((prev) =>
// // //           prev
// // //             ? {
// // //                 ...prev,
// // //                 submitted: true,
// // //                 submittedAt: new Date().toLocaleTimeString([], {
// // //                   hour: "2-digit",
// // //                   minute: "2-digit",
// // //                 }),
// // //               }
// // //             : prev
// // //         )
// // //       }
// // //     } catch (err: any) {
// // //       console.error(err)
// // //       alert(err?.message || "Failed to submit attendance")
// // //     } finally {
// // //       setSubmitting(false)
// // //     }
// // //   }

// // //   if (loading || !attendance) {
// // //     return (
// // //       <div className="flex h-64 items-center justify-center">
// // //         <Loader2 className="h-6 w-6 animate-spin text-red-600" />
// // //       </div>
// // //     )
// // //   }

// // //   const isToday = selectedDate === format(new Date(), "yyyy-MM-dd")
// // //   const isLocked = attendance.submitted || !isToday

// // //   return (
// // //     <div className="space-y-6 p-6">
// // //       {/* HEADER + DATE PICKER */}
// // //       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
// // //         <h1 className="text-2xl font-semibold">Attendance</h1>

// // //         <div className="flex justify-between gap-5">
// // //           <div className="flex items-center gap-2">
// // //             Date
// // //             {/* <Calendar size={18} /> */}
// // //             <input
// // //               type="date"
// // //               value={selectedDate}
// // //               max={format(new Date(), "yyyy-MM-dd")}
// // //               onChange={(e) => setSelectedDate(e.target.value)}
// // //               className="rounded-md border px-2 py-1 text-sm"
// // //             />
// // //           </div>

// // //           {isLocked && (
// // //             <div className="flex items-center gap-2 text-sm text-red-600">
// // //               <Lock size={16} />
// // //               Locked
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //       {/* STATUS MESSAGE */}
// // //       {isLocked ? (
// // //         <p className="text-xs text-gray-500">
// // //           Attendance submitted at {attendance.submittedAt || "N/A"}
// // //         </p>
// // //       ) : (
// // //         <p className="text-xs text-gray-500">Mark students present/absent</p>
// // //       )}

// // //       {/* STUDENT LIST */}
// // //       <div className="space-y-4">
// // //         {attendance.students.map((student) => (
// // //           <StudentRow
// // //             key={student.id}
// // //             student={student}
// // //             isLocked={isLocked}
// // //             toggleStudent={toggleStudent}
// // //           />
// // //         ))}
// // //       </div>

// // //       {/* ACTION BUTTONS */}
// // //       {isToday && !isLocked ? (
// // //         <div className="grid grid-cols-2 gap-2 space-y-3 lg:gap-10">
// // //           <Button
// // //             variant="outline"
// // //             size="lg"
// // //             className="w-full py-5"
// // //             onClick={markAllPresent}
// // //           >
// // //             Mark All Present
// // //           </Button>

// // //           <Button
// // //             size="lg"
// // //             className="w-full bg-red-600 py-5 text-white hover:bg-red-700"
// // //             onClick={handleSubmit}
// // //             disabled={submitting}
// // //           >
// // //             {submitting ? (
// // //               <Loader2 className="h-5 w-5 animate-spin" />
// // //             ) : (
// // //               "Submit Attendance"
// // //             )}
// // //           </Button>
// // //         </div>
// // //       ) : (
// // //         <div className="flex justify-end">
// // //           <Button
// // //             variant="outline"
// // //             className="mt-4"
// // //             onClick={() => alert("TODO: correction request")}
// // //           >
// // //             Request Correction
// // //           </Button>
// // //         </div>
// // //       )}

// // //       {/* SUCCESS MODAL */}
// // //       <SuccessModal
// // //         open={modalOpen}
// // //         onOpenChange={setModalOpen}
// // //         title="Attendance Submitted"
// // //         message="Your attendance for today has been recorded successfully."
// // //         onAction={() => setModalOpen(false)}
// // //       />
// // //     </div>
// // //   )
// // // }

// // // export default AttendancePage

// // // // "use client"

// // // // // import { useEffect, useState, useRef } from "react"
// // // // import { Button } from "@/components/ui/button"
// // // // // import { Checkbox } from "@/components/ui/checkbox"
// // // // import { SuccessModal } from "@/components/dashboard/success-modal"
// // // // import { Loader2, Lock } from "lucide-react"
// // // // // import { animate } from "motion"
// // // // import StudentRow from "./_components/student-row"

// // // // /* ------------------------------------------------------
// // // //    TYPES
// // // // ------------------------------------------------------ */

// // // // type Student = {
// // // //   id: string
// // // //   name: string
// // // //   present: boolean
// // // // }

// // // // type AttendanceResponse = {
// // // //   submitted: boolean
// // // //   submittedAt?: string
// // // //   students: Student[]
// // // // }

// // // // type SubmitResponse = {
// // // //   success: boolean
// // // // }

// // // // /* ------------------------------------------------------
// // // //    SIMULATED API CALLS
// // // // ------------------------------------------------------ */

// // // // async function fetchTodayAttendance(): Promise<AttendanceResponse> {
// // // //   return new Promise((resolve) => {
// // // //     setTimeout(() => {
// // // //       resolve({
// // // //         submitted: false, // change to true to test locked mode
// // // //         submittedAt: "08:32 AM",
// // // //         students: [
// // // //           { id: "1", name: "John Alex", present: true },
// // // //           { id: "2", name: "Mary Jonah", present: false },
// // // //           { id: "3", name: "Samuel Victor", present: true },
// // // //         ],
// // // //       })
// // // //     }, 700)
// // // //   })
// // // // }

// // // // async function submitAttendance(students: Student[]): Promise<SubmitResponse> {
// // // //   return new Promise((resolve) => {
// // // //     setTimeout(() => resolve({ success: true }), 1000)
// // // //   })
// // // // }

// // // // /* ------------------------------------------------------
// // // //    COMPONENT
// // // // ------------------------------------------------------ */

// // // // const TodayAttendancePage = () => {
// // // //   // const [loading, setLoading] = useState<boolean>(true)
// // // //   // const [attendance, setAttendance] = useState<AttendanceResponse | null>(null)
// // // //   // const [modalOpen, setModalOpen] = useState<boolean>(false)
// // // //   // const [submitting, setSubmitting] = useState<boolean>(false)

// // // //   /* Load Attendance */
// // // //   // useEffect(() => {
// // // //   //   const load = async () => {
// // // //   //     const data = await fetchTodayAttendance()
// // // //   //     setAttendance(data)
// // // //   //     setLoading(false)
// // // //   //   }
// // // //   //   load()
// // // //   // }, [])

// // // //   /* Toggle student checkbox */
// // // //   // const toggleStudent = (id: string) => {
// // // //   //   if (!attendance) return

// // // //   //   setAttendance((prev) =>
// // // //   //     prev
// // // //   //       ? {
// // // //   //           ...prev,
// // // //   //           students: prev.students.map((student) =>
// // // //   //             student.id === id ? { ...student, present: !student.present } : student
// // // //   //           ),
// // // //   //         }
// // // //   //       : prev
// // // //   //   )
// // // //   // }

// // // //   /* Mark all present */
// // // //   // const markAllPresent = () => {
// // // //   //   if (!attendance) return

// // // //   //   setAttendance((prev) =>
// // // //   //     prev
// // // //   //       ? {
// // // //   //           ...prev,
// // // //   //           students: prev.students.map((student) => ({
// // // //   //             ...student,
// // // //   //             present: true,
// // // //   //           })),
// // // //   //         }
// // // //   //       : prev
// // // //   //   )
// // // //   // }

// // // //   /* Submit attendance */
// // // //   const handleSubmit = async () => {
// // // //     if (!attendance) return

// // // //     setSubmitting(true)

// // // //     await submitAttendance(attendance.students)

// // // //     setSubmitting(false)
// // // //     setModalOpen(true)

// // // //     // Lock after submit
// // // //     setAttendance((prev) =>
// // // //       prev
// // // //         ? {
// // // //             ...prev,
// // // //             submitted: true,
// // // //             submittedAt: new Date().toLocaleTimeString([], {
// // // //               hour: "2-digit",
// // // //               minute: "2-digit",
// // // //             }),
// // // //           }
// // // //         : prev
// // // //     )
// // // //   }

// // // //   /* Loading UI */
// // // //   if (loading || !attendance) {
// // // //     return (
// // // //       <div className="flex h-64 items-center justify-center">
// // // //         <Loader2 className="h-6 w-6 animate-spin text-red-600" />
// // // //       </div>
// // // //     )
// // // //   }

// // // //   const isLocked = attendance.submitted

// // // //   /* MAIN UI */
// // // //   return (
// // // //     <div className="space-y-6 p-6">
// // // //       {/* HEADER */}
// // // //       <div className="flex items-center justify-between">
// // // //         <h1 className="text-2xl font-semibold">Today&apos;s Attendance</h1>

// // // //         {isLocked && (
// // // //           <div className="flex items-center gap-2 text-sm text-red-600">
// // // //             <Lock size={16} />
// // // //             Locked
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {/* STATUS MESSAGE */}
// // // //       {isLocked ? (
// // // //         <p className="text-xs text-gray-500">
// // // //           Attendance submitted at {attendance.submittedAt}
// // // //         </p>
// // // //       ) : (
// // // //         <p className="text-xs text-gray-500">Mark students present/absent</p>
// // // //       )}

// // // //       {/* STUDENT LIST */}
// // // //       <div className="space-y-4">
// // // //         {attendance.students.map((student) => (
// // // //           <StudentRow
// // // //             key={student.id}
// // // //             student={student}
// // // //             isLocked={isLocked}
// // // //             toggleStudent={toggleStudent}
// // // //           />
// // // //         ))}
// // // //       </div>

// // // //       {/* ACTION BUTTONS */}
// // // //       {!isLocked ? (
// // // //         <div className="space-y-3">
// // // //           <Button variant="outline" className="w-full py-5" onClick={markAllPresent}>
// // // //             Mark All Present
// // // //           </Button>

// // // //           <Button
// // // //             className="w-full bg-red-600 py-5 text-white hover:bg-red-700"
// // // //             onClick={handleSubmit}
// // // //             disabled={submitting}
// // // //           >
// // // //             {submitting ? (
// // // //               <Loader2 className="h-5 w-5 animate-spin" />
// // // //             ) : (
// // // //               "Submit Attendance"
// // // //             )}
// // // //           </Button>
// // // //         </div>
// // // //       ) : (
// // // //         <div className="flex justify-end">
// // // //           <Button
// // // //             variant="outline"
// // // //             className="mt-4"
// // // //             onClick={() => alert("TODO: correction request")}
// // // //           >
// // // //             Request Correction
// // // //           </Button>
// // // //         </div>
// // // //       )}

// // // //       {/* SUCCESS MODAL */}
// // // //       <SuccessModal
// // // //         open={modalOpen}
// // // //         onOpenChange={setModalOpen}
// // // //         title="Attendance Submitted"
// // // //         message="Your attendance for today has been recorded successfully."
// // // //         onAction={() => setModalOpen(false)}
// // // //       />
// // // //     </div>
// // // //   )
// // // // }

// // // // export default TodayAttendancePage

// // // // // import React from "react"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import Link from "next/link"
// // // // // import PreviousAttendance from "./_components/previous-attendance"
// // // // // import DashboardTitle from "@/components/dashboard/dashboard-title"
// // // // // import { Plus } from "lucide-react"

// // // // // const Attendance = () => {
// // // // //   return (
// // // // //     <section className="min-h-[85vh] bg-[#fafafa] px-5 pt-7 pb-5">
// // // // //       {/* the heading first */}
// // // // //       <div className="flex flex-col justify-between gap-10 md:flex-row">
// // // // //         <DashboardTitle
// // // // //           heading="Attendance for JSS3 A"
// // // // //           description="View and manage attendance for your class here"
// // // // //         />

// // // // //         <Button size="lg" asChild>
// // // // //           <Link href="/teacher/attendance/take-attendance">
// // // // //             <Plus /> Take Attendance
// // // // //           </Link>
// // // // //         </Button>
// // // // //       </div>

// // // // //       {/* <div className="mt-5 w-72 space-y-4 rounded-xl border p-5">
// // // // //         <h3 className="text-2xl font-bold lg:text-3xl">JSS 3A</h3>

// // // // //         <div>
// // // // //           <p className="text-text-secondary">October 26, 2025</p>
// // // // //           <p className="text-text-secondary">28 Students</p>
// // // // //         </div> */}

// // // // //       {/* attendance button */}
// // // // //       {/* <Button className="w-full" asChild>
// // // // //           <Link href="/teacher/attendance/take-attendance">Attendance</Link>
// // // // //         </Button> */}
// // // // //       {/* </div> */}

// // // // //       {/* show previous attendance */}
// // // // //       <PreviousAttendance />
// // // // //     </section>
// // // // //   )
// // // // // }

// // // // // export default Attendance
