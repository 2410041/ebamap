import type { Deal, HealthResponse, Product, Store } from "../types";

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

export function searchProducts(keyword: string) {
  const search = new URLSearchParams();
  if (keyword.trim()) {
    search.set("keyword", keyword.trim());
  }

  const suffix = search.toString();
  return request<Product[]>(`/api/products${suffix ? `?${suffix}` : ""}`);
}

export function fetchDeals() {
  return request<Deal[]>("/api/deals");
}
