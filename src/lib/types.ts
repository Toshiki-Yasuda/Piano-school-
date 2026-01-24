// Database types for Supabase responses

export interface TimeSlot {
  id: string
  date: string
  start_time: string
  end_time: string
  is_available: boolean
  created_at?: string
}

export interface Reservation {
  id: string
  time_slot_id: string
  student_name: string
  parent_name: string
  email: string
  phone: string
  message: string | null
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
  time_slot_id: string
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

// Time validation
export function validateTimeRange(start: string, end: string): string | null {
  if (!start || !end) return '開始時間と終了時間を入力してください'
  if (start >= end) return '終了時間は開始時間より後に設定してください'
  return null
}
