import Header from "../../components/Header/Header";
import "./HistoryPage.css";

interface HistoryItem {
    id: number;
    query: string;
    date: string;
}

const HistoryPage = () => {
    const history: HistoryItem[] = [
        { id: 1, query: "牛乳", date: "2日前" },
        { id: 2, query: "パン", date: "3日前" },
        { id: 3, query: "米", date: "1週間前" },
    ];

    return (
        <div className="history-page">
            <Header title="検索履歴" />

            <div className="history-content">
                <div className="history-header">
                    <h2>過去の検索</h2>
                </div>

                {history.length > 0 ? (
                    <div className="history-list">
                        {history.map((item) => (
                            <div key={item.id} className="history-item">
                                <div className="history-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                </div>
                                <div className="history-info">
                                    <h3>{item.query}</h3>
                                    <p>{item.date}</p>
                                </div>
                                <button className="history-clear-btn">×</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>検索履歴はありません</p>
                    </div>
                )}

                <button className="clear-all-btn">全履歴を削除</button>
            </div>
        </div>
    );
};

export default HistoryPage;