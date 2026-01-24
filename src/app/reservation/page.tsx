'use client'

import { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FiCheckCircle, FiCalendar } from 'react-icons/fi'
import Calendar from '@/components/reservation/Calendar'
import TimeSlotPicker from '@/components/reservation/TimeSlotPicker'
import ReservationForm, { ReservationFormData } from '@/components/reservation/ReservationForm'

interface TimeSlot {
  id: string
  date: string
  start_time: string
  end_time: string
  is_available: boolean
}

// Demo data for demonstration
const generateDemoSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = []
  const today = new Date()

  // Generate slots for the next 60 days
  for (let i = 1; i <= 60; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    // Skip Sundays
    if (date.getDay() === 0) continue

    const dateStr = format(date, 'yyyy-MM-dd')

    // Random number of slots per day (1-3)
    const numSlots = Math.floor(Math.random() * 3) + 1
    const possibleTimes = [
      { start: '14:00:00', end: '14:45:00' },
      { start: '15:00:00', end: '15:45:00' },
      { start: '16:00:00', end: '16:45:00' },
      { start: '17:00:00', end: '17:45:00' },
      { start: '18:00:00', end: '18:45:00' },
      { start: '19:00:00', end: '19:45:00' },
    ]

    // Saturday has different times
    if (date.getDay() === 6) {
      possibleTimes.length = 0
      possibleTimes.push(
        { start: '10:00:00', end: '10:45:00' },
        { start: '11:00:00', end: '11:45:00' },
        { start: '14:00:00', end: '14:45:00' },
        { start: '15:00:00', end: '15:45:00' },
        { start: '16:00:00', end: '16:45:00' },
        { start: '17:00:00', end: '17:45:00' },
      )
    }

    const shuffled = possibleTimes.sort(() => 0.5 - Math.random())
    const selectedTimes = shuffled.slice(0, numSlots)

    selectedTimes.forEach((time, index) => {
      slots.push({
        id: `${dateStr}-${index}`,
        date: dateStr,
        start_time: time.start,
        end_time: time.end,
        is_available: true,
      })
    })
  }

  return slots
}

export default function ReservationPage() {
  const [allSlots, setAllSlots] = useState<TimeSlot[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [slotsForDate, setSlotsForDate] = useState<TimeSlot[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [reservationDetails, setReservationDetails] = useState<{
    date: string
    time: string
    name: string
  } | null>(null)

  // Initialize demo data
  useEffect(() => {
    const slots = generateDemoSlots()
    setAllSlots(slots)
  }, [])

  // Get available dates
  const availableDates = [...new Set(allSlots.map((slot) => slot.date))]

  // Fetch slots when date is selected
  const fetchSlotsForDate = useCallback(async (date: Date) => {
    setIsLoadingSlots(true)
    setSelectedSlot(null)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const dateStr = format(date, 'yyyy-MM-dd')
    const slots = allSlots.filter((slot) => slot.date === dateStr && slot.is_available)

    setSlotsForDate(slots)
    setIsLoadingSlots(false)
  }, [allSlots])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    fetchSlotsForDate(date)
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot)
  }

  const handleSubmit = async (formData: ReservationFormData) => {
    if (!selectedDate || !selectedSlot) return

    setIsSubmitting(true)

    try {
      // Call API to create reservation
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotId: selectedSlot.id,
          date: selectedSlot.date,
          startTime: selectedSlot.start_time,
          endTime: selectedSlot.end_time,
          ...formData,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Update local state to remove the booked slot
        setAllSlots((prev) =>
          prev.map((slot) =>
            slot.id === selectedSlot.id ? { ...slot, is_available: false } : slot
          )
        )

        setReservationDetails({
          date: format(selectedDate, 'yyyy年M月d日（E）', { locale: ja }),
          time: `${selectedSlot.start_time.slice(0, 5)} 〜 ${selectedSlot.end_time.slice(0, 5)}`,
          name: formData.studentName,
        })
        setIsComplete(true)
      } else {
        alert(result.error || '予約に失敗しました。もう一度お試しください。')
      }
    } catch (error) {
      console.error('Reservation error:', error)
      alert('予約に失敗しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Completion screen
  if (isComplete && reservationDetails) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="w-10 h-10 text-accent-600" />
            </div>
            <h1 className="text-2xl font-serif font-medium text-gray-800 mb-4">
              ご予約ありがとうございます
            </h1>
            <p className="text-gray-600 mb-8">
              予約が完了しました。先生にLINE通知が送信されました。
            </p>

            <div className="bg-gray-50 rounded-xl p-6 text-left mb-8">
              <h2 className="font-medium mb-4">予約内容</h2>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-gray-500">生徒名</dt>
                  <dd className="font-medium">{reservationDetails.name}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">日付</dt>
                  <dd className="font-medium">{reservationDetails.date}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">時間</dt>
                  <dd className="font-medium">{reservationDetails.time}</dd>
                </div>
              </dl>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsComplete(false)
                  setSelectedDate(null)
                  setSelectedSlot(null)
                  setReservationDetails(null)
                }}
                className="btn-primary w-full"
              >
                別の予約をする
              </button>
              <a href="/" className="btn-outline w-full inline-block text-center">
                トップページに戻る
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-800 mb-4">
              振替レッスン予約
            </h1>
            <p className="text-gray-600">
              カレンダーから空いている日時を選んで予約してください。
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className={`flex items-center gap-2 ${selectedDate ? 'text-accent-600' : 'text-primary-600'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${selectedDate ? 'bg-accent-100' : 'bg-primary-600 text-white'}`}>
                1
              </span>
              <span className="hidden sm:inline">日付を選択</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300" />
            <div className={`flex items-center gap-2 ${selectedSlot ? 'text-accent-600' : selectedDate ? 'text-primary-600' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${selectedSlot ? 'bg-accent-100' : selectedDate ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                2
              </span>
              <span className="hidden sm:inline">時間を選択</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-300" />
            <div className={`flex items-center gap-2 ${selectedSlot ? 'text-primary-600' : 'text-gray-400'}`}>
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${selectedSlot ? 'bg-primary-600 text-white' : 'bg-gray-200'}`}>
                3
              </span>
              <span className="hidden sm:inline">情報を入力</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-1">
              <Calendar
                availableDates={availableDates}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </div>

            {/* Time Slots */}
            <div className="lg:col-span-1">
              {selectedDate ? (
                <TimeSlotPicker
                  slots={slotsForDate}
                  selectedSlot={selectedSlot}
                  onSlotSelect={handleSlotSelect}
                  isLoading={isLoadingSlots}
                />
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                  <FiCalendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    カレンダーから日付を選択してください。
                  </p>
                </div>
              )}
            </div>

            {/* Reservation Form */}
            <div className="lg:col-span-1">
              {selectedSlot && selectedDate ? (
                <ReservationForm
                  selectedDate={format(selectedDate, 'yyyy年M月d日（E）', { locale: ja })}
                  selectedTime={`${selectedSlot.start_time.slice(0, 5)} 〜 ${selectedSlot.end_time.slice(0, 5)}`}
                  slotId={selectedSlot.id}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-gray-400">3</span>
                  </div>
                  <p className="text-gray-500">
                    日時を選択すると、予約フォームが表示されます。
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Note */}
          <div className="mt-12 bg-white rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="font-medium mb-3">ご予約にあたって</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>・予約完了後、先生にLINE通知が送信されます。</li>
              <li>・キャンセル・変更はレッスン前日までにご連絡ください。</li>
              <li>・体験レッスンをご希望の方は、メッセージ欄にその旨をご記入ください。</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
