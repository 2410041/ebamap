import React, { createContext, useContext, useState } from "react";

interface Store {
  id: string;
  name: string;
  openTime: string;
  closeTime: string;
}

interface StoreContextType {
  currentStore: Store;
  setCurrentStore: (store: Store) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const defaultStore: Store = {
  id: "store_001",
  name: "◇◇スーパー 本店",
  openTime: "9:00",
  closeTime: "22:00",
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStore, setCurrentStore] = useState<Store>(() => {
    const saved = localStorage.getItem("currentStore");
    return saved ? JSON.parse(saved) : defaultStore;
  });

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
