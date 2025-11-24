import { Button } from "@/components/ui/button"
import { DatabaseIcon, ListChecksIcon, SchoolIcon, ShieldUserIcon } from "lucide-react"

interface StepItemProps {
  icon: React.ReactNode
  label: string
}

export function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="p-2 md:p-12">
      <h1 className="mb-3 text-center text-3xl font-semibold text-gray-900">
        Welcome to SchoolBase
      </h1>
      <p className="mb-8 text-center text-gray-600">
        Follow the steps to complete the set up process for your school's new portal.
      </p>

      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Installation Steps</h2>
        <div className="rounded-xl border border-gray-300">
          <StepItem
            icon={<ListChecksIcon className="h-5 w-5" />}
            label="Prerequisites Check"
          />
          <StepItem
            icon={<DatabaseIcon className="h-5 w-5" />}
            label="Database Configuration"
          />
          <StepItem
            icon={<ShieldUserIcon className="h-5 w-5" />}
            label="Super Admin Account Creation"
          />
          <StepItem
            icon={<SchoolIcon className="h-5 w-5" />}
            label="School Details Setup"
          />
        </div>
      </div>

      <Button onClick={onStart} className="w-full">
        Begin Installation
      </Button>
    </div>
  )
}

function StepItem({ icon, label }: StepItemProps) {
  // if if first, no top border, if last, no bottom border
  return (
    <div className="flex items-center gap-3 border-b border-gray-300 p-4 last:border-b-0">
      <div className="text-accent rounded-full bg-red-100 p-3">{icon}</div>
      <span className="text-gray-700">{label}</span>
    </div>
  )
}
