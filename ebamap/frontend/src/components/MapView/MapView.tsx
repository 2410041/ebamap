import "./MapView.css";

export interface MapViewProps {
  location?: string;
  productName?: string;
  showLegend?: boolean;
}

const MapView = ({ location = "3-1F", productName, showLegend = true }: MapViewProps) => {
  return (
    <div className="map-view-container">
      <div className="map-placeholder">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <p>店内マップ</p>
        <p className="map-location">売場番号: {location}</p>
      </div>

      {showLegend && (
        <div className="map-legend">
          <h4>フロアガイド</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-color" style={{ background: "#2563eb" }}></div>
              <span>現在地</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: "#10b981" }}></div>
              <span>目的地</span>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ background: "#f97316" }}></div>
              <span>特売エリア</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
