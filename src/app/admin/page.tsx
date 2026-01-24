'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FiClock, FiUsers, FiCalendar, FiArrowRight } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

interface Stats {
  totalSlots: number
  availableSlots: number
  totalReservations: number
  upcomingReservations: number
}

interface RecentReservation {
  id: string
  student_name: string
  date: string
  start_time: string
  created_at: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalSlots: 0,
    availableSlots: 0,
    totalReservations: 0,
    upcomingReservations: 0,
  })
  const [recentReservations, setRecentReservations] = useState<RecentReservation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!supabase) {
        setIsLoading(false)
        return
      }

      const today = format(new Date(), 'yyyy-MM-dd')

      // Fetch stats
      const [slotsResult, availableSlotsResult, reservationsResult, upcomingResult, recentResult] = await Promise.all([
        supabase.from('time_slots').select('id', { count: 'exact' }),
        supabase.from('time_slots').select('id', { count: 'exact' }).eq('is_available', true).gte('date', today),
        supabase.from('reservations').select('id', { count: 'exact' }),
        supabase.from('reservations').select('id', { count: 'exact' }).gte('date', today),
        supabase.from('reservations').select('*').order('created_at', { ascending: false }).limit(5),
      ])

      setStats({
        totalSlots: slotsResult.count || 0,
        availableSlots: availableSlotsResult.count || 0,
        totalReservations: reservationsResult.count || 0,
        upcomingReservations: upcomingResult.count || 0,
      })

      setRecentReservations(recentResult.data || [])
      setIsLoading(false)
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mx-auto"></div>
        <p className="mt-4 text-gray-600">読み込み中...</p>
      </div>
    )
  }

  if (!supabase) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <p className="text-gray-600">Supabaseが設定されていません。</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-medium text-gray-800">ダッシュボード</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiClock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">登録済み枠</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalSlots}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">予約可能枠</p>
              <p className="text-2xl font-bold text-gray-800">{stats.availableSlots}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">総予約数</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalReservations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FiCalendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">今後の予約</p>
              <p className="text-2xl font-bold text-gray-800">{stats.upcomingReservations}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Link
          href="/admin/slots"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">空き時間を登録する</h3>
              <p className="text-sm text-gray-500">
                カレンダーから日時を選んで空き時間を設定
              </p>
            </div>
            <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </div>
        </Link>

        <Link
          href="/admin/bulk"
          className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">一括で登録する</h3>
              <p className="text-sm text-gray-500">
                曜日と時間を指定して複数の枠を一度に登録
              </p>
            </div>
            <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
          </div>
        </Link>
      </div>

      {/* Recent Reservations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-800">最近の予約</h3>
          <Link href="/admin/reservations" className="text-sm text-primary-600 hover:text-primary-700">
            すべて見る →
          </Link>
        </div>

        {recentReservations.length === 0 ? (
          <p className="text-gray-500 text-center py-8">まだ予約がありません</p>
        ) : (
          <div className="divide-y">
            {recentReservations.map((reservation) => (
              <div key={reservation.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{reservation.student_name}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(reservation.date), 'M月d日（E）', { locale: ja })} {reservation.start_time.slice(0, 5)}
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  {format(new Date(reservation.created_at), 'M/d HH:mm')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
