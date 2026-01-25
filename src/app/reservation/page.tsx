'use client'

import { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FiCheckCircle, FiCalendar, FiLock } from 'react-icons/fi'
import Calendar from '@/components/reservation/Calendar'
import TimeSlotPicker from '@/components/reservation/TimeSlotPicker'
import ReservationForm, { ReservationFormData } from '@/components/reservation/ReservationForm'
import { supabase } from '@/lib/supabase'

const RESERVATION_PASSWORD = process.env.NEXT_PUBLIC_RESERVATION_PASSWORD || 'test'

interface TimeSlot {
  id: string
  date: string
  start_time: string
  end_time: string
  is_available: boolean
}

export default function ReservationPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [allSlots, setAllSlots] = useState<TimeSlot[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [slotsForDate, setSlotsForDate] = useState<TimeSlot[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [reservationDetails, setReservationDetails] = useState<{
    date: string
    time: string
    name: string
  } | null>(null)

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('reservation_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === RESERVATION_PASSWORD) {
      localStorage.setItem('reservation_auth', 'true')
      setIsAuthenticated(true)
      setPasswordError('')
    } else {
      setPasswordError('パスワードが正しくありません')
    }
  }

  // Fetch slots from Supabase (only when authenticated)
  useEffect(() => {
    if (!isAuthenticated) return

    const fetchSlots = async () => {
      setIsLoading(true)
      if (!supabase) {
        console.log('Supabase not configured')
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('is_available', true)
        .gte('date', format(new Date(), 'yyyy-MM-dd'))
        .order('date', { ascending: true })
        .order('start_time', { ascending: true })

      if (error) {
        console.error('Error fetching slots:', error)
      } else {
        setAllSlots(data || [])
      }
      setIsLoading(false)
    }

    fetchSlots()
  }, [isAuthenticated])

  // Get available dates
  const availableDates = [...new Set(allSlots.map((slot) => slot.date))]

  // Fetch slots when date is selected
  const fetchSlotsForDate = useCallback(async (date: Date) => {
    setIsLoadingSlots(true)
    setSelectedSlot(null)

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
          prev.filter((slot) => slot.id !== selectedSlot.id)
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

  // Password screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-20">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLock className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-2xl font-serif font-medium text-gray-800 mb-2">
                生徒専用ページ
              </h1>
              <p className="text-gray-600">
                予約ページにアクセスするには<br />パスワードを入力してください
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワード"
                  className="input-field"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                )}
              </div>
              <button type="submit" className="btn-primary w-full">
                ログイン
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              パスワードは教室でお伝えしています
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600">読み込み中...</p>
        </div>
      </div>
    )
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

          {allSlots.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">現在、予約可能な空き枠がありません。</p>
              <p className="text-gray-400 mt-2">しばらくしてから再度ご確認ください。</p>
            </div>
          ) : (
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
          )}

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
