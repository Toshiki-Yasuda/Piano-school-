'use client'

import { useState, useEffect } from 'react'
import { format, eachDayOfInterval, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FiTrash2, FiAlertCircle } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import ConfirmDialog from '@/components/ConfirmDialog'

interface TimeSlot {
  id: string
  date: string
  start_time: string
  end_time: string
  is_available: boolean
}

export default function BulkDelete() {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [slots, setSlots] = useState<TimeSlot[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; count: number } | null>(null)

  // Fetch slots when date range changes
  const handleSearch = async () => {
    if (!startDate || !endDate || !supabase) return

    setIsLoading(true)
    setResult(null)
    setSelectedIds(new Set())

    const { data, error } = await supabase
      .from('time_slots')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true })
      .order('start_time', { ascending: true })

    if (error) {
      console.error('Error fetching slots:', error)
      setSlots([])
    } else {
      setSlots(data || [])
    }
    setIsLoading(false)
  }

  // Toggle selection
  const toggleSelect = (id: string, isAvailable: boolean) => {
    if (!isAvailable) return // Can't select reserved slots

    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
  }

  // Select all available slots
  const selectAllAvailable = () => {
    const availableIds = slots.filter(s => s.is_available).map(s => s.id)
    setSelectedIds(new Set(availableIds))
  }

  // Clear selection
  const clearSelection = () => {
    setSelectedIds(new Set())
  }

  // Delete selected slots
  const handleDelete = async () => {
    if (!supabase || selectedIds.size === 0) return

    setIsDeleting(true)
    const idsToDelete = Array.from(selectedIds)

    const { error } = await supabase
      .from('time_slots')
      .delete()
      .in('id', idsToDelete)
      .eq('is_available', true) // Extra safety: only delete available slots

    if (error) {
      console.error('Error deleting slots:', error)
      setResult({ success: false, count: 0 })
    } else {
      setResult({ success: true, count: idsToDelete.length })
      setSlots(slots.filter(s => !selectedIds.has(s.id)))
      setSelectedIds(new Set())
    }

    setIsDeleting(false)
    setShowConfirm(false)
  }

  const availableCount = slots.filter(s => s.is_available).length
  const reservedCount = slots.filter(s => !s.is_available).length
  const selectedCount = selectedIds.size

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-medium text-gray-800">一括削除</h2>

      {/* Date Range Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="font-medium mb-4">期間を指定</h3>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">開始日</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">終了日</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={!startDate || !endDate || isLoading}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? '検索中...' : '検索'}
          </button>
        </div>
      </div>

      {/* Results */}
      {slots.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">検索結果</h3>
              <p className="text-sm text-gray-500 mt-1">
                予約可能: {availableCount}件 / 予約済み: {reservedCount}件
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={selectAllAvailable}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                予約可能を全選択
              </button>
              <button
                onClick={clearSelection}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                選択解除
              </button>
            </div>
          </div>

          {result && (
            <div className={`mb-4 p-4 rounded-lg ${result.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {result.success ? (
                <span>{result.count}件の空き時間を削除しました</span>
              ) : (
                <span>削除に失敗しました</span>
              )}
            </div>
          )}

          {reservedCount > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2">
              <FiAlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">
                予約済みの枠（グレー表示）は削除できません。
              </p>
            </div>
          )}

          <div className="max-h-96 overflow-y-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left w-12">選択</th>
                  <th className="px-4 py-2 text-left">日付</th>
                  <th className="px-4 py-2 text-left">時間</th>
                  <th className="px-4 py-2 text-left">状態</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {slots.map((slot) => (
                  <tr
                    key={slot.id}
                    className={`${
                      !slot.is_available
                        ? 'bg-gray-100 text-gray-400'
                        : selectedIds.has(slot.id)
                          ? 'bg-red-50'
                          : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(slot.id)}
                        onChange={() => toggleSelect(slot.id, slot.is_available)}
                        disabled={!slot.is_available}
                        className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {format(parseISO(slot.date), 'M/d（E）', { locale: ja })}
                    </td>
                    <td className="px-4 py-2">
                      {slot.start_time.slice(0, 5)} 〜 {slot.end_time.slice(0, 5)}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        slot.is_available
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {slot.is_available ? '予約可能' : '予約済み'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedCount > 0 && (
            <div className="mt-4 flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <p className="text-red-700">
                <strong>{selectedCount}件</strong>を選択中
              </p>
              <button
                onClick={() => setShowConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
                選択した枠を削除
              </button>
            </div>
          )}
        </div>
      )}

      {slots.length === 0 && startDate && endDate && !isLoading && (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center text-gray-500">
          指定された期間に空き時間がありません
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        title="一括削除の確認"
        message={`${selectedCount}件の空き時間を削除します。この操作は取り消せません。本当に削除しますか？`}
        confirmLabel={isDeleting ? '削除中...' : '削除する'}
        cancelLabel="キャンセル"
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
        isDestructive
      />
    </div>
  )
}
