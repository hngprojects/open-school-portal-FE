"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Trash2, XCircle } from "lucide-react"

interface FeeModalsProps {
  isDeleteOpen: boolean
  setIsDeleteOpen: (open: boolean) => void
  isCancelOpen: boolean
  setIsCancelOpen: (open: boolean) => void
  isSuccessOpen: boolean
  setIsSuccessOpen: (open: boolean) => void
  onConfirmDelete: () => void
  onConfirmCancel: () => void
  hasChanges: boolean
}

export default function FeeModals({
  isDeleteOpen,
  setIsDeleteOpen,
  isCancelOpen,
  setIsCancelOpen,
  isSuccessOpen,
  setIsSuccessOpen,
  onConfirmDelete,
  onConfirmCancel,
  hasChanges,
}: FeeModalsProps) {
  return (
    <>
      {/* Confirm Delete Row */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="text-destructive h-5 w-5" />
              Delete Fee Component?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove this fee
              component from the list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={onConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Cancel (when there are unsaved changes) */}
      <AlertDialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-orange-600" />
              Discard Changes?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave without saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction
              className="bg-orange-600 hover:bg-orange-700"
              onClick={onConfirmCancel}
            >
              Discard & Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Modal */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center gap-4 py-4">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
              <DialogTitle className="text-2xl">Saved Successfully!</DialogTitle>
              <DialogDescription className="text-center">
                All fee components have been saved successfully.
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <Button onClick={() => setIsSuccessOpen(false)} size="lg">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
