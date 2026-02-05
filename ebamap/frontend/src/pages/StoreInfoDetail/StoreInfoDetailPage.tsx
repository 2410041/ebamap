import Header from "../../components/Header/Header";
import { useStore } from "../../context/StoreContext";
import "./StoreInfoDetailPage.css";

/**
 * 店舗情報詳細ページ
 * 選択した店舗の詳細情報（住所、電話、アクセス方法）を表示
 * バスや駅でのアクセス情報も含む
 */
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
                        <span className="info-value">スーパー{currentStore.name}</span>
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
                        <span className = "info-label">郵便番号</span>
                        <span className="info-value">{currentStore.postCode}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">住所</span>
                        <span className="info-value">{currentStore.address}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">電話番号</span>
                        <span className="info-value">{currentStore.tell}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">最寄り駅</span>
                        <span className="info-value">{currentStore.nearestStation}</span>
                    </div>
                    {/* {currentStore.変数} にデータが入っていたら表示 */}
                    {/* そうでなければ非表示 */}
                    {currentStore.busStop && (
                        <div className="info-item">
                            <span className="info-label">バス停名</span>
                            <span className="info-value">{currentStore.busStop}</span>
                        </div>
                    )}
                    {currentStore.busDestination && (
                        <div className="info-item">
                            <span className="info-label">バスの行き先</span>
                            <span className="info-value">{currentStore.busDestination}</span>
                        </div>
                    )}
                    {currentStore.busTravelTimeMinutes && (
                        <div className="info-item">
                            <span className="info-label">バスや徒歩での所要時間</span>
                            <span className="info-value">{currentStore.busTravelTimeMinutes}</span>
                        </div>
                    )}
                </div>

                {/* サービス情報 */}
                <div className="info-section">
                    <h2 className="section-title">サービス</h2>
                    <div className="service-tags">
                        <span className="service-tag">駐車場あり</span>
                        <span className="service-tag">QR決済(PayPayのみ)</span>
                        <span className="service-tag">ポイントカード</span>
                    </div>
                </div>

                {/* 休業日情報 */}
                <div className="info-section">
                    <h2 className="section-title">定休日</h2>
                    <p className="info-text">1月1日、1月2日</p>
                </div>
            </div>
        </div>
    );
};

export default StoreInfoDetailPage;
