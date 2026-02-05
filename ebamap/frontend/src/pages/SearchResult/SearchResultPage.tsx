import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import type { Product } from "../../types/Product.ts";
import "./SearchResultPage.css";

/**
 * 検索結果ページ
 * SearchPageから受け取ったキーワードで商品を検索し、結果を表示
 * 該当商品がない場合はメッセージを表示
 */
const SearchResultPage = () => {
    const navigate = useNavigate();

    // サンプルデータ（API接続時に置き換え）
    // サンプルデータ
    const products: Product[] = [
        { id: 1, name: "低脂肪牛乳", price: 220, location: "売場番号: 3-1F" },
        { id: 2, name: "成分牛乳", price: 250, location: "売場番号: 3-1F" },
    ];

    /**
     * 商品をクリックした時のハンドラー
     * マップページ（売場位置表示）へ遷移
     * @param {Product} product - クリックされた商品情報
     */
    const handleProductClick = (product: Product) => {
        navigate("/map", { state: { product } });
    };

    return (
        <div className="search-result-page">
            <Header title="検索結果" showBack />

            <div className="search-result-content">
                <SectionTitle title="検索結果" count={products.length} />

                {/* 商品一覧 */}
                <div className="product-list">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            location={product.location}
                            variant="search"
                            onViewMap={handleProductClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResultPage;