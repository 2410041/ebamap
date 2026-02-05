import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import type { Product } from "../../types/Product.ts";
import "./DealsPage.css";

/**
 * 特売情報ページ
 * 本日の特売や週末セール等、現在実施中のセール情報を表示
 */
const DealsPage = () => {
    const navigate = useNavigate();
    const { t: translate } = useTranslation();

    // セール情報（仮データ）
    const deals: Product[] = [
        {
            id: 1,
            name: "牛乳（1L）",          // ← 商品名
            campaignTitle: "本日の特売", // ← セール名
            originalPrice: 500,
            salePrice: 350,
            discount: "30%OFF",
            endDate: "今日まで",
            location: "売場番号: 1-1F"
        },
        {
            id: 2,
            name: "洗剤",
            campaignTitle: "週末セール",
            originalPrice: 800,
            salePrice: 600,
            discount: "25%OFF",
            endDate: "明日まで",
            location: "売場番号: 2-1F"
        }
    ];

    /**
     * セール商品をクリックした時のハンドラー
     * マップページ（売場位置表示）へ遷移
     * @param {Product} deal - クリックされたセール商品
     */
    const handleDealClick = (deal: Product) => {
        navigate("/map", { state: { product: deal } });
    };

    return (
        <div className="deals-page">
            <Header title={translate("deals.title")} />

            <div className="deals-content">
                <SectionTitle title={translate("deals.campaign")} />

                {/* 特売一覧 */}
                <div className="deals-list">
                    {deals.map((deal) => (
                        <ProductCard
                            key={deal.id}
                            id={deal.id}
                            name={deal.name}
                            location={deal.location || ""}
                            originalPrice={deal.originalPrice}
                            salePrice={deal.salePrice}
                            discount={deal.discount}
                            endDate={deal.endDate}
                            variant="deal"
                            onViewMap={() => handleDealClick(deal)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DealsPage;