'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FiCalendar, FiClock, FiList, FiHome, FiLogOut, FiTrash2, FiUserPlus } from 'react-icons/fi'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const navItems = [
    { href: '/admin', label: 'ダッシュボード', icon: FiHome },
    { href: '/admin/slots', label: '空き時間管理', icon: FiClock },
    { href: '/admin/reservations', label: '予約一覧', icon: FiList },
    { href: '/admin/bulk', label: '空き枠を作成', icon: FiCalendar },
    { href: '/admin/bulk-delete', label: '空き枠を整理', icon: FiTrash2 },
    { href: '/admin/book', label: '生徒の予約登録', icon: FiUserPlus },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-serif font-medium text-gray-800">
              🎹 ピアノ教室 管理画面
            </h1>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-primary-600 hover:text-primary-700">
                ← サイトに戻る
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              >
                <FiLogOut className="w-4 h-4" />
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <nav className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
