"use client"

import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import type { Resolver } from "react-hook-form"

import FeeComponentsTable from "./fee-components-table"
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
import { Loader2, CheckCircle2, Trash2, XCircle } from "lucide-react"

// Schema (unchanged)
const formSchema = z.object({
  feeComponents: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().min(1, "Name is required"),
      amount: z.coerce.number().min(0.01, "Amount must be positive"),
      frequency: z.enum(["One-time", "Per Term", "Monthly", "Yearly"] as const),
      description: z.string().optional(),
    })
  ),
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: FormValues = {
  feeComponents: [
    {
      name: "Exam Charge",
      amount: 175000,
      frequency: "Per Term",
      description: "Optional",
    },
    { name: "Lab Fee", amount: 100000, frequency: "One-time", description: "Optional" },
    {
      name: "Boarding Fee",
      amount: 175000,
      frequency: "Per Term",
      description: "Optional",
    },
  ],
}

export default function FeeComponentsForm() {
  const [isSaving, setIsSaving] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  // Modal states
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [rowToDelete, setRowToDelete] = useState<number | null>(null)

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues,
  })

  const {
    formState: { isDirty },
    reset,
    setValue,
    getValues,
  } = methods

  // Delete handler from table
  const handleDeleteRow = (index: number) => {
    setRowToDelete(index)
    setDeleteOpen(true)
  }

  const confirmDelete = () => {
    if (rowToDelete !== null) {
      const updated = getValues("feeComponents").filter((_, i) => i !== rowToDelete)
      setValue("feeComponents", updated, { shouldDirty: true })
      setRowToDelete(null)
    }
    setDeleteOpen(false)
  }

  const handleCancel = () => {
    if (isDirty) {
      setCancelOpen(true)
    } else {
      window.history.back()
    }
  }

  const confirmCancel = () => {
    setCancelOpen(false)
    window.history.back() // or your navigation logic
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    setIsSaving(true)

    try {
      // Simulate your real API call here
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // ✅ SUCCESS: Everything saved!
      setIsSaving(false)
      setIsSuccessModalOpen(true) // ← This opens the modal
      reset(data) // Marks form as clean (removes "unsaved changes")

      // Optional: Auto-close modal after 3 seconds (feels premium)
      setTimeout(() => setIsSuccessModalOpen(false), 3000)
    } catch (error) {
      setIsSaving(false)
      alert("Save failed. Please try again.")
      console.error(error)
    }
  })

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className="space-y-8 bg-white">
          <div>
            <h1 className="mb-4 text-2xl font-bold">Add Fee Component to Tuition</h1>
            <p className="text-muted-foreground">
              Individual charges that make up the tuition fee.
            </p>
          </div>

          {/* Table receives the delete handler */}
          <FeeComponentsTable onDeleteRow={handleDeleteRow} />

          <div className="flex justify-end gap-4 border-t pt-6">
            <Button
              className="h-12"
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button className="h-12" type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save All
            </Button>
          </div>
        </form>
      </FormProvider>

      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-5 bg-black/10 backdrop-blur-[2px]" />
      )}

      {/* === DELETE CONFIRMATION MODAL === */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-red-700" />
              Delete Fee Component?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove this fee
              component.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-12">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="h-12 bg-red-700 text-white hover:bg-red-500"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* === UNSAVED CHANGES MODAL === */}
      <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-700" />
              Discard Changes?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave without saving?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-white h-12 text-[16px]">
              Stay
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmCancel}
              className="h-12 bg-orange-600 text-[16px] hover:bg-orange-700"
            >
              Discard & Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* == SUCCESS MODAL === */}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/10 backdrop-blur-[2px]" />
      )}

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="z-[160] sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center gap-4 py-6">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
              <DialogTitle className="text-2xl">Saved Successfully!</DialogTitle>
              <DialogDescription className="text-center text-base">
                All fee components have been saved.
              </DialogDescription>
            </div>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <Button onClick={() => setSuccessOpen(false)} size="lg">
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
