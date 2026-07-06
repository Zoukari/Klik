import React, { useEffect, useMemo, useState } from 'react';
import { NavLink, useOutletContext, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import { getPostBySlug, urlFor, type SanityPost } from '../lib/sanity';
import PortableTextBlock from '../components/PortableTextBlock';
import type { Language } from '../types/klik';
import HeroInteractiveBackground from '../components/HeroInteractiveBackground';

type OutletCtx = { language: Language };

const blogPostTexts: Record<Language, { backToBlog: string; notFound: string }> = {
  fr: { backToBlog: 'Retour au blog', notFound: 'Article introuvable.' },
  en: { backToBlog: 'Back to Blog', notFound: 'Article not found.' },
  ar: { backToBlog: 'العودة إلى المدونة', notFound: 'المقال غير موجود.' },
};

export default function BlogPost() {
  const { language } = useOutletContext<OutletCtx>();
  const { slug } = useParams();
  const t = blogPostTexts[language] ?? blogPostTexts.en;

  const [post, setPost] = useState<SanityPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    getPostBySlug(slug)
      .then((p) => {
        if (cancelled) return;
        if (!p) {
          setError(t.notFound);
          return;
        }
        setPost(p);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
      });
    return () => {
      cancelled = true;
    };
  }, [slug, t.notFound]);

  const status: 'loading' | 'success' | 'error' = error ? 'error' : post ? 'success' : 'loading';

  const dateLabel = useMemo(() => {
    if (!post?.publishedAt) return '';
    const d = new Date(post.publishedAt);
    if (isNaN(d.getTime())) return '';
    const locale = language === 'ar' ? 'ar-SA' : language === 'en' ? 'en-US' : 'fr-FR';
    return d.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
  }, [language, post]);

  const imageUrl = post?.mainImage ? urlFor(post.mainImage).width(1200).height(600).url() : null;

  return (
    <div className="relative z-10">
      <section className="hero-dark-band min-h-[50vh] flex items-center relative z-10 overflow-hidden py-16 md:py-24 px-4 md:px-6 lg:px-10 lamp-section">
        <div className="hero-dark-glow" aria-hidden />
        <div className="hero-dark-glow hero-dark-glow-2" aria-hidden />
        <HeroInteractiveBackground />
        <div className="container mx-auto px-4 md:px-6 lg:px-10 relative max-w-6xl">
          <NavLink
            to="/blog"
            className="inline-flex items-center gap-3 text-violet-300 font-bold uppercase text-xs tracking-[0.3em] hover:text-violet-200 transition-all mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
            {t.backToBlog}
          </NavLink>

          <div className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 text-center fade-in-up">
            <div className="flex items-center justify-center gap-4 text-white/60 font-bold uppercase text-xs tracking-widest mb-6">
              <div className="p-2 bg-violet-500/10 border border-violet-500/20 rounded-lg">
                <Calendar className="w-4 h-4 text-violet-400" />
              </div>
              <span>{dateLabel}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              {post?.title || ''}
            </h1>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32 relative z-10 lamp-section">
        <div className="container mx-auto px-4">
          {status === 'success' && post && (
            <article className="max-w-4xl mx-auto">
              {imageUrl && (
                <div className="mb-16 rounded-[48px] overflow-hidden klik-card shadow-[0_0_80px_rgba(0,0,0,0.3)]">
                  <img
                    src={imageUrl}
                    alt={post.title}
                    className="w-full h-auto object-cover max-h-[600px]"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="klik-card p-10 md:p-20 rounded-[48px] text-theme leading-relaxed text-xl font-medium shadow-[0_0_100px_rgba(124,58,237,0.05)]">
                {post.body && <PortableTextBlock value={post.body} />}
              </div>
            </article>
          )}
        </div>
      </section>
    </div>
  );
}

