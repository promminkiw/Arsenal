'use client';

import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    let animId: number;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    const COUNT = 38;

    const rand = (min: number, max: number) => Math.random() * (max - min) + min;

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.25, 0.25),
        vy: rand(-0.35, -0.08),
        size: rand(1, 3),
        alpha: rand(0.15, 0.45),
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = rand(0, w);
        }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
