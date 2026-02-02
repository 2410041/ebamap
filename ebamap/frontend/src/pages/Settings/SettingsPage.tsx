import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useStore } from "../../context/StoreContext";
import "./SettingsPage.css";

const SettingsPage = () => {
    const navigate = useNavigate();
    const { currentStore } = useStore();

    // 時刻文字列(HH:mm)を分に変換
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
                <Header title="店舗情報" showBack={true} />
                <div className="no-store">店舗情報がありません</div>
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
        { id: "search", icon: "🔍", label: "商品検索", path: "/search", color: "blue" },
        { id: "favorites", icon: "❤️", label: "お気に入り", path: "/favorites", color: "red" },
        { id: "history", icon: "🕐", label: "検索履歴", path: "/history", color: "green" },
        { id: "deals", icon: "🏷️", label: "特売情報", path: "/deals", color: "orange" },
        { id: "store-info", icon: "ℹ️", label: "店舗情報", path: "/store-info", color: "purple" },
        { id: "settings", icon: "⚙️", label: "設定", path: "/settings", color: "gray" },
        { id: "help", icon: "❓", label: "ヘルプ", path: "/help", color: "purple" },
        { id: "terms", icon: "📄", label: "利用規約", path: "/terms", color: "gray" },
        { id: "privacy", icon: "🔒", label: "プライバシー", path: "/privacy", color: "gray" },
        { id: "change-store", icon: "🏪", label: "店舗を変更", path: "/", color: "purple" },
    ];

    // 画面遷移
    const handleMenuClick = (item: typeof menuItems[0]) => {
        if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <div className="settings-page">
            <Header title="メニュー" />

            <div className="settings-content">
                {/* 現在の店舗情報 */}
                <div className="store-info-banner">
                    <div className="store-avatar">👤</div>
                    <div className="store-details">
                        <h3>{currentStore.name}</h3>
                        <p>
                            <span className={`store-status ${isOpen ? "open" : "closed"}`}>
                                {isOpen ? "営業中" : "営業時間外"}
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