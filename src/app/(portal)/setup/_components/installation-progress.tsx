import { CheckCircle2Icon, SettingsIcon } from "lucide-react"
interface InstallationStep {
  label: string
  completed: boolean
}

interface InstallationProgressProps {
  progress: number
  steps: InstallationStep[]
}

export default function InstallationProgress({
  progress,
  steps,
}: InstallationProgressProps) {
  return (
    <div className="rounded-lg bg-white p-8 text-center shadow-sm md:p-12">
      <div className="mb-6 flex justify-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
          <SettingsIcon
            className="h-12 w-12 animate-spin text-red-500"
            style={{ animationDuration: "3s" }}
          />
        </div>
      </div>

      <h1 className="mb-3 text-3xl font-semibold text-gray-900">
        Installation in Progress
      </h1>
      <p className="mb-12 text-gray-600">
        This might take a few minutes. Please dont close this window.
      </p>

      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-700">Installing core modules....</span>
          <span className="text-sm font-medium text-red-500">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-red-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full ${
                step.completed ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {step.completed && <CheckCircle2Icon className="h-4 w-4 text-white" />}
            </div>
            <span
              className={`text-sm ${step.completed ? "text-gray-900" : "text-gray-500"}`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
