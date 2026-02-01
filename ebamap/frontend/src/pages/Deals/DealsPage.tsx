import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProductCard from "../../components/ProductCard/ProductCard";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "./DealsPage.css";

interface DealProduct {
    id: number;
    name: string;
    originalPrice: number;
    salePrice: number;
    discount: string;
    endDate: string;
    location?: string;
}

const DealsPage = () => {
    const navigate = useNavigate();

    const deals: DealProduct[] = [
        {
            id: 1,
            name: "本日の特売",
            originalPrice: 500,
            salePrice: 350,
            discount: "30%OFF",
            endDate: "今日まで",
            location: "売場番号: 1-1F"
        },
        {
            id: 2,
            name: "週末セール",
            originalPrice: 800,
            salePrice: 600,
            discount: "25%OFF",
            endDate: "明日まで",
            location: "売場番号: 2-1F"
        },
    ];

    const handleDealClick = (deal: DealProduct) => {
        navigate("/map", { state: { product: deal } });
    };

    return (
        <div className="deals-page">
            <Header title="特売情報" />

            <div className="deals-content">
                <SectionTitle title="セール・キャンペーン" />

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