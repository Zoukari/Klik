/**
 * Page hors navigation — route commentée dans `router.tsx`.
 * Carte d’accueil associée retirée dans `HomeOverviewCards.tsx`.
 */
import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import type { Language } from '../types/klik';

type OutletCtx = { language: Language };

const texts = {
  fr: { hub: 'Centre de Connaissances', learn: 'Learn', expertise: 'Expertise', heroDesc: 'Études de marché actionnables et formations premium — boostez votre stratégie.', marketStudies: 'Études de marché', marketDesc: 'Packs par secteur à acheter tout de suite — prix clairs, valeur immédiate.', comingSoon: 'Coming soon' },
  en: { hub: 'Knowledge Hub', learn: 'Learn', expertise: 'Expertise', heroDesc: 'Actionable market insights and premium training — level up your strategy.', marketStudies: 'Market studies', marketDesc: 'Sector-specific packs you can buy now — clear pricing, immediate value.', comingSoon: 'Coming soon' },
  ar: { hub: 'مركز المعرفة', learn: 'تعلم', expertise: 'الخبرة', heroDesc: 'دراسات السوق القابلة للتطبيق وتدريبات متميزة — تعزز استراتيجيتك.', marketStudies: 'دراسات السوق', marketDesc: 'حزم حسب القطاع للشراء فورًا — أسعار واضحة، قيمة فورية.', comingSoon: 'قريباً' },
};

export default function Learn() {
  const { language } = useOutletContext<OutletCtx>();
  const t = texts[language] ?? texts.fr;
  const studies = useMemo(() => [0, 1, 2, 3], []);

  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="hero-dark-band min-h-[50vh] flex items-center relative z-10 overflow-hidden py-16 md:py-24 px-4 md:px-6 lg:px-10 lamp-section">
        <div className="hero-dark-glow" aria-hidden />
        <div className="hero-dark-glow hero-dark-glow-2" aria-hidden />
        <div className="absolute inset-0 pointer-events-none hero-dark-grid" aria-hidden />
        <div className="container mx-auto px-4 md:px-6 lg:px-10 relative max-w-6xl">
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm p-8 md:p-12 text-center fade-in-up stagger-1">
            <div className="hero-dark-eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full text-violet-300 text-sm font-bold mb-6 mx-auto">
              <BookOpen size={16} />
              <span>{t.hub}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
              {t.learn} <br />
              <span className="text-gradient-anim">{t.expertise}</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 mt-4 max-w-xl leading-relaxed mx-auto">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Market studies */}
      <section className="py-16 md:py-20 glass-effect relative z-10 text-theme lamp-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-theme mb-3 pb-4 border-b-2 border-violet-500/30 inline-block">
              {t.marketStudies}
            </h2>
            <p className="text-theme-secondary mt-4 max-w-2xl mx-auto text-lg">
            {t.marketDesc}
          </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {studies.map((_, idx) => (
              <div
                key={idx}
                className={`klik-card group overflow-hidden rounded-[32px] magnetic-hover shimmer fade-in-up stagger-${(idx % 4) + 1}`}
              >
                <div className="p-6 flex flex-col">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex-1 flex items-center justify-center min-h-[200px] aspect-[9/16]">
                    <span className="text-theme-secondary font-bold uppercase tracking-widest text-sm md:text-base">
                      {t.comingSoon}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vidéos de formation — commenté */}
      {/* <section className="py-16 md:py-20 glass-effect relative z-10 text-theme lamp-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-theme mb-3 pb-4 border-b-2 border-violet-500/30 inline-block">
              {language === 'en' ? 'Training videos' : 'Vidéos de formation'}
            </h2>
            <p className="text-theme-secondary mt-4 max-w-2xl mx-auto text-lg">
              {language === 'en'
                ? 'Exclusive video masterclasses — dropping soon. Stay tuned.'
                : 'Masterclasses vidéo exclusives — bientôt en ligne. Restez branchés.'}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {videos.map((v) => (
              <div
                key={v.id}
                className="group klik-card overflow-hidden rounded-2xl border border-slate-200 relative aspect-video"
              >
                <div className="absolute inset-0 bg-slate-900/50">
                  <img src="2.png" alt="" className="w-full h-full object-cover blur-sm opacity-50 grayscale" loading="lazy" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <div className="p-3 rounded-2xl bg-white/95 border border-slate-200 mb-3 shadow-lg">
                    <Lock className="w-8 h-8 text-violet-400" />
                  </div>
                  <span className="text-sm font-bold text-slate-800 uppercase tracking-wider text-center">
                    {language === 'en' ? 'Next up' : 'Prochainement'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
