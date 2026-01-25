import Link from 'next/link'
import Image from 'next/image'
import { FiCalendar, FiMusic, FiHeart, FiUsers } from 'react-icons/fi'

const features = [
  {
    icon: FiHeart,
    title: '一人ひとりに寄り添うレッスン',
    description: '生徒さんのペースに合わせた丁寧な指導で、確実に上達をサポートします。',
  },
  {
    icon: FiUsers,
    title: '幅広い年齢層に対応',
    description: 'お子様から大人の方まで、初心者から上級者まで、どなたでも歓迎します。',
  },
  {
    icon: FiCalendar,
    title: '便利な振替予約システム',
    description: 'オンラインで簡単に振替レッスンの予約ができます。24時間いつでもOK。',
  },
  {
    icon: FiMusic,
    title: '発表会・イベント',
    description: '年に一度の発表会や季節のイベントで、日頃の成果を披露する機会があります。',
  },
]

const blogPosts = [
  {
    id: 1,
    title: '発表会に向けて練習中です',
    excerpt: '来月の発表会に向けて、生徒さんたちが一生懸命練習しています。今年のテーマは...',
    date: '2025年1月20日',
    image: '/images/blog-placeholder.jpg',
  },
  {
    id: 2,
    title: '新しい教材を導入しました',
    excerpt: '初心者の方にもわかりやすい、新しい教材を導入しました。楽しみながら...',
    date: '2025年1月15日',
    image: '/images/blog-placeholder.jpg',
  },
  {
    id: 3,
    title: 'クリスマスコンサートを開催しました',
    excerpt: '先日、教室でクリスマスコンサートを開催しました。生徒さんたちの素敵な演奏...',
    date: '2025年1月10日',
    image: '/images/blog-placeholder.jpg',
  },
]

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 bg-primary-300 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-60 h-60 bg-accent-300 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-gray-800 leading-tight mb-6">
                音楽のある暮らしを、<span className="text-primary-600">あなたに</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                一人ひとりに寄り添う丁寧なレッスンで、
                <br className="hidden sm:block" />
                音楽の楽しさをお届けします。
                <br className="hidden sm:block" />
                ピアノを通じて、豊かな心を育みましょう。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/reservation" className="btn-primary text-center">
                  レッスンを予約する
                </Link>
                <Link href="/about" className="btn-outline text-center">
                  教室について詳しく
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] bg-white rounded-3xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/hero.png"
                  alt="ピアノレッスンの様子"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">教室の特徴</h2>
          <p className="section-subtitle">
            生徒さん一人ひとりの目標や夢に寄り添いながら、
            楽しく確実に上達できるレッスンを提供しています。
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            振替レッスンのご予約
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            オンラインで24時間いつでも、簡単に振替レッスンのご予約ができます。
            <br className="hidden sm:block" />
            空き状況をカレンダーで確認して、ご都合の良い日時をお選びください。
          </p>
          <Link
            href="/reservation"
            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors duration-200"
          >
            予約カレンダーを見る
          </Link>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">教室ブログ</h2>
          <p className="section-subtitle">
            教室の日常やレッスンの様子、イベント情報などをお届けします。
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link href={`/blog/${post.id}`} key={post.id} className="card group">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                  <FiMusic className="w-16 h-16 text-primary-300 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="font-medium text-lg mb-2 group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog" className="btn-outline">
              ブログ一覧を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title">お問い合わせ</h2>
          <p className="section-subtitle">
            体験レッスンのお申し込みや、ご質問・ご相談など、お気軽にお問い合わせください。
          </p>

          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="font-medium text-lg mb-4">レッスン時間</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>月曜日 〜 金曜日: 14:00 〜 20:00</li>
                  <li>土曜日: 10:00 〜 18:00</li>
                  <li>日曜日・祝日: お休み</li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-lg mb-4">お問い合わせ方法</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>電話: 03-0000-0000</li>
                  <li>メール: info@piano-school.example.com</li>
                  <li>LINE: @piano-school</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
