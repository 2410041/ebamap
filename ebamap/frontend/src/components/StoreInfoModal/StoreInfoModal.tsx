import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "./StoreInfoModal.css";

interface StoreInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const StoreInfoModal = ({ isOpen, onClose }: StoreInfoModalProps) => {
    const navigate = useNavigate();
    const { currentStore } = useStore();

    if (!isOpen) return null;

    const handleChangeStore = () => {
        onClose();
        navigate("/");
    };

    return (
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
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </div>

                        <div className="store-details">
                            <h3>{currentStore.name}</h3>
                            <div className="store-hours">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
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
