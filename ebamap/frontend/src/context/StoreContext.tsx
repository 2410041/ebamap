import React, { createContext, useContext, useState } from "react";
import type { Store } from "../types/Store.ts";

interface StoreContextType {
    currentStore: Store | null;
    isStoreSelected: boolean;
    setCurrentStore: (store: Store) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 店舗情報をローカルストレージから復元
    const [currentStore, setCurrentStoreState] = useState<Store | null>(() => {
        const saved = localStorage.getItem("currentStore");
        return saved ? JSON.parse(saved) : null;
    });

    // 店舗情報の更新と永続化
    const handleSetCurrentStore = (store: Store) => {
        setCurrentStoreState(store);
        localStorage.setItem("currentStore", JSON.stringify(store));
    };

    return (
        <StoreContext.Provider value={{
            currentStore,
            isStoreSelected: currentStore !== null,
            setCurrentStore: handleSetCurrentStore
        }}>
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
