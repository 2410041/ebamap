// 商品関連のAPI（後でバックエンドに接続）
import { apiClient } from "./apiClient";
import type { Product } from "../types/Product.ts";

/**
 * 検索キーワードで商品一覧を取得
 * @param {string} keyword - 検索キーワード
 * @returns {Promise<Product[]>} マッチした商品の配列
 * APIエンドポイント例: /api/products?keyword={keyword}
 */
export const searchProducts = async (keyword: string): Promise<Product[]> => {
    // 例: return apiClient<Product[]>(`/api/products?keyword=${encodeURIComponent(keyword)}`);
    return apiClient<Product[]>(`/api/products?keyword=${encodeURIComponent(keyword)}`);
};

/**
 * 特売・セール対象商品一覧を取得
 * @returns {Promise<Product[]>} 特売商品の配列
 * APIエンドポイント例: /api/deals
 */
export const getDeals = async (): Promise<Product[]> => {
    // 例: return apiClient<Product[]>("/api/deals");
    return apiClient<Product[]>("/api/deals");
};