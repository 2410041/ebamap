import { StatusBadge } from "./StatusBadge";
import type { Deal, Product } from "../types";
import type { MouseEvent } from "react";

interface ProductCardProps {
  product: Product | Deal;
  isFavorite: boolean;
  onToggleFavorite?: (productId: number) => void;
  onShowMap?: (productId: number) => void;
  onOpenDetail?: (product: Product | Deal) => void;
  variant?: "default" | "deal";
}

function hasPointTarget(product: Product | Deal) {
  return "point_target" in product ? product.point_target === 1 : product.point_amount > 0;
}

export function ProductCard({
  product,
  isFavorite,
  onToggleFavorite,
  onShowMap,
  onOpenDetail,
  variant = "default",
}: ProductCardProps) {
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>, action: () => void) => {
    event.stopPropagation();
    action();
  };

  return (
    <article
      className={`product-card ${variant === "deal" ? "is-deal" : ""}`}
      onClick={() => onOpenDetail?.(product)}
      role={onOpenDetail ? "button" : undefined}
      tabIndex={onOpenDetail ? 0 : undefined}
    >
      <div className={`product-card__thumb tone-${"image_tone" in product ? product.image_tone : "gold"}`}>
        <span>{product.name.slice(0, 2)}</span>
      </div>

      <div className="product-card__body">
        <div className="product-card__topline">
          {hasPointTarget(product) ? <span className="point-badge">+{product.point_amount}pt</span> : null}
          <StatusBadge status={product.inventory_status} />
        </div>

        <h3>{product.name}</h3>
        <p className="product-card__subtitle">
          {"category_name" in product ? `${product.category_name} / ` : ""}{product.subtitle}
        </p>
        <p className="product-card__location">{product.location_label}</p>

        {"campaign_title" in product ? (
          <div className="deal-box">
            <p>{product.campaign_title}</p>
            <strong>実質 {product.effective_price}円</strong>
          </div>
        ) : null}

        <div className="product-card__footer">
          <strong>{product.price}円</strong>
          <div className="product-card__actions">
            {onToggleFavorite ? (
              <button className="subtle-button" onClick={(event) => handleButtonClick(event, () => onToggleFavorite(product.id))}>
                {isFavorite ? "登録済み" : "お気に入り"}
              </button>
            ) : null}
            {onShowMap ? (
              <button className="primary-button small" onClick={(event) => handleButtonClick(event, () => onShowMap(product.id))}>
                マップで見る
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
