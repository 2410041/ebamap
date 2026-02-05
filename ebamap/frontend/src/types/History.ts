/**
 * 検索履歴アイテムの型定義
 * 履歴ページの一覧表示に必要な最小限の情報を保持
 */
export interface HistoryItem {
    // 履歴レコードの一意なID（ローカルストレージ管理用）
    id: number;
    // ユーザーが検索した商品名やキーワード
    query: string;
    // 検索が実施された日時（ISO 8601形式、例：2024-02-05T10:30:00Z）
    date: string;
}