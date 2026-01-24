'use client'

import { useState, useEffect } from 'react'
import { format, parseISO } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FiCalendar, FiUser, FiClock, FiMail, FiPhone, FiMessageSquare, FiX } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'
import ConfirmDialog from '@/components/ConfirmDialog'

interface Reservation {
  id: string
  student_name: string
  parent_name: string
  email: string
  phone: string
  date: string
  start_time: string
  end_time: string
  message: string | null
  created_at: string
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming')
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [cancelTarget, setCancelTarget] = useState<Reservation | null>(null)
  const [isCancelling, setIsCancelling] = useState(false)

  const handleCancelReservation = async () => {
    if (!cancelTarget) return

    setIsCancelling(true)
    try {
      const res = await fetch('/api/reservation/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationId: cancelTarget.id }),
      })

      if (res.ok) {
        // Remove from local state
        setReservations(reservations.filter(r => r.id !== cancelTarget.id))
        setSelectedReservation(null)
      } else {
        alert('キャンセルに失敗しました')
      }
    } catch (error) {
      console.error('Cancel error:', error)
      alert('キャンセルに失敗しました')
    } finally {
      setIsCancelling(false)
      setCancelTarget(null)
    }
  }

  useEffect(() => {
    const fetchReservations = async () => {
      if (!supabase) {
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('reservations')
        .select('*, time_slots(date, start_time, end_time)')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching reservations:', error)
        setReservations([])
      } else {
        // Process to get date from time_slots if not in reservations
        const processed = (data || []).map((r: any) => ({
          ...r,
          date: r.date || r.time_slots?.date,
          start_time: r.start_time || r.time_slots?.start_time,
          end_time: r.end_time || r.time_slots?.end_time,
        }))
        setReservations(processed)
      }
      setIsLoading(false)
    }

    fetchReservations()
  }, [])

  const today = format(new Date(), 'yyyy-MM-dd')

  const filteredReservations = reservations.filter((r) => {
    if (!r.date) return filter === 'all'
    if (filter === 'upcoming') return r.date >= today
    if (filter === 'past') return r.date < today
    return true
  })

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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-medium text-gray-800">予約一覧</h2>

        {/* Filter Tabs */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          {[
            { value: 'upcoming', label: '今後の予約' },
            { value: 'past', label: '過去の予約' },
            { value: 'all', label: 'すべて' },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value as typeof filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === tab.value
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {filteredReservations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">
            {filter === 'upcoming' ? '今後の予約はありません' :
             filter === 'past' ? '過去の予約はありません' : '予約がありません'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    日時
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    生徒名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    保護者名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    連絡先
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    予約日
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    詳細
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-800">
                            {reservation.date ? format(parseISO(reservation.date), 'M月d日（E）', { locale: ja }) : '日付不明'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {reservation.start_time?.slice(0, 5)} 〜 {reservation.end_time?.slice(0, 5)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-800">{reservation.student_name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-gray-600">{reservation.parent_name}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-600">{reservation.email}</p>
                      <p className="text-sm text-gray-500">{reservation.phone}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {reservation.created_at ? format(parseISO(reservation.created_at), 'M/d HH:mm') : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => setSelectedReservation(reservation)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        詳細
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">予約詳細</h3>
              <button
                onClick={() => setSelectedReservation(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiCalendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">日時</p>
                  <p className="font-medium">
                    {selectedReservation.date ? format(parseISO(selectedReservation.date), 'yyyy年M月d日（E）', { locale: ja }) : '日付不明'}
                  </p>
                  <p className="text-gray-600">
                    {selectedReservation.start_time?.slice(0, 5)} 〜 {selectedReservation.end_time?.slice(0, 5)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiUser className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">生徒名</p>
                  <p className="font-medium">{selectedReservation.student_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiUser className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">保護者名</p>
                  <p className="font-medium">{selectedReservation.parent_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">メールアドレス</p>
                  <p className="font-medium">{selectedReservation.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">電話番号</p>
                  <p className="font-medium">{selectedReservation.phone}</p>
                </div>
              </div>

              {selectedReservation.message && (
                <div className="flex items-start gap-3">
                  <FiMessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">メッセージ</p>
                    <p className="font-medium whitespace-pre-wrap">{selectedReservation.message}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <FiClock className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">予約受付日時</p>
                  <p className="font-medium">
                    {selectedReservation.created_at ? format(parseISO(selectedReservation.created_at), 'yyyy年M月d日 HH:mm', { locale: ja }) : ''}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t flex gap-3">
              <button
                onClick={() => setSelectedReservation(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                閉じる
              </button>
              <button
                onClick={() => setCancelTarget(selectedReservation)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <FiX className="w-4 h-4" />
                予約をキャンセル
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!cancelTarget}
        title="予約のキャンセル"
        message={cancelTarget ? `${cancelTarget.student_name}さんの予約をキャンセルしますか？キャンセルすると空き枠に戻ります。` : ''}
        confirmLabel={isCancelling ? 'キャンセル中...' : 'キャンセルする'}
        cancelLabel="戻る"
        onConfirm={handleCancelReservation}
        onCancel={() => setCancelTarget(null)}
        isDestructive
      />
    </div>
  )
}
