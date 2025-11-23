import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface LogoutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => Promise<void>
  logoutFrom?: string
}

export function LogoutDialog({
  open,
  onOpenChange,
  onConfirm,
  logoutFrom = 'Open school portal',
}: LogoutDialogProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setError(null)
    
    try {
      await onConfirm()
      onOpenChange(false)
    } catch (err) {
      setError('A network error occured. Please check your connection and try again')
      setIsLoggingOut(false)
    }
  }

  const handleCancel = () => {
    if (!isLoggingOut) {
      setError(null)
      onOpenChange(false)
    }
  }

  const handleTryAgain = () => {
    setError(null)
  }

  // Loading state
  if (isLoggingOut) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 border-0">
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <div className="relative w-12 h-12 mb-4">
              <Loader2 className="w-12 h-12 animate-spin text-red-500" />
            </div>
            <p className="text-base font-normal text-gray-700">Logging Out</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Error state
  if (error) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] p-0 gap-0 border-0">
          <DialogHeader className="px-6 pt-8 pb-6 space-y-3">
            <DialogTitle className="text-2xl font-semibold text-center">
              Log Out Failed
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 text-center">
              {error}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 border-t">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="h-14 rounded-none border-r text-base font-normal hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              onClick={handleTryAgain}
              className="h-14 rounded-none text-red-500 hover:text-red-600 text-base font-normal hover:bg-gray-50"
            >
              Try Again
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Default confirmation state
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 gap-0 border-0">
        <DialogHeader className="px-6 pt-8 pb-6 space-y-3">
          <DialogTitle className="text-2xl font-semibold text-center">
            Log Out?
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600 text-center">
            You'll log out from {logoutFrom}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 border-t">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="h-14 rounded-none border-r text-base font-normal hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="h-14 rounded-none text-red-500 hover:text-red-600 text-base font-normal hover:bg-gray-50"
          >
            Log out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}