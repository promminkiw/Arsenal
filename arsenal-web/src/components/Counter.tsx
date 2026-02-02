'use client';

import { useEffect, useRef, useState } from 'react';

export default function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          const dur = 1200;
          const start = performance.now();

          const animate = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setCount(Math.round(eased * target));
            if (t < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="timeline-stat__num">
      {count}
      {suffix}
    </div>
  );
}
