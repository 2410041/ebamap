import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import type { Product } from "../../types/Product.ts";
import "./FavoritesPage.css";

const FavoritesPage = () => {
    const navigate = useNavigate();

    // お気に入り一覧（仮データ）
    const favorites: Product[] = [
        { id: 1, name: "牛乳", location: "売場番号: 3-1F" },
        { id: 2, name: "パン", location: "売場番号: 2-1F" },
        { id: 3, name: "米", location: "売場番号: 5-1F" },
    ];

    // マップへ遷移
    const handleProductClick = (product: Product) => {
        navigate("/map", { state: { product } });
    };

    return (
        <div className="favorites-page">
            <Header title="お気に入り" />

            <div className="favorites-content">
                <SectionTitle title="保存した商品" count={favorites.length} />

                {favorites.length > 0 ? (
                    <div className="favorites-list">
                        {favorites.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                location={product.location}
                                variant="favorite"
                                onViewMap={handleProductClick}
                            />
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