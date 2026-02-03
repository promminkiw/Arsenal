'use client';

import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';

// ─── Types ───────────────────────────────────────────────────
type StandingItem = {
  rank: number;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  all?: {
    played: number;
    win: number;
    draw: number;
    lose: number;
  };
  points: number;
  form: string;
  goalsDiff: number;
};

// ─── Components ──────────────────────────────────────────────
function FormBadge({ result }: { result: string }) {
  let color = '#444';
  let textColor = '#fff';

  if (result === 'W') {
    color = '#C0FF00';
    textColor = '#000';
  }
  else if (result === 'L') {
    color = '#FF006E';
    textColor = '#fff';
  }
  else if (result === 'D') {
    color = '#888';
    textColor = '#fff';
  }

  return (
    <div style={{
      width: 22, height: 22, borderRadius: '50%', background: color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 10, fontWeight: 900, color: textColor,
      boxShadow: result === 'W' ? `0 0 6px ${color}` : 'none',
      flexShrink: 0 // ป้องกันวงกลมเบี้ยว
    }}>
      {result}
    </div>
  );
}

function TableRow({ team, index, maxPoints }: { team: StandingItem; index: number; maxPoints: number }) {
  const [hovered, setHovered] = useState(false);

  const isTop4 = team.rank <= 4;
  const isRelegation = team.rank >= 18;
  const glowColor = isTop4 ? '#00D9FF' : (isRelegation ? '#FF006E' : '#fff');

  // ★ แก้ไข 1: ลบ comma ออกก่อน split เพื่อไม่ให้มีวงกลมว่างๆ
  const formsArray = team.form ? team.form.replace(/,/g, '').split('') : [];

  const played = team.all?.played ?? 0;

  return (
    <div
      className="standing-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        marginBottom: 8,
        background: hovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
        borderLeft: `3px solid ${isTop4 ? '#00D9FF' : (isRelegation ? '#FF006E' : 'transparent')}`,
        borderRadius: '0 8px 8px 0',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        animation: `fadeInRight 0.5s ease forwards ${index * 50}ms`,
        opacity: 0, transform: 'translateX(-10px)'
      }}
    >
      <div style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
        {team.rank}
      </div>

      {/* ★ แก้ไข 2: เพิ่ม minWidth: 0 เพื่อให้ Flex item ยอมหดตัวเมื่อที่แคบ */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <div style={{
          width: 24, height: 24, background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
          flexShrink: 0
        }}>
          {team.team.logo ? <img src={team.team.logo} alt={team.team.name} style={{ width: '100%' }} /> : <span style={{ fontSize: 10 }}>⚽</span>}
        </div>

        {/* ★ แก้ไข 3: สไตล์สำหรับตัดคำยาวๆ (...) */}
        <span style={{
          fontWeight: 700,
          color: hovered ? '#fff' : 'rgba(255,255,255,0.9)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: 'block',
          width: '100%'
        }}>
          {team.team.name}
        </span>
      </div>

      <div className="col-played" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
        {played}
      </div>

      <div className="col-form" style={{ gap: 4, justifyContent: 'center' }}>
        {formsArray.slice(-5).map((r, i) => <FormBadge key={i} result={r} />)}
      </div>

      <div style={{ textAlign: 'right' }}>
        <span style={{ fontSize: 18, fontWeight: 900, color: glowColor }}>{team.points}</span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function StandingPage() {
  const [standings, setStandings] = useState<StandingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/football/standing', { cache: 'no-store' });
        const json = await res.json();

        if (!res.ok) throw new Error(json?.error || 'Failed to load standings');

        let data: StandingItem[] = [];
        if (json.items) {
          data = json.items;
        } else if (json.response && json.response.length > 0) {
          const league = json.response[0].league;
          if (league && league.standings && league.standings.length > 0) {
            data = league.standings[0];
          }
        } else if (Array.isArray(json)) {
          data = json;
        }

        if (alive) setStandings(data);
      } catch (e: any) {
        console.error("Fetch Error:", e);
        if (alive) setError(e?.message || 'Something went wrong');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const maxPoints = standings.length > 0 ? standings[0].points : 100;

  if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a12', color: '#fff', fontFamily: "'Exo 2'" }}>LOADING TABLE...</div>;
  if (error) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a12', color: 'red' }}>Error: {error}</div>;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;600;900&display=swap" rel="stylesheet" />

      {/* ─── Styles for Responsive Grid ─── */}
      <style>{`
        @keyframes fadeInRight { to { opacity: 1; transform: translateX(0); } }
        
        /* Desktop Grid Default */
        /* Columns: Pos | Club | Played | Form | Pts */
        .standing-row, .standing-header {
            display: grid;
            grid-template-columns: 50px 2fr 50px 140px 80px;
            align-items: center;
            padding: 16px 12px;
        }
        .col-form { display: flex; }
        .col-played { display: block; }

        /* Tablet / Mobile Large (< 700px) */
        /* ซ่อนช่อง Played (Pl) */
        @media (max-width: 700px) {
            .standing-row, .standing-header {
                grid-template-columns: 45px 2fr 140px 60px;
                padding: 12px 8px;
            }
            .col-played { display: none !important; }
        }

        /* Mobile Small (< 500px) */
        /* ซ่อนช่อง Form เพิ่มอีกช่อง เพื่อให้ชื่อทีมไม่เบียด */
        @media (max-width: 500px) {
            .standing-row, .standing-header {
                grid-template-columns: 40px 1fr 60px;
            }
            .col-form { display: none !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#0a0a12', color: '#fff', fontFamily: "'Exo 2', sans-serif" }}>

        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', bottom: -100, left: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,217,255,0.06), transparent 60%)', filter: 'blur(80px)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1000, margin: '0 auto', padding: '60px 24px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, margin: 0, lineHeight: 0.9 }}>
                LEAGUE <br /><span style={{ color: 'transparent', WebkitTextStroke: '1px #00D9FF' }}>TABLE</span>
              </h1>
            </div>
            <div style={{ textAlign: 'right', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              SEASON 2024 / 25
            </div>
          </div>

          {/* Header Row */}
          <div className="standing-header" style={{
            borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: 12,
            fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase'
          }}>
            <div>Pos</div>
            <div>Club</div>
            <div className="col-played" style={{ textAlign: 'center' }}>Pl</div>
            <div className="col-form" style={{ textAlign: 'center', width: '100%' }}>Form</div>
            <div style={{ textAlign: 'right' }}>Pts</div>
          </div>

          <div>
            {standings.map((team, i) => (
              <TableRow key={team.team.id || i} team={team} index={i} maxPoints={maxPoints} />
            ))}

            {standings.length === 0 && !loading && (
              <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.3)', border: '1px dashed rgba(255,255,255,0.2)', borderRadius: 12 }}>
                Data empty for this season.
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