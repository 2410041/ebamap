import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { useStore } from "../../context/StoreContext";
import type { Store } from "../../types/Store";
import "./StoreSelectPage.css";

// ダミー店舗データ（後々APIから取得）
const AVAILABLE_STORES: Store[] = [
    {
        id: "store_001", name: "エバグリーン飛鳥店", openTime: "9:00", closeTime: "22:00",
        tell: "0744-54-2800", postCode: "〒634-0131", address: "奈良県高市郡明日香村御園 5-1",
        nearestStation: "飛鳥駅", busTravelTimeMinutes: "徒歩約3分"
    },{
        id: "store_002", name: "エバグリーン膳夫店", openTime: "9:00", closeTime: "22:00",
        tell: "0744-21-1300", postCode: "〒634-0012", address: "奈良県高市郡明日香村膳夫 466",
        nearestStation: "JR香久山駅", busTravelTimeMinutes: "徒歩約10分"
    },{
        id: "store_003", name: "エバグリーン田原本店", openTime: "9:00", closeTime: "22:00",
        tell: "0744-34-1500", postCode: "〒636-0246", address: "奈良県磯城郡田原本町千代 766-1",
        nearestStation: "近鉄笠縫駅", busTravelTimeMinutes: "徒歩約13分"
    },{
        id: "store_004", name: "エバグリーン広陵店", openTime: "9:00", closeTime: "22:00",
        tell: "0745-54-1050", postCode: "〒635-0822", address: "奈良県北葛城郡広陵町平尾 710-1",
        nearestStation: "近鉄大和高田駅", busStop: "疋相南口バス停", busDestination: "イオンモール橿原行き",
        busTravelTimeMinutes: "約17分"
    }
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
            const stores = AVAILABLE_STORES.find((store) => store.id === storeId);
            if (stores) {
                setCurrentStore(stores);
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
            const stores = AVAILABLE_STORES.find((store) => store.id === qrData);
            if (stores) {
                setCurrentStore(stores);
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

        const stores = AVAILABLE_STORES.find((store) => store.id === selectedStoreId);
        if (stores) {
            setCurrentStore(stores);
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
                        onChange={(event) => setSelectedStoreId(event.target.value)}
                    >
                        <option value="">-- 店舗を選んでください --</option>
                        {AVAILABLE_STORES.map((store) => (
                            <option key={store.id} value={store.id}>
                                {store.name}
                                {/* ({store.openTime} - {store.closeTime}) */}
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