import { NavLink } from "react-router-dom";
import "./BottomTab.css";

const BottomTab = () => {
    return (
        <nav className="bottom-tab">
            <NavLink to="/search" className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <span>検索</span>
            </NavLink>

            <NavLink to="/map" className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z"></path>
                    <path d="M9 3v15M15 6v15"></path>
                </svg>
                <span>マップ</span>
            </NavLink>

            <NavLink to="/favorites" className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>お気に入り</span>
            </NavLink>

            <NavLink to="/deals" className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <circle cx="7" cy="7" r="1" fill="currentColor"></circle>
                </svg>
                <span>特売</span>
            </NavLink>

            <NavLink to="/menu" className={({ isActive }) => `tab-item ${isActive ? 'active' : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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