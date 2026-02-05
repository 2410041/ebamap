/**
 * 検索クエリの型定義
 * 商品検索時に使用される検索条件を定義
 * APIリクエストやローカルフィルタリングで統一
 */
export interface SearchQuery {
    // 検索キーワード（必須）例：キャベツ、トマト、バナナ
    keyword: string;
    // 商品カテゴリ（オプション） 例：野菜、果物、肉
    category?: string;
}