export default function HomeStyles() {
  return (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Sarabun:wght@300;400;500;600&display=swap');

        /* ─── KEYFRAMES ─── */
        @keyframes home-fadeInUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes badgeIn {
          from { opacity:0; transform:translateY(16px) scale(0.92); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes lineGrow {
          from { width:0; }
          to   { width:72px; }
        }
        @keyframes subtleDrift {
          0%   { background-position:center center; }
          100% { background-position:center 48%; }
        }
        @keyframes scrollBounce {
          0%,100% { transform:scaleY(1); opacity:.5; }
          50%     { transform:scaleY(1.3); opacity:1; }
        }
        
        /* Marquee running text - RIGHT TO LEFT */
        @keyframes marqueeRTL {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Marquee running text - LEFT TO RIGHT */
        @keyframes marqueeLTR {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        
        /* card slide-in */
        @keyframes slideLeft {
          from { opacity:0; transform:translateX(-44px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes slideRight {
          from { opacity:0; transform:translateX(44px); }
          to   { opacity:1; transform:translateX(0); }
        }
        /* node pulse ring */
        @keyframes pulsering {
          0%   { transform:scale(1); opacity:.6; }
          100% { transform:scale(2.2); opacity:0; }
        }
        /* node pop-in */
        @keyframes nodePop {
          0%   { opacity:0; transform:scale(0.4); }
          60%  { transform:scale(1.15); }
          100% { opacity:1; transform:scale(1); }
        }

        /* ─── HERO WRAPPER (for shrink effect) ─── */
        .hero-wrapper {
          position: relative;
          width: 100%;
          height: 200vh; /* Creates scroll space */
          background: #000;
          z-index: 1;
        }

        /* Sidebar with running text - 4 SIDES */
        .hero-sidebar {
          position: fixed;
          background: #000;
          z-index: 5;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease-out;
        }
        
        /* Top sidebar */
        .hero-sidebar--top {
          top: 0;
          left: 0;
          width: 100%;
          height: 0;
        }

        /* Bottom sidebar */
        .hero-sidebar--bottom {
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
        }
        
        /* Left sidebar */
        .hero-sidebar--left {
          left: 0;
          top: 0;
          height: 100vh;
          width: 0;
        }
        
        /* Right sidebar */
        .hero-sidebar--right {
          right: 0;
          top: 0;
          height: 100vh;
          width: 0;
        }

        /* Running text container - HORIZONTAL */
        .sidebar-text {
          position: relative;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px 0;
        }

        .sidebar-text__track {
          display: inline-block;
          white-space: nowrap;
        }

        /* Top line - Right to Left */
        .sidebar-text__track--rtl {
          animation: marqueeRTL 25s linear infinite;
        }

        /* Bottom line - Left to Right */
        .sidebar-text__track--ltr {
          animation: marqueeLTR 25s linear infinite;
        }

        .sidebar-text__item {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 64px;
          letter-spacing: 0.35em;
          margin-right: 150px;
          display: inline-block;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }

        /* Color variants */
        .sidebar-text__item--gold {
          color: #d4af37;
          opacity: 0.2;
        }

        .sidebar-text__item--red {
          color: #c8102e;
          opacity: 0.25;
        }

        /* ─── HERO ─── */
        .hero-section {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fff;
          overflow: hidden;
          background-image: url('/hero/stadium.png');
          background-size: cover;
          background-position: center;
          animation: subtleDrift 18s ease-in-out infinite alternate;
          transition: all 0.3s ease-out;
          z-index: 10;
        }

        .hero-overlay-dark {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,.82);
        }
        
        .hero-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom,rgba(0,0,0,.6) 0%,rgba(0,0,0,.75) 40%,rgba(0,0,0,.92) 100%);
        }
        
        .hero-grain {
          position: absolute;
          inset: 0;
          opacity: .035;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }
        
        .deco-line {
          position: absolute;
          pointer-events: none;
        }
        
        .deco-line--tl {
          top: 48px;
          left: 48px;
          width: 80px;
          height: 80px;
          border-top: 1px solid rgba(212,175,55,.35);
          border-left: 1px solid rgba(212,175,55,.35);
        }
        
        .deco-line--tr {
          top: 48px;
          right: 48px;
          width: 80px;
          height: 80px;
          border-top: 1px solid rgba(212,175,55,.35);
          border-right: 1px solid rgba(212,175,55,.35);
        }
        
        .deco-line--bl {
          bottom: 48px;
          left: 48px;
          width: 80px;
          height: 80px;
          border-bottom: 1px solid rgba(212,175,55,.35);
          border-left: 1px solid rgba(212,175,55,.35);
        }
        
        .deco-line--br {
          bottom: 48px;
          right: 48px;
          width: 80px;
          height: 80px;
          border-bottom: 1px solid rgba(212,175,55,.35);
          border-right: 1px solid rgba(212,175,55,.35);
        }
        
        @media(max-width:600px){
          .deco-line{display:none;}
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 900px;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          animation: badgeIn .8s cubic-bezier(.4,0,.2,1) .2s both;
        }
        
        .hero-badge__line {
          width: 0;
          height: 1px;
          background: #d4af37;
          animation: lineGrow .6s ease .7s forwards;
        }
        
        .hero-badge__text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: .32em;
          color: #d4af37;
          background: rgba(212,175,55,.08);
          border: 1px solid rgba(212,175,55,.3);
          padding: 6px 18px;
          border-radius: 2px;
        }
        
        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(56px,10vw,96px);
          letter-spacing: .04em;
          line-height: 1;
          margin-bottom: 8px;
          color: #fff;
          animation: home-fadeInUp .9s cubic-bezier(.4,0,.2,1) .4s both;
          text-shadow: 0 8px 48px rgba(0,0,0,.7);
        }
        
        .hero-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg,transparent,#d4af37,transparent);
          margin: 0 auto 28px;
          animation: home-fadeInUp .6s ease .75s both;
        }
        
        .hero-tagline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px,3.5vw,30px);
          letter-spacing: .28em;
          color: #d4af37;
          margin-bottom: 20px;
          animation: home-fadeInUp .9s cubic-bezier(.4,0,.2,1) .55s both;
        }
        
        .hero-subtitle {
          font-family: 'Sarabun', sans-serif;
          font-size: clamp(18px,2.6vw,24px);
          font-weight: 300;
          color: rgba(255,255,255,.7);
          max-width: 600px;
          line-height: 1.6;
          letter-spacing: .02em;
          animation: home-fadeInUp .9s cubic-bezier(.4,0,.2,1) .7s both;
        }

        .hero-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          padding-bottom: 44px;
        }
        
        .hero-scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          opacity: 0;
          animation: home-fadeInUp .8s ease 1.2s forwards;
          transition: opacity .3s;
        }
        
        .hero-scroll-hint:hover {
          opacity: 1 !important;
        }
        
        .hero-scroll-hint__label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: .35em;
          color: rgba(255,255,255,.5);
          transition: color .3s;
        }
        
        .hero-scroll-hint:hover .hero-scroll-hint__label {
          color: #d4af37;
        }
        
        .hero-scroll-hint__line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom,#d4af37,transparent);
          animation: scrollBounce 2s ease infinite;
        }

        /* ─── HISTORY SECTION ─── */
        .history-section {
          position: relative;
          background: #f5f0eb;
          padding: 100px 24px 80px;
          z-index: 2;
          min-height: 100vh;
        }

        /* Progress bar */
        .timeline-progress {
          position: fixed;
          top: 0;
          left: 0;
          height: 3px;
          z-index: 50;
          background: linear-gradient(90deg,#c8102e,#d4af37);
          transition: width .15s linear;
          pointer-events: none;
        }

        /* Era tabs */
        .era-tabs {
          display: flex;
          justify-content: center;
          gap: 44px;
          margin-bottom: 88px;
          flex-wrap: wrap;
        }
        
        .era-tab {
          text-align: center;
          cursor: pointer;
          position: relative;
          padding-bottom: 10px;
          user-select: none;
        }
        
        .era-tab__label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: .22em;
          color: rgba(0,0,0,.38);
          margin-bottom: 4px;
          transition: color .3s;
        }
        
        .era-tab__year {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 19px;
          letter-spacing: .04em;
          color: #1a1a1a;
          transition: color .3s;
        }
        
        .era-tab--active .era-tab__label,
        .era-tab--active .era-tab__year {
          color: #c8102e;
        }
        
        .era-tab--active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 24px;
          height: 2px;
          background: #c8102e;
          border-radius: 1px;
        }
        
        .era-tab:hover .era-tab__label,
        .era-tab:hover .era-tab__year {
          color: #c8102e;
        }

        /* Timeline */
        .timeline {
          max-width: 1080px;
          margin: 0 auto;
          position: relative;
        }
        
        .timeline::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom,#d4af37,rgba(212,175,55,.12));
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 1fr 48px 1fr;
          align-items: start;
          margin-bottom: -200px;
        }
        
        .timeline-item--left .timeline-card {
          grid-column: 1;
        }
        
        .timeline-item--left .timeline-node {
          grid-column: 2;
        }
        
        .timeline-item--left .timeline-spacer {
          grid-column: 3;
        }
        
        .timeline-item--right .timeline-spacer {
          grid-column: 1;
        }
        
        .timeline-item--right .timeline-node {
          grid-column: 2;
        }
        
        .timeline-item--right .timeline-card {
          grid-column: 3;
        }

        /* Node */
        .timeline-node {
          display: flex;
          justify-content: center;
          z-index: 2;
          position: relative;
        }
        
        .timeline-node__wrap {
          position: relative;
          margin-top: 22px;
        }
        
        .timeline-node__badge {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #c8102e;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 13px;
          letter-spacing: .05em;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 18px rgba(200,16,46,.3);
          position: relative;
          z-index: 1;
          opacity: 0;
        }
        
        .timeline-node__ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid #c8102e;
          opacity: 0;
        }
        
        .timeline-item.visible .timeline-node__badge {
          animation: nodePop .5s cubic-bezier(.4,0,.2,1) .15s forwards;
        }
        
        .timeline-item.visible .timeline-node__ring {
          animation: pulsering .7s ease .45s forwards;
        }

        /* Card */
        .timeline-card {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 18px rgba(0,0,0,.06);
          transition: box-shadow .35s,transform .35s;
          opacity: 0;
        }
        
        .timeline-item--left.visible .timeline-card {
          animation: slideLeft 1.5s cubic-bezier(.4,0,.2,1) forwards;
        }
        
        .timeline-item--right.visible .timeline-card {
          animation: slideRight 1.5s cubic-bezier(.4,0,.2,1) forwards;
        }
        
        .timeline-card:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,.11);
          transform: translateY(-4px);
        }

        /* Parallax image container */
        .timeline-card__img-wrap {
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16/9;
        }
        
        .timeline-card__img {
          width: 100%;
          height: 100%;
          background-size: 110%;
          background-position: center;
          transition: background-position .6s cubic-bezier(.25,0,.25,1), transform .4s ease;
          will-change: transform;
        }
        
        .timeline-card:hover .timeline-card__img {
          background-size: 115%;
        }

        .timeline-card__body {
          padding: 28px 30px 32px;
        }

        /* Tag with icon */
        .timeline-card__tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: .18em;
          color: #c8102e;
          background: rgba(200,16,46,.06);
          padding: 6px 14px 6px 10px;
          border-radius: 20px;
          margin-bottom: 14px;
          border: 1px solid rgba(200,16,46,.15);
        }
        
        .timeline-card__tag-icon {
          width: 14px;
          height: 14px;
          stroke-width: 2.5;
        }

        .timeline-card__title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: .02em;
          color: #1a1a1a;
          margin-bottom: 14px;
          line-height: 1.2;
        }

        .timeline-card__desc {
          font-family: 'Sarabun', sans-serif;
          font-size: 14.5px;
          line-height: 1.75;
          color: rgba(0,0,0,.68);
          margin-bottom: 22px;
        }

        .timeline-stats {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 14px 18px;
          margin-top: 8px;
          margin-bottom: 8px;
        }
        
        .timeline-stat__num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: .02em;
          color: #c8102e;
          line-height: 1;
        }
        
        .timeline-stat__label {
          font-family: 'Sarabun', sans-serif;
          font-size: 12px;
          color: rgba(0,0,0,.55);
          margin-top: 4px;
        }

        .timeline-card__link {
          display: inline-block;
          margin-top: 16px;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: .14em;
          color: #c8102e;
          text-decoration: none;
          transition: opacity .2s;
        }
        
        .timeline-card__link:hover {
          opacity: .75;
        }

        /* Load more */
        .load-more {
          margin: 300px auto 0;
          display: block;
          border: none;
          background: #c8102e;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: .2em;
          padding: 16px 26px;
          border-radius: 6px;
          cursor: pointer;
          transition: transform .2s, box-shadow .2s, opacity .2s;
          box-shadow: 0 10px 30px rgba(200,16,46,.18);
        }
        
        .load-more:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 36px rgba(200,16,46,.22);
        }
        
        .load-more:active {
          transform: translateY(0);
          opacity: .9;
        }

        /* Responsive */
        @media(max-width:920px){
          .hero-sidebar {
            display: none !important;
          }
          
          .hero-section {
            width: 100% !important;
            height: 100vh !important;
            left: 0 !important;
            top: 0 !important;
          }
          
          .timeline::before {
            left: 22px;
            transform: none;
          }
          
          .timeline-item {
            grid-template-columns: 48px 1fr;
            gap: 14px;
            margin-bottom: 22px;
          }
          
          .timeline-item--left .timeline-card,
          .timeline-item--right .timeline-card {
            grid-column: 2;
          }
          
          .timeline-item--left .timeline-node,
          .timeline-item--right .timeline-node {
            grid-column: 1;
          }
          
          .timeline-spacer {
            display: none;
          }
          
          .era-tabs {
            gap: 18px;
          }

          .sidebar-text__item {
            font-size: 42px;
            margin-right: 100px;
          }
        }

        @media(max-width:600px){
          .sidebar-text__item {
            font-size: 32px;
            margin-right: 60px;
          }
        }
      `}</style>
  );
}