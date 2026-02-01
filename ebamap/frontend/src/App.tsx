import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import AppRoutes from "./routes/AppRoutes";
import BottomTab from "./components/BottomTab/BottomTab";

// アプリ全体のルート構成（プロバイダー + ルーティング + 下部タブ）
function App() {
    // 環境変数から base path を取得（デフォルトは '/'）
    const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
    
    return (
        <StoreProvider>
            <BrowserRouter basename={basename}>
                <AppRoutes />
                <BottomTab />
            </BrowserRouter>
        </StoreProvider>
    );
}

export default App;