import { NextRequest, NextResponse } from 'next/server'
import { createReservation } from '@/lib/supabase'
import { sendLineNotification } from '@/lib/line'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      slotId,
      date,
      startTime,
      endTime,
      studentName,
      studentEmail,
      studentPhone,
      parentName,
      message,
    } = body

    // Validate required fields
    if (!slotId || !studentName || !studentEmail || !studentPhone) {
      return NextResponse.json(
        { success: false, error: '必須項目を入力してください' },
        { status: 400 }
      )
    }

    // For demo mode (no Supabase configured), just send LINE notification
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

    if (!supabaseUrl) {
      // Demo mode - just simulate success and send LINE notification
      console.log('Demo mode: Reservation would be created:', {
        slotId,
        date,
        startTime,
        studentName,
        studentEmail,
        studentPhone,
      })

      // Format date and time for notification
      const formattedDate = date // Already in YYYY-MM-DD format
      const formattedTime = `${startTime.slice(0, 5)} 〜 ${endTime.slice(0, 5)}`

      // Send LINE notification
      const lineResult = await sendLineNotification({
        studentName,
        date: formattedDate,
        time: formattedTime,
        phone: studentPhone,
        email: studentEmail,
        message,
      })

      if (!lineResult.success) {
        console.log('LINE notification skipped (not configured or failed)')
      }

      return NextResponse.json({
        success: true,
        message: '予約が完了しました（デモモード）',
        data: {
          id: `demo-${Date.now()}`,
          slot_id: slotId,
          student_name: studentName,
          student_email: studentEmail,
          student_phone: studentPhone,
          parent_name: parentName,
          message,
          status: 'confirmed',
          created_at: new Date().toISOString(),
        },
      })
    }

    // Production mode with Supabase
    const result = await createReservation(slotId, {
      student_name: studentName,
      student_email: studentEmail,
      student_phone: studentPhone,
      parent_name: parentName,
      message,
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    // Send LINE notification
    if (result.slot) {
      const formattedDate = result.slot.date
      const formattedTime = `${result.slot.start_time.slice(0, 5)} 〜 ${result.slot.end_time.slice(0, 5)}`

      await sendLineNotification({
        studentName,
        date: formattedDate,
        time: formattedTime,
        phone: studentPhone,
        email: studentEmail,
        message,
      })
    }

    return NextResponse.json({
      success: true,
      message: '予約が完了しました',
      data: result.data,
    })
  } catch (error) {
    console.error('Reservation API error:', error)
    return NextResponse.json(
      { success: false, error: '予約処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}
