import type { Product, ShoppingListItem } from "../types";

interface ShoppingListSectionProps {
  items: ShoppingListItem[];
  products: Product[];
  onToggleChecked: (productId: number) => void;
  onClear: () => void;
  onOpenDetail: (product: Product) => void;
}

export function ShoppingListSection({ items, products, onToggleChecked, onClear, onOpenDetail }: ShoppingListSectionProps) {
  const productMap = new Map(products.map((product) => [product.id, product]));
  const resolvedItems = items
    .map((item) => ({ item, product: productMap.get(item.productId) }))
    .filter((entry): entry is { item: ShoppingListItem; product: Product } => Boolean(entry.product));

  return (
    <section className="panel">
      <div className="section-head">
        <div>
          <h3>買い物リスト</h3>
          <span>{resolvedItems.length}件</span>
        </div>
        {resolvedItems.length > 0 ? (
          <button className="danger-button compact" onClick={onClear}>
            全削除
          </button>
        ) : null}
      </div>

      <div className="shopping-list">
        {resolvedItems.length === 0 ? <p className="empty-copy">商品詳細から追加できます。</p> : null}
        {resolvedItems.map(({ item, product }) => (
          <div key={product.id} className={`shopping-row ${item.checked ? "is-checked" : ""}`}>
            <label>
              <input type="checkbox" checked={item.checked} onChange={() => onToggleChecked(product.id)} />
              <span>{product.name}</span>
            </label>
            <button className="subtle-button" onClick={() => onOpenDetail(product)}>
              詳細
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
