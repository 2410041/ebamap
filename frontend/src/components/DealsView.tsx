import { ProductCard } from "./ProductCard";
import type { Deal, Product } from "../types";

interface DealsViewProps {
  deals: Deal[];
  favorites: number[];
  onToggleFavorite: (productId: number) => void;
  onShowMap: (productId: number) => void;
  onOpenDetail: (product: Product | Deal) => void;
}

export function DealsView({ deals, favorites, onToggleFavorite, onShowMap, onOpenDetail }: DealsViewProps) {
  return (
    <section className="screen">
      <section className="panel panel-accent">
        <div className="section-head">
          <div>
            <p className="point-copy">今週のポイント対象商品</p>
            <h2>ポイント</h2>
          </div>
        </div>

        <div className="card-stack">
          {deals.map((deal) => (
            <ProductCard
              key={deal.id}
              product={deal}
              isFavorite={favorites.includes(deal.id)}
              onToggleFavorite={onToggleFavorite}
              onShowMap={onShowMap}
              onOpenDetail={onOpenDetail}
              variant="deal"
            />
          ))}
        </div>
      </section>
    </section>
  );
}
