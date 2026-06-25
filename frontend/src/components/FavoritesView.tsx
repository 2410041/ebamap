import { ProductCard } from "./ProductCard";
import type { Deal, Product } from "../types";

interface FavoritesViewProps {
  products: Product[];
  favorites: number[];
  onToggleFavorite: (productId: number) => void;
  onShowMap: (productId: number) => void;
  onOpenDetail: (product: Product | Deal) => void;
}

export function FavoritesView({ products, favorites, onToggleFavorite, onShowMap, onOpenDetail }: FavoritesViewProps) {
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <section className="screen">
      <section className="panel">
        <div className="section-head">
          <h2>お気に入り</h2>
        </div>
        <div className="card-stack">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite
              onToggleFavorite={onToggleFavorite}
              onShowMap={onShowMap}
              onOpenDetail={onOpenDetail}
            />
          ))}
          {favoriteProducts.length === 0 ? (
            <p className="empty-copy">検索結果やポイント商品からお気に入り登録するとここに表示されます。</p>
          ) : null}
        </div>
      </section>
    </section>
  );
}
