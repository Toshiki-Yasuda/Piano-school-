import Link from 'next/link'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { FiMusic, FiCalendar, FiTag } from 'react-icons/fi'
import { getBlogPosts } from '@/lib/microcms'
import { HeroSection } from '@/components/common'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BlogPage() {
  const { contents: posts, totalCount } = await getBlogPosts(10, 0)

  return (
    <>
      <HeroSection
        title="ブログ"
        subtitle="教室の日常やレッスンの様子、イベント情報などをお届けします。"
      />

      {/* Blog List Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <FiMusic className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">まだ記事がありません。</p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="block card hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="md:flex">
                    {/* Thumbnail */}
                    <div className="md:w-1/3">
                      <div className="aspect-video md:aspect-square bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                        {post.thumbnail ? (
                          <img
                            src={post.thumbnail.url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiMusic className="w-16 h-16 text-primary-300" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-4 h-4" />
                          {format(new Date(post.publishedAt), 'yyyy年M月d日', {
                            locale: ja,
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiTag className="w-4 h-4" />
                          {post.category.name}
                        </span>
                      </div>
                      <h2 className="text-xl font-medium text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                      <span className="inline-block mt-4 text-primary-600 text-sm font-medium">
                        続きを読む →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination placeholder */}
          {totalCount > 10 && (
            <div className="mt-12 text-center">
              <p className="text-gray-500 text-sm">
                {totalCount}件中 1-{Math.min(10, totalCount)}件を表示
              </p>
            </div>
          )}
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
