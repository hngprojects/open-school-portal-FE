import { CheckCircle2Icon } from "lucide-react"
import React from "react"

interface ProgressIndicatorProps {
  currentStep: number
}

export default function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const steps = [
    { number: 1, label: "Database", completed: currentStep > 1 },
    { number: 2, label: "School info", completed: currentStep > 2 },
    { number: 3, label: "Admin", completed: currentStep > 3 },
  ]

  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full font-medium ${
                step.completed
                  ? "bg-green-500 text-white"
                  : currentStep === step.number
                    ? "bg-accent text-white"
                    : "bg-gray-300 text-gray-600"
              }`}
            >
              {step.completed ? <CheckCircle2Icon className="h-5 w-5" /> : step.number}
            </div>
            <span
              className={`text-sm ${currentStep === step.number ? "font-medium text-gray-900" : "text-gray-500"}`}
            >
              {step.label}
            </span>
          </div>
          <>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-12 ${step.completed ? "bg-green-500" : "bg-gray-300"}`}
              />
            )}
          </>
        </React.Fragment>
      ))}
    </div>
  )
}
