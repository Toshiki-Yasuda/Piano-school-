import Link from 'next/link'
import { FiCheck, FiClock, FiCalendar } from 'react-icons/fi'

const lessonPlans = [
  {
    name: '幼児コース',
    age: '4歳〜6歳',
    duration: '30分',
    price: '7,000円/月',
    frequency: '年間42回',
    features: [
      'リトミックを取り入れた楽しいレッスン',
      '音感・リズム感を養う',
      '正しい姿勢・指の形を身につける',
      '簡単な曲が弾けるようになる',
    ],
    popular: false,
  },
  {
    name: '小学生コース',
    age: '小学1年生〜6年生',
    duration: '40分',
    price: '8,000円/月',
    frequency: '年間42回',
    features: [
      '基礎からしっかり学べる',
      '読譜力・表現力を養う',
      'コンクール・発表会対応',
      '好きな曲にもチャレンジ',
    ],
    popular: true,
  },
  {
    name: '中高生コース',
    age: '中学生〜高校生',
    duration: '45分',
    price: '9,000円/月',
    frequency: '年間42回',
    features: [
      '部活や勉強と両立できる柔軟なスケジュール',
      '受験対策・音大進学サポート',
      'クラシックからポップスまで幅広く',
      '高度な表現技術を習得',
    ],
    popular: false,
  },
  {
    name: '大人コース',
    age: '大学生・社会人・シニア',
    duration: '45分',
    price: '9,000円/月',
    frequency: '月2回〜',
    features: [
      '初心者大歓迎',
      '好きな曲から始められる',
      '忙しい方も安心の振替制度',
      '趣味として楽しく続けられる',
    ],
    popular: false,
  },
]

const faq = [
  {
    question: '楽器を持っていないのですが、始められますか？',
    answer: '最初はキーボードでも大丈夫です。上達に合わせて、ピアノの購入をご検討ください。楽器選びのアドバイスもいたします。',
  },
  {
    question: '振替レッスンはできますか？',
    answer: 'はい、可能です。レッスン日の前日までにご連絡いただければ、別の日に振替いたします。オンラインで簡単に予約できます。',
  },
  {
    question: '発表会は必ず参加しなければいけませんか？',
    answer: '参加は任意です。ただ、目標を持って練習することで上達も早まりますので、ぜひチャレンジしていただければと思います。',
  },
  {
    question: '月謝以外にかかる費用はありますか？',
    answer: '入会金5,000円と、教材費（年間3,000円程度）がかかります。発表会参加費は別途ご案内します。',
  },
]

export default function LessonsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-800 mb-6">
              レッスン・料金
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              年齢やレベルに合わせたコースをご用意しています。
            </p>
          </div>
        </div>
      </section>

      {/* Lesson Plans Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">コース・料金</h2>
          <p className="section-subtitle">
            お子様から大人の方まで、それぞれに合ったコースをご用意しています。
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
            {lessonPlans.map((plan, index) => (
              <div
                key={index}
                className={`card relative ${
                  plan.popular ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-500 text-white text-xs px-3 py-1 rounded-full">
                    人気
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-800 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{plan.age}</p>

                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-primary-600">
                      {plan.price.split('/')[0]}
                    </span>
                    <span className="text-gray-500">/月</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      <span>{plan.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>{plan.frequency}</span>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <FiCheck className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">料金について</h2>
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-lg mb-4">入会金</h3>
                <p className="text-3xl font-bold text-primary-600 mb-2">5,000円</p>
                <p className="text-gray-500 text-sm">初回のみ</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-4">教材費</h3>
                <p className="text-3xl font-bold text-primary-600 mb-2">約3,000円/年</p>
                <p className="text-gray-500 text-sm">進度により異なります</p>
              </div>
            </div>

            <div className="border-t mt-8 pt-8">
              <h3 className="font-medium text-lg mb-4">お支払い方法</h3>
              <p className="text-gray-600">
                月謝は毎月初めに現金または銀行振込でお支払いください。
                <br />
                クレジットカード払いには対応しておりません。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">レッスン時間</h2>
          <div className="mt-12 bg-gray-50 rounded-2xl p-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">曜日</th>
                    <th className="text-left py-3 px-4 font-medium">時間</th>
                    <th className="text-left py-3 px-4 font-medium">備考</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">月曜日〜金曜日</td>
                    <td className="py-3 px-4">14:00 〜 20:00</td>
                    <td className="py-3 px-4 text-gray-500">最終レッスン 19:00〜</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">土曜日</td>
                    <td className="py-3 px-4">10:00 〜 18:00</td>
                    <td className="py-3 px-4 text-gray-500">最終レッスン 17:00〜</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">日曜日・祝日</td>
                    <td className="py-3 px-4 text-gray-500" colSpan={2}>お休み</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">よくあるご質問</h2>
          <div className="mt-12 space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-medium text-lg mb-3 flex items-start gap-3">
                  <span className="text-primary-600 font-bold">Q.</span>
                  {item.question}
                </h3>
                <p className="text-gray-600 pl-7">{item.answer}</p>
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
            体験レッスンは1回30分、1,000円で受講いただけます。
            <br />
            ご入会いただいた場合は、入会金から差し引きいたします。
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
