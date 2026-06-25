import { startTransition, useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { BottomNav } from "./components/BottomNav";
import { DealsView } from "./components/DealsView";
import { FavoritesView } from "./components/FavoritesView";
import { HistoryView } from "./components/HistoryView";
import { MapView } from "./components/MapView";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { SearchView } from "./components/SearchView";
import { StoreDetailModal } from "./components/StoreDetailModal";
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
import type { AppTab, Category, Deal, Notice, Product, ShoppingListItem, Store } from "./types";

const POLLING_INTERVAL_MS = 10_000;

const NOTICES: Notice[] = [
  {
    id: 1,
    type: "points",
    title: "本日のポイントアップ",
    body: "乳製品と日用品の一部商品がポイント対象です。",
    dateLabel: "本日",
  },
  {
    id: 2,
    type: "layout",
    title: "売場変更",
    body: "冷凍食品ケースの一部商品を奥側通路へ移動しました。",
    dateLabel: "6/25",
  },
  {
    id: 3,
    type: "hours",
    title: "営業時間変更",
    body: "棚卸しのため、明日は21:00閉店です。",
    dateLabel: "明日",
  },
  {
    id: 4,
    type: "new",
    title: "新商品入荷",
    body: "朝食向けの新商品をパン売場に追加しました。",
    dateLabel: "新着",
  },
];

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
  const [shoppingList, setShoppingList] = useLocalStorageState<ShoppingListItem[]>("ebamap.shoppingList", []);
  const [keyword, setKeyword] = useState("");
  const [submittedKeyword, setSubmittedKeyword] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | Deal | null>(null);
  const [isStoreDetailOpen, setIsStoreDetailOpen] = useState(false);

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
  }, [selectedStoreId, syncStoreData]);

  const handleStoreSelect = (storeId: number) => {
    setSelectedStoreId(storeId);
    setSelectedCategoryId(null);
    setSubmittedKeyword("");
    setKeyword("");
    setIsStoreDetailOpen(false);
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
    setDetailProduct(null);
    setActiveTab("map");
  };

  const handleAddToShoppingList = (productId: number) => {
    setShoppingList((current) => {
      if (current.some((item) => item.productId === productId)) {
        return current;
      }

      return [{ productId, checked: false, addedAt: new Date().toISOString() }, ...current];
    });
  };

  const handleToggleShoppingChecked = (productId: number) => {
    setShoppingList((current) =>
      current.map((item) => (item.productId === productId ? { ...item, checked: !item.checked } : item))
    );
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
          onOpenStoreDetail={() => setIsStoreDetailOpen(true)}
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
            shoppingList={shoppingList}
            notices={NOTICES}
            onHistorySelect={handleHistorySelect}
            onToggleFavorite={handleToggleFavorite}
            onShowMap={handleShowMap}
            onOpenDetail={setDetailProduct}
            onToggleShoppingChecked={handleToggleShoppingChecked}
            onClearShoppingList={() => setShoppingList([])}
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
            onOpenDetail={setDetailProduct}
          />
        ) : null}

        {activeTab === "favorites" ? (
          <FavoritesView
            products={allKnownProducts}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onShowMap={handleShowMap}
            onOpenDetail={setDetailProduct}
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

      {detailProduct ? (
        <ProductDetailModal
          product={detailProduct}
          isFavorite={favorites.includes(detailProduct.id)}
          isInShoppingList={shoppingList.some((item) => item.productId === detailProduct.id)}
          onClose={() => setDetailProduct(null)}
          onToggleFavorite={handleToggleFavorite}
          onAddToShoppingList={handleAddToShoppingList}
          onShowMap={handleShowMap}
        />
      ) : null}

      {isStoreDetailOpen ? (
        <StoreDetailModal
          store={currentStore}
          onClose={() => setIsStoreDetailOpen(false)}
          onChangeStore={() => {
            setIsStoreDetailOpen(false);
            setSelectedStoreId(null);
          }}
        />
      ) : null}
    </div>
  );
}
