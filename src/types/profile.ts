export interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  role: string[]
  middle_name?: string
  gender?: string
  dob?: string
  phone?: string
  is_active: boolean
  created_at: string
  updated_at: string
  photo_url?: string
  homeAddress?: string
}

export interface UpdateProfileRequest {
  first_name?: string
  last_name?: string
  middle_name?: string
  phone?: string
  photo_url?: string
  homeAddress?: string
}
