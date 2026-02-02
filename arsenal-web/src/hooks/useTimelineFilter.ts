import { useMemo } from 'react';
import type { EraKey, TimelineItem } from '@/data/timeline';

export function useTimelineFilter(items: TimelineItem[], activeEra: EraKey) {
  return useMemo(() => {
    if (activeEra === 'All') return items;
    return items.filter((d) => d.era === activeEra);
  }, [items, activeEra]);
}
