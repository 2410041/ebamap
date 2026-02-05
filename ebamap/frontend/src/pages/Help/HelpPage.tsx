import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import "./HelpPage.css";

/**
 * ヘルプページ
 * アプリの使い方やよくある質問、サポート情報を提供
 */
const HelpPage = () => {
    const { t: translate } = useTranslation();
    const faqs = [
        {
            id: 1,
            question: "QRコードが読み取れません",
            answer: "カメラの権限を許可してください。また、QRコードに十分な光が当たっているか確認してください。",
        },
        {
            id: 2,
            question: "商品が見つかりません",
            answer: "検索キーワードを変更してお試しください。また、店舗在庫がない場合は検索結果に表示されません。",
        },
        {
            id: 3,
            question: "お気に入りが消えました",
            answer: "ブラウザのデータを削除すると、お気に入りも削除されます。定期的なバックアップをお勧めします。",
        },
        {
            id: 4,
            question: "店舗を変更したい",
            answer: "メニュー画面から「店舗を変更」を選択してください。",
        },
        {
            id: 5,
            question: "特売情報はいつ更新されますか？",
            answer: "毎日午前0時に更新されます。最新情報は特売情報ページでご確認ください。",
        },
    ];

    return (
        <div className="help-page">
            <Header title={translate("help.title")} showBack={true} />

            <div className="help-content">
                {/* アプリの使い方 */}
                <div className="help-section">
                    <h2 className="section-title">{translate("help.usage")}</h2>
                    <div className="help-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>{translate("help.step1Title")}</h3>
                            <p>{translate("help.step1")}</p>
                        </div>
                    </div>
                    <div className="help-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>{translate("help.step2Title")}</h3>
                            <p>{translate("help.step2")}</p>
                        </div>
                    </div>
                    <div className="help-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>{translate("help.step3Title")}</h3>
                            <p>{translate("help.step3")}</p>
                        </div>
                    </div>
                </div>

                {/* よくある質問 */}
                <div className="help-section">
                    <h2 className="section-title">{translate("help.faq")}</h2>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <details key={i} className="faq-item">
                            <summary className="faq-question">{translate(`help.faq${i}Q`)}</summary>
                            <p className="faq-answer">{translate(`help.faq${i}A`)}</p>
                        </details>
                    ))}
                </div>

                {/* お問い合わせ */}
                <div className="help-section">
                    <h2 className="section-title">{translate("help.contact")}</h2>
                    <p className="contact-text">{translate("help.contactText")}</p>
                    <a href="mailto:support@example.com" className="contact-email">
                        support@example.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;