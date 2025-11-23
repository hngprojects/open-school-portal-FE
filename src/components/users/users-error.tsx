import { AlertCircleIcon, RefreshCwIcon } from "lucide-react"
import { Button } from "../ui/button"

export const UsersError = ({
  userType,
  reload,
  errorMessage,
}: {
  userType: string
  reload: () => void
  errorMessage: string
}) => {
  return (
    <div className="flex min-h-[400px] items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertCircleIcon className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">
          Failed to Load {userType.charAt(0).toUpperCase() + userType.slice(1)}
        </h2>
        <p className="mb-6 text-gray-600">{errorMessage}</p>
        <div className="space-y-3">
          <Button
            onClick={() => {
              reload()
            }}
            className="w-full"
          >
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Troubleshooting Tips
            </summary>
            <ul className="mt-2 space-y-1 text-xs text-gray-600">
              <li>• Check if the API URL is correct in .env.local</li>
              <li>• Verify the API server is running</li>
              <li>• Check your internet connection</li>
              <li>• Look at browser console for more details</li>
              <li>• Verify authentication token if required</li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  )
}
