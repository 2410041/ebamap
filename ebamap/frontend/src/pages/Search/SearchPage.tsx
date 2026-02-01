import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import SearchInput from "../../components/SearchInput/SearchInput";
import "./SearchPage.css";

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    // カテゴリータブ
    const categories = [
        { id: "all", label: "すべて" },
        { id: "sale", label: "特売" },
        { id: "bread", label: "パン" },
    ];

    // 検索実行（結果ページへ遷移）
    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate("/result", { state: { query: searchQuery } });
        }
    };

    return (
        <div className="search-page">
            <Header title="商品検索" />

            <div className="search-page-content">
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                    placeholder="商品名を入力"
                />

                <div className="category-tabs">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`category-tab ${activeCategory === category.id ? "active" : ""}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.label}
                        </button>
                    ))}
                    <button className="category-tab">特産</button>
                </div>

                <div className="search-suggestions">
                    <div className="suggestion-item" onClick={() => { setSearchQuery("牛乳"); handleSearch(); }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>牛乳</span>
                    </div>
                    <div className="suggestion-item" onClick={() => { setSearchQuery("パン"); handleSearch(); }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>パン</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;