'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiMenu, FiX } from 'react-icons/fi'
import { PiPianoKeysFill } from 'react-icons/pi'

const navigation = [
  { name: 'ホーム', href: '/' },
  { name: '教室紹介', href: '/about' },
  { name: '講師紹介', href: '/teacher' },
  { name: 'レッスン・料金', href: '/lessons' },
  { name: 'アクセス', href: '/access' },
  { name: 'ブログ', href: '/blog' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <PiPianoKeysFill className="w-8 h-8 text-primary-600" />
            <span className="font-serif text-xl font-medium text-gray-800">
              AYCC piano school
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary-600 transition-colors text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/reservation" className="btn-primary text-sm py-2">
              予約する
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/reservation"
                className="btn-primary text-center mt-2"
                onClick={() => setIsOpen(false)}
              >
                予約する
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
