-- 予約済みスロットの削除を防止するトリガー
-- Supabaseの SQL Editor で実行してください

-- トリガー関数を作成
CREATE OR REPLACE FUNCTION prevent_reserved_slot_deletion()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.is_available = false THEN
    RAISE EXCEPTION '予約済みの時間枠は削除できません';
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- トリガーを作成
DROP TRIGGER IF EXISTS prevent_reserved_slot_deletion_trigger ON time_slots;

CREATE TRIGGER prevent_reserved_slot_deletion_trigger
BEFORE DELETE ON time_slots
FOR EACH ROW
EXECUTE FUNCTION prevent_reserved_slot_deletion();

-- 確認用: トリガーが作成されたか確認
SELECT tgname FROM pg_trigger WHERE tgname = 'prevent_reserved_slot_deletion_trigger';
