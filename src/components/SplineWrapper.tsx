import React, { useCallback, useEffect, useRef, useState } from 'react';

type Props = {
  scene: string;
  className?: string;
};

export default function SplineWrapper({ scene, className }: Props) {
  const [loadPercent, setLoadPercent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const finishLoad = useCallback(() => {
    if (progressRef.current) {
      clearInterval(progressRef.current);
      progressRef.current = null;
    }
    setLoadPercent(100);
    setLoaded(true);
  }, []);

  // Masquer le texte "build with spline" (logo Spline)
  useEffect(() => {
    const hideLogo = () => {
      const el = containerRef.current?.querySelector('spline-viewer');
      if (el?.shadowRoot) {
        const links = el.shadowRoot.querySelectorAll('a[href*="spline"]');
        links.forEach((a) => ((a as HTMLElement).style.display = 'none'));
      }
    };
    const t = setInterval(hideLogo, 500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let p = 0;
    progressRef.current = setInterval(() => {
      p += Math.random() * 4 + 2;
      if (p >= 85) {
        p = 85;
        if (progressRef.current) {
          clearInterval(progressRef.current);
          progressRef.current = null;
        }
      }
      setLoadPercent(Math.min(Math.round(p), 85));
    }, 150);

    let removeLoad: (() => void) | undefined;
    const attach = () => {
      const el = containerRef.current?.querySelector('spline-viewer');
      if (el) {
        const onLoad = () => finishLoad();
        el.addEventListener('load', onLoad);
        el.addEventListener('loaded', onLoad);
        removeLoad = () => {
          el.removeEventListener('load', onLoad);
          el.removeEventListener('loaded', onLoad);
        };
      }
    };
    attach();
    const retry = setTimeout(attach, 200);
    const fallback = setTimeout(finishLoad, 5000);

    return () => {
      clearTimeout(retry);
      clearTimeout(fallback);
      if (progressRef.current) clearInterval(progressRef.current);
      removeLoad?.();
    };
  }, [scene, finishLoad]);

  return (
    <div
      key={scene}
      ref={containerRef}
      className={`${className} spline-hide-branding`}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <spline-viewer
        url={scene}
        style={{ width: '100%', height: '100%', display: 'block', opacity: loaded ? 1 : 0 }}
      />
      {!loaded && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-3xl z-10 transition-opacity duration-300"
          aria-hidden="true"
        >
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(139,92,246,0.2)"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgb(139,92,246)"
                strokeWidth="3"
                strokeDasharray={`${loadPercent}, 100`}
                strokeLinecap="round"
                className="transition-all duration-200"
              />
            </svg>
          </div>
          <p className="mt-4 text-white font-bold text-lg tabular-nums">{loadPercent}%</p>
          <p className="mt-1 text-violet-300/80 text-sm">Chargement...</p>
        </div>
      )}
    </div>
  );
}
