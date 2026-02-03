'use client';

import { useState, useEffect, useMemo } from 'react';
import Footer from '@/components/Footer';

// ─── Types ───────────────────────────────────────────────────
type FixtureItem = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  homeForm?: string;
  awayForm?: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  competition: string;
  status: string;
  stadium?: string;
};

// ─── Utils ───────────────────────────────────────────────────
const formatDate = (dateStr: string) => {
  if (!dateStr) return { day: '', time: '', weekday: '', fullDate: '' };
  const d = new Date(dateStr);
  return {
    day: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }),
    time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    weekday: d.toLocaleDateString('en-US', { weekday: 'long' })
  };
};

// ─── Component: Form Badge ───────────────────────────────────
function FormBadge({ result }: { result: string }) {
  let color = '#444';
  let textColor = '#fff';

  if (result === 'W') {
    color = '#C0FF00';
    textColor = '#000';
  } else if (result === 'L') {
    color = '#FF006E';
    textColor = '#fff';
  } else if (result === 'D') {
    color = '#888';
    textColor = '#fff';
  }

  return (
    <div className="form-badge" style={{
      borderRadius: '50%', background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 900, color: textColor,
      boxShadow: result === 'W' ? `0 0 4px ${color}` : 'none'
    }}>
      {result}
    </div>
  );
}

