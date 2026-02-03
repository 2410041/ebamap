// 商品情報の共通型
// ページ間で使い回す商品データの形を統一
export interface Product {
    id: number;
    name: string;
    campaignTitle?: string;
    location: string;
    price?: number;
    originalPrice?: number;
    salePrice?: number;
    discount?: string;
    endDate?: string;
}
