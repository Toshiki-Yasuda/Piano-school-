import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'

// ============================================
// Time Formatting
// ============================================

/**
 * Format time slot range (e.g., "10:00 〜 10:45")
 */
export function formatTimeSlot(startTime: string, endTime: string): string {
  return `${startTime.slice(0, 5)} 〜 ${endTime.slice(0, 5)}`
}

/**
 * Format time only (e.g., "10:00")
 */
export function formatTime(time: string): string {
  return time.slice(0, 5)
}

// ============================================
// Date Formatting
// ============================================

/**
 * Format date as "M/d（E）" (e.g., "1/25（土）")
 */
export function formatDateShort(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'M/d（E）', { locale: ja })
}

/**
 * Format date as "M月d日（E）" (e.g., "1月25日（土）")
 */
export function formatDateMedium(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'M月d日（E）', { locale: ja })
}

/**
 * Format date as "yyyy年M月d日（E）" (e.g., "2024年1月25日（土）")
 */
export function formatDateLong(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'yyyy年M月d日（E）', { locale: ja })
}

/**
 * Format datetime as "M/d HH:mm" (e.g., "1/25 14:30")
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'M/d HH:mm')
}

/**
 * Format datetime as "yyyy年M月d日 HH:mm" (e.g., "2024年1月25日 14:30")
 */
export function formatDateTimeLong(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, 'yyyy年M月d日 HH:mm', { locale: ja })
}

/**
 * Format month as "yyyy年M月" (e.g., "2024年1月")
 */
export function formatMonth(date: Date): string {
  return format(date, 'yyyy年M月', { locale: ja })
}

/**
 * Format date for database (yyyy-MM-dd)
 */
export function formatDateForDB(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

// ============================================
// Reservation Display
// ============================================

/**
 * Format reservation date and time for display
 */
export function formatReservationDateTime(date: string, startTime: string, endTime: string): {
  date: string
  time: string
} {
  return {
    date: formatDateLong(date),
    time: formatTimeSlot(startTime, endTime),
  }
}
