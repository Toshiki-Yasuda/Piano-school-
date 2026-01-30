// ============================================
// Database Types (snake_case - matches Supabase)
// ============================================

export interface TimeSlot {
  id: string
  date: string
  start_time: string
  end_time: string
  is_available: boolean
  created_at?: string
  updated_at?: string
}

export interface Reservation {
  id: string
  slot_id: string
  student_name: string
  parent_name: string
  student_email: string
  student_phone: string
  message: string | null
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  // These may come from the reservation directly or from time_slots join
  date?: string
  start_time?: string
  end_time?: string
}

// Supabase response types (with joined relations)
export interface ReservationWithSlot extends Reservation {
  time_slots?: {
    date: string
    start_time: string
    end_time: string
  } | null
}

// Processed reservation with guaranteed date fields
export interface ProcessedReservation {
  id: string
  slot_id: string
  student_name: string
  parent_name: string
  email: string
  phone: string
  message: string | null
  created_at: string
  date: string
  start_time: string
  end_time: string
}

// ============================================
// Frontend/Form Types (camelCase)
// ============================================

export interface ReservationFormData {
  studentName: string
  studentEmail: string
  studentPhone: string
  parentName?: string
  message?: string
}

// ============================================
// Blog Types (from microCMS)
// ============================================

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  thumbnail?: {
    url: string
    width: number
    height: number
  }
  category: {
    id: string
    name: string
  }
  publishedAt: string
  createdAt: string
  updatedAt: string
}

// ============================================
// Re-export Validation Utilities
// ============================================

// Re-export for backwards compatibility
export { validateTimeRange } from './validation'
