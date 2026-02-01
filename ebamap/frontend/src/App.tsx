import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import BottomTab from "./components/BottomTab/BottomTab";

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
            <BottomTab />
        </BrowserRouter>
    );
}

export default App;