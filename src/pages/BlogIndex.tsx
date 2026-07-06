import React, { useEffect, useState } from 'react';
import { NavLink, useOutletContext } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar } from 'lucide-react';
import { getPosts, urlFor, type SanityPost } from '../lib/sanity';
import type { Language } from '../types/klik';

type OutletCtx = { language: Language };

const blogTexts: Record<Language, {
  badge: string;
  our: string;
  blog: string;
  subtitle: string;
  loading: string;
  errorTitle: string;
  errorHint: string;
  noPosts: string;
  article: string;
  readStory: string;
  noImage: string;
}> = {
  fr: {
    badge: 'Dernières Actualités',
    our: 'Notre',
    blog: 'Blog',
    subtitle: 'Stratégie, tech et croissance — des articles qui font avancer.',
    loading: 'Chargement…',
    errorTitle: 'Impossible de charger les articles.',
    errorHint: "Vérifie ta config Sanity et assure-toi d'avoir des articles publiés.",
    noPosts: 'Aucun article pour le moment. Créez votre premier article dans Sanity Studio!',
    article: 'Article',
    readStory: "Lire l'article",
    noImage: 'Sans image',
  },
  en: {
    badge: 'Latest Insights',
    our: 'Our',
    blog: 'Blog',
    subtitle: 'Strategy, tech, and growth — sharp reads that move the needle.',
    loading: 'Loading…',
    errorTitle: 'Unable to load posts.',
    errorHint: 'Check your Sanity project configuration and make sure you have published posts.',
    noPosts: 'No posts yet. Create your first post in Sanity Studio!',
    article: 'Article',
    readStory: 'Read Story',
    noImage: 'No image',
  },
  ar: {
    badge: 'أحدث الرؤى',
    our: 'مدونتنا',
    blog: 'Blog',
    subtitle: 'استراتيجية وتقنية ونمو — قراءات حادة تدفعك للأمام.',
    loading: 'جاري التحميل…',
    errorTitle: 'تعذر تحميل المقالات.',
    errorHint: 'تحقق من إعدادات مشروع Sanity وتأكد من وجود مقالات منشورة.',
    noPosts: 'لا توجد مقالات بعد. أنشئ مقالك الأول في Sanity Studio!',
    article: 'مقال',
    readStory: 'اقرأ المقال',
    noImage: 'بدون صورة',
  },
};

export default function BlogIndex() {
  const { language } = useOutletContext<OutletCtx>();
  const [posts, setPosts] = useState<SanityPost[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const t = blogTexts[language] ?? blogTexts.en;

  useEffect(() => {
    let cancelled = false;
    getPosts()
      .then((data) => {
        if (cancelled) return;
        setPosts(data);
        setStatus('success');
      })
      .catch((e) => {
        if (cancelled) return;
        setStatus('error');
        setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
              <span>{t.badge}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
              {t.our} <br />
              <span className="text-gradient-anim">{t.blog}</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 mt-4 max-w-xl leading-relaxed mx-auto">
              {t.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 glass-effect relative z-10 lamp-section">
        <div className="container mx-auto px-4">
          {status === 'loading' && (
            <div className="text-theme-secondary">{t.loading}</div>
          )}

          {status === 'error' && (
            <div className="border border-red-500/30 bg-red-500/10 rounded-xl p-5 text-red-200">
              <div className="font-semibold">{t.errorTitle}</div>
              {error && <div className="text-sm mt-2 opacity-90">{error}</div>}
              <div className="text-sm mt-3 opacity-80">{t.errorHint}</div>
            </div>
          )}

          {status === 'success' && posts.length === 0 && (
            <div className="text-center text-theme-secondary py-12">
              <p className="text-lg">{t.noPosts}</p>
            </div>
          )}

          {status === 'success' && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p, idx) => {
                const date = new Date(p.publishedAt);
                const dateLocale = language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : 'fr-FR';
                const dateLabel = isNaN(date.getTime())
                  ? ''
                  : date.toLocaleDateString(dateLocale, {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    });

                const imageUrl = p.mainImage ? urlFor(p.mainImage).width(800).height(500).url() : null;

                return (
                  <NavLink
                    key={p._id}
                    to={`/blog/${p.slug}`}
                    className={`group block klik-card overflow-hidden magnetic-hover shimmer rounded-[40px] fade-in-up stagger-${(idx % 3) + 1}`}
                  >
                    <div className="aspect-[16/10] w-full bg-slate-100 overflow-hidden relative">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-theme-secondary text-sm">
                            {t.noImage}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      <div className="absolute top-6 left-6">
                        <div className="px-4 py-1.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400 text-xs font-bold backdrop-blur-md uppercase tracking-widest">
                          {t.article}
                        </div>
                      </div>
                    </div>

                    <div className="p-8 md:p-10">
                      <div className="flex items-center gap-3 text-xs font-bold text-violet-400 uppercase tracking-[0.2em] mb-6">
                        <Calendar className="w-4 h-4" />
                        <span>{dateLabel}</span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-black text-theme group-hover:text-violet-400 transition-colors leading-tight uppercase tracking-tighter mb-6">
                        {p.title}
                      </h2>

                      <p className="text-theme-secondary text-lg leading-relaxed line-clamp-3 font-medium mb-10">
                        {p.excerpt || ''}
                      </p>

                      <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-sm font-black text-theme uppercase tracking-widest group-hover:text-violet-400 transition-colors">
                          {t.readStory}
                        </span>
                        <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-violet-500 group-hover:border-violet-500 transition-all">
                          <ArrowRight className="w-5 h-5 text-theme group-hover:text-violet-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

