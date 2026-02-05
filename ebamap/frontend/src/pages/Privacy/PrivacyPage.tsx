import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import "./PrivacyPage.css";

/**
 * プライバシーポリシーページ
 * ユーザーデータの取り扱いとプライバシー保護方針を説明
 */
const PrivacyPage = () => {
    const { t: translate } = useTranslation();
    return (
        <div className="privacy-page">
            <Header title={translate("privacy.title")} showBack={true} />

            <div className="privacy-content">
                <div className="privacy-intro">
                    <p>{translate("privacy.intro")}</p>
                </div>

                <div className="privacy-section">
                    <h2>{translate("privacy.section1")}</h2>
                    <p>{translate("privacy.section1Content")}</p>
                    <ul>
                        <li>{translate("privacy.section1Item1")}</li>
                        <li>{translate("privacy.section1Item2")}</li>
                        <li>{translate("privacy.section1Item3")}</li>
                        <li>{translate("privacy.section1Item4")}</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>{translate("privacy.section2")}</h2>
                    <p>{translate("privacy.section2Content")}</p>
                    <ul>
                        <li>{translate("privacy.section2Item1")}</li>
                        <li>{translate("privacy.section2Item2")}</li>
                        <li>{translate("privacy.section2Item3")}</li>
                        <li>{translate("privacy.section2Item4")}</li>
                        <li>{translate("privacy.section2Item5")}</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>{translate("privacy.section3")}</h2>
                    <p>{translate("privacy.section3Content")}</p>
                    <ul>
                        <li>{translate("privacy.section3Item1")}</li>
                        <li>{translate("privacy.section3Item2")}</li>
                        <li>{translate("privacy.section3Item3")}</li>
                        <li>{translate("privacy.section3Item4")}</li>
                        <li>{translate("privacy.section3Item5")}</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>{translate("privacy.section4")}</h2>
                    <p>{translate("privacy.section4Content")}</p>
                    <ul>
                        <li>{translate("privacy.section4Item1")}</li>
                        <li>{translate("privacy.section4Item2")}</li>
                        <li>{translate("privacy.section4Item3")}</li>
                    </ul>
                </div>

                <div className="privacy-section">
                    <h2>{translate("privacy.section5")}</h2>
                    <p>{translate("privacy.section5Content")}</p>
                </div>

                <div className="privacy-section">
                    <h2>{translate("privacy.section6")}</h2>
                    <p>{translate("privacy.section6Content")}</p>
                </div>

                <div className="privacy-section">
                    <h2>{translate("privacy.section7")}</h2>
                    <p>{translate("privacy.section7Content")}</p>
                </div>

                <div className="privacy-section">
                    <h2>{translate("privacy.section8")}</h2>
                    <p>{translate("privacy.section8Content")}</p>
                </div>

                <div className="privacy-contact">
                    <h3>{translate("privacy.contactTitle")}</h3>
                    <p>{translate("privacy.contactContent")}</p>
                    <a href="mailto:privacy@example.com">privacy@example.com</a>
                </div>

                <div className="privacy-footer">
                    <p>{translate("privacy.enacted")}</p>
                    <p>{translate("privacy.lastUpdated")}</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPage;