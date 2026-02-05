import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import "./TermsPage.css";

/**
 * 利用規約ページ
 * アプリの利用規約、サービス条件を表示
 */
const TermsPage = () => {
    const { t: translate } = useTranslation();
    return (
        <div className="terms-page">
            <Header title={translate("terms.title")} showBack={true} />

            <div className="terms-content">
                <div className="terms-section">
                        <h2>{translate("terms.article1")}</h2>
                        <p>{translate("terms.article1Content")}</p>
                </div>

                <div className="terms-section">
                        <h2>{translate("terms.article2")}</h2>
                        <p>{translate("terms.article2Content")}</p>
                </div>

                <div className="terms-section">
                        <h2>{translate("terms.article3")}</h2>
                        <p>{translate("terms.article3Content")}</p>
                    <ul>
                            <li>{translate("terms.article3Item1")}</li>
                            <li>{translate("terms.article3Item2")}</li>
                            <li>{translate("terms.article3Item3")}</li>
                            <li>{translate("terms.article3Item4")}</li>
                            <li>{translate("terms.article3Item5")}</li>
                            <li>{translate("terms.article3Item6")}</li>
                            <li>{translate("terms.article3Item7")}</li>
                    </ul>
                </div>

                <div className="terms-section">
                        <h2>{translate("terms.article4")}</h2>
                        <p>{translate("terms.article4Content")}</p>
                    <ul>
                            <li>{translate("terms.article4Item1")}</li>
                            <li>{translate("terms.article4Item2")}</li>
                            <li>{translate("terms.article4Item3")}</li>
                            <li>{translate("terms.article4Item4")}</li>
                    </ul>
                </div>

                <div className="terms-section">
                        <h2>{translate("terms.article5")}</h2>
                        <p>{translate("terms.article5Content")}</p>
                </div>

                <div className="terms-section">
                        <h2>{translate("terms.article6")}</h2>
                        <p>{translate("terms.article6Content")}</p>
                </div>

                <div className="terms-section">
                        <h2>{translate("terms.article7")}</h2>
                        <p>{translate("terms.article7Content")}</p>
                </div>

                <div className="terms-footer">
                        <p>{translate("terms.enacted")}</p>
                        <p>{translate("terms.lastUpdated")}</p>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;
