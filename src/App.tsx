import { Suspense, useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, Globe, Home, Menu, MessageCircle, Rocket, Users, X } from 'lucide-react';
import { fr, getSavedLanguage, loadTranslations } from './i18n/loadTranslations';
import type { KlikTranslations, Language, Theme } from './types/klik';

export default function App() {
  const location = useLocation();
  const progressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuContainerRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(() => getSavedLanguage());
  const [theme] = useState<Theme>('light');

  const [t, setT] = useState<KlikTranslations | null>(() => (getSavedLanguage() === 'fr' ? fr : null));

  useEffect(() => {
    let cancelled = false;
    void loadTranslations(language).then((next) => {
      if (!cancelled) setT(next);
    });
    return () => {
      cancelled = true;
    };
  }, [language]);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    document.documentElement.classList.add('light');
    localStorage.setItem('theme', 'light');
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    // Always start pages from top
    // Some pages scroll in window; some in documentElement/body depending on browser.
    const doScrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.querySelector('main')?.scrollTo?.(0, 0);
    };
    doScrollTop();
    requestAnimationFrame(doScrollTop);

    // IMPORTANT: Fermer le menu mobile lors de la navigation
    const id = requestAnimationFrame(() => setIsMenuOpen(false));
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = Array.from(document.querySelectorAll('main section')) as HTMLElement[];
    const revealSections = sections.filter((section) => !/\bscroll-reveal/.test(section.className));

    revealSections.forEach((section, index) => {
      section.classList.add('section-reveal-tech');
      section.classList.add(`section-reveal-delay-${(index % 6) + 1}`);
      if (reduceMotion) section.classList.add('visible');
    });

    if (reduceMotion || revealSections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    revealSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = Array.from(document.querySelectorAll('main section .klik-card')) as HTMLElement[];

    cards.forEach((card, index) => {
      if (card.closest('.scroll-reveal-ai-3, .scroll-reveal-up-tech')) return;
      card.classList.add('card-reveal-tech');
      card.classList.add(`card-reveal-delay-${(index % 6) + 1}`);
      if (reduceMotion) card.classList.add('visible');
    });

    if (reduceMotion || cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -42px 0px' }
    );

    cards.forEach((card) => {
      if (!card.classList.contains('card-reveal-tech')) return;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / scrollHeight) * 100, 100);
      if (progressRef.current) progressRef.current.style.width = `${progress}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    const closeLangMenu = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    if (langMenuOpen) {
      document.addEventListener('click', closeLangMenu);
      return () => document.removeEventListener('click', closeLangMenu);
    }
  }, [langMenuOpen]);

  // Fermer le menu mobile en cliquant en dehors (setTimeout évite de capturer le clic d'ouverture)
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (mobileMenuContainerRef.current && !mobileMenuContainerRef.current.contains(target)) {
        closeMenu();
      }
    };

    const id = setTimeout(() => document.addEventListener('click', handleClickOutside), 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!t) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-zinc-100 gap-4"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <img src="/logo.png" alt="" className="h-14 w-auto opacity-90" width={56} height={56} decoding="async" />
        <div className="h-9 w-9 border-2 border-violet-500/25 border-t-violet-500 rounded-full animate-spin" aria-hidden />
      </div>
    );
  }

  return (
    <>
      <div ref={progressRef} className="progress-bar" />

      <header className="fixed top-0 left-0 w-full z-50 px-4 py-3">
        <nav className="navbar-glass container mx-auto rounded-2xl px-4 py-2 flex items-center justify-between">
          <NavLink to="/" className="header-logo-link flex items-center gap-3 group">
            <img
              src="logo.png"
              alt="KLIK - Logo"
              className="h-10 md:h-12 w-auto transition-all duration-300 group-hover:scale-105"
              loading="eager"
              width="64"
              height="64"
            />
          </NavLink>

          <div className="flex items-center gap-3">
            {/* Desktop nav pill container */}
            <div className="hidden lg:flex navbar-pill-container">
              {[
                { to: '/', label: t.nav.home },
                { to: '/about', label: t.nav.about },
                { to: '/services', label: t.nav.services },
                { to: '/blog', label: t.nav.blog },
                { to: '/contact', label: t.nav.contact },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `navbar-item ${isActive ? 'navbar-item-active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile: bouton hamburger + dropdown */}
            <div ref={mobileMenuContainerRef} className="lg:hidden relative">
              <button
                onClick={toggleMenu}
                className={`p-3 rounded-xl transition-all duration-200 ${isMenuOpen ? 'bg-violet-100 text-violet-700' : 'text-zinc-800 hover:text-zinc-950 hover:bg-zinc-200/90'}`}
                aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
              </button>

              {isMenuOpen && (
                <div
                  ref={menuRef}
                  className={`nav-mobile-dropdown absolute top-full mt-2 w-[min(92vw,300px)] rounded-2xl border border-slate-300 bg-zinc-100 shadow-lg overflow-hidden z-50 ${language === 'ar' ? 'left-0' : 'right-0'}`}
                >
                  <div className="p-2">
                    {[
                      { to: '/', label: t.nav.home, icon: Home },
                      { to: '/about', label: t.nav.about, icon: Users },
                      { to: '/services', label: t.nav.services, icon: Rocket },
                      { to: '/blog', label: t.nav.blog, icon: BookOpen },
                      { to: '/contact', label: t.nav.contact, icon: MessageCircle },
                    ].map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-semibold transition-all duration-150 ${isActive ? 'bg-violet-100 text-violet-800 border border-violet-200' : 'text-zinc-800 hover:bg-zinc-200/80 active:scale-[0.98]'}`
                        }
                      >
                        {({ isActive }) => {
                          const Icon = item.icon;
                          return (
                            <>
                                  <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-violet-200' : 'bg-zinc-200'}`}>
                                    <Icon size={16} strokeWidth={2} className={isActive ? 'text-violet-700' : 'text-zinc-600'} />
                              </span>
                              {item.label}
                            </>
                          );
                        }}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-[90px]">
        <div key={location.pathname} className="page-route-enter">
          <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center" aria-hidden="true"><div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin" /></div>}>
            <Outlet context={{ t, language, theme }} />
          </Suspense>
        </div>
      </main>

      <footer className="relative mt-auto pt-6 pb-6 px-4 md:px-6 lg:px-10">
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-zinc-100 rounded-2xl border border-slate-300 min-h-[80px] shadow-sm">
            <div className="py-4 px-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="rounded-full p-1.5 border border-slate-300 bg-zinc-200/50">
                    <img src="logo.png" alt="KLIK Logo" className="h-6 w-auto" decoding="async" loading="lazy" fetchPriority="low" />
                  </div>
                  <div className="text-zinc-900 text-center">
                    <p className="text-sm font-semibold mb-0.5">{t.footer.madeBy} <span className="font-bold text-violet-600">KLIK</span></p>
                    <p className="text-xs text-zinc-600">© {new Date().getFullYear()} KLIK. {t.footer.rights}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3 text-zinc-400">
                  <div className="h-px bg-slate-400/50 flex-1 max-w-16" />
                  <div className="w-1 h-1 bg-violet-500 rounded-full" />
                  <div className="h-px bg-slate-400/50 flex-1 max-w-16" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* Language Selector - dropdown au clic */}
        <div ref={langMenuRef} className="relative">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLangMenuOpen((v) => !v); }}
            className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-zinc-100 border border-slate-300 shadow-md text-zinc-900 font-bold text-sm hover:bg-zinc-200/80 transition-all"
            aria-label={language === 'fr' ? 'Langue : Français' : language === 'en' ? 'Language: English' : 'Langue'}
            aria-expanded={langMenuOpen}
            aria-haspopup="true"
          >
            <Globe className="w-5 h-5" />
            <span>{language.toUpperCase()}</span>
          </button>
          {langMenuOpen && (
            <div className="absolute bottom-full right-0 mb-2 flex flex-col gap-1 p-2 rounded-2xl bg-zinc-100 border border-slate-300 shadow-xl min-w-[120px]">
              {[
                { code: 'fr' as const, label: 'Français' },
                { code: 'en' as const, label: 'English' },
                { code: 'ar' as const, label: 'العربية' },
              ].map(({ code, label }) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => { setLanguage(code); setLangMenuOpen(false); }}
                  className={`px-4 py-2 rounded-xl font-bold text-sm text-left transition-all ${
                    language === code
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-200/90'
                  }`}
                  aria-label={label}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/25377141498"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all hover:scale-110"
          aria-label="Contact WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>

    </>
  );
}

