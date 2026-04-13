import { useEffect, useRef } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Code,
  Rocket,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import type { KlikTranslations, Language } from '../types/klik';

type OutletCtx = { t: KlikTranslations; language: Language };

const cardShell =
  'tech-card-lift group flex flex-col md:flex-row relative overflow-hidden rounded-2xl border border-slate-300 bg-zinc-100 shadow-sm min-h-[280px] md:min-h-[320px]';

export default function HomeOverviewCards() {
  const { t } = useOutletContext<OutletCtx>();
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10 w-full">
      <section
        ref={(el) => {
          sectionsRef.current[0] = el;
        }}
        className="scroll-reveal py-16 md:py-24 lamp-section"
      >
        <div className="px-4 md:px-6 lg:px-10">
          <div className={cardShell}>
            <div className="flex-[3] p-6 md:p-8 lg:p-12 relative z-10 min-w-0">
              <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-violet-500/[0.06] blur-[80px] rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 mb-6 md:mb-10">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100/80 border border-violet-200/90 text-violet-800 text-xs font-bold mb-3 md:mb-4">
                      <Rocket size={14} />
                      <span>{t.home.servicesBadge}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-slate-900 section-title-anim">
                      {t.home.servicesTitle2 ? (
                        <>
                          {t.home.servicesTitle1} <span className="text-gradient-anim">{t.home.servicesTitle2}</span>
                        </>
                      ) : (
                        <span className="text-gradient-anim">{t.home.servicesTitle1}</span>
                      )}
                    </h2>
                  </div>
                  <NavLink
                    to="/services"
                    className="link-underline-anim flex items-center gap-2 text-violet-700 font-semibold text-sm md:text-base hover:gap-3 transition-all"
                  >
                    {t.home.servicesAll}
                    <ArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
                  </NavLink>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {[
                    { icon: Code, title: t.home.webApps, desc: t.home.webAppsDesc },
                    { icon: TrendingUp, title: t.home.marketing, desc: t.home.marketingDesc },
                    { icon: Zap, title: t.home.automation, desc: t.home.automationDesc },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl bg-zinc-200/50 border border-slate-300 hover:border-violet-300 transition-colors group/card"
                    >
                      <item.icon className="w-8 h-8 text-violet-600 mb-3" />
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 h-[200px] md:h-auto min-w-[100px] flex-shrink-0 self-stretch overflow-hidden relative rounded-b-2xl md:rounded-l-none md:rounded-r-2xl">
              <img
                src="services.png"
                alt="Services"
                className="w-full h-full object-cover rounded-none"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-zinc-100 via-zinc-100/50 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[1] = el;
        }}
        className="scroll-reveal-right scroll-delay-1 py-16 md:py-24 lamp-section"
      >
        <div className="px-4 md:px-6 lg:px-10">
          <div className={cardShell}>
            <div className="flex-[3] p-6 md:p-8 lg:p-12 flex flex-col justify-center min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-200/70 border border-slate-300 text-zinc-800 text-xs font-bold w-fit mb-3 md:mb-4">
                <Users size={14} />
                <span>{t.home.aboutBadge}</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-slate-900 mb-3 md:mb-4 section-title-anim">
                {t.home.aboutTitle}{' '}
                <span className="text-gradient-anim">{t.home.aboutTitle2 ?? 'KLIK'}</span>
              </h2>
              <p className="text-base md:text-lg text-slate-600 mb-4 md:mb-6 leading-relaxed">
                {t.home.aboutDesc}
              </p>
              <NavLink
                to="/about"
                className="link-underline-anim flex items-center text-violet-700 font-semibold text-sm md:text-base hover:gap-3 transition-all w-fit"
              >
                {t.home.aboutCta}
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
              </NavLink>
            </div>
            <div className="w-full md:w-1/4 h-[200px] md:h-auto min-w-[100px] flex-shrink-0 self-stretch overflow-hidden relative rounded-b-2xl md:rounded-l-none md:rounded-r-2xl">
              <img
                src="about.png"
                alt="KLIK Team"
                className="w-full h-full object-cover rounded-none"
                loading="lazy"
              />
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-zinc-100 via-zinc-100/50 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={(el) => {
          sectionsRef.current[2] = el;
        }}
        className="scroll-reveal-zoom scroll-delay-2 py-16 md:py-24 lamp-section"
      >
        <div className="px-4 md:px-6 lg:px-10">
          <div className={`${cardShell} relative overflow-hidden`}>
            {/* Ambiance rêve : paillettes, étoiles, halos doux */}
            <div className="blog-dream-layer pointer-events-none absolute inset-0 z-0 rounded-2xl overflow-hidden" aria-hidden />
            <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden rounded-2xl" aria-hidden>
              <Star className="blog-dream-star absolute left-[6%] top-[14%] h-4 w-4 text-amber-300/90 fill-amber-200/80" strokeWidth={1.2} />
              <Star className="blog-dream-star blog-dream-star--delay-1 absolute right-[12%] top-[22%] h-3 w-3 text-violet-300/90 fill-violet-200/70" strokeWidth={1.2} />
              <Sparkles className="blog-dream-sparkle absolute left-[18%] bottom-[28%] h-5 w-5 text-violet-400/70" />
              <Sparkles className="blog-dream-sparkle blog-dream-star--delay-2 absolute right-[20%] bottom-[18%] h-4 w-4 text-emerald-400/65" />
              <Star className="blog-dream-star blog-dream-star--delay-2 absolute left-[42%] top-[8%] h-2.5 w-2.5 text-white fill-white/90 drop-shadow-[0_0_6px_rgba(167,139,250,0.9)]" strokeWidth={1} />
              <Star className="blog-dream-star absolute right-[8%] top-[40%] h-3 w-3 text-fuchsia-300/80 fill-fuchsia-200/60" strokeWidth={1.2} />
            </div>
            <div className="flex-[3] p-6 md:p-8 lg:p-12 relative z-10 min-w-0">
              <div className="absolute bottom-0 right-0 w-[320px] h-[320px] bg-emerald-500/[0.08] blur-[90px] rounded-full pointer-events-none" />
              <div className="absolute top-0 left-1/4 w-[200px] h-[200px] bg-violet-400/[0.07] blur-[70px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-12">
                <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-2xl bg-gradient-to-br from-emerald-50 to-violet-50/80 border border-emerald-100/80 shadow-[0_0_40px_rgba(167,139,250,0.15)] flex items-center justify-center">
                  <BookOpen className="relative z-10 w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-emerald-600 drop-shadow-sm" />
                  <Sparkles className="absolute -right-1 -top-1 h-5 w-5 text-violet-400/90 animate-pulse" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 via-white to-violet-50 border border-emerald-100/90 text-emerald-800 text-xs font-bold mb-3 md:mb-4 shadow-[0_0_20px_rgba(167,139,250,0.12)]">
                    <Sparkles size={14} className="text-violet-500 shrink-0" aria-hidden />
                    <span>{t.home.blogBadge}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-slate-900 mb-2 md:mb-3 section-title-anim">
                    {t.home.blogTitle1} <span className="text-emerald-600">{t.home.blogTitle2}</span>
                  </h2>
                  <p className="text-sm md:text-base lg:text-lg text-slate-600 mb-4 md:mb-5">
                    {t.home.blogDesc}
                  </p>
                  <NavLink
                    to="/blog"
                    className="link-underline-anim flex items-center justify-center md:justify-start text-emerald-700 font-semibold text-sm md:text-base hover:gap-3 transition-all w-fit"
                  >
                    {t.home.blogCta}
                    <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="relative z-10 w-full md:w-1/4 h-[200px] md:h-auto min-w-[100px] flex-shrink-0 self-stretch overflow-hidden rounded-b-2xl md:rounded-l-none md:rounded-r-2xl">
              <img
                src="blog.png"
                alt={t.nav.blog}
                className="w-full h-full object-cover rounded-none"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/*
      SECTIONS DÉSACTIVÉES (Learn, Divertissement & Events, Carrières) — routes commentées dans router.tsx
      Pour réactiver : décommenter les routes + nav dans App.tsx + blocs ci-dessous.

      Learn, Entertainment, Careers cards removed from home.
      */}
    </div>
  );
}
