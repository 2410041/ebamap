import { Routes, Route } from "react-router-dom";

import StoreSelectPage from "../pages/StoreSelect/StoreSelectPage";
import SearchPage from "../pages/Search/SearchPage";
import SearchResultPage from "../pages/SearchResult/SearchResultPage";
import MapPage from "../pages/Map/MapPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<StoreSelectPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/result" element={<SearchResultPage />} />
            <Route path="/map" element={<MapPage />} />
        </Routes>
    );
};

export default AppRoutes;