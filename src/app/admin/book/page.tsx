'use client'

import { useState, useEffect } from 'react'
import { format, parseISO, addMonths, startOfMonth, endOfMonth } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FiUser, FiCheck, FiCalendar } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import ConfirmDialog from '@/components/ConfirmDialog'

interface TimeSlot {
  id: string
  date: string
  start_time: string
  end_time: string
  is_available: boolean
}

interface Student {
  student_name: string
  parent_name: string
  email: string
  phone: string
}

export default function BulkBookingPage() {
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [existingStudents, setExistingStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [result, setResult] = useState<{ success: boolean; count: number } | null>(null)

  // Date range filter
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'))
  const [endDate, setEndDate] = useState(format(endOfMonth(addMonths(new Date(), 1)), 'yyyy-MM-dd'))

  // Student selection mode
  const [studentMode, setStudentMode] = useState<'existing' | 'new'>('existing')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // New student form
  const [newStudent, setNewStudent] = useState<Student>({
    student_name: '',
    parent_name: '',
    email: '',
    phone: '',
  })

  // Fetch available slots and existing students
  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setIsLoading(false)
        return
      }

      // Fetch available slots
      const { data: slotsData, error: slotsError } = await supabase
        .from('time_slots')
        .select('*')
        .eq('is_available', true)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: true })
        .order('start_time', { ascending: true })

      if (slotsError) {
        console.error('Error fetching slots:', slotsError)
      } else {
        setSlots(slotsData || [])
      }

      // Fetch existing students from reservations
      const { data: reservationsData } = await supabase
        .from('reservations')
        .select('student_name, parent_name, student_email, student_phone')
        .order('created_at', { ascending: false })

      if (reservationsData) {
        // Remove duplicates by email
        const uniqueStudents = reservationsData.reduce((acc: Student[], curr) => {
          if (!acc.find(s => s.email === curr.student_email)) {
            acc.push({
              student_name: curr.student_name,
              parent_name: curr.parent_name,
              email: curr.student_email,
              phone: curr.student_phone,
            })
          }
          return acc
        }, [])
        setExistingStudents(uniqueStudents)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [startDate, endDate])

  const toggleSlot = (slotId: string) => {
    const newSelected = new Set(selectedSlots)
    if (newSelected.has(slotId)) {
      newSelected.delete(slotId)
    } else {
      newSelected.add(slotId)
    }
    setSelectedSlots(newSelected)
  }

  const selectAll = () => {
    setSelectedSlots(new Set(slots.map(s => s.id)))
  }

  const clearSelection = () => {
    setSelectedSlots(new Set())
  }

  const getCurrentStudent = (): Student | null => {
    if (studentMode === 'existing') {
      return selectedStudent
    } else {
      if (newStudent.student_name && newStudent.email && newStudent.phone) {
        return newStudent
      }
      return null
    }
  }

  const handleSubmit = async () => {
    const student = getCurrentStudent()
    if (!supabase || selectedSlots.size === 0 || !student) return

    setIsSubmitting(true)
    setResult(null)

    const reservations = Array.from(selectedSlots).map(slotId => ({
      slot_id: slotId,
      student_name: student.student_name,
      parent_name: student.parent_name || '',
      student_email: student.email,
      student_phone: student.phone,
      message: '管理画面から登録',
      status: 'confirmed',
    }))

    // Insert reservations
    const { data, error } = await supabase
      .from('reservations')
      .insert(reservations)
      .select()

    if (error) {
      console.error('Error creating reservations:', error)
      alert('予約登録に失敗しました: ' + error.message)
      setResult({ success: false, count: 0 })
    } else {
      // Update time slots to unavailable
      const { error: updateError } = await supabase
        .from('time_slots')
        .update({ is_available: false })
        .in('id', Array.from(selectedSlots))

      if (updateError) {
        console.error('Error updating slots:', updateError)
      }

      setResult({ success: true, count: data?.length || 0 })
      // Remove booked slots from list
      setSlots(slots.filter(s => !selectedSlots.has(s.id)))
      setSelectedSlots(new Set())
    }

    setIsSubmitting(false)
  }

  const canSubmit = getCurrentStudent() !== null && selectedSlots.size > 0

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
      <h2 className="text-2xl font-serif font-medium text-gray-800">生徒の予約を登録</h2>

      {result && (
        <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {result.success ? (
            <div className="flex items-center gap-2">
              <FiCheck className="w-5 h-5" />
              <span>{result.count}件の予約を登録しました</span>
            </div>
          ) : (
            <span>登録に失敗しました</span>
          )}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Student Selection */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <FiUser className="w-5 h-5" />
              生徒を選択
            </h3>

            {/* Mode Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setStudentMode('existing')}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  studentMode === 'existing'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                既存の生徒
              </button>
              <button
                onClick={() => setStudentMode('new')}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  studentMode === 'new'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                新規入力
              </button>
            </div>

            {studentMode === 'existing' ? (
              <div className="space-y-2">
                {existingStudents.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    まだ生徒の登録がありません
                  </p>
                ) : (
                  <select
                    value={selectedStudent?.email || ''}
                    onChange={(e) => {
                      const student = existingStudents.find(s => s.email === e.target.value)
                      setSelectedStudent(student || null)
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">生徒を選択してください</option>
                    {existingStudents.map((student, index) => (
                      <option key={index} value={student.email}>
                        {student.student_name}（{student.parent_name || '保護者名なし'}）
                      </option>
                    ))}
                  </select>
                )}

                {selectedStudent && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm space-y-1">
                    <p><span className="text-gray-500">生徒名:</span> {selectedStudent.student_name}</p>
                    <p><span className="text-gray-500">保護者名:</span> {selectedStudent.parent_name || '-'}</p>
                    <p><span className="text-gray-500">メール:</span> {selectedStudent.email}</p>
                    <p><span className="text-gray-500">電話:</span> {selectedStudent.phone}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">生徒名 *</label>
                  <input
                    type="text"
                    value={newStudent.student_name}
                    onChange={(e) => setNewStudent({ ...newStudent, student_name: e.target.value })}
                    placeholder="例: 田中 太郎"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">保護者名</label>
                  <input
                    type="text"
                    value={newStudent.parent_name}
                    onChange={(e) => setNewStudent({ ...newStudent, parent_name: e.target.value })}
                    placeholder="例: 田中 花子"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">メールアドレス *</label>
                  <input
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                    placeholder="例: tanaka@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">電話番号 *</label>
                  <input
                    type="tel"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="例: 090-1234-5678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Date Range Filter */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <FiCalendar className="w-5 h-5" />
              期間を絞り込み
            </h3>
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
        </div>

        {/* Available Slots */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">
              空き枠を選択
              <span className="text-primary-600 ml-2">
                ({selectedSlots.size}/{slots.length}件選択中)
              </span>
            </h3>
            <div className="flex gap-2">
              <button
                onClick={selectAll}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                全選択
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={clearSelection}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                解除
              </button>
            </div>
          </div>

          {slots.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>この期間に空き枠がありません</p>
              <p className="text-sm mt-2">期間を変更するか、空き枠を作成してください</p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left w-10"></th>
                    <th className="px-3 py-2 text-left text-gray-500">日付</th>
                    <th className="px-3 py-2 text-left text-gray-500">時間</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {slots.map((slot) => (
                    <tr
                      key={slot.id}
                      onClick={() => toggleSlot(slot.id)}
                      className={`cursor-pointer transition-colors ${
                        selectedSlots.has(slot.id)
                          ? 'bg-primary-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          checked={selectedSlots.has(slot.id)}
                          onChange={() => toggleSlot(slot.id)}
                          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        {format(parseISO(slot.date), 'M/d（E）', { locale: ja })}
                      </td>
                      <td className="px-3 py-2">
                        {slot.start_time.slice(0, 5)} 〜 {slot.end_time.slice(0, 5)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 pt-4 border-t">
            <button
              onClick={() => setShowConfirm(true)}
              disabled={!canSubmit || isSubmitting}
              className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? '登録中...' : `${selectedSlots.size}件の予約を登録する`}
            </button>
            {!canSubmit && selectedSlots.size > 0 && (
              <p className="text-sm text-red-500 mt-2 text-center">
                生徒を選択または入力してください
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Usage Guide */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-medium text-blue-800 mb-2">使い方</h3>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>生徒を選択（既存の生徒を選ぶか、新規に入力）</li>
          <li>必要に応じて期間を絞り込み</li>
          <li>予約したい空き枠にチェック</li>
          <li>「予約を登録する」をクリック</li>
        </ol>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        title="予約登録の確認"
        message={`${getCurrentStudent()?.student_name || ''}さんの予約を${selectedSlots.size}件登録します。よろしいですか？`}
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
