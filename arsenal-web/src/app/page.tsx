'use client';

import { useEffect, useRef, useState } from 'react';

import HomeStyles from '@/components/HomeStyles';
import ParticleCanvas from '@/components/ParticleCanvas';
import EraTabs from '@/components/EraTabs';
import Timeline from '@/components/Timeline';
import Footer from '@/components/Footer';

import { TIMELINE_DATA, type EraKey } from '@/data/timeline';
import { useTimelineFilter } from '@/hooks/useTimelineFilter';

import { useRouter } from 'next/navigation';

type ClubNewsItem = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  timeAgo: string;
  readMin: number;
  tag: { label: string; tone: 'red' | 'gold' | 'dark' };
};

export default function Home() {
  const [activeEra, setActiveEra] = useState<EraKey>('All');
  const timelineRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [shrinkProgress, setShrinkProgress] = useState(0);
  const router = useRouter();
  
  // ─── LATEST CLUB NEWS ───
  const [news, setNews] = useState<ClubNewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);

  // Hero shrink effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Phase 1: Shrink (0-80vh) - shrink to minimum size
      // Phase 2: Hold (80vh-200vh) - keep size and scroll down
      const shrinkDuration = windowHeight * 0.8; // Shrink in first 80vh

      if (scrollY <= shrinkDuration) {
        // Phase 1: Shrinking
        const shrink = scrollY / shrinkDuration;
        setShrinkProgress(shrink);
      } else {
        // Phase 2: Keep shrunk, just scroll
        setShrinkProgress(1);
      }

      // Timeline progress bar
      const el = timelineRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const totalH = el.offsetHeight - windowHeight;
        const scrolled = -rect.top;
        setProgress(Math.max(0, Math.min(1, scrolled / totalH)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch Latest Club News from our server route
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setNewsLoading(true);
        setNewsError(null);

        const res = await fetch('/api/arsenal-news');
        const json = await res.json();

        if (!res.ok) throw new Error(json?.error || 'Failed to load news');

        if (alive) setNews(Array.isArray(json?.items) ? json.items : []);
      } catch (e: any) {
        if (alive) setNewsError(e?.message || 'Failed to load news');
      } finally {
        if (alive) setNewsLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // Calculate hero dimensions - shrink from all 4 sides
  const minWidthPercent = 65; // Shrink to 65% width
  const minHeightPercent = 70; // Shrink to 70% height

  const heroWidth = 100 - (shrinkProgress * (100 - minWidthPercent));
  const heroHeight = 100 - (shrinkProgress * (100 - minHeightPercent));

  const sidebarWidthLR = (100 - heroWidth) / 2; // Left/Right sidebar width
  const sidebarHeightTB = (100 - heroHeight) / 2; // Top/Bottom sidebar height

  const heroLeft = sidebarWidthLR;
  const heroTop = sidebarHeightTB;

  const filtered = useTimelineFilter(TIMELINE_DATA, activeEra);

  return (
    <>
      <HomeStyles />

      <main style={{ background: '#000', minHeight: '100vh' }}>

        {/* ─── PROGRESS BAR ─── */}
        <div className="timeline-progress" style={{ width: `${progress * 100}%` }} />

        {/* ─── HERO WRAPPER ─── */}
        <div className="hero-wrapper" ref={heroRef}>
          {/* Top Sidebar with running text */}
          <div className="hero-sidebar hero-sidebar--top" style={{ height: `${sidebarHeightTB}vh` }}>
            <div className="sidebar-text">
              {/* Line 1: Right to Left (Gold) */}
              <div className="sidebar-text__track sidebar-text__track--rtl">
                {Array.from({ length: 15 }).map((_, i) => (
                  <span key={i} className="sidebar-text__item sidebar-text__item--gold">
                    WE ARE THE GUNNERS
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Sidebar with running text */}
          <div className="hero-sidebar hero-sidebar--bottom" style={{ height: `${sidebarHeightTB}vh` }}>
            <div className="sidebar-text">
              {/* Line 2: Left to Right (Red) */}
              <div className="sidebar-text__track sidebar-text__track--ltr">
                {Array.from({ length: 15 }).map((_, i) => (
                  <span key={i} className="sidebar-text__item sidebar-text__item--red">
                    WE ARE THE GUNNERS
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Left Sidebar */}
          <div className="hero-sidebar hero-sidebar--left" style={{ width: `${sidebarWidthLR}%` }} />

          {/* Right Sidebar */}
          <div className="hero-sidebar hero-sidebar--right" style={{ width: `${sidebarWidthLR}%` }} />

          {/* ─── HERO ─── */}
          <section
            className="hero-section"
            style={{
              width: `${heroWidth}%`,
              height: `${heroHeight}vh`,
              left: `${heroLeft}%`,
              top: `${heroTop}vh`,
            }}
          >
            <div className="hero-overlay-dark" />
            <div className="hero-overlay-gradient" />
            <div className="hero-grain" />
            <ParticleCanvas />

            <div className="deco-line deco-line--tl" />
            <div className="deco-line deco-line--tr" />
            <div className="deco-line deco-line--bl" />
            <div className="deco-line deco-line--br" />

            <div className="hero-content">
              <div className="hero-badge">
                <div className="hero-badge__line" />
                <span className="hero-badge__text">EST. 1886</span>
                <div className="hero-badge__line" />
              </div>
              <h1 className="hero-title">Arsenal FC</h1>
              <div className="hero-divider" />
              <p className="hero-tagline">We Are The Gunners</p>
              <p className="hero-subtitle">Built by History, Driven by Glory.</p>
            </div>

            <div className="hero-bottom">
              <div
                className="hero-scroll-hint"
                onClick={() => document.querySelector('#history')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="hero-scroll-hint__label">SCROLL</span>
                <div className="hero-scroll-hint__line" />
              </div>
            </div>
          </section>
        </div>

        {/* ─── HISTORY ─── */}
        <section className="history-section" id="history" ref={timelineRef}>
          <EraTabs activeEra={activeEra} onChange={setActiveEra} />
          <Timeline items={filtered} />
          <button
            className="load-more"
            onClick={() => router.push('/squad')}
          >
            current player
          </button>
        </section>

        {/* ─── LATEST CLUB NEWS ─── */}
        <section className="club-news" style={{ position: 'relative', zIndex: 100 }}>
          <div className="club-news__container">
            {/* Header */}
            <div className="club-news__header">
              <span className="club-news__kicker">OFFICIAL UPDATES</span>
              <h2 className="club-news__title">LATEST NEWS</h2>
              <div className="club-news__divider"></div>
            </div>

            {newsLoading && <div className="club-news__status">LOADING ACTION...</div>}
            {newsError && <div className="club-news__status club-news__status--error">{newsError}</div>}

            {!newsLoading && !newsError && news.length > 0 && (
              <div className="news-grid">
                {/* 1. Hero Item (ข่าวล่าสุด - ใหญ่สุด) */}
                <a
                  href={news[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="news-card news-card--hero"
                >
                  <div className="news-card__bg">
                    <img src={news[0].image || '/images/news-fallback.png'} alt={news[0].title} />
                    <div className="news-card__overlay"></div>
                  </div>
                  <div className="news-card__content">
                    <span className={`news-tag news-tag--${news[0].tag.tone}`}>
                      {news[0].tag.label}
                    </span>
                    <h3 className="news-card__title">{news[0].title}</h3>
                    <div className="news-card__meta">
                      <span>{news[0].timeAgo}</span>
                      <span className="dot">•</span>
                      <span>{news[0].readMin} MIN READ</span>
                    </div>
                  </div>
                </a>

                {/* 2. Sub Items (ข่าวรอง - แสดง 3 ข่าวถัดมา) */}
                <div className="news-grid__side">
                  {news.slice(1, 4).map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="news-card news-card--side"
                    >
                      <div className="news-card__thumb">
                        <img src={item.image || '/images/news-fallback.png'} alt={item.title} />
                      </div>
                      <div className="news-card__body">
                        <span className={`news-tag news-tag--small news-tag--${item.tag.tone}`}>
                          {item.tag.label}
                        </span>
                        <h4 className="news-card__subtitle">{item.title}</h4>
                        <div className="news-card__meta">
                          {item.timeAgo}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <Footer />
      </main>
    </>
  );
}