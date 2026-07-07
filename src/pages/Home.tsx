import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Cloud,
  ExternalLink,
  Lightbulb,
  Package,
  Plane,
  Rocket,
  Scissors,
  Shield,
  Sparkles,
  Truck,
  Utensils,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { KlikTranslations, Language } from '../types/klik';
import HomeOverviewCards from '../components/HomeOverviewCards';
import HeroInteractiveBackground from '../components/HeroInteractiveBackground';

const WorldMap = lazy(() => import('../components/WorldMap'));

type OutletCtx = {
  t: KlikTranslations;
  language: Language;
};

type ClientItem = {
  id: string;
  name: string;
  description: string;
  website: string | null;
  visitSite: string | null;
  image: string;
  imageClassName?: string;
  color: string;
  icon: LucideIcon;
};

export default function Home() {
  const { t, language } = useOutletContext<OutletCtx>();
  const [visibleClientIndexes, setVisibleClientIndexes] = useState<Set<number>>(new Set());
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  const [mapInView, setMapInView] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLElement>(null);
  const mapTitleRef = useRef<HTMLDivElement>(null);
  const clientsTitleRef = useRef<HTMLDivElement>(null);
  const mapCardRef = useRef<HTMLDivElement>(null);
  const clientCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mapOb = new IntersectionObserver(([e]) => { if (e.isIntersecting) setMapInView(true); }, { rootMargin: '80px', threshold: 0.1 });
    const el = mapRef.current;
    if (el) mapOb.observe(el);
    return () => mapOb.disconnect();
  }, []);

  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = clientCardsRef.current.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1) {
            // Carte client : la révélation passe par le state React, pas par classList,
            // sinon un re-render (ex: clic pour ouvrir une carte) écrase la classe "visible".
            setVisibleClientIndexes((prev) => {
              if (prev.has(idx)) return prev;
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          } else {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    [mapTitleRef, clientsTitleRef, mapCardRef].forEach((r) => {
      if (r.current) reveal.observe(r.current);
    });
    clientCardsRef.current.forEach((card) => {
      if (card) reveal.observe(card);
    });
    return () => reveal.disconnect();
  }, []);

  const clients: ClientItem[] = useMemo(
    () => [
      {
        id: 'salesforce',
        name: 'Salesforce',
        description:
          language === 'en'
            ? 'Salesforce - world leader in CRM and cloud solutions. We worked on custom integrations and digital transformation projects, leveraging their powerful platform to deliver exceptional customer experiences and streamline business processes.'
            : 'Salesforce - leader mondial du CRM et des solutions cloud. Nous avons travaillé sur des intégrations sur-mesure et des projets de transformation digitale, exploitant leur plateforme puissante pour offrir des expériences client exceptionnelles et optimiser les processus métier.',
        website: null,
        visitSite: null,
        image: 'salesforce.png',
        color: 'from-blue-400 to-cyan-400',
        icon: Cloud,
      },
      {
        id: 'vagabox',
        name: t.clients.vagabox.name,
        description: t.clients.vagabox.description,
        website: t.clients.vagabox.website,
        visitSite: t.clients.vagabox.visitSite,
        image: 'vagabox-logo.jpg',
        color: 'from-blue-500 to-cyan-500',
        icon: Package,
      },
      {
        id: 'shakpot',
        name: t.clients.shakpot.name,
        description: t.clients.shakpot.description,
        website: t.clients.shakpot.website,
        visitSite: t.clients.shakpot.visitSite,
        image: '2.png',
        color: 'from-orange-500 to-red-600',
        icon: Utensils,
      },
      {
        id: 'maisonMokary',
        name: t.clients.maisonMokary?.name ?? 'MAISON MOKARY',
        description: t.clients.maisonMokary?.description ?? '',
        website: t.clients.maisonMokary?.website ?? 'https://maison-mokary.vercel.app/',
        visitSite: t.clients.maisonMokary?.visitSite ?? null,
        image: 'maison-mokary-logo.png',
        color: 'from-[#473929] to-[#241d15]',
        icon: Scissors,
      },
      {
        id: 'continentalTransit',
        name: t.clients.continentalTransit?.name ?? 'Continental Transit',
        description: t.clients.continentalTransit?.description ?? '',
        website: t.clients.continentalTransit?.website ?? 'https://continental-transit.com',
        visitSite: t.clients.continentalTransit?.visitSite ?? null,
        image: 'continental.png',
        color: 'from-slate-500 to-gray-600',
        icon: Truck,
      },
      {
        id: 'dMoney',
        name: t.clients.dMoney?.name ?? 'D-MONEY',
        description: t.clients.dMoney?.description ?? '',
        website: t.clients.dMoney?.website ?? 'https://d-money.dj/',
        visitSite: t.clients.dMoney?.visitSite ?? null,
        image: 'd-money-logo.png',
        color: 'from-[#002565] to-[#001333]',
        icon: Wallet,
      },
      {
        id: 'deeqsan',
        name: t.clients.deeqsan.name,
        description: t.clients.deeqsan.description,
        website: t.clients.deeqsan.website,
        visitSite: t.clients.deeqsan.visitSite,
        image: 'Deeqsanlogo.png',
        color: 'from-green-500 to-emerald-600',
        icon: BookOpen,
      },
      {
        id: 'marketStudyCena',
        name: t.clients.marketStudyCena.name,
        description: t.clients.marketStudyCena.description,
        website: t.clients.marketStudyCena.website,
        visitSite: t.clients.marketStudyCena.visitSite,
        image: 'Logo MS CENA.webp',
        color: 'from-indigo-500 to-blue-600',
        icon: BarChart3,
      },
      {
        id: 'confidential',
        name: t.clients.confidential?.name ?? 'Client Confidentiel',
        description: t.clients.confidential?.description ?? '',
        website: t.clients.confidential?.website ?? null,
        visitSite: t.clients.confidential?.visitSite ?? null,
        image: 'mofalogo.png',
        imageClassName: 'blur-[20px] grayscale brightness-100 opacity-90',
        color: 'from-zinc-500 to-zinc-700',
        icon: Shield,
      },
      // Must be last
      {
        id: 'voyageVoyage',
        name: t.clients.voyageVoyage.name,
        description: t.clients.voyageVoyage.description,
        website: t.clients.voyageVoyage.website,
        visitSite: t.clients.voyageVoyage.visitSite,
        image: 'voyagevoyagelogo.png',
        color: 'from-[#fc8172] to-[#408398]',
        icon: Plane,
      },
    ],
    [language, t]
  );

  return (
    <div className="relative z-10">
      <HeroInteractiveBackground />
      {/* Hero */}
      <section
        id="accueil"
        ref={heroRef}
        className="hero-dark-band min-h-[calc(100vh-70px)] flex items-center relative z-10 overflow-hidden py-16 md:py-24 px-6 md:px-10 lg:px-16"
      >
        <div className="hero-dark-glow" aria-hidden />
        <div className="hero-dark-glow hero-dark-glow-2" aria-hidden />
        <div className="absolute inset-0 pointer-events-none hero-dark-grid" aria-hidden />

        <div className="container mx-auto px-4 md:px-6 lg:px-10 relative max-w-4xl">
          <div className="hero-enter-ai flex flex-col items-center text-center gap-10 md:gap-12">
            <div className="space-y-5">
              <p className="hero-dark-eyebrow inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300 px-4 py-1.5 rounded-full">
                Agence marketing digital
              </p>
              <h1 className="hero-mask-reveal text-6xl md:text-8xl font-black tracking-tight text-white uppercase">
                <span className="hero-mask-reveal-inner-dark">{t.hero.title}</span>
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-gradient-anim hero-fade-up" style={{ animationDelay: '0.5s' }}>{t.hero.subtitle}</p>
              <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-2xl mx-auto hero-fade-up" style={{ animationDelay: '0.65s' }}>
                {t.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 hero-fade-up" style={{ animationDelay: '0.8s' }}>
              {[
                { Icon: Lightbulb, label: t.home.valueInnovation },
                { Icon: Rocket, label: t.home.valuePerformance },
                { Icon: Sparkles, label: t.home.valueImpact },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="hero-dark-pill inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-white/85 text-sm font-medium"
                >
                  <Icon className="w-4 h-4 text-violet-400 shrink-0" />
                  {label}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2 hero-fade-up" style={{ animationDelay: '0.95s' }}>
              <NavLink
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-violet-600 text-white text-base font-semibold rounded-xl hover:bg-violet-500 transition-colors"
              >
                {t.home.btnAbout}
                <ArrowRight className="w-5 h-5" />
              </NavLink>
              <NavLink
                to="/services"
                className="hero-dark-btn-secondary inline-flex items-center gap-2 px-7 py-3.5 text-white text-base font-semibold rounded-xl transition-colors"
              >
                {t.home.btnOurServices}
                <ArrowRight className="w-5 h-5" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <HomeOverviewCards />
      {/* Map / Globe section - lazy when in view */}
      <section ref={mapRef} id="map" className="py-14 md:py-20 relative z-10 lamp-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-5xl">
          <div ref={mapTitleRef} className="text-center mb-12 scroll-reveal-ai-1">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 section-title-anim inline-block">
              {t.home.mapTitle} <br />
              <span className="text-gradient-anim">{t.home.mapTitleHighlight}</span>
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
              {t.home.mapDesc}
            </p>
          </div>
          <div ref={mapCardRef} className="scroll-reveal-up-tech relative rounded-2xl overflow-hidden klik-card p-4 md:p-6 border border-slate-300 min-h-[140px]">
            {mapInView && (
              <Suspense fallback={<div className="min-h-[140px] flex items-center justify-center"><div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin" /></div>}>
                <WorldMap />
              </Suspense>
            )}
          </div>
        </div>
      </section>

      {/* Clients — carrousel style Apple Card, purement visuel (pas de clic/popup) */}
      <section id="clients" className="py-16 md:py-24 relative z-10 lamp-section overflow-visible">
        <div className="max-w-full">
          <div ref={clientsTitleRef} className="text-center mb-16 scroll-reveal-ai-2 px-4 md:px-6 lg:px-10">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-5 section-title-anim inline-block">
              {t.home.clientsHeader} <br />
              <span className="text-gradient-anim">{t.home.clientsHighlight}</span>
            </h2>
          </div>

          <div className="apple-card-carousel hide-scrollbar flex flex-row gap-5 md:gap-6 overflow-x-auto pb-4 px-4 md:px-6 lg:px-10">
            {clients.map((client, index) => (
              <div
                key={client.id}
                ref={(el) => {
                  clientCardsRef.current[index] = el;
                }}
                className={`scroll-reveal-up-tech scroll-delay-${(index % 6) + 1} ${
                  visibleClientIndexes.has(index) ? 'visible' : ''
                } shrink-0 w-[220px] sm:w-[240px] md:w-[260px]`}
              >
                <div
                  className="apple-card-shell relative overflow-hidden rounded-[28px] h-[300px] md:h-[340px] cursor-pointer bg-white"
                  onClick={() => setExpandedClient(expandedClient === client.id ? null : client.id)}
                >
                  <img
                    src={client.image}
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-x-6 top-6 bottom-16 w-[calc(100%-3rem)] h-auto max-h-[calc(100%-5.5rem)] m-auto object-contain drop-shadow-lg ${client.imageClassName || ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/10" />

                  {/* Vue par défaut : icône + nom */}
                  <div
                    className={`absolute inset-0 flex flex-col items-start justify-end p-5 text-left client-face-transition ${
                      expandedClient === client.id ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl mb-3">
                      <client.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base md:text-lg font-black text-white tracking-wide uppercase leading-tight">
                      {client.name}
                    </h3>
                  </div>

                  {/* Vue description : apparaît au clic, directement dans la carte */}
                  <div
                    className={`absolute inset-0 flex flex-col items-start justify-end p-5 text-left bg-black/70 client-face-transition ${
                      expandedClient === client.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <h3 className="text-sm font-black text-white tracking-wide uppercase leading-tight mb-2">
                      {client.name}
                    </h3>
                    <p className="text-white/85 text-xs leading-snug line-clamp-5">
                      {client.description}
                    </p>
                    {client.website && client.visitSite && (
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-violet-500 hover:text-white transition-colors"
                      >
                        {client.visitSite}
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anchor target for HERO CTA */}
      <div id="contact" className="h-0 w-0 overflow-hidden" />
    </div>
  );
}
