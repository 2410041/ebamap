import "./SectionTitle.css";

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  count?: number;
}

const SectionTitle = ({ title, subtitle, count }: SectionTitleProps) => {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      {count !== undefined && <p className="section-count">{count}件</p>}
    </div>
  );
};

export default SectionTitle;
