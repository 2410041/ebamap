import { StatusBadge } from "./StatusBadge";
import type { Product, Store } from "../types";

interface MapViewProps {
  store: Store;
  products: Product[];
  selectedProductId: number | null;
  onSelectProduct: (productId: number) => void;
}

export function MapView({ store, products, selectedProductId, onSelectProduct }: MapViewProps) {
  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? products[0] ?? null;

  return (
    <section className="screen">
      <section className="panel">
        <div className="section-head">
          <div>
            <h2>店内マップ</h2>
            <p>{store.map_label}</p>
          </div>
        </div>

        <div className="map-board">
          <div className="map-zone zone-a">青果・入口</div>
          <div className="map-zone zone-b">乳製品</div>
          <div className="map-zone zone-c">飲料</div>
          <div className="map-zone zone-d">日用品</div>

          {products.map((product) => (
            <button
              key={product.id}
              className={`map-pin ${selectedProduct?.id === product.id ? "is-active" : ""}`}
              style={{ left: `${product.x_percent}%`, top: `${product.y_percent}%` }}
              onClick={() => onSelectProduct(product.id)}
              aria-label={`${product.name} の場所`}
            />
          ))}
        </div>

        {selectedProduct ? (
          <article className="map-detail">
            <div>
              <p className="point-copy">{selectedProduct.category_name}</p>
              <h3>{selectedProduct.name}</h3>
              <p>{selectedProduct.location_label}</p>
            </div>
            <div className="map-detail__meta">
              <StatusBadge status={selectedProduct.inventory_status} />
              {selectedProduct.point_target === 1 ? (
                <span className="point-badge">+{selectedProduct.point_amount}pt</span>
              ) : null}
            </div>
          </article>
        ) : null}
      </section>
    </section>
  );
}
