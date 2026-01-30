import { FiCheck, FiClock, FiCalendar } from 'react-icons/fi'
import { HeroSection, CtaSection } from '@/components/common'
import { LESSON_PLANS, FAQ, SCHOOL_HOURS, PRICING } from '@/lib/constants'

export default function LessonsPage() {
  return (
    <>
      <HeroSection
        title="レッスン・料金"
        subtitle="年齢やレベルに合わせたコースをご用意しています。"
      />

      {/* Lesson Plans Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">コース・料金</h2>
          <p className="section-subtitle">
            お子様から大人の方まで、それぞれに合ったコースをご用意しています。
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
            {LESSON_PLANS.map((plan, index) => (
              <div
                key={index}
                className={`card relative overflow-visible ${
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
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">料金について</h2>
          <div className="mt-8 sm:mt-12 bg-white rounded-2xl p-4 sm:p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-lg mb-4">入会金</h3>
                <p className="text-3xl font-bold text-primary-600 mb-2">{PRICING.enrollmentFee}</p>
                <p className="text-gray-500 text-sm">初回のみ</p>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-4">教材費</h3>
                <p className="text-3xl font-bold text-primary-600 mb-2">{PRICING.materialFee}</p>
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
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">レッスン時間</h2>
          <div className="mt-8 sm:mt-12 bg-gray-50 rounded-2xl p-4 sm:p-8">
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">曜日</th>
                    <th className="text-left py-3 px-4 font-medium">時間</th>
                    <th className="text-left py-3 px-4 font-medium">備考</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHOOL_HOURS.map((row, index) => (
                    <tr key={index} className={index < SCHOOL_HOURS.length - 1 ? 'border-b' : ''}>
                      <td className="py-3 px-4">{row.day}</td>
                      <td className={`py-3 px-4 ${row.time === 'お休み' ? 'text-gray-500' : ''}`}>
                        {row.time}
                      </td>
                      <td className="py-3 px-4 text-gray-500">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile Stack View */}
            <div className="sm:hidden space-y-4">
              {SCHOOL_HOURS.map((row, index) => (
                <div key={index} className={index < SCHOOL_HOURS.length - 1 ? 'border-b pb-4' : ''}>
                  <p className="font-medium text-gray-800">{row.day}</p>
                  <p className={row.time === 'お休み' ? 'text-gray-500' : 'text-gray-600'}>
                    {row.time}
                  </p>
                  {row.note && <p className="text-sm text-gray-500">{row.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">よくあるご質問</h2>
          <div className="mt-8 sm:mt-12 space-y-3 sm:space-y-4">
            {FAQ.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                <h3 className="font-medium text-base sm:text-lg mb-2 sm:mb-3 flex items-start gap-2 sm:gap-3">
                  <span className="text-primary-600 font-bold">Q.</span>
                  {item.question}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 pl-5 sm:pl-7">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
