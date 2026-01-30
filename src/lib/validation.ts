// ============================================
// Validation Patterns
// ============================================

export const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9-]+$/,
  phoneWithLength: /^[0-9-]{10,14}$/,
} as const

// ============================================
// Validation Functions
// ============================================

export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return 'メールアドレスを入力してください'
  }
  if (!PATTERNS.email.test(email)) {
    return '有効なメールアドレスを入力してください'
  }
  return null
}

export function validatePhone(phone: string): string | null {
  if (!phone.trim()) {
    return '電話番号を入力してください'
  }
  if (!PATTERNS.phone.test(phone)) {
    return '電話番号は数字とハイフンのみで入力してください'
  }
  if (phone.replace(/-/g, '').length < 10) {
    return '有効な電話番号を入力してください'
  }
  return null
}

export function validateRequired(value: string, fieldName: string): string | null {
  if (!value.trim()) {
    return `${fieldName}を入力してください`
  }
  return null
}

export function validateTimeRange(start: string, end: string): string | null {
  if (!start || !end) {
    return '開始時間と終了時間を入力してください'
  }
  if (start >= end) {
    return '終了時間は開始時間より後に設定してください'
  }
  return null
}

// ============================================
// Form Validation Helper
// ============================================

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export function validateReservationForm(data: {
  studentName: string
  studentEmail: string
  studentPhone: string
}): ValidationResult {
  const errors: Record<string, string> = {}

  const nameError = validateRequired(data.studentName, '生徒名')
  if (nameError) errors.studentName = nameError

  const emailError = validateEmail(data.studentEmail)
  if (emailError) errors.studentEmail = emailError

  const phoneError = validatePhone(data.studentPhone)
  if (phoneError) errors.studentPhone = phoneError

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
