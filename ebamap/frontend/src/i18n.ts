import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import jaTranslations from "./locales/ja.json";
import enTranslations from "./locales/en.json";

/**
 * i18next 初期化ファイル
 * アプリケーション全体で多言語対応を実現
 * 
 * 機能:
 * - Japanese (ja) と English (en) の2言語をサポート
 * - 初回起動時は localStorage から保存言語を復元
 * 保存言語がないかブラウザが不対応の場合、日本語（ja）がデフォルト
 */

// localStorage から保存言語を取得、なければ 'ja' をデフォルトに
const savedLanguage = (() => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("language") || "ja";
    }
    return "ja";
})();

// i18next の初期化と設定
i18next
    .use(initReactI18next)
    .init({
        // 翻訳リソースの定義
        resources: {
            ja: { translation: jaTranslations },
            en: { translation: enTranslations },
        },
        // デフォルト言語
        lng: savedLanguage,
        // フォールバック言語（翻訳キーが見つからないとき）
        fallbackLng: "ja",
        // 補間機能有効化（${variable}などの変数埋め込みに対応）
        interpolation: {
            escapeValue: false, // React は既にXSS対策を行うため、エスケープ不要
        },
    });

export default i18next;
