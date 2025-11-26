"use client"

import { columns, User } from "./columns"
import { DataTable } from "./data-table"

const mockData: User[] = [
  {
    id: "1",
    name: "John Doe",
    regNumber: "ABC-1234-1233",
    role: "Admin",
    status: "Accepted",
    date: "8/24/2023 1:06:39 PM",
  },
  {
    id: "2",
    name: "Jane Smith",
    regNumber: "ABC-5678-5677",
    role: "Teacher",
    status: "Pending",
    date: "8/25/2023 2:15:00 PM",
  },
  {
    id: "3",
    name: "Robert Johnson",
    regNumber: "ABC-9012-9011",
    role: "Teacher",
    status: "Accepted",
    date: "8/26/2023 9:30:00 AM",
  },
  // Add more mock data as needed for pagination testing
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: `${i + 4}`,
    name: `User ${i + 4}`,
    regNumber: `ABC-${1000 + i}-${2000 + i}`,
    role: (i % 2 === 0 ? "Admin" : "Teacher") as "Admin" | "Teacher",
    status: (i % 3 === 0 ? "Pending" : "Accepted") as "Pending" | "Accepted",
    date: "8/24/2023 1:06:39 PM",
  })),
]

export function InvitedUsersTable() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-[#2d2d2d] capitalize">View Invitations</h2>
        <p className="text-[#666666]">View list of all invited users to the portal</p>
      </div>
      <DataTable columns={columns} data={mockData} />
    </section>
  )
}
