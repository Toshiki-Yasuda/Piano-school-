import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface TimeSlot {
  id: string
  date: string
  start_time: string
  end_time: string
  is_available: boolean
  created_at: string
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
  created_at: string
}

// API Functions
export async function getAvailableSlots(year: number, month: number) {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = `${year}-${String(month + 1).padStart(2, '0')}-01`

  const { data, error } = await supabase
    .from('time_slots')
    .select('*')
    .gte('date', startDate)
    .lt('date', endDate)
    .eq('is_available', true)
    .order('date', { ascending: true })
    .order('start_time', { ascending: true })

  if (error) {
    console.error('Error fetching slots:', error)
    return []
  }

  return data as TimeSlot[]
}

export async function getSlotsByDate(date: string) {
  const { data, error } = await supabase
    .from('time_slots')
    .select('*')
    .eq('date', date)
    .eq('is_available', true)
    .order('start_time', { ascending: true })

  if (error) {
    console.error('Error fetching slots:', error)
    return []
  }

  return data as TimeSlot[]
}

export async function createReservation(
  slotId: string,
  reservationData: Omit<Reservation, 'id' | 'slot_id' | 'status' | 'created_at'>
) {
  // Start a transaction: update slot and create reservation
  const { data: slot, error: slotError } = await supabase
    .from('time_slots')
    .update({ is_available: false })
    .eq('id', slotId)
    .eq('is_available', true) // Ensure slot is still available
    .select()
    .single()

  if (slotError || !slot) {
    return { success: false, error: 'この時間枠は既に予約されています。' }
  }

  const { data, error } = await supabase
    .from('reservations')
    .insert({
      slot_id: slotId,
      ...reservationData,
      status: 'confirmed',
    })
    .select()
    .single()

  if (error) {
    // Rollback: make slot available again
    await supabase
      .from('time_slots')
      .update({ is_available: true })
      .eq('id', slotId)

    return { success: false, error: '予約の作成に失敗しました。' }
  }

  return { success: true, data: data as Reservation, slot: slot as TimeSlot }
}
