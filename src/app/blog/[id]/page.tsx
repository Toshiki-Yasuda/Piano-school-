import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FiCalendar, FiTag, FiArrowLeft } from 'react-icons/fi'
import { getBlogPost, getBlogPosts } from '@/lib/microcms'

export const revalidate = 60

interface BlogPostPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const { contents } = await getBlogPosts(100, 0)
  return contents.map((post) => ({
    id: post.id,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  const post = await getBlogPost(id)

  if (!post) {
    notFound()
  }

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-accent-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
          >
            <FiArrowLeft className="w-4 h-4" />
            ブログ一覧に戻る
          </Link>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <FiCalendar className="w-4 h-4" />
              {format(new Date(post.publishedAt), 'yyyy年M月d日', { locale: ja })}
            </span>
            <span className="flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
              <FiTag className="w-4 h-4" />
              {post.category.name}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-medium text-gray-800">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="mb-8 rounded-2xl overflow-hidden">
              <img
                src={post.thumbnail.url}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Article content */}
          <article
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-medium prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share & Navigation */}
          <div className="border-t mt-12 pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4" />
              ブログ一覧に戻る
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-serif font-medium text-gray-800 mb-4">
            レッスンに興味がありますか？
          </h2>
          <p className="text-gray-600 mb-8">
            体験レッスンで、教室の雰囲気を感じてみてください。
          </p>
          <Link href="/reservation" className="btn-primary">
            体験レッスンを予約する
          </Link>
        </div>
      </section>
    </>
  )
}
