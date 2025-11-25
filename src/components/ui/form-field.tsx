import { AlertCircleIcon } from "lucide-react"
import { Input } from "./input"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}
const EXTRA_PROPS = ["label", "error"]

// needed to filer the porps so it doesnt have extra ones not valid for input element
const getInputProps = (props: FormFieldProps) => {
  const inputProps = {} as Record<string, unknown>
  Object.keys(props).forEach((key) => {
    if (!EXTRA_PROPS.includes(key)) {
      inputProps[key] = props[key as keyof FormFieldProps]
    }
  })
  return inputProps as React.InputHTMLAttributes<HTMLInputElement>
}

export const FormField = (props: FormFieldProps) => (
  <div key={props.name} className={props.type === "file" ? "lg:col-span-2" : ""}>
    <label
      htmlFor={props.name}
      className="mb-2 block text-sm font-semibold text-gray-900"
    >
      {props.label} {props.required ? <span className="text-red-600">*</span> : <></>}
    </label>

    <Input
      type={props.type || "text"}
      className="focus:ring-accent w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder-gray-400 shadow-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none"
      // spread only the relevant props to the Input component
      {...getInputProps(props)}
    />

    {props.error && (
      <p className="mt-1 flex items-center text-sm text-red-500">
        {" "}
        <AlertCircleIcon /> {props.error}{" "}
      </p>
    )}
  </div>
)
