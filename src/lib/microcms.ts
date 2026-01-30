// microCMS Client Configuration

interface MicroCMSImage {
  url: string
  width: number
  height: number
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  thumbnail?: MicroCMSImage
  category: {
    id: string
    name: string
  }
  publishedAt: string
  createdAt: string
  updatedAt: string
}

export interface BlogListResponse {
  contents: BlogPost[]
  totalCount: number
  offset: number
  limit: number
}

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN || ''
const apiKey = process.env.MICROCMS_API_KEY || ''

// Check if microCMS is configured
const isMicroCMSConfigured = serviceDomain && apiKey

async function fetchFromMicroCMS<T>(
  endpoint: string,
  queries?: Record<string, string | number>
): Promise<T | null> {
  if (!isMicroCMSConfigured) {
    return null
  }

  const params = new URLSearchParams()
  if (queries) {
    Object.entries(queries).forEach(([key, value]) => {
      params.append(key, String(value))
    })
  }

  const url = `https://${serviceDomain}.microcms.io/api/v1/${endpoint}${
    params.toString() ? `?${params.toString()}` : ''
  }`

  try {
    const response = await fetch(url, {
      headers: {
        'X-MICROCMS-API-KEY': apiKey,
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    })

    if (!response.ok) {
      throw new Error(`microCMS API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('microCMS fetch error:', error)
    return null
  }
}

export async function getBlogPosts(
  limit = 10,
  offset = 0
): Promise<BlogListResponse> {
  const data = await fetchFromMicroCMS<BlogListResponse>('blog', {
    limit,
    offset,
    orders: '-publishedAt',
  })

  if (data) {
    return data
  }

  // Return demo data if microCMS is not configured
  return getDemoBlogPosts(limit, offset)
}

export async function getBlogPost(id: string): Promise<BlogPost | null> {
  const data = await fetchFromMicroCMS<BlogPost>(`blog/${id}`)

  if (data) {
    return data
  }

  // Return demo data if microCMS is not configured
  const demoPosts = getDemoBlogPosts(10, 0).contents
  return demoPosts.find((post) => post.id === id) || null
}

// Demo data for when microCMS is not configured
function getDemoBlogPosts(limit: number, offset: number): BlogListResponse {
  const allPosts: BlogPost[] = [
    {
      id: '1',
      title: '発表会に向けて練習中です',
      content: `<p>来月の発表会に向けて、生徒さんたちが一生懸命練習しています。</p>
      <p>今年のテーマは「世界の名曲」。クラシックからポピュラーまで、様々なジャンルの曲に挑戦しています。</p>
      <p>毎回のレッスンで、少しずつ上達していく姿を見るのが本当に嬉しいです。</p>
      <h2>発表会の詳細</h2>
      <ul>
        <li>日時：2025年2月23日（日）14:00開演</li>
        <li>場所：○○市民会館 小ホール</li>
        <li>入場無料</li>
      </ul>
      <p>ご家族やお友達もぜひお越しください！</p>`,
      excerpt: '来月の発表会に向けて、生徒さんたちが一生懸命練習しています。今年のテーマは「世界の名曲」。',
      thumbnail: { url: '/Images/blog-recital.png', width: 1740, height: 1156 },
      category: { id: 'event', name: 'イベント' },
      publishedAt: '2025-01-20T10:00:00.000Z',
      createdAt: '2025-01-20T10:00:00.000Z',
      updatedAt: '2025-01-20T10:00:00.000Z',
    },
    {
      id: '2',
      title: '新しい教材を導入しました',
      content: `<p>初心者の方にもわかりやすい、新しい教材を導入しました。</p>
      <p>「ピアノアドベンチャー」シリーズは、アメリカで大人気の教材。楽しいイラストと音楽理論がバランスよく学べます。</p>
      <h2>新教材の特徴</h2>
      <ul>
        <li>カラフルなイラストで楽しく学べる</li>
        <li>音楽理論も自然に身につく</li>
        <li>付属CDで家でも練習できる</li>
      </ul>
      <p>体験レッスンでも使用しますので、ぜひお試しください！</p>`,
      excerpt: '初心者の方にもわかりやすい、新しい教材を導入しました。楽しみながら上達できます。',
      thumbnail: { url: '/Images/blog-textbook.png', width: 1740, height: 1156 },
      category: { id: 'lesson', name: 'レッスン' },
      publishedAt: '2025-01-15T10:00:00.000Z',
      createdAt: '2025-01-15T10:00:00.000Z',
      updatedAt: '2025-01-15T10:00:00.000Z',
    },
    {
      id: '3',
      title: 'クリスマスコンサートを開催しました',
      content: `<p>先日、教室でクリスマスコンサートを開催しました。</p>
      <p>生徒さんたちの素敵な演奏に、会場は温かい拍手に包まれました。</p>
      <p>サプライズで先生からのプレゼント演奏もあり、とても楽しいひとときとなりました。</p>
      <h2>演奏曲目より</h2>
      <ul>
        <li>きよしこの夜</li>
        <li>ジングルベル</li>
        <li>赤鼻のトナカイ</li>
        <li>アナと雪の女王メドレー</li>
      </ul>
      <p>ご参加いただいた皆様、ありがとうございました！</p>`,
      excerpt: '先日、教室でクリスマスコンサートを開催しました。生徒さんたちの素敵な演奏をお届けしました。',
      thumbnail: { url: '/Images/blog-christmas.png', width: 1740, height: 1156 },
      category: { id: 'event', name: 'イベント' },
      publishedAt: '2025-01-10T10:00:00.000Z',
      createdAt: '2025-01-10T10:00:00.000Z',
      updatedAt: '2025-01-10T10:00:00.000Z',
    },
    {
      id: '4',
      title: '冬休みの練習のコツ',
      content: `<p>冬休み中も、ピアノの練習を続けましょう！</p>
      <p>毎日長時間練習する必要はありません。短い時間でも、毎日続けることが大切です。</p>
      <h2>練習のポイント</h2>
      <ol>
        <li><strong>毎日15分から</strong> - 短い時間でOK。継続が大事</li>
        <li><strong>ゆっくり丁寧に</strong> - テンポを落として正確に</li>
        <li><strong>部分練習を</strong> - 苦手な部分を重点的に</li>
        <li><strong>録音してみよう</strong> - 客観的に聴いてみよう</li>
      </ol>
      <p>わからないことがあれば、次のレッスンで聞いてくださいね！</p>`,
      excerpt: '冬休み中も、ピアノの練習を続けましょう！毎日短い時間でも続けることが大切です。',
      category: { id: 'tips', name: '練習のコツ' },
      publishedAt: '2025-01-05T10:00:00.000Z',
      createdAt: '2025-01-05T10:00:00.000Z',
      updatedAt: '2025-01-05T10:00:00.000Z',
    },
    {
      id: '5',
      title: '新年のご挨拶',
      content: `<p>明けましておめでとうございます。</p>
      <p>旧年中は大変お世話になりました。今年も生徒さん一人ひとりに寄り添った丁寧なレッスンを心がけてまいります。</p>
      <p>本年もどうぞよろしくお願いいたします。</p>
      <h2>2025年の目標</h2>
      <ul>
        <li>発表会を2回開催</li>
        <li>新しいコースの開設</li>
        <li>オンラインレッスンの充実</li>
      </ul>
      <p>今年も一緒に音楽を楽しみましょう！</p>`,
      excerpt: '明けましておめでとうございます。本年もどうぞよろしくお願いいたします。',
      category: { id: 'news', name: 'お知らせ' },
      publishedAt: '2025-01-01T00:00:00.000Z',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
  ]

  return {
    contents: allPosts.slice(offset, offset + limit),
    totalCount: allPosts.length,
    offset,
    limit,
  }
}
