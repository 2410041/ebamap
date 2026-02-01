import { useNavigate } from "react-router-dom";
import "./StoreSelectPage.css";

const StoreSelectPage = () => {
    const navigate = useNavigate();

    const handleStoreSelect = () => {
        // 店舗選択後、検索画面へ遷移
        navigate("/search");
    };

    return (
        <div className="store-select-page">
            <div className="store-select-header">
                <div className="header-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </div>
                <h1 className="header-title">店舗決定</h1>
            </div>

            <div className="qr-scan-container">
                <div className="qr-scan-box">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                        <rect x="10" y="10" width="100" height="100" stroke="#2563eb" strokeWidth="3" strokeDasharray="8 8" rx="8" />
                        <path d="M10 30 L10 10 L30 10" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                        <path d="M90 10 L110 10 L110 30" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                        <path d="M110 90 L110 110 L90 110" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                        <path d="M30 110 L10 110 L10 90" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    <p className="qr-scan-text">QRコードをスキャン</p>
                </div>
                <button className="store-select-button" onClick={handleStoreSelect}>
                    店舗決定
                </button>
            </div>
        </div>
    );
};

export default StoreSelectPage;