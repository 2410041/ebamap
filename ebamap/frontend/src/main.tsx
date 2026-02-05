import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n.ts'
import './index.css'
import App from './App.tsx'

/**
 * React アプリケーションのエントリーポイント
 * i18n 初期化を先に実行して、全コンポーネントで多言語対応を利用可能にする
 */

// ReactアプリをDOMにマウント
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)

