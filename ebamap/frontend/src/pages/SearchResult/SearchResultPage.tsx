import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./SearchResultPage.css";

interface Product {
  id: number;
  name: string;
  price: number;
  location: string;
}

const SearchResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = location.state?.query || "";

  // サンプルデータ
  const products: Product[] = [
    { id: 1, name: "低脂肪牛乳", price: 220, location: "売場番号: 3-1F" },
    { id: 2, name: "成分牛乳", price: 250, location: "売場番号: 3-1F" },
  ];

  const handleProductClick = (product: Product) => {
    navigate("/map", { state: { product } });
  };

  return (
    <div className="search-result-page">
      <Header title="検索結果" showBack />
      
      <div className="search-result-content">
        <div className="result-header">
          <h2>検索結果</h2>
          <p className="result-count">{products.length}件の商品</p>
        </div>

        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card" onClick={() => handleProductClick(product)}>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-location">{product.location}</p>
              </div>
              <button className="map-button">売場地図</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultPage;