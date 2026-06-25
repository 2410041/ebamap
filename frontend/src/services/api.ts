import type {
  BootstrapResponse,
  Category,
  Deal,
  HealthResponse,
  Product,
  Store,
} from "../types";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function fetchHealth() {
  return request<HealthResponse>("/api/health");
}

export function fetchStores() {
  return request<Store[]>("/api/stores");
}

export function fetchCategories() {
  return request<Category[]>("/api/categories");
}

export function fetchBootstrap(storeId: number) {
  return request<BootstrapResponse>(`/api/bootstrap?store_id=${storeId}`);
}

export function searchProducts(params: {
  storeId: number;
  keyword: string;
  categoryId: number | null;
}) {
  const query = new URLSearchParams();
  query.set("store_id", String(params.storeId));

  if (params.keyword.trim()) {
    query.set("keyword", params.keyword.trim());
  }

  if (params.categoryId) {
    query.set("category_id", String(params.categoryId));
  }

  return request<Product[]>(`/api/products?${query.toString()}`);
}

export function fetchDeals(storeId: number) {
  return request<Deal[]>(`/api/deals?store_id=${storeId}`);
}

export function fetchRecommended(storeId: number) {
  return request<Product[]>(`/api/recommended?store_id=${storeId}`);
}
