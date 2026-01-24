-- ピアノ教室 予約システム データベーススキーマ
-- Supabase で実行してください

-- 時間枠テーブル
CREATE TABLE IF NOT EXISTS time_slots (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- 同じ日時の重複を防ぐ
    UNIQUE(date, start_time)
);

-- 予約テーブル
CREATE TABLE IF NOT EXISTS reservations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slot_id UUID REFERENCES time_slots(id) ON DELETE CASCADE,
    student_name VARCHAR(100) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    student_phone VARCHAR(20) NOT NULL,
    parent_name VARCHAR(100),
    message TEXT,
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_time_slots_date ON time_slots(date);
CREATE INDEX IF NOT EXISTS idx_time_slots_available ON time_slots(is_available);
CREATE INDEX IF NOT EXISTS idx_reservations_slot ON reservations(slot_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);

-- 更新日時を自動更新するトリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- time_slots テーブルのトリガー
DROP TRIGGER IF EXISTS update_time_slots_updated_at ON time_slots;
CREATE TRIGGER update_time_slots_updated_at
    BEFORE UPDATE ON time_slots
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- reservations テーブルのトリガー
DROP TRIGGER IF EXISTS update_reservations_updated_at ON reservations;
CREATE TRIGGER update_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) ポリシー
ALTER TABLE time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- 公開読み取りポリシー（空き枠の確認用）
CREATE POLICY "Allow public read access to available slots"
    ON time_slots FOR SELECT
    USING (is_available = true);

-- 認証済みユーザーの全アクセス（管理用）
CREATE POLICY "Allow authenticated users full access to time_slots"
    ON time_slots FOR ALL
    USING (auth.role() = 'authenticated');

-- 予約の作成（anon ユーザーでも可能）
CREATE POLICY "Allow anon to create reservations"
    ON reservations FOR INSERT
    WITH CHECK (true);

-- 認証済みユーザーの予約読み取り（管理用）
CREATE POLICY "Allow authenticated users to read reservations"
    ON reservations FOR SELECT
    USING (auth.role() = 'authenticated');

-- サンプルデータ挿入（テスト用）
-- 以下のコメントを外して実行すると、テスト用の空き枠が作成されます

/*
INSERT INTO time_slots (date, start_time, end_time) VALUES
    (CURRENT_DATE + INTERVAL '1 day', '14:00', '14:45'),
    (CURRENT_DATE + INTERVAL '1 day', '15:00', '15:45'),
    (CURRENT_DATE + INTERVAL '1 day', '16:00', '16:45'),
    (CURRENT_DATE + INTERVAL '2 days', '14:00', '14:45'),
    (CURRENT_DATE + INTERVAL '2 days', '17:00', '17:45'),
    (CURRENT_DATE + INTERVAL '3 days', '15:00', '15:45'),
    (CURRENT_DATE + INTERVAL '3 days', '18:00', '18:45'),
    (CURRENT_DATE + INTERVAL '5 days', '10:00', '10:45'),
    (CURRENT_DATE + INTERVAL '5 days', '11:00', '11:45'),
    (CURRENT_DATE + INTERVAL '5 days', '14:00', '14:45');
*/
