import { useEffect, useState } from "react";
import { fetchDeals, fetchHealth, fetchStores, searchProducts } from "./services/api";
import type { Deal, Product, Store } from "./types";

export default function App() {
  const [health, setHealth] = useState("loading");
  const [stores, setStores] = useState<Store[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    void fetchHealth().then((data) => setHealth(data.status)).catch(() => setHealth("error"));
    void fetchStores().then(setStores).catch(() => setStores([]));
    void fetchDeals().then(setDeals).catch(() => setDeals([]));
    void searchProducts("").then(setProducts).catch(() => setProducts([]));
  }, []);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextProducts = await searchProducts(keyword);
    setProducts(nextProducts);
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">React + PHP + MySQL + PWA</p>
        <h1>EBAMAP</h1>
        <p className="lead">店内の商品検索と売場案内を再構築するための初期土台です。</p>
        <div className="status-chip">API: {health}</div>
      </header>

      <section className="panel">
        <h2>店舗一覧</h2>
        <div className="card-grid">
          {stores.map((store) => (
            <article key={store.id} className="card">
              <h3>{store.name}</h3>
              <p>{store.address}</p>
              <p>{store.open_time} - {store.close_time}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>商品検索</h2>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="商品名で検索"
          />
          <button type="submit">検索</button>
        </form>

        <div className="card-grid">
          {products.map((product) => (
            <article key={product.id} className="card">
              <h3>{product.name}</h3>
              <p>{product.location_label}</p>
              <p>在庫: {product.inventory_status}</p>
              <p>価格: {product.price}円</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>ポイント対象商品</h2>
        <div className="card-grid">
          {deals.map((deal) => (
            <article key={deal.id} className="card accent">
              <h3>{deal.name}</h3>
              <p>{deal.campaign_title}</p>
              <p>+{deal.point_amount}pt</p>
              <p>{deal.location_label}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
