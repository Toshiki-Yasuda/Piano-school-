// LINE Messaging API Helper

interface LineNotificationData {
  studentName: string
  date: string
  time: string
  phone: string
  email: string
  message?: string
}

export async function sendLineNotification(data: LineNotificationData) {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN
  const userId = process.env.LINE_USER_ID // 先生のLINE User ID

  if (!accessToken || !userId) {
    console.log('LINE credentials not configured')
    return { success: false, error: 'LINE通知の設定がありません' }
  }

  const message = `【予約通知】

新しい振替レッスンの予約が入りました。

■ 生徒名: ${data.studentName}
■ 日時: ${data.date} ${data.time}
■ 電話: ${data.phone}
■ メール: ${data.email}
${data.message ? `■ メッセージ: ${data.message}` : ''}

予約管理画面で確認してください。`

  try {
    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        to: userId,
        messages: [
          {
            type: 'text',
            text: message,
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('LINE API error:', errorData)
      return { success: false, error: 'LINE通知の送信に失敗しました' }
    }

    return { success: true }
  } catch (error) {
    console.error('LINE notification error:', error)
    return { success: false, error: 'LINE通知の送信に失敗しました' }
  }
}
