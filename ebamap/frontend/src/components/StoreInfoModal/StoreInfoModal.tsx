import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "./StoreInfoModal.css";

interface StoreInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// ヘッダーメニューから開く店舗情報モーダル
const StoreInfoModal = ({ isOpen, onClose }: StoreInfoModalProps) => {
    const navigate = useNavigate();
    const { currentStore } = useStore();

    // 閉じている場合は何も描画しない
    if (!isOpen || !currentStore) return null;

    // 店舗変更: ストア選択画面へ
    const handleChangeStore = () => {
        onClose();
        navigate("/");
    };

    return (
        // 背景クリックで閉じる / 内部クリックは伝播停止
        <div className="modal-overlay" onClick={onClose}>
            <div className="store-info-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>店舗情報</h2>
                    <button className="close-button" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="modal-content">
                    <div className="store-card">
                        <div className="store-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                                {/* 建物の屋根部分：三角形 */}
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                {/* 建物の中央ドア部分：縦の区切り */}
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </div>

                        <div className="store-details">
                            <h3>{currentStore.name}</h3>
                            <div className="store-hours">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    {/* 
                                      時計の本体：中心(12,12)、半径10の円
                                      cx="12" cy="12" = 中心座標
                                      r="10" = 半径
                                    */}
                                    <circle cx="12" cy="12" r="10"></circle>
                                    {/* 
                                      時計の針：3つの座標を結ぶ
                                      (12,6) = 12時方向（上）
                                      (12,12) = 中心点
                                      (16,14) = 4時～5時方向（右下）
                                      結果：時計が約3時20分頃を指している状態
                                    */}
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span>
                                    営業時間: {currentStore.openTime} - {currentStore.closeTime}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button className="change-store-button" onClick={handleChangeStore}>
                            店舗を変更する
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreInfoModal;
