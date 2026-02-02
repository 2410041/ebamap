import Header from "../../components/Header/Header";
import "./HelpPage.css";

// ヘルプページ
const HelpPage = () => {
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
            <Header title="ヘルプ" showBack={true} />

            <div className="help-content">
                {/* アプリの使い方 */}
                <div className="help-section">
                    <h2 className="section-title">アプリの使い方</h2>
                    <div className="help-step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>店舗を選択</h3>
                            <p>QRコードをスキャンするか、リストから店舗を選択します</p>
                        </div>
                    </div>
                    <div className="help-step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>商品を検索</h3>
                            <p>検索画面で商品名やカテゴリーから探します</p>
                        </div>
                    </div>
                    <div className="help-step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>場所を確認</h3>
                            <p>マップ画面で商品の陳列場所を確認できます</p>
                        </div>
                    </div>
                </div>

                {/* よくある質問 */}
                <div className="help-section">
                    <h2 className="section-title">よくある質問</h2>
                    {faqs.map((faq) => (
                        <details key={faq.id} className="faq-item">
                            <summary className="faq-question">{faq.question}</summary>
                            <p className="faq-answer">{faq.answer}</p>
                        </details>
                    ))}
                </div>

                {/* お問い合わせ */}
                <div className="help-section">
                    <h2 className="section-title">お問い合わせ</h2>
                    <p className="contact-text">
                        その他のご質問は、以下のメールアドレスまでお問い合わせください。
                    </p>
                    <a href="mailto:support@example.com" className="contact-email">
                        support@example.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;
