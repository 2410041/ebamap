import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./FavoritesPage.css";

interface FavoriteProduct {
    id: number;
    name: string;
    location: string;
}

const FavoritesPage = () => {
    const navigate = useNavigate();

    const favorites: FavoriteProduct[] = [
        { id: 1, name: "牛乳", location: "売場番号: 3-1F" },
        { id: 2, name: "パン", location: "売場番号: 2-1F" },
        { id: 3, name: "米", location: "売場番号: 5-1F" },
    ];

    const handleProductClick = (product: FavoriteProduct) => {
        navigate("/map", { state: { product } });
    };

    return (
        <div className="favorites-page">
            <Header title="お気に入り" />

            <div className="favorites-content">
                <div className="favorites-header">
                    <h2>保存した商品</h2>
                    <p className="favorites-count">{favorites.length}件</p>
                </div>

                {favorites.length > 0 ? (
                    <div className="favorites-list">
                        {favorites.map((product) => (
                            <div key={product.id} className="favorite-item" onClick={() => handleProductClick(product)}>
                                <div className="favorite-icon">❤️</div>
                                <div className="favorite-info">
                                    <h3>{product.name}</h3>
                                    <p>{product.location}</p>
                                </div>
                                <button className="map-navigate-btn">
                                    マップを見る
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>お気に入りの商品はまだありません</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;