import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import MapView from "../../components/MapView/MapView";
import "./MapPage.css";

const MapPage = () => {
    const location = useLocation();
    const product = location.state?.product;

    return (
        <div className="map-page">
            <Header title="店内マップ" showBack />

            <div className="map-content">
                {product && (
                    <div className="product-location-info">
                        <h3>{product.name}</h3>
                        <p>{product.location}</p>
                    </div>
                )}

                <div className="map-container">
                    <MapView 
                        location={product?.location || "3-1F"}
                        productName={product?.name}
                        showLegend={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default MapPage;