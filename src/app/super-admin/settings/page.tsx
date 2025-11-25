import SchoolInformationForm from "./school-information/page"

export default function SchoolSettingsPage() {
  return (
    <div className="max-w-full">
      <div className="mb-8">
        <h1 className="pt-2 text-2xl font-bold text-gray-900">School Information</h1>
        <p className="mt-1 text-gray-700">Manage your school information.</p>
      </div>

      <SchoolInformationForm />
    </div>
  )
}
