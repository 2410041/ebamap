import { useTranslation } from "react-i18next";
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
    const { t: translate } = useTranslation();

    if (!currentStore) {
        return (
            <div className="store-info-detail-page">
                <Header title={translate("storeInfoDetail.title")} showBack={true} />
                <div className="no-store">{translate("storeInfoDetail.noStore")}</div>
            </div>
        );
    }

    return (
        <div className="store-info-detail-page">
            <Header title={translate("storeInfoDetail.title")} showBack={true} />

            <div className="store-info-content">
                {/* 店舗基本情報 */}
                <div className="info-section">
                    <h2 className="section-title">{translate("storeInfoDetail.basic")}</h2>
                    <div className="info-item">
                        <span className="info-label">{translate("storeInfoDetail.storeName")}</span>
                        <span className="info-value">スーパー{currentStore.name}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">{translate("storeInfoDetail.hours")}</span>
                        <span className="info-value">
                            {currentStore.openTime} - {currentStore.closeTime}
                        </span>
                    </div>
                </div>

                {/* アクセス情報 */}
                <div className="info-section">
                    <h2 className="section-title">{translate("storeInfoDetail.access")}</h2>
                    <div className="info-item">
                        <span className = "info-label">{translate("storeInfoDetail.postCode")}</span>
                        <span className="info-value">{currentStore.postCode}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">{translate("storeInfoDetail.address")}</span>
                        <span className="info-value">{currentStore.address}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">{translate("storeInfoDetail.phone")}</span>
                        <span className="info-value">{currentStore.tell}</span>
                    </div>
                    <div className="info-item">
                        <span className="info-label">{translate("storeInfoDetail.station")}</span>
                        <span className="info-value">{currentStore.nearestStation}</span>
                    </div>
                    {/* {currentStore.変数} にデータが入っていたら表示 */}
                    {/* そうでなければ非表示 */}
                    {currentStore.busStop && (
                        <div className="info-item">
                            <span className="info-label">{translate("storeInfoDetail.busStop")}</span>
                            <span className="info-value">{currentStore.busStop}</span>
                        </div>
                    )}
                    {currentStore.busDestination && (
                        <div className="info-item">
                            <span className="info-label">{translate("storeInfoDetail.busDestination")}</span>
                            <span className="info-value">{currentStore.busDestination}</span>
                        </div>
                    )}
                    {currentStore.busTravelTimeMinutes && (
                        <div className="info-item">
                            <span className="info-label">{translate("storeInfoDetail.busTime")}</span>
                            <span className="info-value">{currentStore.busTravelTimeMinutes}</span>
                        </div>
                    )}
                </div>

                {/* サービス情報 */}
                <div className="info-section">
                    <h2 className="section-title">{translate("storeInfoDetail.services")}</h2>
                    <div className="service-tags">
                        <span className="service-tag">{translate("storeInfoDetail.parking")}</span>
                        <span className="service-tag">{translate("storeInfoDetail.qrPayment")}</span>
                        <span className="service-tag">{translate("storeInfoDetail.pointCard")}</span>
                    </div>
                </div>

                {/* 休業日情報 */}
                <div className="info-section">
                    <h2 className="section-title">{translate("storeInfoDetail.closedDays")}</h2>
                    <p className="info-text">{translate("storeInfoDetail.holidayInfo")}</p>
                </div>
            </div>
        </div>
    );
};

export default StoreInfoDetailPage;
