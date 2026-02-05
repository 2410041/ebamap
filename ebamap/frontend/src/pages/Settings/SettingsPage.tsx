import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import { useStore } from "../../context/StoreContext";
import "./SettingsPage.css";

/**
 * メニュー/設定ホームページ
 * 主要機能（検索、お気に入り、設定など）へのアクセスポイント
 * 現在選択されている店舗情報も表示
 */
const SettingsPage = () => {
    const navigate = useNavigate();
    const { currentStore } = useStore();
    const { t: translate } = useTranslation();

    // 時刻文字列(HH:mm)を分に変換
    /**
     * 営業時間判定用にHH:mm形式の時刻を分単位に変換
     * @param {string} time - HH:mm形式の時刻文字列
     * @returns {number|null} 分単位の値、パース失敗時はnull
     */
    const toMinutes = (time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        if (Number.isNaN(hours) || Number.isNaN(minutes)) {
            return null;
        }
        return hours * 60 + minutes;
    };

    if (!currentStore) {
        return (
            <div className="store-info-detail-page">
                <Header title={translate("storeInfoDetail.title")} showBack={true} />
                <div className="no-store">{translate("storeInfoDetail.noStore")}</div>
            </div>
        );
    }

    // 営業中/営業時間外の判定
    const openMinutes = toMinutes(currentStore.openTime);
    const closeMinutes = toMinutes(currentStore.closeTime);
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const isOpen = openMinutes !== null && closeMinutes !== null
        ? (closeMinutes > openMinutes
            ? nowMinutes >= openMinutes && nowMinutes < closeMinutes
            : nowMinutes >= openMinutes || nowMinutes < closeMinutes)
        : false;

    // メニュー一覧
    const menuItems = [
        { id: "search", icon: "🔍", label: translate("search.title"), path: "/search", color: "blue" },
        { id: "favorites", icon: "❤️", label: translate("favorites.title"), path: "/favorites", color: "red" },
        { id: "history", icon: "🕐", label: translate("history.title"), path: "/history", color: "green" },
        { id: "deals", icon: "🏷️", label: translate("deals.title"), path: "/deals", color: "orange" },
        { id: "store-info", icon: "ℹ️", label: translate("storeInfoDetail.title"), path: "/store-info", color: "purple" },
        { id: "settings", icon: "⚙️", label: translate("settingsDetail.title"), path: "/settings", color: "gray" },
        { id: "help", icon: "❓", label: translate("help.title"), path: "/help", color: "purple" },
        { id: "terms", icon: "📄", label: translate("terms.title"), path: "/terms", color: "gray" },
        { id: "privacy", icon: "🔒", label: translate("privacy.title"), path: "/privacy", color: "gray" },
        { id: "change-store", icon: "🏪", label: translate("settings.changeStore"), path: "/", color: "purple" },
    ];

    // 画面遷移
    /**
     * メニューアイテムクリック時のハンドラー
     * クリックされたメニューの path に基づいて画面遷移
     * @param {Object} item - メニューアイテムオブジェクト
     */
    const handleMenuClick = (item: typeof menuItems[0]) => {
        if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <div className="settings-page">
            <Header title={translate("settings.title")} />

            <div className="settings-content">
                {/* 現在の店舗情報 */}
                <div className="store-info-banner">
                    <div className="store-avatar">👤</div>
                    <div className="store-details">
                        <h3>{currentStore.name}</h3>
                        <p>
                            <span className={`store-status ${isOpen ? "open" : "closed"}`}>
                                {isOpen ? translate("common.open") : translate("common.closed")}
                            </span>
                            {currentStore.openTime}-{currentStore.closeTime}
                        </p>
                    </div>
                </div>

                {/* メニュー項目一覧 */}
                <div className="menu-list">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className={`menu-item menu-item-${item.color}`}
                            onClick={() => handleMenuClick(item)}
                        >
                            <div className="menu-item-icon">{item.icon}</div>
                            <span className="menu-item-label">{item.label}</span>
                            <svg className="menu-item-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </div>
                    ))}
                </div>

                {/* アプリバージョン */}
                <div className="version-info">
                    <p>バージョン 1.0.0</p>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;