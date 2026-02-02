'use client';

import { useEffect, useRef, useState } from 'react';

import Navbar from '@/components/Navbar';
import HomeStyles from '@/components/HomeStyles';
import ParticleCanvas from '@/components/ParticleCanvas';
import EraTabs from '@/components/EraTabs';
import Timeline from '@/components/Timeline';

import { TIMELINE_DATA, type EraKey } from '@/data/timeline';
import { useTimelineFilter } from '@/hooks/useTimelineFilter';

export default function Home() {
  const [activeEra, setActiveEra] = useState<EraKey>('All');
  const timelineRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [shrinkProgress, setShrinkProgress] = useState(0);

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

  // Calculate hero dimensions - shrink from all 4 sides
  const minWidthPercent = 65;  // Shrink to 65% width
  const minHeightPercent = 70; // Shrink to 70% height
  
  const heroWidth = 100 - (shrinkProgress * (100 - minWidthPercent));
  const heroHeight = 100 - (shrinkProgress * (100 - minHeightPercent));
  
  const sidebarWidthLR = (100 - heroWidth) / 2;  // Left/Right sidebar width
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

        <Navbar />

        {/* ─── HERO WRAPPER ─── */}
        <div className="hero-wrapper" ref={heroRef}>
          
          {/* Top Sidebar with running text */}
          <div 
            className="hero-sidebar hero-sidebar--top" 
            style={{ height: `${sidebarHeightTB}vh` }}
          >
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
          <div 
            className="hero-sidebar hero-sidebar--bottom" 
            style={{ height: `${sidebarHeightTB}vh` }}
          >
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
          <div 
            className="hero-sidebar hero-sidebar--left" 
            style={{ width: `${sidebarWidthLR}%` }}
          />

          {/* Right Sidebar */}
          <div 
            className="hero-sidebar hero-sidebar--right" 
            style={{ width: `${sidebarWidthLR}%` }}
          />

          {/* ─── HERO ─── */}
          <section 
            className="hero-section"
            style={{
              width: `${heroWidth}%`,
              height: `${heroHeight}vh`,
              left: `${heroLeft}%`,
              top: `${heroTop}vh`
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
          <button className="load-more">Load More History</button>
        </section>
      </main>
    </>
  );
}