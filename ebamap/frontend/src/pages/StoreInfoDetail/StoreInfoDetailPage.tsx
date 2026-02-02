import Header from "../../components/Header/Header";
import { useStore } from "../../context/StoreContext";
import "./StoreInfoDetailPage.css";

// 店舗情報詳細ページ
const StoreInfoDetailPage = () => {
    const { currentStore } = useStore();

    if (!currentStore) {
        return (
            <div className="store-info-detail-page">
                <Header title="店舗情報" showBack={true} />
                <div className="no-store">店舗情報がありません</div>
            </div>
        );
    }

    return (
        <div className="store-info-detail-page">
            <Header title="店舗情報" showBack={true} />

            <div className="store-info-content">
                {/* 店舗基本情報 */}
                <div className="info-section">
                    <h2 className="section-title">基本情報</h2>
                    <div className="info-item">
                        <span className="info-label">店舗名</span>
                        <span className="info-value">{currentStore.name}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">営業時間</span>
                        <span className="info-value">
                            {currentStore.openTime} - {currentStore.closeTime}
                        </span>
                    </div>
                </div>

                {/* アクセス情報 */}
                <div className="info-section">
                    <h2 className="section-title">アクセス</h2>
                    <div className="info-item">
                        <span className="info-label">住所</span>
                        <span className="info-value">〒123-4567 東京都〇〇区〇〇 1-2-3</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">電話番号</span>
                        <span className="info-value">03-1234-5678</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">最寄り駅</span>
                        <span className="info-value">〇〇駅より徒歩5分</span>
                    </div>
                </div>

                {/* サービス情報 */}
                <div className="info-section">
                    <h2 className="section-title">サービス</h2>
                    <div className="service-tags">
                        <span className="service-tag">駐車場あり</span>
                        <span className="service-tag">クレジット可</span>
                        <span className="service-tag">電子マネー可</span>
                        <span className="service-tag">ポイントカード</span>
                    </div>
                </div>

                {/* 休業日情報 */}
                <div className="info-section">
                    <h2 className="section-title">定休日</h2>
                    <p className="info-text">年中無休</p>
                </div>
            </div>
        </div>
    );
};

export default StoreInfoDetailPage;
