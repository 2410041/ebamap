import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { useStore } from "../../context/StoreContext";
import type { Store } from "../../types/Store";
import "./StoreSelectPage.css";

// ダミー店舗データ（将来的にはAPIから取得）
const AVAILABLE_STORES: Store[] = [
    { id: "store_001", name: "◇◇スーパー 本店", openTime: "9:00", closeTime: "22:00" },
    { id: "store_002", name: "◇◇スーパー 駅前店", openTime: "10:00", closeTime: "21:00" },
    { id: "store_003", name: "◇◇スーパー 南口店", openTime: "8:00", closeTime: "23:00" },
];

const StoreSelectPage = () => {
    const navigate = useNavigate();
    const { setCurrentStore } = useStore();
    const [scannerMode, setScannerMode] = useState<"qr" | "manual">("qr");
    const [selectedStoreId, setSelectedStoreId] = useState<string>("");
    const [scanError, setScanError] = useState<string>("");
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const qrReaderRef = useRef<HTMLDivElement>(null);

    // QRコードスキャナーの初期化
    useEffect(() => {
        if (scannerMode !== "qr" || !qrReaderRef.current) return;

        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        // スキャン開始
        scanner
            .start(
                { facingMode: "environment" }, // 背面カメラを使用
                {
                    fps: 10, // フレームレート
                    qrbox: { width: 250, height: 250 }, // スキャンエリアのサイズ
                },
                (decodedText) => {
                    // QRコード読み取り成功
                    handleQrCodeScanned(decodedText);
                },
                () => {
                    // エラーは無視（継続的にスキャン）
                }
            )
            .catch((err) => {
                console.error("QRコードスキャナーの起動に失敗:", err);
                setScanError("カメラの起動に失敗しました。手動選択をご利用ください。");
            });

        // クリーンアップ
        return () => {
            if (scannerRef.current?.isScanning) {
                scannerRef.current
                    .stop()
                    .then(() => {
                        scannerRef.current?.clear();
                    })
                    .catch((err) => console.error("スキャナー停止エラー:", err));
            }
        };
    }, [scannerMode]);

    // QRコード読み取り時の処理
    const handleQrCodeScanned = (qrData: string) => {
        try {
            // QRコードから店舗IDを抽出（JSON形式を想定）
            const data = JSON.parse(qrData);
            const storeId = data.storeId || data.id;

            // 店舗情報を検索
            const store = AVAILABLE_STORES.find((s) => s.id === storeId);
            if (store) {
                setCurrentStore(store);
                // スキャナーを停止してから遷移
                if (scannerRef.current?.isScanning) {
                    scannerRef.current.stop().then(() => {
                        navigate("/search");
                    });
                } else {
                    navigate("/search");
                }
            } else {
                setScanError("店舗情報が見つかりませんでした");
            }
        } catch {
            // JSON以外の場合は店舗IDとして扱う
            const store = AVAILABLE_STORES.find((s) => s.id === qrData);
            if (store) {
                setCurrentStore(store);
                if (scannerRef.current?.isScanning) {
                    scannerRef.current.stop().then(() => {
                        navigate("/search");
                    });
                } else {
                    navigate("/search");
                }
            } else {
                setScanError("無効なQRコードです");
            }
        }
    };

    // 手動選択時の処理
    const handleManualSelect = () => {
        if (!selectedStoreId) {
            setScanError("店舗を選択してください");
            return;
        }

        const store = AVAILABLE_STORES.find((s) => s.id === selectedStoreId);
        if (store) {
            setCurrentStore(store);
            navigate("/search");
        }
    };

    return (
        <div className="store-select-page">
            <div className="store-select-header">
                <div className="header-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </div>
                <h1 className="header-title">店舗選択</h1>
            </div>

            <div className="mode-toggle">
                <button
                    className={`mode-button ${scannerMode === "qr" ? "active" : ""}`}
                    onClick={() => {
                        setScannerMode("qr");
                        setScanError("");
                    }}
                >
                    QRコード
                </button>
                <button
                    className={`mode-button ${scannerMode === "manual" ? "active" : ""}`}
                    onClick={() => {
                        setScannerMode("manual");
                        setScanError("");
                    }}
                >
                    手動選択
                </button>
            </div>

            {scanError && <div className="error-message">{scanError}</div>}

            {scannerMode === "qr" ? (
                <div className="qr-scan-container">
                    <div id="qr-reader" ref={qrReaderRef}></div>
                    <p className="qr-scan-help">店舗のQRコードをカメラに向けてください</p>
                </div>
            ) : (
                <div className="manual-select-container">
                    <label htmlFor="store-select" className="select-label">
                        店舗を選択
                    </label>
                    <select
                        id="store-select"
                        className="store-select-dropdown"
                        value={selectedStoreId}
                        onChange={(e) => setSelectedStoreId(e.target.value)}
                    >
                        <option value="">-- 店舗を選んでください --</option>
                        {AVAILABLE_STORES.map((store) => (
                            <option key={store.id} value={store.id}>
                                {store.name} ({store.openTime} - {store.closeTime})
                            </option>
                        ))}
                    </select>
                    <button className="store-select-button" onClick={handleManualSelect}>
                        この店舗で決定
                    </button>
                </div>
            )}
        </div>
    );
};

export default StoreSelectPage;