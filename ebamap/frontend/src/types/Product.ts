// 商品情報の共通型
export interface Product {
  id: number;
  name: string;
  location: string;
  price?: number;
  originalPrice?: number;
  salePrice?: number;
  discount?: string;
  endDate?: string;
}
