import Link from 'next/link'
import { FiCheck, FiMusic, FiHeart, FiAward } from 'react-icons/fi'
import { HeroSection } from '@/components/common'
import { RESERVATION_URL } from '@/lib/constants'

const values = [
  {
    icon: FiHeart,
    title: '一人ひとりに寄り添う',
    description: '生徒さんの個性やペースを大切にし、それぞれに合った指導を心がけています。',
  },
  {
    icon: FiMusic,
    title: '音楽を楽しむ心を育む',
    description: '技術だけでなく、音楽を心から楽しむ気持ちを大切に育てます。',
  },
  {
    icon: FiAward,
    title: '確実な上達をサポート',
    description: '基礎からしっかり、段階的に学べるカリキュラムで上達を実感できます。',
  },
]

const features = [
  '初心者から上級者まで、レベルに合わせた丁寧な指導',
  'お子様から大人の方まで、幅広い年齢層に対応',
  '振替レッスンはオンラインで簡単予約',
  '年1回の発表会で成果を披露',
  'アットホームな雰囲気で楽しくレッスン',
  '駅から徒歩5分の好立地',
]

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="教室紹介"
        subtitle="音楽を通じて豊かな心を育む、温かい雰囲気の教室です。"
      />

      {/* Introduction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="section-title">教室について</h2>
            <div className="text-gray-600 leading-relaxed space-y-4">
              <p>
                当ピアノ教室は、「音楽のある暮らしを、あなたに」をコンセプトに、
                一人ひとりの生徒さんに寄り添った丁寧なレッスンを提供しています。
              </p>
              <p>
                お子様の情操教育として、大人の方の趣味として、
                また本格的に音楽の道を目指す方まで、
                それぞれの目的やペースに合わせたレッスンを行っています。
              </p>
              <p>
                ピアノを通じて、音楽の楽しさ、表現する喜び、
                そして達成感を味わっていただければと思っています。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">大切にしていること</h2>
          <p className="section-subtitle">
            生徒さんが楽しく上達できるよう、3つのことを大切にしています。
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="font-medium text-xl mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">教室の特徴</h2>
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FiCheck className="w-4 h-4 text-accent-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-medium mb-6">
            まずは体験レッスンから
          </h2>
          <p className="text-primary-100 mb-8">
            教室の雰囲気やレッスンの進め方を、実際に体験してみませんか？
            <br />
            お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={RESERVATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors"
            >
              体験レッスンを予約する
            </a>
            <Link
              href="/teacher"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              講師紹介を見る
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
