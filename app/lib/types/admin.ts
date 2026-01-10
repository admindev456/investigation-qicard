export interface AuthLog {
  id: string
  user_id: string
  email: string
  event_type: 'sign_in' | 'sign_out' | 'failed_attempt'
  ip_address: string | null
  city: string | null
  country: string | null
  user_agent: string | null
  created_at: string
  session_duration_minutes: number | null
}

export interface UserRole {
  id: string
  user_id: string
  role: 'admin' | 'user'
  created_at: string
  updated_at: string
}

export interface UserWithRole {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
  role: string
}

export interface CreateUserRequest {
  email: string
  password: string
  role?: 'admin' | 'user'
}

export interface GeoLocation {
  ip: string
  city: string
  country: string
  country_code: string
}

