import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import { FaTrain, FaCar } from 'react-icons/fa'
import { HeroSection } from '@/components/common'

export default function AccessPage() {
  return (
    <>
      <HeroSection
        title="アクセス"
        subtitle="駅から徒歩5分、通いやすい立地です。"
      />

      {/* Map & Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden aspect-square lg:aspect-auto lg:h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2914.4751098144396!2d141.3489506!3d43.0686606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b299a1f7a2a8d%3A0x6f5c3e5e5f5c3e5e!2z5pyt5bm06aeF!5e0!3m2!1sja!2sjp!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6">
                  教室情報
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">住所</h3>
                      <p className="text-gray-600">
                        〒060-0806
                        <br />
                        北海道札幌市北区北6条西4丁目
                        <br />
                        JR札幌駅
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">電話番号</h3>
                      <p className="text-gray-600">011-000-0000</p>
                      <p className="text-sm text-gray-500">
                        レッスン中は出られない場合があります
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">メールアドレス</h3>
                      <p className="text-gray-600">info@piano-school.example.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiClock className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">レッスン時間</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>月〜金: 14:00 〜 20:00</p>
                        <p>土: 10:00 〜 18:00</p>
                        <p>日・祝: お休み</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">アクセス方法</h2>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* By Train */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                  <FaTrain className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-medium">電車でお越しの方</h3>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
                  <span>JR各線「札幌駅」西改札口より徒歩1分</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
                  <span>地下鉄南北線・東豊線「さっぽろ駅」より徒歩3分</span>
                </li>
              </ul>
            </div>

            {/* By Car */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                  <FaCar className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-xl font-medium">お車でお越しの方</h3>
              </div>
              <div className="text-gray-600 space-y-4">
                <p>
                  専用駐車場はございません。
                  <br />
                  近隣のコインパーキングをご利用ください。
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-sm mb-2">近隣駐車場</p>
                  <ul className="text-sm space-y-1">
                    <li>・タイムズ○○（徒歩1分）</li>
                    <li>・リパーク○○（徒歩2分）</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directions Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">駅からの道順</h2>
          <p className="section-subtitle">
            JR札幌駅西改札口から、徒歩約1分です。
          </p>

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">東口を出て右へ</p>
                <p className="text-gray-600 text-sm">
                  改札を出たら東口方面へ。階段を降りて右に進みます。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">大通りを直進</p>
                <p className="text-gray-600 text-sm">
                  商店街を抜けて大通りに出たら、そのまま直進します（約3分）。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">コンビニを左折</p>
                <p className="text-gray-600 text-sm">
                  セブンイレブンが見えたら左折。50mほど進みます。
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <p className="font-medium mb-2">○○ビル3Fが教室です</p>
                <p className="text-gray-600 text-sm">
                  茶色いビル「○○ビル」の3階が当教室です。エレベーターでお上がりください。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-primary-50 rounded-2xl p-6">
            <p className="text-primary-800 text-sm">
              <strong>迷われた場合は</strong>お気軽にお電話ください。
              <br />
              011-000-0000（レッスン中は出られない場合があります）
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
