/**
 * 店内地図ページ
 * 指定された売場の店内マップと案内を表示
 * 商品の売場番号に基づいてマップを表示
 */
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import MapView from "../../components/MapView/MapView";
import type { Product } from "../../types/Product.ts";
import "./MapPage.css";

const MapPage = () => {
    const location = useLocation();
    const product = location.state?.product as Product | undefined;

    return (
        <div className="map-page">
            <Header title="店内マップ" showBack />

            <div className="map-content">
                {/* 商品情報がある場合のみ表示 */}
                {product && (
                    <div className="product-location-info">
                        <h3>{product.name}</h3>
                        <p>{product.location}</p>
                    </div>
                )}

                {/* マップ表示 */}
                <div className="map-container">
                    <MapView 
                        location={product?.location || "3-1F"}
                        showLegend={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default MapPage;