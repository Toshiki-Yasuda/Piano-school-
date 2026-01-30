import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'AYCCピアノ教室 | 音楽のある暮らしを、あなたに',
  description: '一人ひとりに寄り添う丁寧なレッスンで、音楽の楽しさをお届けします。初心者から上級者まで、お子様から大人の方まで幅広く対応。振替レッスンもオンラインで簡単予約。',
  keywords: 'ピアノ教室, ピアノレッスン, 音楽教室, 子供, 大人, 初心者',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
