// 商品関連のAPI（後でバックエンドに接続）
import { apiClient } from "./apiClient";
import type { Product } from "../types/Product.ts";

// 検索キーワードで商品一覧を取得
export const searchProducts = async (keyword: string): Promise<Product[]> => {
    // 例: return apiClient<Product[]>(`/api/products?keyword=${encodeURIComponent(keyword)}`);
    return apiClient<Product[]>(`/api/products?keyword=${encodeURIComponent(keyword)}`);
};

// 特売商品一覧を取得
export const getDeals = async (): Promise<Product[]> => {
    // 例: return apiClient<Product[]>("/api/deals");
    return apiClient<Product[]>("/api/deals");
};
