import "./ProductCard.css";

export interface ProductCardProps {
  id: number;
  name: string;
  price?: number;
  location: string;
  discount?: string;
  originalPrice?: number;
  salePrice?: number;
  endDate?: string;
  onViewMap?: (product: any) => void;
  variant?: "search" | "favorite" | "deal";
}

const ProductCard = ({
  id,
  name,
  price,
  location,
  discount,
  originalPrice,
  salePrice,
  endDate,
  onViewMap,
  variant = "search",
}: ProductCardProps) => {
  return (
    <div className={`product-card product-card-${variant}`}>
      {discount && <div className="product-badge">{discount}</div>}

      <div className="product-content">
        <h3 className="product-name">{name}</h3>

        {variant === "search" && (
          <>
            <p className="product-location">{location}</p>
            <button 
              className="product-button product-button-map"
              onClick={() => onViewMap?.({ id, name, location })}
            >
              売場地図
            </button>
          </>
        )}

        {variant === "favorite" && (
          <>
            <p className="product-location">{location}</p>
            <button 
              className="product-button product-button-green"
              onClick={() => onViewMap?.({ id, name, location })}
            >
              マップを見る
            </button>
          </>
        )}

        {variant === "deal" && (
          <>
            {originalPrice && salePrice && (
              <div className="product-price-container">
                <span className="original-price">¥{originalPrice}</span>
                <span className="sale-price">¥{salePrice}</span>
              </div>
            )}
            {endDate && <p className="product-end-date">{endDate}</p>}
            <button 
              className="product-button product-button-green"
              onClick={() => onViewMap?.({ id, name, location })}
            >
              マップで見る
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
