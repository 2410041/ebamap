import Header from "../../components/Header/Header";
import "./PrivacyPage.css";

// プライバシーポリシーページ
const PrivacyPage = () => {
    return (
        <div className="privacy-page">
            <Header title="プライバシーポリシー" showBack={true} />

            <div className="privacy-content">
                <div className="privacy-intro">
                    <p>
                        当社は、お客様の個人情報の保護に最大限の注意を払い、以下の方針に基づいて個人情報を取り扱います。
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>1. 個人情報の収集</h2>
                    <p>当社は、以下の目的のために必要な範囲で個人情報を収集します。</p>
                    <ul>
                        <li>本サービスの提供・運営のため</li>
                        <li>ユーザーからのお問い合わせに対応するため</li>
                        <li>サービスの改善・新機能の開発のため</li>
                        <li>利用規約に違反する行為への対応のため</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>2. 収集する情報</h2>
                    <p>本サービスでは、以下の情報を収集する場合があります。</p>
                    <ul>
                        <li>店舗選択情報</li>
                        <li>商品検索履歴</li>
                        <li>お気に入り商品情報</li>
                        <li>デバイス情報（OS、ブラウザ種類など）</li>
                        <li>アクセスログ情報</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>3. 個人情報の利用目的</h2>
                    <p>収集した個人情報は、以下の目的で利用します。</p>
                    <ul>
                        <li>サービスの提供・運営</li>
                        <li>ユーザーサポート</li>
                        <li>サービスの改善・分析</li>
                        <li>キャンペーン・特売情報の案内</li>
                        <li>利用規約違反行為への対応</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>4. 個人情報の第三者提供</h2>
                    <p>
                        当社は、以下の場合を除き、ユーザーの同意なく個人情報を第三者に提供しません。
                    </p>
                    <ul>
                        <li>法令に基づく場合</li>
                        <li>人の生命、身体または財産の保護のために必要がある場合</li>
                        <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>5. Cookieの使用</h2>
                    <p>
                        本サービスでは、ユーザーの利便性向上のため、Cookieおよびローカルストレージを使用します。
                        ブラウザの設定により無効化できますが、一部機能が利用できなくなる場合があります。
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>6. 個人情報の管理</h2>
                    <p>
                        当社は、個人情報の正確性を保ち、これを安全に管理します。
                        個人情報への不正アクセス、紛失、破壊、改ざん、漏洩などを防止するため、
                        適切な安全管理措置を講じます。
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>7. 個人情報の開示・訂正・削除</h2>
                    <p>
                        ユーザーは、当社に対して、個人情報の開示、訂正、削除を請求することができます。
                        請求方法については、お問い合わせ窓口までご連絡ください。
                    </p>
                </div>

                <div className="privacy-section">
                    <h2>8. プライバシーポリシーの変更</h2>
                    <p>
                        当社は、必要に応じて本ポリシーを変更することがあります。
                        変更後のポリシーは、本サービス上に掲載した時点で効力を生じるものとします。
                    </p>
                </div>

                <div className="privacy-contact">
                    <h3>お問い合わせ窓口</h3>
                    <p>個人情報の取扱いに関するお問い合わせは、以下までご連絡ください。</p>
                    <a href="mailto:privacy@example.com">privacy@example.com</a>
                </div>

                <div className="privacy-footer">
                    <p>制定日: 2024年2月1日</p>
                    <p>最終更新日: 2024年2月1日</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;
