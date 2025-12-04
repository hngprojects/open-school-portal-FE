import { apiFetch } from "../api/client"

export interface StudentEvent {
  title: string
  date: string
}

export interface StudentAcademic {
  term: string
  grade: string
}

export interface StudentAttendance {
  present: number
  absent: number
}

export interface StudentFees {
  amount: number
  dueDate: string
  status: "Paid" | "Unpaid"
}

export interface Student {
  id: string
  first_name: string
  last_name: string
  full_name: string
  class: string
  photo_url: string
  academic: StudentAcademic
  attendance: StudentAttendance
  fees: StudentFees
  events: StudentEvent[]
}

export const ParentStudents = {
  getAll: () => {
    return new Promise<Student[]>((res) => {
      setTimeout(() => {
        res(studentsData)
      }, 500)
    })
    // return apiFetch<Student[]>(
    //     "/students",
    //     { method: "GET" },
    //     true
    // )
  },

  getOne: (studentID: string) =>
    apiFetch(`/students/${studentID}`, { method: "GET" }, true),
}

export const studentsData: Student[] = [
  {
    id: "1",
    first_name: "Sarah",
    last_name: "F.",
    full_name: "Sarah F.",
    class: "Jss3C",
    photo_url: "/assets/images/parent.png",
    academic: { term: "2nd", grade: "A" },
    attendance: { present: 85, absent: 3 },
    fees: { amount: 300000, dueDate: "1 March 2025", status: "Unpaid" },
    events: [
      { title: "Mid-Term Break", date: "27-28 December 2025" },
      { title: "Christmas Carol", date: "29 December 2025" },
    ],
  },
  {
    id: "2",
    first_name: "John",
    last_name: "D.",
    full_name: "John D.",
    class: "Jss2A",
    photo_url: "/assets/images/parent.png",
    academic: { term: "2nd", grade: "B+" },
    attendance: { present: 90, absent: 2 },
    fees: { amount: 250000, dueDate: "25 September 2025", status: "Paid" },
    events: [
      { title: "Science Fair", date: "10 November 2025" },
      { title: "Sports Day", date: "5 December 2025" },
    ],
  },
]
