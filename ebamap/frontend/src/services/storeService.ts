// 店舗関連のAPI（後でバックエンドに接続）
import { apiClient } from "./apiClient";
import type { Store } from "../types/Store.ts";

export const getStore = async (storeId: string): Promise<Store> => {
  // 例: return apiClient<Store>(`/api/stores/${storeId}`);
  return apiClient<Store>(`/api/stores/${storeId}`);
};

export const listStores = async (): Promise<Store[]> => {
  // 例: return apiClient<Store[]>("/api/stores");
  return apiClient<Store[]>("/api/stores");
};
