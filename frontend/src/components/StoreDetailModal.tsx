import type { Store } from "../types";

interface StoreDetailModalProps {
  store: Store;
  onClose: () => void;
  onChangeStore: () => void;
}

export function StoreDetailModal({ store, onClose, onChangeStore }: StoreDetailModalProps) {
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <section className="modal-sheet" role="dialog" aria-modal="true" aria-label="店舗詳細" onClick={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <div>
            <p className="point-copy">店舗情報</p>
            <h2>{store.name}</h2>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="閉じる">
            ×
          </button>
        </div>

        <dl className="detail-list">
          <div>
            <dt>住所</dt>
            <dd>{store.postal_code} {store.address}</dd>
          </div>
          <div>
            <dt>電話番号</dt>
            <dd>{store.phone}</dd>
          </div>
          <div>
            <dt>営業時間</dt>
            <dd>{store.open_time} - {store.close_time}</dd>
          </div>
          <div>
            <dt>アクセス</dt>
            <dd>{store.access_note}</dd>
          </div>
        </dl>

        <div className="modal-actions">
          <button className="primary-button" onClick={onChangeStore}>
            店舗変更
          </button>
          <button className="subtle-button" onClick={onClose}>
            閉じる
          </button>
        </div>
      </section>
    </div>
  );
}
