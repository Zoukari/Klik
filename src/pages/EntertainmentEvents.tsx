/**
 * Page hors navigation — route commentée dans `router.tsx`.
 * Carte d’accueil associée retirée dans `HomeOverviewCards.tsx`.
 */
import React, { useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Lock, Sparkles } from 'lucide-react';
import type { Language } from '../types/klik';

type OutletCtx = { language: Language };

const texts = {
  fr: { badge: 'Expériences Exclusives', title: 'Divertissement', title2: '& Events', heroDesc: 'Expériences immersives et événements exclusifs — conçus pour captiver et marquer les esprits.', divertissement: 'Divertissement', divDesc: 'Visuels percutants et moments inoubliables — on donne vie à vos événements.', comingSoon: 'Coming soon', events: 'Events', eventsDesc: 'Événements et avant-premières exclusives — la suite arrive très bientôt.', eventTeaser: 'Event teaser', exclusif: 'Exclusif', nextMoment: 'Prochain moment fort', reserveDate: 'Réservez la date' },
  en: { badge: 'Exclusive Experiences', title: 'Entertainment', title2: '& Events', heroDesc: 'Immersive experiences and exclusive events — designed to captivate and leave a lasting impression.', divertissement: 'Entertainment', divDesc: 'Stunning visuals and unforgettable moments — we bring your events to life.', comingSoon: 'Coming soon', events: 'Events', eventsDesc: 'Exclusive events and premieres — stay tuned for what\'s next.', eventTeaser: 'Event teaser', exclusif: 'Exclusive', nextMoment: 'Next big moment', reserveDate: 'Save the date' },
  ar: { badge: 'تجارب حصرية', title: 'الترفيه', title2: 'والفعاليات', heroDesc: 'تجارب غامرة وفعاليات حصرية — مصممة للإبهار وترك انطباع دائم.', divertissement: 'الترفيه', divDesc: 'مرئيات مؤثرة ولحظات لا تُنسى — نحيي فعالياتكم.', comingSoon: 'قريباً', events: 'الفعاليات', eventsDesc: 'فعاليات وعروض أولى حصرية — المزيد قريباً جداً.', eventTeaser: 'معاينة الحدث', exclusif: 'حصري', nextMoment: 'اللحظة القادمة', reserveDate: 'احجز التاريخ' },
};

export default function EntertainmentEvents() {
  const { language } = useOutletContext<OutletCtx>();
  const t = texts[language] ?? texts.fr;

  const entertainmentCards = useMemo(
    () => [
      { title: 'dekrypt #1' },
      { title: 'ça pique #1' },
      { title: 'dekrypt #2' },
      { title: 'ça pique #2' },
    ],
    []
  );

  const eventCards = useMemo(
    () => [
      { image: '1.png' },
      { image: '2.png' },
      { image: '4.jpg' },
    ],
    []
  );

  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="hero-dark-band min-h-[50vh] flex items-center relative z-10 overflow-hidden py-16 md:py-24 px-4 md:px-6 lg:px-10 lamp-section">
        <div className="hero-dark-glow" aria-hidden />
        <div className="hero-dark-glow hero-dark-glow-2" aria-hidden />
        <div className="container mx-auto px-4 md:px-6 lg:px-10 relative max-w-6xl">
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm p-8 md:p-12 text-center fade-in-up stagger-1">
            <div className="hero-dark-eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full text-violet-300 text-sm font-bold mb-6 mx-auto">
              <Sparkles size={16} />
              <span>{t.badge}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
              {t.title} <br />
              <span className="text-gradient-anim">{t.title2}</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 mt-4 max-w-xl leading-relaxed mx-auto">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Divertissement — reel style, pas titres+desc */}
      <section className="py-16 md:py-20 glass-effect relative z-10 text-theme lamp-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-theme mb-3 pb-4 border-b-2 border-violet-500/30 inline-block">
              <span className="text-gradient-anim">
                {t.divertissement}
              </span>
            </h2>
            <p className="text-theme-secondary text-lg mt-4 max-w-2xl mx-auto">
              {t.divDesc}
            </p>
          </div>

          <div className="mt-12 flex overflow-x-auto gap-5 pb-4 snap-x snap-mandatory hide-scrollbar md:overflow-visible md:flex-wrap md:justify-center">
            {entertainmentCards.map((c, idx) => (
              <div
                key={idx}
                className="group klik-card rounded-2xl overflow-hidden border border-white/10 shrink-0 w-[200px] sm:w-[240px] md:w-[260px] snap-center transition-all duration-300"
              >
                <div className="relative aspect-[9/16] bg-black/40 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-red-900/20 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-violet-300" />
                    </div>
                    <span className="text-white text-xs font-bold uppercase tracking-wider">KLIK</span>
                  </div>

                  {/* Titre */}
                  <div className="absolute left-3 right-3 top-14">
                    <span className="text-white text-sm md:text-base font-black uppercase tracking-tight drop-shadow-lg">
                      {c.title}
                    </span>
                  </div>

                  {/* Coming soon */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black/60 border border-white/20 text-white font-bold uppercase tracking-widest text-xs">
                      {t.comingSoon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-16 md:py-20 glass-effect relative z-10 text-theme lamp-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-theme mb-3 pb-4 border-b-2 border-violet-500/30 inline-block">
              {t.events}
            </h2>
            <p className="text-theme-secondary mt-4 max-w-2xl mx-auto text-lg">
              {t.eventsDesc}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventCards.map((c, idx) => (
              <div
                key={idx}
                className={`klik-card group overflow-hidden rounded-[40px] relative min-h-[400px] fade-in-up stagger-${(idx % 3) + 1}`}
              >
                <div className="absolute inset-0 bg-black/40">
                  <img src={c.image} alt="Event teaser" className="w-full h-full object-cover blur-xl opacity-40 transition-all duration-1000 group-hover:scale-110" />
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                  <div className="p-4 w-fit bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                    <Lock className="w-8 h-8 text-violet-400" />
                  </div>

                  <div>
                    <div className="text-sm font-black text-violet-400 uppercase tracking-[0.2em] mb-4">
                      {t.exclusif}
                    </div>
                    <h3 className="text-3xl font-black text-white leading-tight uppercase tracking-tighter mb-6">
                      {t.nextMoment}
                    </h3>
                    <div className="inline-flex px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-bold backdrop-blur-md">
                      {t.reserveDate}
                    </div>
                  </div>
                </div>

                {/* shimmer removed (avoids white stains) */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

