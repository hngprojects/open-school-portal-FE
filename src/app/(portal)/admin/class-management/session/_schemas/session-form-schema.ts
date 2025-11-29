import * as z from "zod"
import { parseDate, isDateAfter } from "../_utils/date"

export const sessionFormSchema = z
  .object({
    firstTermStartDate: z.string().min(1, "First term start date is required"),
    firstTermEndDate: z.string().min(1, "First term end date is required"),

    secondTermStartDate: z.string().min(1, "Second term start date is required"),
    secondTermEndDate: z.string().min(1, "Second term end date is required"),

    thirdTermStartDate: z.string().min(1, "Third term start date is required"),
    thirdTermEndDate: z.string().min(1, "Third term end date is required"),

    description: z.string().optional(),

    acknowledge: z.boolean().refine((v) => v === true, {
      message: "You must acknowledge to continue",
    }),
  })
  .superRefine((data, ctx) => {
    // Strong typing for date fields
    type DateFieldKey =
      | "firstTermStartDate"
      | "firstTermEndDate"
      | "secondTermStartDate"
      | "secondTermEndDate"
      | "thirdTermStartDate"
      | "thirdTermEndDate"

    const fields: { key: DateFieldKey; label: string }[] = [
      { key: "firstTermStartDate", label: "First term start date" },
      { key: "firstTermEndDate", label: "First term end date" },
      { key: "secondTermStartDate", label: "Second term start date" },
      { key: "secondTermEndDate", label: "Second term end date" },
      { key: "thirdTermStartDate", label: "Third term start date" },
      { key: "thirdTermEndDate", label: "Third term end date" },
    ]

    // Validate valid dates
    fields.forEach(({ key, label }) => {
      const parsed = parseDate(data[key])
      if (isNaN(parsed.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: [key],
          message: `${label} is not a valid date`,
        })
      }
    })

    const FSS = data.firstTermStartDate
    const FSE = data.firstTermEndDate

    const SSS = data.secondTermStartDate
    const SSE = data.secondTermEndDate

    const TSS = data.thirdTermStartDate
    const TSE = data.thirdTermEndDate

    //
    // ───────────────────────────────────────────────
    //  FIRST TERM RULES
    // ───────────────────────────────────────────────
    //

    // First term end must be after its start
    if (!isDateAfter(FSE, FSS)) {
      ctx.addIssue({
        path: ["firstTermEndDate"],
        code: z.ZodIssueCode.custom,
        message: "First term end date must be after the start date",
      })
    }

    //
    // ───────────────────────────────────────────────
    //  SECOND TERM RULES
    // ───────────────────────────────────────────────
    //

    // Cannot start before first term start
    if (!isDateAfter(SSS, FSS)) {
      ctx.addIssue({
        path: ["secondTermStartDate"],
        code: z.ZodIssueCode.custom,
        message: "Second term cannot start before first term starts",
      })
    }

    // Cannot be inside first term duration
    if (!isDateAfter(SSS, FSE)) {
      ctx.addIssue({
        path: ["secondTermStartDate"],
        code: z.ZodIssueCode.custom,
        message: "Second term cannot fall within the first term period",
      })
    }

    // Second term end cannot be before its start
    if (!isDateAfter(SSE, SSS)) {
      ctx.addIssue({
        path: ["secondTermEndDate"],
        code: z.ZodIssueCode.custom,
        message: "Second term end date must be after the start date",
      })
    }

    //
    // ───────────────────────────────────────────────
    //  THIRD TERM RULES
    // ───────────────────────────────────────────────
    //

    // Cannot be inside second term duration
    if (!isDateAfter(TSS, SSE)) {
      ctx.addIssue({
        path: ["thirdTermStartDate"],
        code: z.ZodIssueCode.custom,
        message: "Third term cannot fall within the second term period",
      })
    }

    // Third term end cannot be before start
    if (!isDateAfter(TSE, TSS)) {
      ctx.addIssue({
        path: ["thirdTermEndDate"],
        code: z.ZodIssueCode.custom,
        message: "Third term end date must be after the start date",
      })
    }
  })

export type SessionFormData = z.infer<typeof sessionFormSchema>
