import React from "react"
import DashboardTitle from "@/components/dashboard/dashboard-title"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Dot } from "lucide-react"
import { Button } from "@/components/ui/button"

const Overview = () => {
  return (
    <div className="h-full min-h-[90vh] bg-[#FAFAFA] px-2 pt-4 lg:px-4">
      <DashboardTitle
        heading="Dashboard"
        description="Snapshot of attendance, upcoming classes, and latest results."
      />

      {/* There are 2 cards on desktop and single file on mobile */}
      <article className="mt-4 grid grid-cols-1 lg:grid-cols-[40fr_70fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="flex items-center rounded-2xl bg-[#ECFDF3] py-1 pr-2.5 tracking-[0.5] text-[#10B981]">
                <Dot /> Ongoing
              </span>

              <p>Room 310</p>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              Subject: <span>Physics</span>
            </p>
            <p className="py-3">
              Teacher: <span>Mr Olu</span>
            </p>
            <p>10 seats remaining</p>
          </CardContent>
          <CardFooter className="justify-end">
            <Button>Join</Button>
          </CardFooter>
        </Card>
      </article>
    </div>
  )
}

export default Overview
