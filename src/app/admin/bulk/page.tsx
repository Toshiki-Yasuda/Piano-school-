'use client'

import { useState } from 'react'
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FiPlus, FiTrash2, FiCheck } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import ConfirmDialog from '@/components/ConfirmDialog'

interface TimeRange {
  id: string
  startTime: string
  endTime: string
}

const WEEKDAYS = [
  { value: 0, label: '日曜日' },
  { value: 1, label: '月曜日' },
  { value: 2, label: '火曜日' },
  { value: 3, label: '水曜日' },
  { value: 4, label: '木曜日' },
  { value: 5, label: '金曜日' },
  { value: 6, label: '土曜日' },
]

export default function BulkRegistration() {
  const [startDate, setStartDate] = useState(format(startOfMonth(addDays(new Date(), 30)), 'yyyy-MM-dd'))
  const [endDate, setEndDate] = useState(format(endOfMonth(addDays(new Date(), 30)), 'yyyy-MM-dd'))
  const [selectedDays, setSelectedDays] = useState<number[]>([])
  const [timeRanges, setTimeRanges] = useState<TimeRange[]>([
    { id: '1', startTime: '10:00', endTime: '10:45' },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; count: number } | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const addTimeRange = () => {
    const lastRange = timeRanges[timeRanges.length - 1]
    const newStart = lastRange ? lastRange.endTime : '10:00'
    const [hours, minutes] = newStart.split(':').map(Number)
    const newEndHours = hours + (minutes + 45 >= 60 ? 1 : 0)
    const newEndMinutes = (minutes + 45) % 60
    const newEnd = `${String(newEndHours).padStart(2, '0')}:${String(newEndMinutes).padStart(2, '0')}`

    setTimeRanges([
      ...timeRanges,
      {
        id: Date.now().toString(),
        startTime: newStart,
        endTime: newEnd,
      },
    ])
  }

  const removeTimeRange = (id: string) => {
    setTimeRanges(timeRanges.filter((t) => t.id !== id))
  }

  const updateTimeRange = (id: string, field: 'startTime' | 'endTime', value: string) => {
    setTimeRanges(
      timeRanges.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    )
  }

  const calculateSlots = () => {
    if (!startDate || !endDate || selectedDays.length === 0 || timeRanges.length === 0) {
      return []
    }

    const days = eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    })

    const matchingDays = days.filter((day) => selectedDays.includes(getDay(day)))

    const slots: { date: string; startTime: string; endTime: string }[] = []
    matchingDays.forEach((day) => {
      timeRanges.forEach((range) => {
        slots.push({
          date: format(day, 'yyyy-MM-dd'),
          startTime: range.startTime,
          endTime: range.endTime,
        })
      })
    })

    return slots
  }

  const previewSlots = calculateSlots()

  const handleSubmit = async () => {
    if (!supabase || previewSlots.length === 0) return

    setIsSubmitting(true)
    setResult(null)

    const slotsToInsert = previewSlots.map((slot) => ({
      date: slot.date,
      start_time: slot.startTime,
      end_time: slot.endTime,
      is_available: true,
    }))

    const { data, error } = await supabase
      .from('time_slots')
      .insert(slotsToInsert)
      .select()

    if (error) {
      console.error('Error inserting slots:', error)
      alert('登録に失敗しました: ' + error.message)
      setResult({ success: false, count: 0 })
    } else {
      setResult({ success: true, count: data?.length || 0 })
      // Reset form
      setSelectedDays([])
      setTimeRanges([{ id: '1', startTime: '10:00', endTime: '10:45' }])
    }

    setIsSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-medium text-gray-800">一括登録</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Settings */}
        <div className="space-y-6">
          {/* Date Range */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4">期間を選択</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">開始日</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">終了日</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Weekdays */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4">曜日を選択</h3>
            <div className="grid grid-cols-4 gap-2">
              {WEEKDAYS.map((day) => (
                <button
                  key={day.value}
                  onClick={() => toggleDay(day.value)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDays.includes(day.value)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {day.label.replace('曜日', '')}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">
              選択中: {selectedDays.length === 0 ? 'なし' : selectedDays.map((d) => WEEKDAYS[d].label.replace('曜日', '')).join('、')}
            </p>
          </div>

          {/* Time Ranges */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">時間帯を設定</h3>
              <button
                onClick={addTimeRange}
                className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
              >
                <FiPlus className="w-4 h-4" />
                追加
              </button>
            </div>

            <div className="space-y-3">
              {timeRanges.map((range, index) => (
                <div key={range.id} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
                  <input
                    type="time"
                    value={range.startTime}
                    onChange={(e) => updateTimeRange(range.id, 'startTime', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <span className="text-gray-400">〜</span>
                  <input
                    type="time"
                    value={range.endTime}
                    onChange={(e) => updateTimeRange(range.id, 'endTime', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  {timeRanges.length > 1 && (
                    <button
                      onClick={() => removeTimeRange(range.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-3">
              例: 1レッスン45分の場合、10:00〜10:45、11:00〜11:45 など
            </p>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-medium mb-4">
            プレビュー
            <span className="text-primary-600 ml-2">({previewSlots.length}件)</span>
          </h3>

          {result && (
            <div className={`mb-4 p-4 rounded-lg ${result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {result.success ? (
                <div className="flex items-center gap-2">
                  <FiCheck className="w-5 h-5" />
                  <span>{result.count}件の空き時間を登録しました</span>
                </div>
              ) : (
                <span>登録に失敗しました</span>
              )}
            </div>
          )}

          {previewSlots.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>期間・曜日・時間帯を選択すると</p>
              <p>プレビューが表示されます</p>
            </div>
          ) : (
            <>
              <div className="max-h-96 overflow-y-auto mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 text-left text-gray-500">日付</th>
                      <th className="px-3 py-2 text-left text-gray-500">時間</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {previewSlots.slice(0, 50).map((slot, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2">
                          {format(new Date(slot.date), 'M/d（E）', { locale: ja })}
                        </td>
                        <td className="px-3 py-2">
                          {slot.startTime} 〜 {slot.endTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {previewSlots.length > 50 && (
                  <p className="text-center text-gray-500 text-sm py-2">
                    ...他 {previewSlots.length - 50} 件
                  </p>
                )}
              </div>

              <button
                onClick={() => setShowConfirm(true)}
                disabled={isSubmitting || previewSlots.length === 0}
                className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? '登録中...' : `${previewSlots.length}件を一括登録する`}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Usage Guide */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-medium text-blue-800 mb-2">使い方</h3>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>登録したい期間（例: 2月1日〜2月28日）を選択</li>
          <li>レッスンを行う曜日（例: 月・水・金）を選択</li>
          <li>時間帯を設定（複数の時間帯を追加可能）</li>
          <li>プレビューを確認して「一括登録する」をクリック</li>
        </ol>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        title="一括登録の確認"
        message={`${previewSlots.length}件の空き時間を登録します。よろしいですか？`}
        confirmLabel="登録する"
        cancelLabel="キャンセル"
        onConfirm={() => {
          setShowConfirm(false)
          handleSubmit()
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  )
}
