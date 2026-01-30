import Link from 'next/link'
import { PiPianoKeysFill } from 'react-icons/pi'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { SITE_NAME, SITE_DESCRIPTION, FOOTER_LINKS, CONTACT } from '@/lib/constants'

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
                {SITE_NAME}
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              {SITE_DESCRIPTION}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">メニュー</h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-4">お問い合わせ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <FiMapPin className="w-4 h-4 text-primary-400" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="w-4 h-4 text-primary-400" />
                <span>{CONTACT.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="w-4 h-4 text-primary-400" />
                <span>{CONTACT.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
