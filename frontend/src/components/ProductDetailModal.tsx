import { StatusBadge } from "./StatusBadge";
import type { Deal, Product } from "../types";

interface ProductDetailModalProps {
  product: Product | Deal;
  isFavorite: boolean;
  isInShoppingList: boolean;
  onClose: () => void;
  onToggleFavorite: (productId: number) => void;
  onAddToShoppingList: (productId: number) => void;
  onShowMap: (productId: number) => void;
}

function isProduct(product: Product | Deal): product is Product {
  return "category_name" in product;
}

export function ProductDetailModal({
  product,
  isFavorite,
  isInShoppingList,
  onClose,
  onToggleFavorite,
  onAddToShoppingList,
  onShowMap,
}: ProductDetailModalProps) {
  const categoryName = isProduct(product) ? product.category_name : "ポイント商品";
  const pointTarget = isProduct(product) ? product.point_target === 1 : product.point_amount > 0;

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="modal-sheet" role="dialog" aria-modal="true" aria-label={`${product.name} の詳細`} onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <div>
            <p className="point-copy">{categoryName}</p>
            <h2>{product.name}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </div>

        <p className="product-card__subtitle">{product.subtitle}</p>

        <dl className="detail-list">
          <div>
            <dt>価格</dt>
            <dd>{product.price}円</dd>
          </div>
          <div>
            <dt>売場</dt>
            <dd>{product.location_label}</dd>
          </div>
          <div>
            <dt>在庫</dt>
            <dd><StatusBadge status={product.inventory_status} /></dd>
          </div>
          <div>
            <dt>ポイント</dt>
            <dd>{pointTarget ? `対象 +${product.point_amount}pt` : "対象外"}</dd>
          </div>
        </dl>

        {"effective_price" in product ? (
          <div className="deal-box">
            <p>{product.campaign_title}</p>
            <strong>実質 {product.effective_price}円</strong>
          </div>
        ) : null}

        <div className="modal-actions">
          <button className="primary-button" onClick={() => onShowMap(product.id)}>
            マップで見る
          </button>
          <button className="subtle-button" onClick={() => onToggleFavorite(product.id)}>
            {isFavorite ? "お気に入り解除" : "お気に入り"}
          </button>
          <button className="subtle-button" onClick={() => onAddToShoppingList(product.id)}>
            {isInShoppingList ? "リスト追加済み" : "買い物リストに追加"}
          </button>
        </div>
      </section>
    </div>
  );
}
