import Link from 'next/link'
import Image from 'next/image'
import { FiMusic, FiAward, FiBookOpen } from 'react-icons/fi'
import { HeroSection } from '@/components/common'

const qualifications = [
  '○○音楽大学 ピアノ科 卒業',
  '全日本ピアノ指導者協会（PTNA）正会員',
  'ヤマハ演奏グレード5級取得',
  '指導歴15年以上',
]

const teachingStyle = [
  {
    icon: FiMusic,
    title: '楽しさを大切に',
    description: '音楽の楽しさを伝えることを第一に、明るく楽しいレッスンを心がけています。',
  },
  {
    icon: FiBookOpen,
    title: '基礎からしっかり',
    description: '正しい姿勢や指の使い方など、基礎を大切にした指導を行います。',
  },
  {
    icon: FiAward,
    title: '目標に向かって',
    description: 'コンクールや発表会など、それぞれの目標に向けたサポートをします。',
  },
]

export default function TeacherPage() {
  return (
    <>
      <HeroSection
        title="講師紹介"
        subtitle="ピアノを通じて、音楽の素晴らしさをお伝えします。"
      />

      {/* Teacher Profile Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/Images/teacher.png"
                  alt="講師 英和医 詞伊子"
                  width={768}
                  height={512}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg p-4">
                <p className="text-sm text-gray-500">指導歴</p>
                <p className="text-2xl font-bold text-primary-600">15年以上</p>
              </div>
            </div>

            {/* Profile */}
            <div>
              <h2 className="text-3xl font-serif font-medium text-gray-800 mb-1">
                英和医 詞伊子
              </h2>
              <p className="text-sm text-gray-500 mb-2">えいわい しいこ</p>
              <p className="text-primary-600 mb-6">ピアノ講師</p>

              <div className="prose prose-gray">
                <p className="text-gray-600 leading-relaxed mb-6">
                  幼少期よりピアノを始め、音楽大学でピアノを専攻。
                  卒業後は演奏活動を行いながら、ピアノ指導の道へ。
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  「音楽を楽しむ心を育てたい」という想いで、
                  一人ひとりの生徒さんに寄り添った指導を心がけています。
                  小さなお子様から大人の方まで、初心者から上級者まで、
                  幅広くレッスンを行っています。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  生徒さんが「ピアノって楽しい！」と思えるような
                  レッスンを目指しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">経歴・資格</h2>
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <ul className="space-y-4">
              {qualifications.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiAward className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Teaching Style Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">指導方針</h2>
          <p className="section-subtitle">
            生徒さんが楽しみながら確実に上達できるよう、
            以下の3点を大切にしています。
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {teachingStyle.map((item, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-accent-600" />
                </div>
                <h3 className="font-medium text-lg mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6 text-center">
              講師からのメッセージ
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed text-center">
                「ピアノを弾いてみたい」「もっと上手になりたい」
                <br />
                そんな気持ちを、私は全力でサポートします。
              </p>
              <p className="text-gray-600 leading-relaxed text-center mt-4">
                最初は誰でも初心者です。一歩ずつ、一緒に歩んでいきましょう。
                <br />
                ピアノを通じて、音楽のある豊かな毎日を送っていただければ嬉しいです。
              </p>
              <p className="text-gray-600 leading-relaxed text-center mt-4">
                体験レッスンでお会いできることを楽しみにしています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-medium mb-6">
            体験レッスン受付中
          </h2>
          <p className="text-primary-100 mb-8">
            まずは体験レッスンで、教室の雰囲気を感じてみてください。
          </p>
          <Link
            href="/reservation"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors"
          >
            体験レッスンを予約する
          </Link>
        </div>
      </section>
    </>
  )
}
