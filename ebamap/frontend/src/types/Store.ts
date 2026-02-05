/**
 * 店舗情報の型定義
 * アプリ全体で使用される店舗マスターデータの構造を定義
 * 
 * 注意事項：
 * - TypeScript に int 型はないため、数値を string 型で統一
 * - 電話番号は 0 や - で始まるため number 型ではなく string 型で扱う
 * - オプション属性（?）は店舗によって情報が不完全な場合に対応
 */
export interface Store {
    // 店舗を一意に識別するID（例：store_001）
    id: string;
    // 店舗の名称（例：エバグリーン飛鳥店）
    name: string;
    // 営業開始時刻（HH:mm形式、例：9:00）
    openTime: string;
    // 営業終了時刻（HH:mm形式、例：22:00）
    closeTime: string;
    // 店舗の固定電話番号（ハイフン付き）
    tell: string;
    // 郵便番号（〒記号+数字 例：〒634-0131）
    postCode: string;
    // 店舗の住所（例：奈良県高市郡明日香村御園 5-1）
    address?: string;
    // 最寄り駅の名称（例：飛鳥駅）
    nearestStation?: string;
    // バス停名（複数路線がある場合は最初のバス停）
    busStop?: string;
    // バスの行き先・路線名（例：イオンモール橿原行き）
    busDestination?: string;
    // バス乗車から到着までの所要時間（例：約17分）
    busTravelTimeMinutes?: string;
}