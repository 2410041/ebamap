import { Routes, Route } from "react-router-dom";

import StoreSelectPage from "../pages/StoreSelect/StoreSelectPage";
import SearchPage from "../pages/Search/SearchPage";
import SearchResultPage from "../pages/SearchResult/SearchResultPage";
import MapPage from "../pages/Map/MapPage";
import FavoritesPage from "../pages/Favorites/FavoritesPage";
import DealsPage from "../pages/Deals/DealsPage";
import HistoryPage from "../pages/History/HistoryPage";
import SettingsPage from "../pages/Settings/SettingsPage";

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
        </Routes>
    );
};

export default AppRoutes;