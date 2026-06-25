import { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { BottomNav } from "./components/BottomNav";
import { DealsView } from "./components/DealsView";
import { FavoritesView } from "./components/FavoritesView";
import { HistoryView } from "./components/HistoryView";
import { MapView } from "./components/MapView";
import { SearchView } from "./components/SearchView";
import { StoreSelector } from "./components/StoreSelector";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import {
  fetchBootstrap,
  fetchCategories,
  fetchDeals,
  fetchHealth,
  fetchRecommended,
  fetchStores,
  searchProducts,
} from "./services/api";
import type { AppTab, Category, Deal, Product, Store } from "./types";

const POLLING_INTERVAL_MS = 10_000;

function addHistoryItem(items: string[], keyword: string) {
  const normalized = keyword.trim();
  if (!normalized) {
    return items;
  }

  return [normalized, ...items.filter((item) => item !== normalized)].slice(0, 8);
}

export default function App() {
  const [healthText, setHealthText] = useState("同期確認中");
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [activeTab, setActiveTab] = useLocalStorageState<AppTab>("ebamap.activeTab", "search");
  const [selectedStoreId, setSelectedStoreId] = useLocalStorageState<number | null>("ebamap.selectedStoreId", null);
  const [favorites, setFavorites] = useLocalStorageState<number[]>("ebamap.favorites", []);
  const [searchHistory, setSearchHistory] = useLocalStorageState<string[]>("ebamap.searchHistory", []);
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const deferredKeyword = useDeferredValue(submittedKeyword);

  const currentStore = useMemo(
    () => stores.find((store) => store.id === selectedStoreId) ?? null,
    [selectedStoreId, stores]
  );

  useEffect(() => {
    void fetchStores().then(setStores).catch(() => setStores([]));
    void fetchHealth().then((health) => setHealthText(`${health.status} / ${health.syncMode}`)).catch(() => {
      setHealthText("API 接続エラー");
    });
  }, []);

  const syncStoreData = useCallback(async () => {
    if (!selectedStoreId) {
      return;
    }

    setIsSyncing(true);

    try {
      const [bootstrap, nextProducts, nextDeals, nextRecommended, nextCategories] = await Promise.all([
        fetchBootstrap(selectedStoreId),
        searchProducts({
          storeId: selectedStoreId,
          keyword: deferredKeyword,
          categoryId: selectedCategoryId,
        }),
        fetchDeals(selectedStoreId),
        fetchRecommended(selectedStoreId),
        fetchCategories(),
      ]);

      startTransition(() => {
        setStores((current) => {
          const exists = current.some((store) => store.id === bootstrap.store.id);
          if (!exists) {
            return [...current, bootstrap.store];
          }

          return current.map((store) => (store.id === bootstrap.store.id ? bootstrap.store : store));
        });
        setCategories(nextCategories.length > 0 ? nextCategories : bootstrap.categories);
        setRecommendedProducts(nextRecommended.length > 0 ? nextRecommended : bootstrap.recommendedProducts);
        setProducts(nextProducts);
        setDeals(nextDeals.length > 0 ? nextDeals : bootstrap.deals);
        setSelectedProductId((current) => current ?? nextProducts[0]?.id ?? bootstrap.recommendedProducts[0]?.id ?? null);
      });
    } catch {
      setHealthText("同期エラー");
    } finally {
      setIsSyncing(false);
    }
  }, [deferredKeyword, selectedCategoryId, selectedStoreId]);

  useEffect(() => {
    void syncStoreData();

    if (!selectedStoreId) {
      return;
    }

    const timerId = window.setInterval(() => {
      void syncStoreData();
    }, POLLING_INTERVAL_MS);

    return () => window.clearInterval(timerId);
  }, [selectedStoreId, deferredKeyword, selectedCategoryId, syncStoreData]);

  const handleStoreSelect = (storeId: number) => {
    setSelectedStoreId(storeId);
    setSelectedCategoryId(null);
    setSubmittedKeyword("");
    setKeyword("");
    setActiveTab("search");
  };

  const handleSearchSubmit = () => {
    setSubmittedKeyword(keyword);
    setSearchHistory((current) => addHistoryItem(current, keyword));
  };

  const handleHistorySelect = (value: string) => {
    setKeyword(value);
    setSubmittedKeyword(value);
    setActiveTab("search");
  };

  const handleToggleFavorite = (productId: number) => {
    setFavorites((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [productId, ...current]
    );
  };

  const handleShowMap = (productId: number) => {
    setSelectedProductId(productId);
    setActiveTab("map");
  };

  const allKnownProducts = useMemo(() => {
    const map = new Map<number, Product>();
    for (const product of [...recommendedProducts, ...products]) {
      map.set(product.id, product);
    }
    return [...map.values()];
  }, [products, recommendedProducts]);

  if (!currentStore) {
    return <StoreSelector stores={stores} onSelect={handleStoreSelect} />;
  }

  return (
    <div className="app">
      <div className="app-shell">
        <AppHeader
          store={currentStore}
          syncText={isSyncing ? "同期中..." : "10秒ごとに更新"}
          onChangeStore={() => setSelectedStoreId(null)}
        />

        {activeTab === "search" ? (
          <SearchView
            categories={categories}
            keyword={keyword}
            onKeywordChange={setKeyword}
            categoryId={selectedCategoryId}
            onCategoryChange={setSelectedCategoryId}
            onSubmit={handleSearchSubmit}
            products={products}
            recommendedProducts={recommendedProducts}
            searchHistory={searchHistory}
            favorites={favorites}
            onHistorySelect={handleHistorySelect}
            onToggleFavorite={handleToggleFavorite}
            onShowMap={handleShowMap}
          />
        ) : null}

        {activeTab === "map" ? (
          <MapView
            store={currentStore}
            products={allKnownProducts}
            selectedProductId={selectedProductId}
            onSelectProduct={setSelectedProductId}
          />
        ) : null}

        {activeTab === "deals" ? (
          <DealsView
            deals={deals}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onShowMap={handleShowMap}
          />
        ) : null}

        {activeTab === "favorites" ? (
          <FavoritesView
            products={allKnownProducts}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onShowMap={handleShowMap}
          />
        ) : null}

        {activeTab === "history" ? (
          <HistoryView
            items={searchHistory}
            onSelect={handleHistorySelect}
            onClear={() => setSearchHistory([])}
          />
        ) : null}
      </div>

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
