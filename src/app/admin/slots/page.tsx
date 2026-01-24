'use client'

import { useState, useEffect } from 'react'
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isBefore, startOfDay } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FiChevronLeft, FiChevronRight, FiPlus, FiTrash2, FiX } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

interface TimeSlot {
  id: string
  date: string
  start_time: string
  end_time: string
  is_available: boolean
}

export default function SlotsManagement() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newSlot, setNewSlot] = useState({ startTime: '10:00', endTime: '10:45' })
  const [isSaving, setIsSaving] = useState(false)

  // Fetch all slots
  useEffect(() => {
    const fetchSlots = async () => {
      if (!supabase) {
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .order('date', { ascending: true })
        .order('start_time', { ascending: true })

      if (error) {
        console.error('Error fetching slots:', error)
      } else {
        setSlots(data || [])
      }
      setIsLoading(false)
    }

    fetchSlots()
  }, [])

  // Calendar navigation
  const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1))
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))

  // Get days in current month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Get starting day of week (0 = Sunday)
  const startDayOfWeek = monthStart.getDay()

  // Get slots for a specific date
  const getSlotsForDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return slots.filter(slot => slot.date === dateStr)
  }

  // Get slots for selected date
  const selectedDateSlots = selectedDate ? getSlotsForDate(selectedDate) : []

  // Handle date click
  const handleDateClick = (date: Date) => {
    if (isBefore(date, startOfDay(new Date()))) return
    setSelectedDate(date)
  }

  // Add new slot
  const handleAddSlot = async () => {
    if (!selectedDate || !supabase) return

    setIsSaving(true)
    const dateStr = format(selectedDate, 'yyyy-MM-dd')

    const { data, error } = await supabase
      .from('time_slots')
      .insert({
        date: dateStr,
        start_time: newSlot.startTime,
        end_time: newSlot.endTime,
        is_available: true,
      })
      .select()
      .single()

    if (error) {
      console.error('Error adding slot:', error)
      alert('空き時間の追加に失敗しました')
    } else {
      setSlots([...slots, data])
      setIsModalOpen(false)
      setNewSlot({ startTime: '10:00', endTime: '10:45' })
    }
    setIsSaving(false)
  }

  // Delete slot
  const handleDeleteSlot = async (slotId: string) => {
    if (!supabase) return

    if (!confirm('この空き時間を削除しますか？')) return

    const { error } = await supabase
      .from('time_slots')
      .delete()
      .eq('id', slotId)

    if (error) {
      console.error('Error deleting slot:', error)
      alert('削除に失敗しました')
    } else {
      setSlots(slots.filter(slot => slot.id !== slotId))
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto"></div>
        <p className="mt-4 text-gray-600">読み込み中...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-medium text-gray-800">空き時間管理</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium">
              {format(currentMonth, 'yyyy年M月', { locale: ja })}
            </h3>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
              <div
                key={day}
                className={`text-center text-sm font-medium py-2 ${
                  index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month start */}
            {Array.from({ length: startDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Days */}
            {days.map((day) => {
              const daySlots = getSlotsForDate(day)
              const hasSlots = daySlots.length > 0
              const availableCount = daySlots.filter(s => s.is_available).length
              const isPast = isBefore(day, startOfDay(new Date()))
              const isSelected = selectedDate && format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
              const dayOfWeek = day.getDay()

              return (
                <button
                  key={day.toString()}
                  onClick={() => handleDateClick(day)}
                  disabled={isPast}
                  className={`aspect-square p-1 rounded-lg text-sm relative transition-all ${
                    isPast
                      ? 'text-gray-300 cursor-not-allowed'
                      : isSelected
                      ? 'bg-primary-600 text-white'
                      : isToday(day)
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-100'
                  } ${!isPast && dayOfWeek === 0 ? 'text-red-500' : ''} ${
                    !isPast && dayOfWeek === 6 ? 'text-blue-500' : ''
                  }`}
                >
                  <span className="block">{format(day, 'd')}</span>
                  {hasSlots && !isPast && (
                    <span className={`block text-xs ${isSelected ? 'text-white' : 'text-green-600'}`}>
                      {availableCount}枠
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <p>・日付をクリックして空き時間を管理</p>
            <p>・過去の日付は選択できません</p>
          </div>
        </div>

        {/* Selected Date Details */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {selectedDate ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">
                  {format(selectedDate, 'M月d日（E）', { locale: ja })}の空き時間
                </h3>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  追加
                </button>
              </div>

              {selectedDateSlots.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>この日の空き時間はありません</p>
                  <p className="text-sm mt-2">「追加」ボタンから登録してください</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedDateSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        slot.is_available
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div>
                        <span className="font-medium">
                          {slot.start_time.slice(0, 5)} 〜 {slot.end_time.slice(0, 5)}
                        </span>
                        <span className={`ml-3 text-sm ${
                          slot.is_available ? 'text-green-600' : 'text-gray-500'
                        }`}>
                          {slot.is_available ? '予約可能' : '予約済み'}
                        </span>
                      </div>
                      {slot.is_available && (
                        <button
                          onClick={() => handleDeleteSlot(slot.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>カレンダーから日付を選択してください</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Slot Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">空き時間を追加</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  {selectedDate && format(selectedDate, 'yyyy年M月d日（E）', { locale: ja })}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    開始時間
                  </label>
                  <input
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) => setNewSlot({ ...newSlot, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    終了時間
                  </label>
                  <input
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) => setNewSlot({ ...newSlot, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleAddSlot}
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
                >
                  {isSaving ? '保存中...' : '追加する'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
