'use client';

import { useState, useEffect, useMemo } from 'react';
import Footer from '@/components/Footer';

// ─── Types ───────────────────────────────────────────────────
type SquadItem = {
  id: number;
  name: string;
  age: number | null;
  nationality: string;
  photo: string | null;
  position: string;
  number: number | null;
  teamName: string;
};

// ─── Constants ────────────────────────────────────────────────
const POSITIONS = ['All', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'] as const;
type PosFilter = (typeof POSITIONS)[number];

const POS_META: Record<string, { label: string; color: string; glow: string; bg: string }> = {
  Goalkeeper: { label: 'GK', color: '#00D9FF', glow: 'rgba(0,217,255,0.35)', bg: 'rgba(0,217,255,0.12)' },
  Defender: { label: 'DEF', color: '#C0FF00', glow: 'rgba(192,255,0,0.35)', bg: 'rgba(192,255,0,0.12)' },
  Midfielder: { label: 'MID', color: '#FFB800', glow: 'rgba(255,184,0,0.35)', bg: 'rgba(255,184,0,0.12)' },
  Forward: { label: 'FWD', color: '#FF006E', glow: 'rgba(255,0,110,0.35)', bg: 'rgba(255,0,110,0.12)' },
};

function getMeta(pos: string) {
  const p = (pos || '').toLowerCase();
  if (p.includes('goal')) return POS_META.Goalkeeper;
  if (p.includes('def')) return POS_META.Defender;
  if (p.includes('mid')) return POS_META.Midfielder;
  if (p.includes('for') || p.includes('att') || p.includes('wing')) return POS_META.Forward;
  return POS_META.Defender;
}

function matchesFilter(pos: string, filter: PosFilter) {
  if (filter === 'All') return true;
  const p = (pos || '').toLowerCase();
  if (filter === 'Goalkeeper') return p.includes('goal');
  if (filter === 'Defender') return p.includes('def');
  if (filter === 'Midfielder') return p.includes('mid');
  if (filter === 'Forward') return p.includes('for') || p.includes('att') || p.includes('wing');
  return true;
}

// ─── Jersey SVG (data-uri) ────────────────────────────────────
function jerseyUri(num: number | null, accent = '#C0FF00') {
  const text = num ? String(num) : '—';
  const id = String(num ?? 'x').replace(/[^a-zA-Z0-9_-]/g, 'x');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <defs>
      <radialGradient id="bg-${id}" cx="50%" cy="40%" r="70%">
        <stop offset="0%" stop-color="#1a1a24" stop-opacity="0.3"/>
        <stop offset="40%" stop-color="#0f0f16" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#08080c"/>
      </radialGradient>
      <radialGradient id="ag-${id}" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/>
        <stop offset="50%" stop-color="${accent}" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
      </radialGradient>
      <filter id="gl-${id}" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="12" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="st-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${accent}"/>
        <stop offset="50%" stop-color="${accent}" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="${accent}"/>
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="url(#bg-${id})"/>
    <rect width="400" height="400" fill="url(#ag-${id})"/>
    <text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle" font-size="180" font-weight="900"
      font-family="'Exo 2','Rajdhani',system-ui,sans-serif" fill="rgba(255,255,255,0.07)"
      stroke="url(#st-${id})" stroke-width="10" filter="url(#gl-${id})" letter-spacing="-0.05em">${text}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// ─── Player Card Component ────────────────────────────────────
function PlayerCard({ player, visible, index }: { player: SquadItem; visible: boolean; index: number }) {
  const [hovered, setHovered] = useState(false);
  const meta = getMeta(player.position);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(60px)',
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${index * 50}ms, transform 0.8s cubic-bezier(.16,1,.3,1) ${index * 50}ms`,
        cursor: 'pointer',
        position: 'relative',
        marginBottom: 32,
      }}
    >
      {/* Decorative Connector Line */}
      <div style={{
        position: 'absolute', top: -20, left: -1, width: 1, height: 20,
        background: `linear-gradient(to top, ${meta.color}40, transparent)`,
        opacity: hovered ? 1 : 0.3, transition: 'opacity 0.4s'
      }} />
      <div style={{
        position: 'absolute', top: -20, left: -1, width: 10, height: 1,
        background: `${meta.color}40`,
        opacity: hovered ? 1 : 0.3, transition: 'opacity 0.4s'
      }} />

      {/* Card Shell */}
      <div style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        aspectRatio: '3/4',
        background: '#0e0e14',
        border: `1px solid ${hovered ? meta.color + '60' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hovered
          ? `0 25px 60px rgba(0,0,0,0.7), 0 0 0 1px ${meta.color}40, inset 0 1px 0 rgba(255,255,255,0.08)`
          : '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        transition: 'box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s cubic-bezier(.16,1,.3,1)',
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
      }}>

        {/* Jersey Number Layer */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: hovered ? 0 : 1,
          transform: hovered ? 'scale(1.15) rotate(-3deg)' : 'scale(1) rotate(0deg)',
          transition: 'opacity 0.5s ease, transform 0.6s ease',
          zIndex: 1,
        }}>
          <img src={jerseyUri(player.number, meta.color)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} draggable={false} />
        </div>

        {/* Photo Layer */}
        <div style={{
          position: 'absolute', inset: 0,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(1.1)',
          transition: 'opacity 0.5s ease, transform 0.6s ease',
          zIndex: 2,
        }}>
          {player.photo ? (
            <img src={player.photo} alt={player.name} referrerPolicy="no-referrer"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #12121c, #0a0a12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 72, opacity: 0.1, color: '#fff' }}>✕</span>
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #000 0%, rgba(0,0,0,0.6) 40%, transparent 80%)' }} />
        </div>

        {/* Top Accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2, zIndex: 10,
          background: meta.color,
          boxShadow: `0 0 15px ${meta.color}`,
          opacity: hovered ? 1 : 0.6,
        }} />

        {/* Number Badge */}
        <div style={{
          position: 'absolute', top: 12, right: 12, zIndex: 10,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
          border: `1px solid ${meta.color}40`,
          borderRadius: 8, padding: '4px 10px',
          fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 14,
          color: meta.color, letterSpacing: '-0.02em',
        }}>
          #{player.number ?? '—'}
        </div>

        {/* Info Overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
          padding: '24px 20px 20px',
          background: 'linear-gradient(to top, #000 10%, transparent)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', marginBottom: 6,
            background: meta.bg, border: `1px solid ${meta.color}35`,
            borderRadius: 4, padding: '2px 8px',
            fontFamily: "'Exo 2', sans-serif", fontWeight: 700, fontSize: 10,
            letterSpacing: '0.12em', color: meta.color, textTransform: 'uppercase',
            opacity: hovered ? 1 : 0.8, transform: hovered ? 'translateY(0)' : 'translateY(5px)',
            transition: 'all 0.3s ease'
          }}>
            {meta.label}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              fontFamily: "'Exo 2', sans-serif", fontWeight: 900, fontSize: 22,
              color: '#fff', lineHeight: 1.1, marginBottom: 4,
            }}>
              {player.name}
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.4s ease'
          }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{player.nationality}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hook for Window Size ─────────────────────────────────────
function useColumnCount() {
  const [colCount, setColCount] = useState(4); // Default desktop

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setColCount(1);       // Mobile
      else if (w < 1024) setColCount(2); // Tablet
      else setColCount(4);               // Desktop
    };

    // Initial call
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return colCount;
}

// ─── Main Page ────────────────────────────────────────────────
export default function SquadPage() {
  const [players, setPlayers] = useState<SquadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<PosFilter>('All');
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set());

  // Responsive Columns Logic
  const columnCount = useColumnCount();

  // ─── Fetch ──────────────────────────────────────────────────
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/football/squad', { cache: 'no-store' });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || 'Failed to load squad');
        if (alive) setPlayers((json.items as SquadItem[]).sort((a, b) => (a.number ?? 999) - (b.number ?? 999)));
      } catch (e: any) {
        if (alive) setError(e?.message || 'Something went wrong');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // ─── Filter & Split Columns Logic ───────────────────────────
  const filtered = useMemo(() =>
    players.filter(p => matchesFilter(p.position, activeFilter)),
    [players, activeFilter]);

  useEffect(() => {
    setVisibleIds(new Set());
    const timer = setTimeout(() => {
      setVisibleIds(new Set(filtered.map(p => p.id)));
    }, 100);
    return () => clearTimeout(timer);
  }, [filtered]);

  // Dynamic Split based on columnCount
  const columns = useMemo(() => {
    // Create N empty arrays based on current columnCount
    const cols: SquadItem[][] = Array.from({ length: columnCount }, () => []);
    filtered.forEach((player, i) => {
      cols[i % columnCount].push(player); // Distribute round-robin
    });
    return cols;
  }, [filtered, columnCount]);

  // ─── Loading / Error Views ──────────────────────────────────
  if (loading) return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0a0a12', color: 'rgba(255,255,255,0.3)', fontFamily: "'Exo 2'" }}>LOADING SQUAD DATA...</div>;
  if (error) return <div style={{ padding: 40, color: 'red', background: '#0a0a12' }}>{error}</div>;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;600;900&display=swap" rel="stylesheet" />

      <div style={{ minHeight: '100vh', background: '#0a0a12', color: '#fff', fontFamily: "'Exo 2', sans-serif", paddingBottom: 100 }}>

        {/* ── Ambient Background ── */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: -100, left: '20%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(0,217,255,0.04), transparent 70%)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: '10%', width: '60%', height: '60%', background: 'radial-gradient(circle, rgba(255,0,110,0.03), transparent 70%)', filter: 'blur(100px)' }} />
          <svg width="100%" height="100%" style={{ opacity: 0.03 }}>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: '40px 24px' }}>

          {/* ── Header ── */}
          <div style={{
            marginBottom: 50,
            display: 'flex',
            // Wrap on mobile so title is top, filters bottom
            flexWrap: 'wrap',
            gap: 24,
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
            <div>
              <h1 style={{ fontSize: 'clamp(42px, 8vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', margin: 0 }}>
                SQUAD<br /><span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>LIST 24/25</span>
              </h1>
            </div>

            {/* Filter Pills */}
            <div style={{
              display: 'flex', gap: 8, flexWrap: 'wrap',
              // Align left on mobile, right on desktop
              justifyContent: columnCount === 1 ? 'flex-start' : 'flex-end',
              maxWidth: 600
            }}>
              {POSITIONS.map(pos => {
                const isActive = activeFilter === pos;
                const meta = pos !== 'All' ? POS_META[pos] : null;
                return (
                  <button key={pos} onClick={() => setActiveFilter(pos)}
                    style={{
                      padding: '8px 16px', borderRadius: 100, border: 'none',
                      background: isActive ? (meta?.bg || '#fff') : 'rgba(255,255,255,0.05)',
                      color: isActive ? (meta?.color || '#000') : 'rgba(255,255,255,0.4)',
                      fontWeight: 700, fontSize: 13, cursor: 'pointer',
                      boxShadow: isActive && meta ? `0 0 20px ${meta.glow}` : 'none',
                      transition: 'all 0.3s ease',
                      flexGrow: columnCount === 1 ? 1 : 0, // Make buttons full width/grow on mobile
                      textAlign: 'center'
                    }}>
                    {pos}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Responsive Masonry Layout ── */}
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
            {columns.map((colItems, colIndex) => (
              <div key={colIndex} style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                // THE GIMMICK: Stagger only if NOT on mobile (columnCount > 1)
                // Stagger even columns down by 80px
                paddingTop: (columnCount > 1 && colIndex % 2 !== 0) ? 80 : 0,
                transition: 'padding 0.5s ease'
              }}>
                {/* Column Decorative Line (Hide on mobile single col) */}
                {columnCount > 1 && (
                  <div style={{ height: 1, width: '100%', background: 'rgba(255,255,255,0.05)', marginBottom: 32 }} />
                )}

                {colItems.map((player, itemIndex) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    visible={visibleIds.has(player.id)}
                    index={itemIndex + colIndex}
                  />
                ))}

                {colItems.length === 0 && (
                  <div style={{ height: 100 }} /> /* Spacer for empty cols */
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 100, color: 'rgba(255,255,255,0.2)' }}>NO PLAYERS FOUND</div>
          )}

        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <Footer />
    </>
  );
}