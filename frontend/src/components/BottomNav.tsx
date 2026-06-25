import type { AppTab } from "../types";

const ITEMS: Array<{ id: AppTab; label: string; icon: string }> = [
  { id: "search", label: "検索", icon: "🔎" },
  { id: "map", label: "マップ", icon: "📍" },
  { id: "deals", label: "ポイント", icon: "★" },
  { id: "favorites", label: "お気に入り", icon: "♡" },
  { id: "history", label: "履歴", icon: "↺" },
];

interface BottomNavProps {
  activeTab: AppTab;
  onChange: (tab: AppTab) => void;
}

export function BottomNav({ activeTab, onChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="主要メニュー">
      {ITEMS.map((item) => (
        <button
          key={item.id}
          className={`bottom-nav__item ${activeTab === item.id ? "is-active" : ""}`}
          onClick={() => onChange(item.id)}
        >
          <span className="bottom-nav__icon" aria-hidden="true">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
