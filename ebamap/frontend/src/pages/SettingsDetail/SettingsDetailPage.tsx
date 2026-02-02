import { useState } from "react";
import Header from "../../components/Header/Header";
import "./SettingsDetailPage.css";

// 設定詳細ページ
const SettingsDetailPage = () => {
    const [notifications, setNotifications] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [language, setLanguage] = useState("ja");

    return (
        <div className="settings-detail-page">
            <Header title="設定" showBack={true} />

            <div className="settings-detail-content">
                {/* 通知設定 */}
                <div className="setting-section">
                    <h2 className="section-title">通知</h2>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">プッシュ通知</span>
                            <span className="setting-description">特売情報などを通知</span>
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
                            <span className="setting-label">サウンド</span>
                            <span className="setting-description">通知音を鳴らす</span>
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
                    <h2 className="section-title">表示</h2>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="setting-label">言語</span>
                            <span className="setting-description">表示言語の選択</span>
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
                    <h2 className="section-title">データ</h2>
                    <button className="setting-button danger">
                        検索履歴を削除
                    </button>
                    <button className="setting-button danger">
                        お気に入りを削除
                    </button>
                </div>

                {/* アプリ情報 */}
                <div className="setting-section">
                    <h2 className="section-title">アプリ情報</h2>
                    <div className="info-row">
                        <span>バージョン</span>
                        <span>1.0.0</span>
                    </div>
                    <div className="info-row">
                        <span>ビルド番号</span>
                        <span>2024020101</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsDetailPage;
