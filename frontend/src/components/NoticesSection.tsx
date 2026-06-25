import type { Notice } from "../types";

interface NoticesSectionProps {
  notices: Notice[];
}

export function NoticesSection({ notices }: NoticesSectionProps) {
  return (
    <section className="panel notice-panel">
      <div className="section-head">
        <h3>お知らせ</h3>
      </div>
      <div className="notice-list">
        {notices.map((notice) => (
          <article key={notice.id} className={`notice-item notice-${notice.type}`}>
            <span>{notice.dateLabel}</span>
            <h4>{notice.title}</h4>
            <p>{notice.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
