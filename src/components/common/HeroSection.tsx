interface HeroSectionProps {
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function HeroSection({ title, subtitle, size = 'md' }: HeroSectionProps) {
  const paddingClass = {
    sm: 'py-12',
    md: 'py-12 sm:py-20',
    lg: 'py-16 sm:py-24',
  }[size]

  const titleClass = {
    sm: 'text-2xl sm:text-3xl md:text-4xl',
    md: 'text-3xl sm:text-4xl md:text-5xl',
    lg: 'text-4xl sm:text-5xl md:text-6xl',
  }[size]

  return (
    <section className={`bg-gradient-to-br from-primary-50 to-accent-50 ${paddingClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className={`${titleClass} font-serif font-medium text-gray-800 mb-4 sm:mb-6`}>
            {title}
          </h1>
          {subtitle && (
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
