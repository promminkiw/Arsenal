'use client';

import { useEffect, useState } from 'react';
import type { TimelineItem } from '@/data/timeline';
import TimelineCard from './TimelineCard';

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Reset visibility when list changes (e.g. filter)
    setVisibleCards({});

    const els = document.querySelectorAll('.timeline-item[data-id]');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute('data-id');
            if (!id) return;
            setVisibleCards((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  return (
    <div className="timeline">
      {items.map((item, i) => {
        const id = `${item.year}-${item.title}`;
        const visible = visibleCards[id];

        return (
          <div
            key={id}
            data-id={id}
            className={`timeline-item timeline-item--${item.side} ${visible ? 'visible' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Spacer (opposite side) */}
            {item.side === 'right' && <div className="timeline-spacer" />}

            {/* Node */}
            <div className="timeline-node">
              <div className="timeline-node__wrap">
                <div className="timeline-node__ring" />
                <div className="timeline-node__badge">{item.year}</div>
              </div>
            </div>

            {/* Card */}
            <TimelineCard item={item} />

            {/* Spacer (opposite side) */}
            {item.side === 'left' && <div className="timeline-spacer" />}
          </div>
        );
      })}
    </div>
  );
}
