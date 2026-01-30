import Link from 'next/link'
import { PiPianoKeysFill } from 'react-icons/pi'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <PiPianoKeysFill className="w-8 h-8 text-primary-400" />
              <span className="font-serif text-xl font-medium text-white">
                AYCCピアノ教室
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              音楽のある暮らしを、あなたに。
              <br />
              一人ひとりに寄り添う丁寧なレッスンで、
              <br />
              音楽の楽しさをお届けします。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">メニュー</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">
                  教室紹介
                </Link>
              </li>
              <li>
                <Link href="/teacher" className="hover:text-primary-400 transition-colors">
                  講師紹介
                </Link>
              </li>
              <li>
                <Link href="/lessons" className="hover:text-primary-400 transition-colors">
                  レッスン・料金
                </Link>
              </li>
              <li>
                <Link href="/access" className="hover:text-primary-400 transition-colors">
                  アクセス
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">
                  ブログ
                </Link>
              </li>
              <li>
                <Link href="/reservation" className="hover:text-primary-400 transition-colors">
                  予約
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4">お問い合わせ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-primary-400" />
                <span>〒000-0000 東京都○○区○○1-2-3</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-primary-400" />
                <span>03-0000-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-primary-400" />
                <span>info@piano-school.example.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} AYCCピアノ教室. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
