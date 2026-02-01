// 店舗情報の共通型
// 店舗名・営業時間などの基本情報を定義
export interface Store {
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
}
