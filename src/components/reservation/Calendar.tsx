'use client'

import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isBefore,
  startOfDay,
} from 'date-fns'
import { ja } from 'date-fns/locale'

interface CalendarProps {
  availableDates: string[]
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
}

const weekDays = ['日', '月', '火', '水', '木', '金', '土']

export default function Calendar({
  availableDates,
  selectedDate,
  onDateSelect,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const calendarStart = startOfWeek(monthStart)
  const calendarEnd = endOfWeek(monthEnd)

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })

  const isDateAvailable = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return availableDates.includes(dateStr)
  }

  const isPastDate = (date: Date) => {
    return isBefore(startOfDay(date), startOfDay(new Date()))
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="前月"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-medium">
          {format(currentMonth, 'yyyy年M月', { locale: ja })}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="翌月"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center text-sm font-medium py-2 ${
              index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentMonth)
          const isSelected = selectedDate && isSameDay(day, selectedDate)
          const isAvailable = isDateAvailable(day)
          const isPast = isPastDate(day)
          const isTodayDate = isToday(day)
          const dayOfWeek = day.getDay()

          return (
            <button
              key={index}
              onClick={() => {
                if (isAvailable && !isPast && isCurrentMonth) {
                  onDateSelect(day)
                }
              }}
              disabled={!isAvailable || isPast || !isCurrentMonth}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-full
                transition-all duration-200
                ${!isCurrentMonth ? 'text-gray-300' : ''}
                ${isCurrentMonth && isPast ? 'text-gray-300 cursor-not-allowed' : ''}
                ${isCurrentMonth && !isPast && !isAvailable ? 'text-gray-400 cursor-not-allowed' : ''}
                ${isCurrentMonth && !isPast && isAvailable && !isSelected ? 'bg-accent-100 text-accent-800 hover:bg-accent-200 cursor-pointer' : ''}
                ${isSelected ? 'bg-primary-600 text-white' : ''}
                ${isTodayDate && !isSelected ? 'ring-2 ring-primary-300' : ''}
                ${dayOfWeek === 0 && isCurrentMonth && !isPast ? 'text-red-500' : ''}
                ${dayOfWeek === 6 && isCurrentMonth && !isPast ? 'text-blue-500' : ''}
              `}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-accent-100" />
          <span className="text-gray-600">空きあり</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary-600" />
          <span className="text-gray-600">選択中</span>
        </div>
      </div>
    </div>
  )
}
