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
  Shield,
  ShoppingBag,
  Sparkles,
  Truck,
  Utensils,
  X,
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
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [visibleClientIndexes, setVisibleClientIndexes] = useState<Set<number>>(new Set());
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
        id: 'vagabox',
        name: t.clients.vagabox.name,
        description: t.clients.vagabox.description,
        website: t.clients.vagabox.website,
        visitSite: t.clients.vagabox.visitSite,
        image: '1.png',
        color: 'from-blue-500 to-cyan-500',
        icon: Package,
      },
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
        id: 'byLouli',
        name: t.clients.byLouli.name,
        description: t.clients.byLouli.description,
        website: t.clients.byLouli.website,
        visitSite: t.clients.byLouli.visitSite,
        image: 'logoglamourvoile.png',
        color: 'from-amber-700 to-amber-900',
        icon: ShoppingBag,
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
      {/* Hero */}
      <section
        id="accueil"
        ref={heroRef}
        className="hero-dark-band min-h-[calc(100vh-70px)] flex items-center relative z-10 overflow-hidden py-16 md:py-24 px-6 md:px-10 lg:px-16"
      >
        <div className="hero-dark-glow" aria-hidden />
        <div className="hero-dark-glow hero-dark-glow-2" aria-hidden />
        <HeroInteractiveBackground />
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

      {/* Clients */}
      <section id="clients" className="py-16 md:py-24 relative z-10 lamp-section overflow-visible">
        <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-6xl">
          <div ref={clientsTitleRef} className="text-center mb-16 scroll-reveal-ai-2">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-5 section-title-anim inline-block">
              {t.home.clientsHeader} <br />
              <span className="text-gradient-anim">{t.home.clientsHighlight}</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
            {clients.map((client, index) => (
              <div
                key={client.id}
                ref={(el) => {
                  clientCardsRef.current[index] = el;
                }}
                className={`scroll-reveal-up-tech scroll-delay-${(index % 6) + 1} ${
                  visibleClientIndexes.has(index) ? 'visible' : ''
                } group cursor-pointer client-badge-tap`}
                onClick={() => setSelectedClient(client.id)}
              >
                <div className="client-tech-shell relative overflow-hidden rounded-2xl klik-card border-white/10 group-hover:border-violet-400/40 transition-all duration-300 aspect-[4/5] group-hover:-translate-y-0.5">
                  <img
                    src={client.image}
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover ${client.imageClassName || ''}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${client.color} opacity-70`} />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center gap-1.5">
                    <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl transition-transform duration-300 group-hover:scale-110">
                      <client.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                    <h3 className="text-[10px] md:text-xs font-black text-white tracking-wide uppercase leading-tight line-clamp-2">
                      {client.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal client — s'ouvre au centre avec une vraie transition au clic */}
      {selectedClient && (() => {
        const client = clients.find((c) => c.id === selectedClient);
        if (!client) return null;
        return (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm client-modal-backdrop"
            onClick={() => setSelectedClient(null)}
          >
            <div
              className="relative w-full max-w-lg bg-black/95 border border-white/10 rounded-[28px] p-8 md:p-10 max-h-[85vh] overflow-y-auto hide-scrollbar client-modal-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedClient(null)}
                className="absolute top-5 right-5 p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="relative p-1 rounded-[24px] bg-gradient-to-r from-violet-500 to-purple-500 shadow-[0_0_30px_rgba(124,58,237,0.3)] mb-5">
                  <div className="bg-black rounded-[23px] p-4">
                    <img
                      src={client.image}
                      alt={client.name}
                      decoding="async"
                      className={`w-16 h-16 md:w-20 md:h-20 object-contain ${client.id === 'confidential' ? 'blur-[12px] grayscale brightness-100 opacity-95' : client.imageClassName || ''}`}
                    />
                  </div>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4">
                  {client.name}
                </h3>
                <p className="text-white/70 text-sm md:text-base mb-6 leading-relaxed font-medium">
                  {client.description}
                </p>
                {client.website && client.visitSite && (
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-xl hover:bg-violet-500 hover:text-white transition-all text-base font-bold shadow-xl"
                  >
                    <span>{client.visitSite}</span>
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Anchor target for HERO CTA */}
      <div id="contact" className="h-0 w-0 overflow-hidden" />
    </div>
  );
}
