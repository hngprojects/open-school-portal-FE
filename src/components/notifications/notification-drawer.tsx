"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  //   DrawerBody,
  DrawerFooter,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BellIcon, X } from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"

export const NotificationsDrawer = () => {
  const [open, setOpen] = useState(false)
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotifications()

  const notifications = data?.pages.flatMap((page) => page.data.notifications) ?? []
  const unreadCount = notifications.filter((n) => !n.is_read).length

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="text-text-secondary size-5" />
          {unreadCount > 0 && (
            <span className="bg-accent absolute top-0 right-0.5 h-1.5 w-1.5 rounded-full" />
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-[360px] sm:max-w-[360px]">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="size-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground text-sm">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`hover:bg-accent/50 rounded-lg border p-3 transition-colors ${
                    !notification.is_read ? "bg-accent/20" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm leading-none font-medium">
                        {notification.title}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {notification.message}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    {!notification.is_read && (
                      <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                </div>
              ))}

              {hasNextPage && (
                <Button
                  variant="outline"
                  className="mt-4 w-full"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading..." : "Load more"}
                </Button>
              )}
            </div>
          )}
        </ScrollArea>

        {/* <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  )
}
