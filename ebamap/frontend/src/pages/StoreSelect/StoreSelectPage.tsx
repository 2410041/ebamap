import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Html5Qrcode } from "html5-qrcode";
import { useStore } from "../../context/StoreContext";
import type { Store } from "../../types/Store";
import "./StoreSelectPage.css";

/**
 * 店舗選択ページ
 * アプリ起動時に表示される最初のページ
 * QRコードスキャンまたは手動選択で店舗を選択
 * 選択後、selectedStore をContext に保存して他ページへ遷移
 */

// アプリで利用可能な店舗マスターデータ（後々はAPIから取得）
// 各店舗はID・名前・営業時間・住所情報を持つ
const AVAILABLE_STORES: Store[] = [
    {
        id: "store_001", name: "エバグリーン飛鳥店", openTime: "9:00", closeTime: "21:50",
        tell: "0744-54-2800", postCode: "〒634-0131", address: "奈良県高市郡明日香村御園 5-1",
        nearestStation: "飛鳥駅", busTravelTimeMinutes: "徒歩約3分"
    },{
        id: "store_002", name: "エバグリーン膳夫店", openTime: "8:00", closeTime: "00:00",
        tell: "0744-21-1300", postCode: "〒634-0012", address: "奈良県高市郡明日香村膳夫 466",
        nearestStation: "JR香久山駅", busTravelTimeMinutes: "徒歩約10分"
    },{
        id: "store_003", name: "エバグリーン田原本店", openTime: "8:00", closeTime: "00:00",
        tell: "0744-34-1500", postCode: "〒636-0246", address: "奈良県磯城郡田原本町千代 766-1",
        nearestStation: "近鉄笠縫駅", busTravelTimeMinutes: "徒歩約13分"
    },{
        id: "store_004", name: "エバグリーン広陵店", openTime: "8:00", closeTime: "00:00",
        tell: "0745-54-1050", postCode: "〒635-0822", address: "奈良県北葛城郡広陵町平尾 710-1",
        nearestStation: "近鉄大和高田駅", busStop: "疋相南口バス停", busDestination: "イオンモール橿原行き",
        busTravelTimeMinutes: "約17分"
    }
];

const StoreSelectPage = () => {
    const navigate = useNavigate();
    const { setCurrentStore } = useStore();
    const { t: translate } = useTranslation();
    // スキャンモード管理：QRコード読み込みか手動選択か
    const [scannerMode, setScannerMode] = useState<"qr" | "manual">("qr");
    // 手動選択時に選択された店舗のID
    const [selectedStoreId, setSelectedStoreId] = useState<string>("");
    // QRスキャンまたは入力エラーのメッセージ
    const [scanError, setScanError] = useState<string>("");
    // Html5Qrcodeライブラリのインスタンス参照
    const scannerRef = useRef<Html5Qrcode | null>(null);
    // QRコード表示用のDOM要素参照
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
                setScanError(translate("storeSelect.cameraError"));
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

    /**
     * QRコード読み取り時の処理
     * @param {string} qrData - スキャンされたQRコードの内容
     * JSON形式: { storeId: "store_001" } または単純な文字列形式に対応
     * 成功時: 店舗情報をContextに保存して/searchページへ遷移
     * 失敗時: エラーメッセージを表示して再スキャン可能にする
     */
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
                setScanError(translate("storeSelect.notFound"));
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
                setScanError(translate("storeSelect.invalidQr"));
            }
        }
    };

    /**
     * 手動選択ボタンの処理
     * 選択されたdropdownから店舗IDを取得
     * AVAILABLE_STORESから該当店舗を検索してContextに保存
     * その後、/searchページへ遷移
     */
    const handleManualSelect = () => {
        if (!selectedStoreId) {
            setScanError(translate("storeSelect.selectPlaceholder"));
            return;
        }

        const stores = AVAILABLE_STORES.find((store) => store.id === selectedStoreId);
        if (stores) {
            setCurrentStore(stores);
            navigate("/search");
        }
    };

    /**
     * UI Render
     * 2つのモード（QRコード / 手動選択）を表示
     * - QR: Html5Qrcodeライブラリを使用したバックカメラスキャン
     * - 手動: selectタグで店舗一覧から選択
     */
    return (
        <div className="store-select-page">
            <div className="store-select-header">
                <div className="header-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </div>
                <h1 className="header-title">{translate("storeSelect.title")}</h1>
            </div>

            <div className="mode-toggle">
                <button
                    className={`mode-button ${scannerMode === "qr" ? "active" : ""}`}
                    onClick={() => {
                        setScannerMode("qr");
                        setScanError("");
                    }}
                >
                    {translate("storeSelect.qrCode")}
                </button>
                <button
                    className={`mode-button ${scannerMode === "manual" ? "active" : ""}`}
                    onClick={() => {
                        setScannerMode("manual");
                        setScanError("");
                    }}
                >
                    {translate("storeSelect.manual")}
                </button>
            </div>

            {scanError && <div className="error-message">{scanError}</div>}

            {scannerMode === "qr" ? (
                <div className="qr-scan-container">
                    <div id="qr-reader" ref={qrReaderRef}></div>
                    <p className="qr-scan-help">{translate("storeSelect.qrHelp")}</p>
                </div>
            ) : (
                <div className="manual-select-container">
                    <label htmlFor="store-select" className="select-label">
                        {translate("storeSelect.selectLabel")}
                    </label>
                    <select
                        id="store-select"
                        className="store-select-dropdown"
                        value={selectedStoreId}
                        onChange={(event) => setSelectedStoreId(event.target.value)}
                    >
                        <option value="">{translate("storeSelect.selectPlaceholder")}</option>
                        {AVAILABLE_STORES.map((store) => (
                            <option key={store.id} value={store.id}>
                                {store.name}
                            </option>
                        ))}
                    </select>
                    <button className="store-select-button" onClick={handleManualSelect}>
                        {translate("storeSelect.selectButton")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default StoreSelectPage;