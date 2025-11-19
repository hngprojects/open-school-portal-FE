"use client"

import { GraduationCap } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { class: "JSS1", new: 42, boys: 25, girls: 34 },
  { class: "JSS2", new: 34, boys: 41, girls: 33 },
  { class: "JSS3", new: 50, boys: 34, girls: 25 },
  { class: "SS1", new: 28, boys: 45, girls: 30 },
  { class: "SS2", new: 40, boys: 32, girls: 15 },
  { class: "SS3", new: 30, boys: 22, girls: 15 },
]

const chartConfig = {
  new: {
    label: "New Students",
    color: "#1EBE6F",
  },
  boys: {
    label: "Boys",
    color: "#D64545",
  },
  girls: {
    label: "Girls",
    color: "#F4A300",
  },
} satisfies ChartConfig

const StudentGrowthChart = () => {
  return (
    <Card className="p-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="text-primary" />
            <span>Student Growth</span>
          </div>

          <Select>
            <SelectTrigger className="border-accent text-accent w-[135px]">
              <SelectValue placeholder="2025/2026" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025/2026</SelectItem>
              <SelectItem value="2024">2024/2025</SelectItem>
              <SelectItem value="2023">2023/2024</SelectItem>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={chartData}
            barCategoryGap={10} // ← gaps between grouped bars
            barGap={0} // ← bars in each group sit tightly together
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="class" tickLine={false} axisLine={false} tickMargin={10} />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            {/* Bars without border radius */}
            <Bar dataKey="new" fill="#1EBE6F" radius={0} />
            <Bar dataKey="boys" fill="#D64545" radius={0} />
            <Bar dataKey="girls" fill="#F4A300" radius={0} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm" style={{ background: "#1EBE6F" }}></span>
          New Students
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm" style={{ background: "#D64545" }}></span>
          Boys
        </div>
        <div className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-sm" style={{ background: "#F4A300" }}></span>
          Girls
        </div>
      </CardFooter>
    </Card>
  )
}

export default StudentGrowthChart
