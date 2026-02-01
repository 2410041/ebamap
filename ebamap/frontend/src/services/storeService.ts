// 店舗関連のAPI（後でバックエンドに接続）
import { apiClient } from "./apiClient";
import type { Store } from "../types/Store.ts";

// 店舗IDで店舗情報を取得
export const getStore = async (storeId: string): Promise<Store> => {
  // 例: return apiClient<Store>(`/api/stores/${storeId}`);
  return apiClient<Store>(`/api/stores/${storeId}`);
};

// 店舗一覧を取得
export const listStores = async (): Promise<Store[]> => {
  // 例: return apiClient<Store[]>("/api/stores");
  return apiClient<Store[]>("/api/stores");
};
