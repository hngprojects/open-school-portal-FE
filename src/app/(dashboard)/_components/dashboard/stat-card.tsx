import React from "react"
import { Users, GraduationCap, File, Book, MoveUp } from "lucide-react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const StatData = [
  {
    name: "Total Students",
    quantity: 3.6,
    percentage: 10,
    icon: GraduationCap,
  },
  {
    name: "Total Teachers",
    quantity: 150,
    percentage: 10,
    icon: Users,
  },
  {
    name: "Total Parents",
    quantity: 300,
    percentage: 10,
    icon: File,
  },
  {
    name: "Total Classes",
    quantity: 50,
    percentage: 10,
    icon: Book,
  },
]

const StatCard = () => {
  return (
    <div className="mt-[33px] grid h-[151px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {StatData.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex items-center gap-1">
            <stat.icon className="text-accent text-2xl" />
            <CardTitle className="text-text-secondary text-xl">{stat.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-primary text-[28px] leading-9 font-semibold">
              {stat.quantity}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <p className="flex size-1 w-full items-center gap-1 text-sm text-[#686868]">
              <MoveUp className="text-secondary size-3" />
              <span className="text-secondary mr-1">{stat.percentage}%</span>
              Since this term
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default StatCard
