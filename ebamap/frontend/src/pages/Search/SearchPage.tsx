import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import SearchInput from "../../components/SearchInput/SearchInput";
import "./SearchPage.css";

/**
 * 商品検索ページ
 * ユーザーがキーワードで商品を検索し、検索結果ページへ遷移
 */
const SearchPage = () => {
    const navigate = useNavigate();
    const { t: translate } = useTranslation();
    // ユーザーが入力した検索キーワード
    const [searchQuery, setSearchQuery] = useState("");
    // 選択中のカテゴリタブ（すべて、特売など）
    const [activeCategory, setActiveCategory] = useState("all");

    // カテゴリータブのメタデータ
    const categories = [
        { id: "all", label: translate("search.allCategory") },
        { id: "sale", label: translate("search.saleCategory") },
        { id: "bread", label: translate("search.breadCategory") },
    ];

    // 検索実行（結果ページへ遷移）
    /**
     * 検索キーワードが空でない場合、結果ページへ遷移
     * 検索キーワードはlocationのstateで結果ページに渡される
     */
    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate("/result", { state: { query: searchQuery } });
        }
    };

    return (
        <div className="search-page">
            <Header title={translate("search.title")} />

            <div className="search-page-content">
                {/* 検索入力 */}
                <SearchInput
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSearch={handleSearch}
                    placeholder={translate("search.placeholder")}
                />

                {/* カテゴリー選択 */}
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
                    <button className="category-tab">{translate("search.specialty")}</button>
                </div>

                {/* よく使う検索候補 */}
                <div className="search-suggestions">
                    <div className="suggestion-item" onClick={() => { setSearchQuery(translate("search.suggestions.0")); handleSearch(); }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{translate("search.suggestions.0")}</span>
                    </div>
                    <div className="suggestion-item" onClick={() => { setSearchQuery(translate("search.suggestions.1")); handleSearch(); }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>{translate("search.suggestions.1")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;