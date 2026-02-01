import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import AppRoutes from "./routes/AppRoutes";
import BottomTab from "./components/BottomTab/BottomTab";

// アプリ全体のルート構成（プロバイダー + ルーティング + 下部タブ）
function App() {
    return (
        <StoreProvider>
            <BrowserRouter>
                <AppRoutes />
                <BottomTab />
            </BrowserRouter>
        </StoreProvider>
    );
}

export default App;