'use client'

import { useState } from 'react'
import { FiUser, FiMail, FiPhone, FiMessageSquare, FiCheck } from 'react-icons/fi'

interface ReservationFormProps {
  selectedDate: string
  selectedTime: string
  slotId: string
  onSubmit: (data: ReservationFormData) => Promise<void>
  isSubmitting: boolean
}

export interface ReservationFormData {
  studentName: string
  studentEmail: string
  studentPhone: string
  parentName: string
  message: string
}

export default function ReservationForm({
  selectedDate,
  selectedTime,
  slotId,
  onSubmit,
  isSubmitting,
}: ReservationFormProps) {
  const [formData, setFormData] = useState<ReservationFormData>({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    parentName: '',
    message: '',
  })

  const [errors, setErrors] = useState<Partial<ReservationFormData>>({})

  const validateForm = () => {
    const newErrors: Partial<ReservationFormData> = {}

    if (!formData.studentName.trim()) {
      newErrors.studentName = '生徒名を入力してください'
    }

    if (!formData.studentEmail.trim()) {
      newErrors.studentEmail = 'メールアドレスを入力してください'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail)) {
      newErrors.studentEmail = '有効なメールアドレスを入力してください'
    }

    if (!formData.studentPhone.trim()) {
      newErrors.studentPhone = '電話番号を入力してください'
    } else if (!/^[0-9-]+$/.test(formData.studentPhone)) {
      newErrors.studentPhone = '有効な電話番号を入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    await onSubmit(formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof ReservationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-medium text-lg mb-6">予約情報を入力</h3>

      {/* Selected DateTime Display */}
      <div className="bg-primary-50 rounded-lg p-4 mb-6">
        <p className="text-sm text-primary-600 font-medium">選択中の日時</p>
        <p className="text-lg font-bold text-primary-800">
          {selectedDate} {selectedTime}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student Name */}
        <div>
          <label
            htmlFor="studentName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            生徒名 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className={`input-field pl-10 ${
                errors.studentName ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              placeholder="山田 太郎"
            />
          </div>
          {errors.studentName && (
            <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
          )}
        </div>

        {/* Parent Name (Optional) */}
        <div>
          <label
            htmlFor="parentName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            保護者名（お子様の場合）
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className="input-field pl-10"
              placeholder="山田 花子"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="studentEmail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              id="studentEmail"
              name="studentEmail"
              value={formData.studentEmail}
              onChange={handleChange}
              className={`input-field pl-10 ${
                errors.studentEmail ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              placeholder="example@email.com"
            />
          </div>
          {errors.studentEmail && (
            <p className="text-red-500 text-sm mt-1">{errors.studentEmail}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="studentPhone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            電話番号 <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              id="studentPhone"
              name="studentPhone"
              value={formData.studentPhone}
              onChange={handleChange}
              className={`input-field pl-10 ${
                errors.studentPhone ? 'border-red-500 focus:ring-red-500' : ''
              }`}
              placeholder="090-0000-0000"
            />
          </div>
          {errors.studentPhone && (
            <p className="text-red-500 text-sm mt-1">{errors.studentPhone}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            メッセージ（任意）
          </label>
          <div className="relative">
            <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="input-field pl-10 resize-none"
              placeholder="ご要望があればお書きください"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full btn-primary flex items-center justify-center gap-2
            ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}
          `}
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              予約中...
            </>
          ) : (
            <>
              <FiCheck className="w-5 h-5" />
              予約を確定する
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          予約確定後、先生にLINE通知が送信されます。
        </p>
      </form>
    </div>
  )
}
