import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

/**
 * Fond interactif pour la hero section : un réseau de particules qui dérive
 * doucement et réagit au curseur (répulsion + lignes qui s'illuminent à
 * l'approche de la souris). Respecte prefers-reduced-motion et met
 * l'animation en pause dès que la hero sort du viewport (perf).
 */
export default function HeroInteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999, active: false };
    let rafId = 0;
    let running = true;

    const COLORS = ['124,58,237'];

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = Math.min(60, Math.max(24, Math.floor((width * height) / 24000)));
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8,
      }));
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.x >= -100 && mouse.x <= width + 100 && mouse.y >= -100 && mouse.y <= height + 100;
    };
    const onMouseLeaveWindow = () => {
      mouse.active = false;
    };

    const linkDist = 130;
    const mouseDist = 160;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouseDist && dist > 0.01) {
              const force = (mouseDist - dist) / mouseDist;
              p.x += (dx / dist) * force * 1.1;
              p.y += (dy / dist) * force * 1.1;
            }
          }

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            const distToMouse = mouse.active ? Math.hypot(midX - mouse.x, midY - mouse.y) : 9999;
            const boost = distToMouse < mouseDist ? 1 - distToMouse / mouseDist : 0;
            const baseOpacity = (1 - dist / linkDist) * 0.14;
            const opacity = Math.min(0.4, baseOpacity + boost * 0.35);
            if (opacity <= 0.005) continue;
            ctx.strokeStyle = `rgba(124,58,237,${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p, idx) => {
        const distToMouse = mouse.active ? Math.hypot(p.x - mouse.x, p.y - mouse.y) : 9999;
        const glow = distToMouse < mouseDist ? 1 - distToMouse / mouseDist : 0;
        const color = COLORS[idx % COLORS.length];
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${0.35 + glow * 0.55})`;
        ctx.arc(p.x, p.y, p.r + glow * 1.4, 0, Math.PI * 2);
        ctx.fill();
      });

      if (running) rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeaveWindow);

    // Pause le rendu quand la hero n'est plus visible (scroll loin, autre onglet, etc.)
    const visibilityOb = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running && !rafId) {
          rafId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.01 }
    );
    visibilityOb.observe(container);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      visibilityOb.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeaveWindow);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
