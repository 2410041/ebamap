import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./SettingsPage.css";

const SettingsPage = () => {
    const navigate = useNavigate();

    // メニュー一覧
    const menuItems = [
        { id: "search", icon: "🔍", label: "商品検索", path: "/search", color: "blue" },
        { id: "favorites", icon: "❤️", label: "お気に入り", path: "/favorites", color: "red" },
        { id: "history", icon: "🕐", label: "検索履歴", path: "/history", color: "green" },
        { id: "deals", icon: "🏷️", label: "特売情報", path: "/deals", color: "orange" },
        { id: "store-info", icon: "ℹ️", label: "店舗情報", color: "purple" },
        { id: "settings", icon: "⚙️", label: "設定", color: "gray" },
        { id: "help", icon: "❓", label: "ヘルプ", color: "purple" },
        { id: "terms", icon: "📄", label: "利用規約", color: "gray" },
        { id: "privacy", icon: "🔒", label: "プライバシー", color: "gray" },
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
                        <h3>〇〇スーパー 本店</h3>
                        <p>営業中 9:00-22:00</p>
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