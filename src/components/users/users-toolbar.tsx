// components/users/users-toolbar.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserPlus, Filter, ChevronDown } from "lucide-react"
import { UserType } from "@/types/user"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface UsersToolbarProps {
  userType: UserType
  searchQuery: string
  onSearchChange: (query: string) => void
  statusFilter: string
  onStatusFilterChange: (status: string) => void
  onAddUser: () => void
}

export function UsersToolbar({
  userType,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onAddUser,
}: UsersToolbarProps) {
  const [isComboboxOpen, setIsComboboxOpen] = useState(false)

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      <div className="flex flex-1 gap-2">
        {/* Search Input with Combobox */}
        <div className="relative flex-1">
          <Input
            placeholder={`Search ${userType}...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10"
          />
          <Popover open={isComboboxOpen} onOpenChange={setIsComboboxOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
              >
                <ChevronDown className="text-muted-foreground h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="end">
              <Command>
                <CommandInput placeholder="Filter options..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        onStatusFilterChange("all")
                        setIsComboboxOpen(false)
                      }}
                    >
                      All Status
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        onStatusFilterChange("active")
                        setIsComboboxOpen(false)
                      }}
                    >
                      Active Only
                    </CommandItem>
                    <CommandItem
                      onSelect={() => {
                        onStatusFilterChange("inactive")
                        setIsComboboxOpen(false)
                      }}
                    >
                      Inactive Only
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Status Filter Dropdown (Desktop) */}
        <div className="hidden sm:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup
                value={statusFilter}
                onValueChange={onStatusFilterChange}
              >
                <DropdownMenuRadioItem value="all">All Status</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="active">Active Only</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="inactive">
                  Inactive Only
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Add User Button */}
      <Button onClick={onAddUser} className="sm:w-auto">
        <UserPlus className="mr-2 h-4 w-4" />
        Add {userType.slice(0, -1)} {/* Remove 's' from plural */}
      </Button>
    </div>
  )
}
