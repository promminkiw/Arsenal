'use client';

import type { TimelineItem } from '@/data/timeline';
import Counter from './Counter';

export default function TimelineCard({ item }: { item: TimelineItem }) {
  const IconComponent = item.icon;

  return (
    <div
      className="timeline-card"
      onMouseMove={(e) => {
        const img = (e.currentTarget as HTMLElement).querySelector('.timeline-card__img') as
          | HTMLElement
          | null;
        if (!img) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
        img.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
      }}
      onMouseLeave={(e) => {
        const img = (e.currentTarget as HTMLElement).querySelector('.timeline-card__img') as
          | HTMLElement
          | null;
        if (img) img.style.backgroundPosition = 'center';
      }}
    >
      <div className="timeline-card__img-wrap">
        <div className="timeline-card__img" style={{ backgroundImage: `url('${item.img}')` }} />
      </div>

      <div className="timeline-card__body">
        {item.tag && (
          <div className="timeline-card__tag">
            <IconComponent className="timeline-card__tag-icon" />
            {item.tag}
          </div>
        )}

        <div className="timeline-card__title">{item.title}</div>
        <p className="timeline-card__desc">{item.desc}</p>

        {item.stats.length > 0 && (
          <div className="timeline-stats">
            {item.stats.map((s) => (
              <div key={s.label}>
                <Counter target={s.num} />
                <div className="timeline-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {item.link && (
          <a href="#" className="timeline-card__link">
            {item.link} →
          </a>
        )}
      </div>
    </div>
  );
}
