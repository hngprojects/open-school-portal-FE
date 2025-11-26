import { apiFetch } from "@/lib/api/client"

// ---------------------
// TYPES
// ---------------------

export interface SuperAdminSignupData {
  email: string
  firstName: string
  lastName: string
  schoolName: string
  password: string
  confirm_password: string
}

export interface SuperAdminLoginData {
  email: string
  password: string
}

export interface SuperAdminResponse {
  message: string
  status_code: number
  data: Record<string, string>
}

// ---------------------
// SCHOOL INSTALLATION
// ---------------------

export interface SchoolInstallRequest {
  name: string
  address: string
  email: string
  phone: string
  logo?: string | null
  primary_color: string
  secondary_color?: string
  accent_color?: string
}

export interface SchoolInstallResponse {
  message: string
  status_code: number
  data: {
    user_id: string
    name: string
    email: string
    primary_color: string
    secondary_color?: string
    accent_color?: string
    logo: string | null
    user_type: "admin"
  }
}

// ---------------------
// DATABASE CREATION
// ---------------------

export interface DatabaseCreateRequest {
  database_name: string
  database_host: string
  database_username: string
  database_password: string
}

export interface DatabaseCreateResponse {
  status_code: number
  message: string
  data: {
    id: string
    database_name: string
    database_host: string
    database_username: string
    database_port: number
    created_at: string
    updated_at: string
  }
}

// -----------------------------------------
//        SETUP WIZARD API REQUESTS
// -----------------------------------------

export const SetupWizardAPI = {
  // Super Admin Signup
  createSuperAdmin: (data: SuperAdminSignupData) =>
    apiFetch<SuperAdminResponse>(
      "/superadmin/create",
      {
        method: "POST",
        data,
      },
      true
    ),

  // Super Admin Login
  login: (data: SuperAdminLoginData) =>
    apiFetch<{ message: string }>(
      "/superadmin/login",
      {
        method: "POST",
        data,
      },
      true
    ),

  // Install School
  installSchool: (data: SchoolInstallRequest) =>
    apiFetch<SchoolInstallResponse>(
      "/school/install",
      {
        method: "POST",
        data,
      },
      true
    ),

  // Create Database
  createDatabase: (data: DatabaseCreateRequest) =>
    apiFetch<DatabaseCreateResponse>(
      "/database/create",
      {
        method: "POST",
        data,
      },
      true
    ),
}
