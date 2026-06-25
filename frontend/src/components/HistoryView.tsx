interface HistoryViewProps {
  items: string[];
  onSelect: (keyword: string) => void;
  onClear: () => void;
}

export function HistoryView({ items, onSelect, onClear }: HistoryViewProps) {
  return (
    <section className="screen">
      <section className="panel">
        <div className="section-head">
          <h2>検索履歴</h2>
          <button className="danger-button" onClick={onClear}>
            履歴を削除
          </button>
        </div>

        <div className="history-list">
          {items.map((item) => (
            <button key={item} className="history-row" onClick={() => onSelect(item)}>
              <span>{item}</span>
              <span>再検索</span>
            </button>
          ))}
          {items.length === 0 ? <p className="empty-copy">まだ検索履歴はありません。</p> : null}
        </div>
      </section>
    </section>
  );
}
