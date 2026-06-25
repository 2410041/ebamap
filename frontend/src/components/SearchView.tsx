import type { Category, Product } from "../types";
import { ProductCard } from "./ProductCard";

interface SearchViewProps {
  categories: Category[];
  keyword: string;
  onKeywordChange: (value: string) => void;
  categoryId: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  onSubmit: () => void;
  products: Product[];
  recommendedProducts: Product[];
  searchHistory: string[];
  favorites: number[];
  onHistorySelect: (keyword: string) => void;
  onToggleFavorite: (productId: number) => void;
  onShowMap: (productId: number) => void;
}

export function SearchView({
  categories,
  keyword,
  onKeywordChange,
  categoryId,
  onCategoryChange,
  onSubmit,
  products,
  recommendedProducts,
  searchHistory,
  favorites,
  onHistorySelect,
  onToggleFavorite,
  onShowMap,
}: SearchViewProps) {
  return (
    <section className="screen">
      <div className="sticky-search">
        <h2>商品検索</h2>
        <p>商品名、カテゴリ、履歴から目的の商品をすばやく探せます。</p>
        <div className="search-form">
          <input
            value={keyword}
            onChange={(event) => onKeywordChange(event.target.value)}
            placeholder="牛乳、食パン、洗剤 など"
          />
          <button className="primary-button" onClick={onSubmit}>
            検索
          </button>
        </div>

        <div className="category-row">
          <button className={`chip ${categoryId === null ? "is-active" : ""}`} onClick={() => onCategoryChange(null)}>
            すべて
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`chip ${categoryId === category.id ? "is-active" : ""}`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <section className="panel">
        <div className="section-head">
          <h3>最近の検索履歴</h3>
        </div>
        <div className="history-chips">
          {searchHistory.length === 0 ? <p className="empty-copy">まだ履歴はありません。</p> : null}
          {searchHistory.map((item) => (
            <button key={item} className="history-chip" onClick={() => onHistorySelect(item)}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <h3>よく探される商品</h3>
        </div>
        <div className="card-stack">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onShowMap={onShowMap}
            />
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <h3>検索結果</h3>
          <span>{products.length}件</span>
        </div>
        <div className="card-stack">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onShowMap={onShowMap}
            />
          ))}
          {products.length === 0 ? <p className="empty-copy">条件に合う商品が見つかりません。</p> : null}
        </div>
      </section>
    </section>
  );
}
