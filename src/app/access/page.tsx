import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import { FaTrain, FaCar } from 'react-icons/fa'

export default function AccessPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-800 mb-6">
              アクセス
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              駅から徒歩5分、通いやすい立地です。
            </p>
          </div>
        </div>
      </section>

      {/* Map & Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="bg-gray-200 rounded-2xl aspect-square lg:aspect-auto lg:h-full min-h-[400px] flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FiMapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p>Google Map</p>
                <p className="text-sm">（実際の地図がここに表示されます）</p>
              </div>
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
                        〒000-0000
                        <br />
                        東京都○○区○○1丁目2-3
                        <br />
                        ○○ビル 3F
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">電話番号</h3>
                      <p className="text-gray-600">03-0000-0000</p>
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
                  <span>○○線「○○駅」東口より徒歩5分</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
                  <span>○○線「△△駅」北口より徒歩8分</span>
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
            ○○駅東口から、徒歩約5分です。
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
              03-0000-0000（レッスン中は出られない場合があります）
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
