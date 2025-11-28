import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogTitle } from "@/components/ui/dialog"
import { TriangleAlertIcon } from "lucide-react"
import Link from "next/link"
import { useActiveAcademicSession } from "../../class-management/_hooks/use-session"
import { ReactNode, useEffect, useState } from "react"

const LINK_TO_ACTIVE_SESSIONS = "/admin/class-management/session/create-session"


export default function ActiveSessionGuard({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const { data: currentSession, isLoading: isLoadingSession } = useActiveAcademicSession()

    useEffect(() => {
        if (!isLoadingSession) {
            if (!currentSession) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        }
    }, [isLoadingSession, currentSession]);
    // active session here means school session e.g 2035/2036 session

    return (
        <>
        {children}
            <Dialog open={open}>
                <DialogOverlay className="z-60" />
                <DialogContent className="max-w-md z-60">
                    <DialogHeader>
                        <div className="mx-auto mb-4">
                            <TriangleAlertIcon className="text-orange-400 w-20 h-20" />
                        </div>
                        <DialogTitle className="text-center text-xl font-semibold">
                            No Active Session Found
                        </DialogTitle>
                        <DialogDescription className="text-center text-gray-600">
                            Please create an active academic session to proceed.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-col gap-2 sm:flex-col">
                        <Button asChild className="w-full">
                            <Link href={LINK_TO_ACTIVE_SESSIONS} onClick={() => setOpen(false)}>
                                Create an Active Session
                            </Link>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
