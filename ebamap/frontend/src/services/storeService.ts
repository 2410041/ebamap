// 店舗関連のAPI（後でバックエンドに接続）
import { apiClient } from "./apiClient";
import type { Store } from "../types/Store.ts";

/**
 * 店舗IDで特定の店舗情報を取得
 * @param {string} storeId - 店舗ID
 * @returns {Promise<Store>} 店舗情報オブジェクト
 * APIエンドポイント例: /api/stores/{storeId}
 */
export const getStore = async (storeId: string): Promise<Store> => {
    // 例: return apiClient<Store>(`/api/stores/${storeId}`);
    return apiClient<Store>(`/api/stores/${storeId}`);
};

/**
 * 全店舗一覧を取得
 * @returns {Promise<Store[]>} 店舗情報の配列
 * APIエンドポイント例: /api/stores
 */
export const listStores = async (): Promise<Store[]> => {
    // 例: return apiClient<Store[]>("/api/stores");
    return apiClient<Store[]>("/api/stores");
};