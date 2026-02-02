'use client';

import type { EraKey } from '@/data/timeline';
import { ERAS } from '@/data/timeline';

export default function EraTabs({
  activeEra,
  onChange,
}: {
  activeEra: EraKey;
  onChange: (era: EraKey) => void;
}) {
  return (
    <div className="era-tabs">
      {ERAS.map((era) => (
        <div
          key={era.key}
          className={`era-tab ${activeEra === era.key ? 'era-tab--active' : ''}`}
          onClick={() => onChange(era.key)}
        >
          <div className="era-tab__label">{era.label.toUpperCase()}</div>
          <div className="era-tab__year">{era.years}</div>
        </div>
      ))}
    </div>
  );
}
