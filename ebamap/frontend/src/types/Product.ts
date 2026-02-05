/**
 * 商品情報の型定義
 * 検索結果・お気に入り・特売情報など、複数画面で使用される商品データ構造
 * 展示場所や割引情報を含む
 */
export interface Product {
    // 商品ID（一意な識別子）
    id: number;
    // 商品名（例：キャベツ、トマト）
    name: string;
    // キャンペーン名またはセール名（オプション）
    campaignTitle?: string;
    // 店舗内での展示場所（例：青果コーナー、1階食料品）
    location: string;
    // 通常価格（税込、オプション）
    price?: number;
    // 元の価格（割引前、オプション）
    originalPrice?: number;
    // セール価格（割引後、オプション）
    salePrice?: number;
    // 割引表記（例：30%OFF、セール価格）
    discount?: string;
    // セール終了日（例：2024-02-10、オプション）
    endDate?: string;
}