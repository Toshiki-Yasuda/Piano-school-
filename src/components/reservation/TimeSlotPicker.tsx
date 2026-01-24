'use client'

import { FiClock } from 'react-icons/fi'

interface TimeSlot {
  id: string
  start_time: string
  end_time: string
}

interface TimeSlotPickerProps {
  slots: TimeSlot[]
  selectedSlot: TimeSlot | null
  onSlotSelect: (slot: TimeSlot) => void
  isLoading: boolean
}

export default function TimeSlotPicker({
  slots,
  selectedSlot,
  onSlotSelect,
  isLoading,
}: TimeSlotPickerProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
          <FiClock className="text-primary-600" />
          時間を選択
        </h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (slots.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
          <FiClock className="text-primary-600" />
          時間を選択
        </h3>
        <p className="text-gray-500 text-center py-8">
          選択された日付には空き枠がありません。
          <br />
          別の日付をお選びください。
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
        <FiClock className="text-primary-600" />
        時間を選択
      </h3>
      <div className="space-y-2">
        {slots.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id
          return (
            <button
              key={slot.id}
              onClick={() => onSlotSelect(slot)}
              className={`
                w-full py-3 px-4 rounded-lg text-left transition-all duration-200
                flex items-center justify-between
                ${
                  isSelected
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-50 hover:bg-primary-50 text-gray-700'
                }
              `}
            >
              <span className="font-medium">
                {slot.start_time.slice(0, 5)} 〜 {slot.end_time.slice(0, 5)}
              </span>
              {isSelected && (
                <span className="text-sm bg-white/20 px-2 py-0.5 rounded">
                  選択中
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
