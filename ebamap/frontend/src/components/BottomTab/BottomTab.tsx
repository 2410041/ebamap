import { NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreContext";
import "./BottomTab.css";

// 画面下部のタブナビゲーション
const BottomTab = () => {
    const { isStoreSelected } = useStore();
    const navigate = useNavigate();

    // 店舗未選択時はStoreSelectPageへリダイレクト
    const handleTabClick = (event: React.MouseEvent) => {
        if (!isStoreSelected) {
            event.preventDefault();
            navigate("/");
        }
    };

    return (
        <nav className="bottom-tab">
            {/* 各タブは対応ページへ遷移（店舗未選択時は選択画面へ） */}
            <NavLink 
                to="/search" 
                className={({ isActive }) => `tab-item ${isActive ? 'active' : ''} ${!isStoreSelected ? 'disabled' : ''}`}
                onClick={handleTabClick}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {/* 虫眼鏡のレンズ部分 */}
                    <circle cx="11" cy="11" r="8"></circle>
                    {/* 虫眼鏡の持ち手部分 */}
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <span>検索</span>
            </NavLink>

            <NavLink 
                to="/map" 
                className={({ isActive }) => `tab-item ${isActive ? 'active' : ''} ${!isStoreSelected ? 'disabled' : ''}`}
                onClick={handleTabClick}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {/* 地図のベース形状：立体感を表現 */}
                    <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"></path>
                    {/* 地図上の区分線：グリッド効果 */}
                    <path d="M9 3v15M15 6v15"></path>
                </svg>
                <span>マップ</span>
            </NavLink>

            <NavLink 
                to="/favorites" 
                className={({ isActive }) => `tab-item ${isActive ? 'active' : ''} ${!isStoreSelected ? 'disabled' : ''}`}
                onClick={handleTabClick}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {/* ハートの形状：左右の円形と下部の三角形で構成 */}
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>お気に入り</span>
            </NavLink>

            <NavLink 
                to="/deals" 
                className={({ isActive }) => `tab-item ${isActive ? 'active' : ''} ${!isStoreSelected ? 'disabled' : ''}`}
                onClick={handleTabClick}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {/* プライス（値札）タグの形状：折れ曲がった四角形 */}
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    {/* タグ上の穴（リボンを通す部分） */}
                    <circle cx="7" cy="7" r="1" fill="currentColor"></circle>
                </svg>
                <span>特売</span>
            </NavLink>

            <NavLink 
                to="/menu" 
                className={({ isActive }) => `tab-item ${isActive ? 'active' : ''} ${!isStoreSelected ? 'disabled' : ''}`}
                onClick={handleTabClick}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {/* ハンバーガーメニュー：3本の横線で構成 */}
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <span>メニュー</span>
            </NavLink>
        </nav>
    );
};

export default BottomTab;