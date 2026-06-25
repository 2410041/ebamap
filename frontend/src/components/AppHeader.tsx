import type { Store } from "../types";

interface AppHeaderProps {
  store: Store;
  syncText: string;
  onChangeStore: () => void;
  onOpenStoreDetail: () => void;
}

export function AppHeader({ store, syncText, onChangeStore, onOpenStoreDetail }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="app-header__eyebrow">店内案内 PWA</p>
        <h1>EBAMAP</h1>
        <button className="app-header__store-button" onClick={onOpenStoreDetail}>
          {store.name}
        </button>
        <p className="app-header__meta">
          {store.map_label} / {store.open_time} - {store.close_time}
        </p>
        <p className="app-header__meta">{store.phone}</p>
      </div>

      <div className="app-header__actions">
        <span className="sync-pill">{syncText}</span>
        <button className="ghost-button" onClick={onOpenStoreDetail}>
          店舗情報
        </button>
        <button className="ghost-button" onClick={onChangeStore}>
          店舗変更
        </button>
      </div>
    </header>
  );
}
