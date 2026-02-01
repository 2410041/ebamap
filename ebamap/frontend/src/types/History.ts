// 検索履歴の共通型
// 履歴一覧に表示する最小情報
export interface HistoryItem {
  id: number;
  query: string;
  date: string;
}
