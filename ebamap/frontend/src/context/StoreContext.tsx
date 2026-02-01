import React, { createContext, useContext, useState } from "react";
import type { Store } from "../types/Store.ts";

interface StoreContextType {
    currentStore: Store;
    setCurrentStore: (store: Store) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// 初期表示用の店舗情報
const defaultStore: Store = {
    id: "store_001",
    name: "◇◇スーパー 本店",
    openTime: "9:00",
    closeTime: "22:00",
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 店舗情報をローカルストレージから復元
    const [currentStore, setCurrentStore] = useState<Store>(() => {
        const saved = localStorage.getItem("currentStore");
        return saved ? JSON.parse(saved) : defaultStore;
    });

    // 店舗情報の更新と永続化
    const handleSetCurrentStore = (store: Store) => {
        setCurrentStore(store);
        localStorage.setItem("currentStore", JSON.stringify(store));
    };

    return (
        <StoreContext.Provider value={{ currentStore, setCurrentStore: handleSetCurrentStore }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useStore must be used within StoreProvider");
    }
    return context;
};
