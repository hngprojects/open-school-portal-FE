"use client"

import { columns, User } from "./columns"
import { DataTable } from "./data-table"

const mockData: User[] = [
  {
    id: "2",
    name: "Jane Smith",
    regNumber: "ABC-5678-5677",
    role: "Teacher",
    status: "Pending",
    date: "8/25/2023 2:15:00 PM",
  },
  // Add more mock data as needed for pagination testing
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: `${i + 4}`,
    name: `Pending User ${i + 4}`,
    regNumber: `ABC-${1000 + i}-${2000 + i}`,
    role: "Teacher" as const,
    status: "Pending" as const,
    date: "8/24/2023 1:06:39 PM",
  })),
]

export function PendingUsersTable() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-[#2d2d2d] capitalize">
          Pending Invitation
        </h2>
        <p className="text-[#666666]">
          View list of all invites that have not been accepted
        </p>
      </div>
      <DataTable columns={columns} data={mockData} />
    </section>
  )
}
