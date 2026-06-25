export type InventoryStatus = "在庫あり" | "残りわずか" | "在庫なし" | "確認中";

export interface HealthResponse {
  status: string;
  timestamp: string;
  syncMode: string;
}

export interface Store {
  id: number;
  name: string;
  address: string;
  postal_code: string;
  phone: string;
  open_time: string;
  close_time: string;
  access_note: string;
  map_label: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  store_id: number;
  name: string;
  subtitle: string;
  category_name: string;
  location_label: string;
  inventory_status: InventoryStatus;
  price: number;
  point_target: number;
  point_amount: number;
  x_percent: number;
  y_percent: number;
  image_tone: string;
  popularity_rank: number;
}

export interface Deal {
  id: number;
  name: string;
  subtitle: string;
  location_label: string;
  inventory_status: InventoryStatus;
  price: number;
  point_amount: number;
  campaign_title: string;
  campaign_description: string;
  badge_label: string;
  effective_price: number;
}

export interface BootstrapResponse {
  store: Store;
  categories: Category[];
  recommendedProducts: Product[];
  deals: Deal[];
  syncIntervalSeconds: number;
}

export interface ShoppingListItem {
  productId: number;
  checked: boolean;
  addedAt: string;
}

export interface Notice {
  id: number;
  type: "points" | "layout" | "hours" | "new";
  title: string;
  body: string;
  dateLabel: string;
}

export type AppTab = "search" | "map" | "deals" | "favorites" | "history";
