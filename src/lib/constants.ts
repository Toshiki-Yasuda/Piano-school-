// ============================================
// Site Information
// ============================================

export const SITE_NAME = 'AYCC piano school'
export const SITE_TAGLINE = '音楽のある暮らしを、あなたに。'
export const SITE_DESCRIPTION = '一人ひとりに寄り添う丁寧なレッスンで、音楽の楽しさをお届けします。'

// ============================================
// Contact Information
// ============================================

export const CONTACT = {
  address: '〒000-0000 東京都○○区○○1-2-3',
  phone: '03-0000-0000',
  email: 'info@piano-school.example.com',
} as const

// ============================================
// Navigation
// ============================================

export const NAVIGATION = [
  { name: 'ホーム', href: '/' },
  { name: '教室紹介', href: '/about' },
  { name: '講師紹介', href: '/teacher' },
  { name: 'レッスン・料金', href: '/lessons' },
  { name: 'アクセス', href: '/access' },
  { name: 'ブログ', href: '/blog' },
] as const

export const FOOTER_LINKS = [
  { name: '教室紹介', href: '/about' },
  { name: '講師紹介', href: '/teacher' },
  { name: 'レッスン・料金', href: '/lessons' },
  { name: 'アクセス', href: '/access' },
  { name: 'ブログ', href: '/blog' },
  { name: '予約', href: '/reservation' },
] as const

// ============================================
// Lesson Plans
// ============================================

export interface LessonPlan {
  name: string
  age: string
  duration: string
  price: string
  frequency: string
  features: string[]
  popular: boolean
}

export const LESSON_PLANS: LessonPlan[] = [
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

// ============================================
// Pricing
// ============================================

export const PRICING = {
  enrollmentFee: '5,000円',
  materialFee: '約3,000円/年',
  trialLesson: '1,000円',
} as const

// ============================================
// School Hours
// ============================================

export const SCHOOL_HOURS = [
  { day: '月曜日〜金曜日', time: '14:00 〜 20:00', note: '最終レッスン 19:00〜' },
  { day: '土曜日', time: '10:00 〜 18:00', note: '最終レッスン 17:00〜' },
  { day: '日曜日・祝日', time: 'お休み', note: '' },
] as const

// ============================================
// FAQ
// ============================================

export interface FAQItem {
  question: string
  answer: string
}

export const FAQ: FAQItem[] = [
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

// ============================================
// Admin Navigation
// ============================================

export const ADMIN_NAVIGATION = [
  { href: '/admin', label: 'ダッシュボード', shortLabel: 'ホーム' },
  { href: '/admin/slots', label: '空き時間管理', shortLabel: '空き時間' },
  { href: '/admin/reservations', label: '予約一覧', shortLabel: '予約' },
  { href: '/admin/bulk', label: '空き枠を作成', shortLabel: '作成' },
  { href: '/admin/bulk-delete', label: '空き枠を整理', shortLabel: '整理' },
  { href: '/admin/book', label: '生徒の予約登録', shortLabel: '代理予約' },
] as const

// ============================================
// Weekdays (for bulk operations)
// ============================================

export const WEEKDAYS = [
  { value: 0, label: '日曜日' },
  { value: 1, label: '月曜日' },
  { value: 2, label: '火曜日' },
  { value: 3, label: '水曜日' },
  { value: 4, label: '木曜日' },
  { value: 5, label: '金曜日' },
  { value: 6, label: '土曜日' },
] as const
