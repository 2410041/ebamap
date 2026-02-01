import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./DealsPage.css";

interface DealProduct {
  id: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: string;
  endDate: string;
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
      endDate: "今日まで"
    },
    { 
      id: 2, 
      name: "週末セール", 
      originalPrice: 800, 
      salePrice: 600, 
      discount: "25%OFF",
      endDate: "明日まで"
    },
  ];

  return (
    <div className="deals-page">
      <Header title="特売情報" />
      
      <div className="deals-content">
        <div className="deals-header">
          <h2>セール・キャンペーン</h2>
        </div>

        <div className="deals-list">
          {deals.map((deal) => (
            <div key={deal.id} className="deal-card">
              <div className="deal-badge">{deal.discount}</div>
              <div className="deal-info">
                <h3>{deal.name}</h3>
                <div className="deal-price">
                  <span className="original-price">¥{deal.originalPrice}</span>
                  <span className="sale-price">¥{deal.salePrice}</span>
                </div>
                <p className="deal-end-date">{deal.endDate}</p>
              </div>
              <button className="deal-view-btn">
                マップで見る
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsPage;