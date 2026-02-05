import React, { createContext, useContext, useState } from "react";
import type { Store } from "../types/Store.ts";

// ストア状態管理用のコンテキスト型定義
interface StoreContextType {
    // 現在選択されている店舗情報（未選択時はnull）
    currentStore: Store | null;
    // 店舗が選択されているかどうかのフラグ
    isStoreSelected: boolean;
    // 店舗情報を更新するための関数
    setCurrentStore: (store: Store) => void;
}

// グローバルストア情報を管理するReact Contextを作成
const StoreContext = createContext<StoreContextType | undefined>(undefined);

// StoreProvider コンポーネント（アプリ全体でストア情報を共有）
export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // localStorage から保存された店舗情報を復元（初回時or リロード時に実行）
    const [currentStore, setCurrentStoreState] = useState<Store | null>(() => {
        // localStorage から "currentStore" キーの値を取得
        const saved = localStorage.getItem("currentStore");
        // JSON形式で保存されているため、パース して復元
        return saved ? JSON.parse(saved) : null;
    });

    // 店舗情報を更新し、同時に localStorage に永続化する関数
    const handleSetCurrentStore = (store: Store) => {
        // ローカル状態を更新
        setCurrentStoreState(store);
        // localStorage に JSON文字列として保存（ページリロード後も保持）
        localStorage.setItem("currentStore", JSON.stringify(store));
    };

    // コンテキストプロバイダーを通じて下階層コンポーネントへ値を提供
    return (
        <StoreContext.Provider value={{
            // 現在選択されている店舗情報
            currentStore,
            // 店舗が選択されているかの判定フラグ
            isStoreSelected: currentStore !== null,
            // 更新用の関数
            setCurrentStore: handleSetCurrentStore
        }}>
            {children}
        </StoreContext.Provider>
    );
};

// useStore フック - このコンテキストを使用するコンポーネント内で呼び出す
export const useStore = () => {
    // useContext で StoreContext を取得
    const context = useContext(StoreContext);
    // コンテキストが見つからない場合（StoreProviderの外で使用された場合）、エラースロー
    if (context === undefined) {
        throw new Error("useStore must be used within StoreProvider");
    }
    // コンテキスト値を返す
    return context;
};
