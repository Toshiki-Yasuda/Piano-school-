import Link from 'next/link'

interface CtaSectionProps {
  title?: string
  description?: string
  buttonText?: string
  buttonHref?: string
  variant?: 'primary' | 'secondary'
}

export default function CtaSection({
  title = 'まずは体験レッスンから',
  description = '体験レッスンは1回30分、1,000円で受講いただけます。\nご入会いただいた場合は、入会金から差し引きいたします。',
  buttonText = '体験レッスンを予約する',
  buttonHref = '/reservation',
  variant = 'primary',
}: CtaSectionProps) {
  const bgClass = variant === 'primary'
    ? 'bg-primary-600 text-white'
    : 'bg-gray-50 text-gray-800'

  const textClass = variant === 'primary'
    ? 'text-primary-100'
    : 'text-gray-600'

  const buttonClass = variant === 'primary'
    ? 'bg-white text-primary-600 hover:bg-primary-50'
    : 'bg-primary-600 text-white hover:bg-primary-700'

  return (
    <section className={`py-12 sm:py-20 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-serif font-medium mb-4 sm:mb-6">
          {title}
        </h2>
        <p className={`text-sm sm:text-base ${textClass} mb-6 sm:mb-8 whitespace-pre-line`}>
          {description}
        </p>
        <Link
          href={buttonHref}
          className={`inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium transition-colors ${buttonClass}`}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  )
}
