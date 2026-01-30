interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  fullPage?: boolean
}

export default function LoadingSpinner({
  size = 'md',
  message = '読み込み中...',
  fullPage = false
}: LoadingSpinnerProps) {
  const sizeClass = {
    sm: 'h-8 w-8 border-2',
    md: 'h-12 w-12 border-4',
    lg: 'h-16 w-16 border-4',
  }[size]

  const content = (
    <div className="text-center">
      <div
        className={`animate-spin rounded-full border-primary-600 border-t-transparent mx-auto ${sizeClass}`}
      />
      {message && (
        <p className="mt-4 text-gray-600">{message}</p>
      )}
    </div>
  )

  if (fullPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="max-w-xl mx-auto px-4">
          {content}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      {content}
    </div>
  )
}
