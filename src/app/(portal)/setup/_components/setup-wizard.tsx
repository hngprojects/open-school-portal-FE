"use client"

import { useState } from "react"
import { WelcomeScreen } from "./welcome-screen"
import Image from "next/image"
import {
  AdminAccount,
  DatabaseConfig,
  FormData,
  InstallationStep,
  SchoolInfo,
} from "../_types/setup"
import { DatabaseConfigForm } from "./database-configuration"
import { SchoolInfoForm } from "./school-info"
import { AdminAccountForm } from "./create-super-admin"

export default function SchoolSetupWizard() {
  const [currentStep, setCurrentStep] = useState<number>(3)
  const [isInstalling, setIsInstalling] = useState<boolean>(false)
  const [, setInstallProgress] = useState<number>(0)
  const [installationSteps, setInstallationSteps] = useState<InstallationStep[]>([
    { label: "Validating Account Information", completed: false },
    { label: "Creating Database Schema", completed: false },
    { label: "Installing Core Modules", completed: false },
    { label: "Configuring Your School Profile", completed: false },
    { label: "Finalizing Setup", completed: false },
  ])
  const [, setIsComplete] = useState<boolean>(false)

  const [formData, setFormData] = useState<FormData>({
    database: {
      name: "",
      host: "",
      username: "",
      password: "",
    },
    school: {
      logo: null,
      name: "",
      brandColor: "#DA3743",
      phone: "",
      address: "",
    },
    admin: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function handleNext(): Promise<void> {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1)
    } else {
      await handleInstallation()
    }
  }

  async function handleInstallation(): Promise<void> {
    setIsInstalling(true)
    setInstallProgress(0)

    const steps = [...installationSteps]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      steps[i].completed = true
      setInstallationSteps([...steps])
      setInstallProgress(((i + 1) / steps.length) * 100)
    }

    await Promise.all([
      mockApiCall("/api/database/setup", formData.database),
      mockApiCall("/api/school/setup", formData.school),
      mockApiCall("/api/admin/create", formData.admin),
    ])

    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsComplete(true)
  }

  async function mockApiCall(
    endpoint: string,
    data: DatabaseConfig | SchoolInfo | AdminAccount
  ): Promise<void> {
    console.log(`Calling ${endpoint} with data:`, data)
    return new Promise((resolve) => setTimeout(resolve, 300))
  }

  function handleBack(): void {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <div className="mb-2 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo.svg" alt="School Base Logo" width={50} height={50} />
            <span className="text-accent hidden text-2xl font-bold md:block">
              SCHOOLBASE
            </span>
          </div>
        </div>

        {currentStep === 0 && <WelcomeScreen onStart={handleNext} />}
        {currentStep === 1 && (
          <DatabaseConfigForm
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleNext}
            onCancel={handleBack}
          />
        )}
        {currentStep === 2 && (
          <SchoolInfoForm
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleNext}
            onCancel={handleBack}
          />
        )}
        {currentStep === 3 && !isInstalling && (
          <AdminAccountForm
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleInstallation}
            onCancel={handleBack}
          />
        )}
      </div>
    </div>
  )

  function updateFormData(section: keyof FormData, field: string, value: string | File) {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }
}
