import "./SearchInput.css";

export interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: () => void;
    placeholder?: string;
}

// 検索入力欄（Enterで検索）
const SearchInput = ({
    value,
    onChange,
    onSearch,
    placeholder = "商品名を入力",
}: SearchInputProps) => {
    // Enterキーで検索を実行
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch();
        }
    };

    return (
        <div className="search-input-container">
            {/* 左側の検索アイコン */}
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                // Enterキーで検索
                onKeyPress={handleKeyPress}
            />
        </div>
    );
};

export default SearchInput;
