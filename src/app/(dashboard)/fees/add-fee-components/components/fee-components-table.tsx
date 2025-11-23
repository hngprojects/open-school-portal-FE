"use client"

import { useFieldArray, useFormContext } from "react-hook-form"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useState } from "react"

const frequencies = ["One-time", "Per Term", "Monthly", "Yearly"] as const

interface FeeComponentsTableProps {
  onDeleteRow?: (index: number) => void
}

export default function FeeComponentsTable({ onDeleteRow }: FeeComponentsTableProps) {
  const { control } = useFormContext()
  const { fields, append } = useFieldArray({
    control,
    name: "feeComponents",
  })

  const [addingRow, setAddingRow] = useState(false)

  const handleDelete = (index: number) => {
    onDeleteRow?.(index)
  }

  return (
    <div className="rounded-lg border bg-white px-8 shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b text-[18px] font-semibold">
            <TableHead className="py-4 pr-4 pl-8 text-left font-semibold text-gray-900">
              Name
            </TableHead>
            <TableHead className="px-4 py-4 text-left font-semibold text-gray-900">
              Amount
            </TableHead>
            <TableHead className="px-4 py-4 text-left font-semibold text-gray-900">
              Frequency
            </TableHead>
            <TableHead className="px-4 py-4 text-left font-semibold text-gray-900">
              Description
            </TableHead>
            <TableHead className="t w-24 px-4 py-4 text-center font-semibold text-gray-900">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow
              key={field.id}
              className="border-b transition-colors last:border-b-0 hover:bg-gray-50/50"
            >
              <TableCell className="py-5 pr-4 pl-8">
                <FormField
                  control={control}
                  name={`feeComponents.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="m-0">
                      <FormControl>
                        <Input
                          {...field}
                          className="border-0 bg-transparent text-base shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell className="px-4 py-5">
                <FormField
                  control={control}
                  name={`feeComponents.${index}.amount`}
                  render={({ field }) => (
                    <FormItem className="m-0">
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="w-32 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell className="px-4 py-5">
                <FormField
                  control={control}
                  name={`feeComponents.${index}.frequency`}
                  render={({ field }) => (
                    <FormItem className="m-0">
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="min-w-36 border-0 bg-transparent text-base shadow-none focus:ring-0 focus:ring-offset-0">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {frequencies.map((freq) => (
                            <SelectItem key={freq} value={freq}>
                              {freq}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell className="px-4 py-5">
                <FormField
                  control={control}
                  name={`feeComponents.${index}.description`}
                  render={({ field }) => (
                    <FormItem className="m-0">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Optional"
                          className="text-muted-foreground border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TableCell>
              <TableCell className="py-5 text-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="animate-in h-9 w-9 translate-y-4 rounded-full transition-colors duration-200 ease-in hover:bg-red-700 hover:text-white"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 className="text-destructive h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {/* Add Another Component Row */}
          <TableRow>
            <TableCell colSpan={5} className="py-8">
              {addingRow ? (
                <div className="pl- flex items-center justify-start gap-6">
                  <Button
                    type="button"
                    variant="link"
                    className={cn(
                      "text-destructive h-auto p-0 font-normal hover:text-red-600 hover:no-underline",
                      fields.length === 0 &&
                        "text-muted-foreground hover:text-muted-foreground/80"
                    )}
                    onClick={() => {
                      append({
                        name: "",
                        amount: undefined,
                        frequency: "Per Term",
                        description: "",
                      })
                      setAddingRow(false)
                    }}
                  >
                    <Minus className="h-5 w-5 rounded-xl border border-red-700 text-red-700" />
                    <p className="text-[16px] font-semibold text-red-700">
                      {" "}
                      Confirm add new component
                    </p>
                  </Button>

                  <Button
                    type="button"
                    // variant="ghost"
                    size="sm"
                    onClick={() => setAddingRow(false)}
                  >
                    <span className="text-[16px] font-semibold text-white">cancel</span>
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="link"
                  className={cn(
                    "text-destructive h-auto p-0 font-normal hover:text-red-600 hover:no-underline",
                    fields.length === 0 &&
                      "text-muted-foreground hover:text-muted-foreground/80"
                  )}
                  onClick={() => setAddingRow(true)}
                >
                  <Plus className="h-5 w-5 rounded-xl border border-red-700 font-semibold text-red-700" />
                  <span className="text-[16px] font-semibold text-red-700">
                    Add Another Component
                  </span>
                </Button>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
