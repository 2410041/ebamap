import "./SectionTitle.css";

export interface SectionTitleProps {
    title: string;
    subtitle?: string;
    count?: number;
}

// セクション見出し（件数・サブタイトル対応）
const SectionTitle = ({ title, subtitle, count }: SectionTitleProps) => {
    return (
        <div className="section-title">
            <h2>{title}</h2>
            {/* 任意表示の補足テキスト */}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
            {/* 件数がある場合のみ表示 */}
            {count !== undefined && <p className="section-count">{count}件</p>}
        </div>
    );
};

export default SectionTitle;
