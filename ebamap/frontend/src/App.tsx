import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import AppRoutes from "./routes/AppRoutes";
import BottomTab from "./components/BottomTab/BottomTab";

/**
 * アプリケーションの最外層ルートコンポーネント
 * 
 * 構成要素:
 * - StoreProvider: 店舗選択状態を管理するコンテキストプロバイダー
 * - BrowserRouter: react-router-dom によるクライアント側ルーティング
 * - AppRoutes: 各ページと URL のマッピング
 * - BottomTab: 画面下部の5タブナビゲーション
 * 
 * BASE_URL は環境変数から取得（Docker: '/', Lolipop: '/test/'）
 */
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