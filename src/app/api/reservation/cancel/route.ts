import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { reservationId } = await request.json()

    if (!reservationId) {
      return NextResponse.json(
        { error: 'Reservation ID is required' },
        { status: 400 }
      )
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase is not configured' },
        { status: 500 }
      )
    }

    // Get the reservation to find the associated time slot
    const { data: reservation, error: fetchError } = await supabase
      .from('reservations')
      .select('*, time_slots(id)')
      .eq('id', reservationId)
      .single()

    if (fetchError || !reservation) {
      return NextResponse.json(
        { error: 'Reservation not found' },
        { status: 404 }
      )
    }

    // Delete the reservation
    const { error: deleteError } = await supabase
      .from('reservations')
      .delete()
      .eq('id', reservationId)

    if (deleteError) {
      console.error('Error deleting reservation:', deleteError)
      return NextResponse.json(
        { error: 'Failed to cancel reservation' },
        { status: 500 }
      )
    }

    // Make the time slot available again
    const slotId = reservation.time_slot_id || reservation.time_slots?.id
    if (slotId) {
      const { error: updateError } = await supabase
        .from('time_slots')
        .update({ is_available: true })
        .eq('id', slotId)

      if (updateError) {
        console.error('Error updating time slot:', updateError)
        // Don't fail the request, but log the error
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Cancel reservation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
