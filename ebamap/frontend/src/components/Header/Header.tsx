import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StoreInfoModal from "../StoreInfoModal/StoreInfoModal";
import "./Header.css";

type HeaderProps = {
    title: string;
    showBack?: boolean;
};

// 画面上部の共通ヘッダー
const Header = ({ title, showBack = false }: HeaderProps) => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div className="header-left">
                    {showBack && (
                        // 1つ前の画面に戻る
                        <button className="back-button" onClick={() => navigate(-1)}>
                            ←
                        </button>
                    )}
                </div>

                <h1 className="header-title">{title}</h1>

                <div className="header-right">
                    <button
                        className="menu-button"
                        // 店舗情報モーダルを開く
                        onClick={() => setIsModalOpen(true)}
                        title="店舗情報"
                    >
                        ≡
                    </button>
                </div>
            </header>

            {/* 店舗情報モーダル */}
            <StoreInfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Header;