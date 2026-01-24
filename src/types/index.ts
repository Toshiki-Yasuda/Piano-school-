// Common Types

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
  student_email: string
  student_phone: string
  parent_name?: string
  message?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at?: string
  updated_at?: string
}

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

export interface ReservationFormData {
  studentName: string
  studentEmail: string
  studentPhone: string
  parentName?: string
  message?: string
}
