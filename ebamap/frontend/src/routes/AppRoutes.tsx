import { Routes, Route } from "react-router-dom";

import StoreSelectPage from "../pages/StoreSelect/StoreSelectPage";
import SearchPage from "../pages/Search/SearchPage";
import SearchResultPage from "../pages/SearchResult/SearchResultPage";
import MapPage from "../pages/Map/MapPage";
import FavoritesPage from "../pages/Favorites/FavoritesPage";
import DealsPage from "../pages/Deals/DealsPage";
import HistoryPage from "../pages/History/HistoryPage";
import SettingsPage from "../pages/Settings/SettingsPage";
import StoreInfoDetailPage from "../pages/StoreInfoDetail/StoreInfoDetailPage";
import SettingsDetailPage from "../pages/SettingsDetail/SettingsDetailPage";
import HelpPage from "../pages/Help/HelpPage";
import TermsPage from "../pages/Terms/TermsPage";
import PrivacyPage from "../pages/Privacy/PrivacyPage";

/**
 * アプリケーション全体のルーティング定義コンポーネント
 * 各ページと URL パスのマッピングを定義
 * 
 * ルートパス一覧:
 * / - 店舗選択ページ（アプリ起動時の最初のページ）
 * /search - 商品検索ページ
 * /result - 検索結果ページ
 * /map - 店内マップページ（売場位置表示）
 * /favorites - お気に入りページ
 * /deals - 特売情報ページ
 * /history - 検索履歴ページ
 * /menu - メニュー/ホームページ
 * /store-info - 店舗詳細情報ページ
 * /settings - 設定詳細ページ
 * /help - ヘルプページ
 * /terms - 利用規約ページ
 * /privacy - プライバシーポリシーページ
 */
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<StoreSelectPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/result" element={<SearchResultPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/deals" element={<DealsPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/menu" element={<SettingsPage />} />
            <Route path="/store-info" element={<StoreInfoDetailPage />} />
            <Route path="/settings" element={<SettingsDetailPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
    );
};

export default AppRoutes;