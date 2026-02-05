import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import "./SettingsDetailPage.css";

/**
 * 設定詳細ページ
 * 言語設定・通知設定などのアプリ設定を管理
 * localStorage で言語選択を保存
 */
const SettingsDetailPage = () => {
    // i18n インスタンスと translate 関数を取得
    // t: translate
    // tを translate に名前を変えて使用
    const { i18n, t: translate } = useTranslation();
    
    const [notifications, setNotifications] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    // 現在の言語設定（localStorage から初期値を取得）
    const [language, setLanguage] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("language") || "ja";
        }
        return "ja";
    });

    // 言語変更時の処理
    useEffect(() => {
        if (language) {
            i18n.changeLanguage(language);
            if (typeof window !== "undefined") {
                localStorage.setItem("language", language);
            }
        }
    }, [language, i18n]);

    return (
        <div className="settings-detail-page">
            <Header title={translate("settingsDetail.title")} showBack={true} />

            <div className="settings-detail-content">
                {/* 通知設定 */}
                <div className="setting-section">
                    <h2 className="section-title">{translate("settingsDetail.notification")}</h2>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">{translate("settingsDetail.pushNotification")}</span>
                            <span className="setting-description">{translate("settingsDetail.pushDescription")}</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={notifications}
                                onChange={(e) => setNotifications(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">{translate("settingsDetail.sound")}</span>
                            <span className="setting-description">{translate("settingsDetail.soundDescription")}</span>
                        </div>
                        <label className="toggle-switch">
                            <input
                                type="checkbox"
                                checked={soundEnabled}
                                onChange={(e) => setSoundEnabled(e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>

                {/* 表示設定 */}
                <div className="setting-section">
                    <h2 className="section-title">{translate("settingsDetail.display")}</h2>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">{translate("settingsDetail.language")}</span>
                            <span className="setting-description">{translate("settingsDetail.languageDescription")}</span>
                        </div>
                        <select
                            className="setting-select"
                            value={language}
                            onChange={(event) => setLanguage(event.target.value)}
                        >
                            <option value="ja">日本語</option>
                            <option value="en">English</option>
                            <option value="zh">中国語</option>
                            <option value="vi">ベトナム語</option>
                            <option value="ko">韓国語</option>
                        </select>
                    </div>
                </div>

                {/* データ管理 */}
                <div className="setting-section">
                    <h2 className="section-title">{translate("settingsDetail.data")}</h2>
                    <button className="setting-button danger">
                        {translate("settingsDetail.clearHistory")}
                    </button>
                    <button className="setting-button danger">
                        {translate("settingsDetail.clearFavorites")}
                    </button>
                </div>

                {/* アプリ情報 */}
                <div className="setting-section">
                    <h2 className="section-title">{translate("settingsDetail.appInfo")}</h2>
                    <div className="info-row">
                        <span>{translate("settingsDetail.version")}</span>
                        <span>1.0.0</span>
                    </div>
                    <div className="info-row">
                        <span>{translate("settingsDetail.buildNumber")}</span>
                        <span>2024020101</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsDetailPage;