// ─── Component: Match Card ───────────────────────────────────
function MatchCard({ match, index }: { match: FixtureItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { day, time } = formatDate(match.date);

  const statusUpper = (match.status || 'UPCOMING').toUpperCase();
  const isFinished = statusUpper.includes('FINISH') || statusUpper.includes('FT');
  const isLive = statusUpper.includes('LIVE') || statusUpper.includes('IN PLAY');

  let accent = '#C0FF00';
  if (isFinished) accent = '#fff';
  else if (isLive) accent = '#FF006E';

  const placeholderStyle = {
    width: '100%', height: '100%', borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
  };

  const homeForms = match.homeForm ? match.homeForm.replace(/,/g, '').split('').slice(-5) : [];
  const awayForms = match.awayForm ? match.awayForm.replace(/,/g, '').split('').slice(-5) : [];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        marginBottom: 16,
        opacity: 0,
        animation: `slideUp 0.6s cubic-bezier(.16,1,.3,1) forwards ${index * 100}ms`,
      }}
    >
      <div className="match-card" style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? accent + '60' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 16,
        // ใช้ CSS Class คุม Layout แทน inline style เพื่อความ Responsive
        transition: 'all 0.4s cubic-bezier(.16,1,.3,1)',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? `0 10px 40px -10px ${accent}20` : 'none',
        position: 'relative',
        overflow: 'hidden'
      }}>

        <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: accent, boxShadow: `0 0 15px ${accent}80` }} />

        {/* ─── Home Team ─── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, textAlign: 'right', minWidth: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', minWidth: 0, flex: 1 }}>
            <div className="team-name" style={{ fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
              {match.homeTeam}
            </div>
            <div className="team-label" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Home</div>
            {/* Home Form */}
            <div className="form-container" style={{ display: 'flex', gap: 3, marginTop: 4 }}>
              {homeForms.map((r, i) => <FormBadge key={i} result={r} />)}
            </div>
          </div>
          {/* Logo */}
          <div className="team-logo-wrapper" style={{ flexShrink: 0, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {match.homeLogo ? <img src={match.homeLogo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <div style={placeholderStyle} />}
          </div>
        </div>

        {/* ─── Center Block (Score/Time) ─── */}
        <div className="center-block" style={{
          background: '#0a0a12', borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)', zIndex: 2,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
          {!isFinished && !isLive ? (
            <>
              <div className="match-date" style={{ fontWeight: 700, color: '#fff', marginBottom: 2, textTransform: 'uppercase' }}>{day}</div>
              <div className="vs-text" style={{ fontWeight: 900, color: accent, lineHeight: 0.9 }}>VS</div>
              <div className="match-time" style={{ color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{time}</div>
            </>
          ) : (
            <>
              <div className="match-date" style={{ fontWeight: 700, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{day}</div>
              <div className="score-text" style={{ fontWeight: 900, color: '#fff', letterSpacing: 1 }}>
                {match.homeScore ?? 0}-{match.awayScore ?? 0}
              </div>
              <div className="status-badge" style={{ color: isLive ? '#FF006E' : accent, fontWeight: 700, marginTop: 2, textTransform: 'uppercase' }}>
                {isLive ? 'LIVE' : 'FT'}
              </div>
            </>
          )}
        </div>

        {/* ─── Away Team ─── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 8, textAlign: 'left', minWidth: 0 }}>
          {/* Logo */}
          <div className="team-logo-wrapper" style={{ flexShrink: 0, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {match.awayLogo ? <img src={match.awayLogo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <div style={placeholderStyle} />}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', minWidth: 0, flex: 1 }}>
            <div className="team-name" style={{ fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
              {match.awayTeam}
            </div>
            <div className="team-label" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Away</div>
            {/* Away Form */}
            <div className="form-container" style={{ display: 'flex', gap: 3, marginTop: 4 }}>
              {awayForms.map((r, i) => <FormBadge key={i} result={r} />)}
            </div>
          </div>
        </div>

        {/* Competition Tag */}
        <div className="competition-tag" style={{
          position: 'absolute', top: 12, right: 16,
          fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
          border: '1px solid rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4
        }}>
          {match.competition}
        </div>

      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function FixturesPage() {
  const [fixtures, setFixtures] = useState<FixtureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'UPCOMING' | 'RESULTS'>('UPCOMING');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/football/fixtures', { cache: 'no-store' });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || 'Failed to load fixtures');

        const data = json.items || json.fixtures || json.response || [];
        if (alive) setFixtures(data);
      } catch (e: any) {
        console.error("Fixture Fetch Error:", e);
        if (alive) setError(e?.message || 'Something went wrong');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const filteredFixtures = useMemo(() => {
    if (viewMode === 'UPCOMING') {
      return fixtures
        .filter(f => {
          const status = (f.status || '').toUpperCase();
          return !status.includes('FINISH') && !status.includes('FT');
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      return fixtures
        .filter(f => {
          const status = (f.status || '').toUpperCase();
          return status.includes('FINISH') || status.includes('FT');
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  }, [fixtures, viewMode]);

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a12', color: '#fff', fontFamily: "'Exo 2'" }}>LOADING MATCH DATA...</div>;
  if (error) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a12', color: 'red' }}>Error: {error}</div>;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;600;900&display=swap" rel="stylesheet" />

      {/* ─── RESPONSIVE STYLES ─── */}
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

        /* Default Desktop */
        .match-card {
            padding: 24px 20px;
            display: grid;
            grid-template-columns: 1fr 110px 1fr;
            gap: 12px;
            align-items: center;
        }
        .team-name { fontSize: 16px; }
        .team-logo-wrapper { width: 44px; height: 44px; }
        .center-block { width: 110px; padding: 12px 0; }
        .vs-text { fontSize: 20px; }
        .match-date { fontSize: 11px; }
        .match-time { fontSize: 11px; }
        .score-text { fontSize: 24px; }
        .status-badge { fontSize: 9px; }
        .form-badge { width: 16px; height: 16px; fontSize: 8px; }

        /* Mobile (< 640px) */
        @media (max-width: 640px) {
            .match-card {
                padding: 16px 10px; /* ลด Padding */
                grid-template-columns: 1fr 80px 1fr; /* บีบตรงกลางให้เล็กลง */
                gap: 8px;
            }
            .team-name { fontSize: 13px; } /* ลดขนาดชื่อทีม */
            .team-label { display: none; } /* ซ่อนคำว่า Home/Away */
            .team-logo-wrapper { width: 32px; height: 32px; padding: 4px; } /* ลดขนาดโลโก้ */
            
            .center-block { width: 80px; padding: 8px 0; }
            .vs-text { fontSize: 16px; }
            .score-text { fontSize: 18px; }
            .match-date { fontSize: 9px; }
            .match-time { fontSize: 10px; }
            
            .form-container { display: none !important; } /* ซ่อนฟอร์มในมือถือถ้าจอเล็กมาก หรือจะเปิดไว้ก็ได้ */
            .competition-tag { display: none; } /* ซ่อนชื่อลีกถ้าเกะกะ */
        }

        /* Mobile Small (< 400px) - กรณีจอเล็กมาก */
        @media (max-width: 400px) {
            .form-container { display: none !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0a0a12', color: '#fff', fontFamily: "'Exo 2', sans-serif", display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(192,255,0,0.05), transparent 70%)', filter: 'blur(80px)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', padding: '60px 24px', flex: 1, width: '100%' }}>

          <div style={{ marginBottom: 40, textAlign: 'center' }}>
            <h1 style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, margin: 0, lineHeight: 1 }}>
              MATCH <span style={{ color: '#C0FF00' }}>FEED</span>
            </h1>

            <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', padding: 4, borderRadius: 30, marginTop: 24 }}>
              <button
                onClick={() => setViewMode('UPCOMING')}
                style={{
                  background: viewMode === 'UPCOMING' ? '#C0FF00' : 'transparent',
                  color: viewMode === 'UPCOMING' ? '#000' : 'rgba(255,255,255,0.5)',
                  border: 'none', padding: '10px 24px', borderRadius: 24,
                  fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                UPCOMING
              </button>
              <button
                onClick={() => setViewMode('RESULTS')}
                style={{
                  background: viewMode === 'RESULTS' ? '#fff' : 'transparent',
                  color: viewMode === 'RESULTS' ? '#000' : 'rgba(255,255,255,0.5)',
                  border: 'none', padding: '10px 24px', borderRadius: 24,
                  fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                RESULTS
              </button>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Vertical Line Decoration (Desktop only) */}
            <div style={{
              position: 'absolute', left: -39, top: 20, bottom: 20, width: 1,
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)',
              display: 'none',
              '@media (min-width: 768px)': { display: 'block' }
            } as any} />

            {filteredFixtures.map((match, i) => (
              <MatchCard key={match.id} match={match} index={i} />
            ))}

            {filteredFixtures.length === 0 && !loading && (
              <div style={{ textAlign: 'center', padding: 60, border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 20, color: 'rgba(255,255,255,0.3)' }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>⚽️</div>
                No {viewMode.toLowerCase()} matches found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <Footer />
    </>
  );
}