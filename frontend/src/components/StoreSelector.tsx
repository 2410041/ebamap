import type { Store } from "../types";

interface StoreSelectorProps {
  stores: Store[];
  onSelect: (storeId: number) => void;
}

export function StoreSelector({ stores, onSelect }: StoreSelectorProps) {
  return (
    <main className="store-selector">
      <section className="store-selector__hero">
        <p className="app-header__eyebrow">はじめに店舗を選択</p>
        <h1>EBAMAP</h1>
        <p>商品検索と売場案内をすばやく始めるため、現在利用する店舗を選んでください。</p>
      </section>

      <section className="store-selector__list">
        {stores.map((store) => (
          <article key={store.id} className="store-card">
            <h2>{store.name}</h2>
            <p>
              {store.postal_code} {store.address}
            </p>
            <p>
              {store.open_time} - {store.close_time}
            </p>
            <p>{store.access_note}</p>
            <button className="primary-button" onClick={() => onSelect(store.id)}>
              この店舗を使う
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}
