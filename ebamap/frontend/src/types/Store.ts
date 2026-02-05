// 店舗情報の共通型
// 店舗名・営業時間などの基本情報を定義
// TypeScript に int 型はないため、string 型で統一
// 電話番号は 0 や - で始まるため number 型ではなく string 型で扱う
export interface Store {
    id: string;
    // 店舗名
    name: string;
    // 開店時間
    openTime: string;
    // 閉店時間
    closeTime: string;
    // 店の固定電話番号
    tell: string;
    // 郵便番号
    postCode: string;
    // 住所
    address?: string;
    // 最寄り駅
    nearestStation?: string;
    // バス停名
    busStop?: string;
    // バスの行き先
    busDestination?: string;
    // バスや徒歩での所要時間（分）
    busTravelTimeMinutes?: string;
}