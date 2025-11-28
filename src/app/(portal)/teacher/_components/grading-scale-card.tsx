"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GradingScale } from "@/types/result"

interface GradingScaleCardProps {
  gradingScale: GradingScale[]
}

export function GradingScaleCard({ gradingScale }: GradingScaleCardProps) {
  return (
    <Card className="border-yellow-200 bg-yellow-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="text-yellow-600">Grading Scale</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {gradingScale.map((scale) => (
            <div key={scale.grade} className="text-center">
              <div className="text-sm font-medium text-gray-900">{scale.grade}</div>
              <div className="text-xs text-gray-600">
                {scale.min_score} - {scale.max_score}
              </div>
              <div className="text-xs text-gray-500">{scale.remark}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
