// 店舗情報の共通型
// 店舗名・営業時間などの基本情報を定義
// TypeScript に int 型はないため、string 型で統一
// 電話番号は 0 や - で始まるため number 型ではなく string 型で扱う
export interface Store {
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
  tell: string;
  address?: string;
  nearestStation?: string;
}
