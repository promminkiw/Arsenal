'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Squad', href: '/squad' },
  { label: 'Fixtures', href: '/fixtures' },
  { label: 'Standing', href: '/standing' },
];

const SPONSORS = [
  { src: '/sponsors/sponsor1.png', alt: 'Sponsor 1' },
  { src: '/sponsors/sponsor2.png', alt: 'Sponsor 2' },
  { src: '/sponsors/sponsor3.png', alt: 'Sponsor 3' },
  { src: '/sponsors/sponsor4.png', alt: 'Sponsor 4' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap');

        .navbar-root {
          font-family: 'Inter', sans-serif;
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          background: #c8102e;
          transition: box-shadow 0.3s ease, background 0.3s ease;
        }
        .navbar-root.scrolled {
          background: #a00d24;
          box-shadow: 0 4px 24px rgba(0,0,0,0.35);
        }

        /* Gold top-border accent */
        .navbar-root::before {
          content: '';
          display: block;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent 0%, #d4af37 30%, #f0d060 50%, #d4af37 70%, transparent 100%);
        }

        .nav-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 24px;
          position: relative;
        }

        /* Logo */
        .nav-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .nav-logo:hover {
          transform: scale(1.06);
        }

        /* Center links (desktop) */
        .nav-links-desktop {
          display: none;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          gap: 40px;
          align-items: center;
        }
        @media (min-width: 768px) {
          .nav-links-desktop { display: flex; }
        }

        .nav-link {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 17px;
          letter-spacing: 2.5px;
          color: rgba(255,255,255,0.78);
          text-decoration: none;
          position: relative;
          padding: 6px 0;
          transition: color 0.25s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #f0d060;
          border-radius: 1px;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-link:hover {
          color: #fff;
        }
        .nav-link:hover::after {
          width: 100%;
        }

        /* Sponsors */
        .nav-sponsors {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .sponsor-chip {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
        }
        .sponsor-chip:hover {
          background: rgba(255,255,255,0.16);
          border-color: rgba(255,255,255,0.35);
          transform: translateY(-2px);
        }

        /* Mobile hamburger */
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 6px;
          border: none;
          background: none;
        }
        .hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        @media (min-width: 768px) { .hamburger { display: none; } }

        /* Mobile panel */
        .mobile-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mobile-panel.open {
          max-height: 200px;
        }
        .mobile-panel-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 0 16px;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        .mobile-link {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 18px;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          padding: 8px 28px;
          border-radius: 6px;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .mobile-link:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        @media (min-width: 768px) { .mobile-panel { display: none; } }
      `}</style>

      <nav className={`navbar-root ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo">
            <Image
              src="/logo-arsenal.png"
              alt="Arsenal"
              width={60}
              height={60}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Sponsors (desktop) + Hamburger (mobile) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="nav-sponsors">
              {SPONSORS.map((s, i) => (
                <div key={i} className="sponsor-chip">
                  <Image src={s.src} alt={s.alt} width={28} height={28} className="object-contain" />
                </div>
              ))}
            </div>
            <button
              className={`hamburger ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <div className={`mobile-panel ${mobileOpen ? 'open' : ''}`}>
          <div className="mobile-panel-inner">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-link"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
