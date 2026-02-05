import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler']],
            },
        }),
    ],
    build: {
        /**
         * チャンクサイズ警告の閾値を設定
         * デフォルト: 500 kB
         * 現在のアプリサイズに対応するため 1000 kB に設定
         * （CSS・JSファイルが 1MB を超えた場合に警告が出ます）
         */
        chunkSizeWarningLimit: 1000,
        /**
         * Rollup オプション：コード分割の最適化
         * 複数のチャンクに分割してバンドルサイズを削減
         */
        rollupOptions: {
            output: {
                manualChunks: {
                    // React 関連パッケージを別チャンクに
                    react: ['react', 'react-dom', 'react-router-dom'],
                    // i18n ライブラリを別チャンクに
                    i18n: ['i18next', 'react-i18next'],
                    // HTML5 QR コード関連
                    qrcode: ['html5-qrcode'],
                },
            },
        },
    },
})
