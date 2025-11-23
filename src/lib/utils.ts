import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(first_name: string, last_name: string) {
  return [first_name[0], last_name?.[0] || first_name[1]].join("").toUpperCase()
}
