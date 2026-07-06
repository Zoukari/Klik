import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ArrowRight, Shield, Sparkles, Target, Trophy, Users } from 'lucide-react';
import type { Language } from '../types/klik';

type OutletCtx = { language: Language };

const texts = {
  fr: {
    ourStory: 'Notre Histoire',
    about: 'À propos de',
    heroDesc: "Vision, ambition, impact. On livre du digital premium — sans jamais lâcher sur l'exécution.",
    meetTeam: "Découvrir l'équipe",
    teamTitle: "L'Équipe qui révolutionne le digital",
    teamDesc: "Une équipe soudée qui conçoit, construit et livre. Mentalité produit d'abord — clarté et qualité, à chaque fois.",
    valuesDesc: "Ce qui nous anime — et ce qu'on livre sur chaque projet.",
    passionateTeam: 'Équipe Passionnée',
    pureInnovation: 'Innovation Pure',
    localExpertise: 'Expertise Locale',
    totalCommitment: 'Engagement Total',
    revelation: "La participation au Hackaton de Nantes 2023 a été l'étincelle. Nous avons réalisé que le monde digital avait besoin de plus que du code — il avait besoin d'âme, d'une exécution premium et d'une mentalité produit qui résout réellement les problèmes. Nous étions fiers de représenter KLIK en France.",
    revelationTitle: 'Notre Révélation',
    ceoMessage: 'Message de la CEO',
    peopleBehind: 'Les personnes derrière',
    expertsDesc: "Un collectif d'experts dédiés à votre succès.",
    headPR: 'Responsable Relations Publiques',
    ceoTagline: 'Vision et stratégie. Exécution premium.',
    ctoTagline: 'Tech & design. Architecture produit, livraison technique.',
    cmoTagline: 'Marketing, croissance, marque. Impact et visibilité.',
    prTagline: 'Partenariats, presse et image publique.',
    founderMessage: "Je suis la CEO de Klik, et je viens avec une mentalité simple : on avance, on teste, on optimise, on gagne. Je suis entrepreneur avant tout, passionné par l'innovation tech et par ce qu'elle permet de créer quand on l'utilise intelligemment : plus de vitesse, plus de précision, plus d'impact.\n\nPour moi, un bon marketing ne doit pas \"faire joli\" — il doit faire grandir. Un site web n'est pas une vitrine : c'est une machine de conversion. Et chaque action digitale doit servir un objectif clair : attirer, convaincre, transformer.\n\nChez Klik, on construit des stratégies solides, on produit du contenu qui marque, et on déploie des outils modernes pour passer au niveau supérieur. On ne suit pas les tendances : on les exploite.",
  },
  en: {
    ourStory: 'Our Story',
    about: 'About',
    heroDesc: 'Vision, ambition, impact. We ship premium digital — and we never compromise on execution.',
    meetTeam: 'Meet the team',
    teamTitle: 'The team revolutionizing digital',
    teamDesc: 'A tight-knit team that designs, builds and ships. Product mindset first — clarity and quality, every time.',
    valuesDesc: 'What drives us — and what we deliver on every project.',
    passionateTeam: 'Passionate Team',
    pureInnovation: 'Pure Innovation',
    localExpertise: 'Local Expertise',
    totalCommitment: 'Total Commitment',
    revelation: 'Participation in the Nantes Hackathon 2023 was the spark. We realized the digital world needed more than code — it needed soul, premium execution, and a product mindset that actually solves problems. We were proud to represent KLIK in France.',
    revelationTitle: 'Our Revelation',
    ceoMessage: 'Message from CEO',
    peopleBehind: 'The people behind',
    expertsDesc: 'A collective of experts dedicated to your success.',
    headPR: 'Head of Public Relations',
    ceoTagline: 'Vision and strategy. Premium execution.',
    ctoTagline: 'Tech & design. Product architecture, technical delivery.',
    cmoTagline: 'Marketing, growth, brand. Impact and visibility.',
    prTagline: 'Partnerships, press, and public image.',
    founderMessage: "I'm the CEO of Klik, and I come with a simple mindset: we move forward, we test, we optimize, we win. I'm an entrepreneur first, passionate about tech innovation and what it unlocks when used intelligently: more speed, more precision, more impact.\n\nFor me, good marketing shouldn't \"look nice\" — it should make you grow. A website isn't a showcase: it's a conversion machine. And every digital action must serve a clear objective: attract, convince, convert.\n\nAt Klik, we build solid strategies, we produce content that sticks, and we deploy modern tools to level up. We don't follow trends: we exploit them.",
  },
  ar: {
    ourStory: 'قصتنا',
    about: 'حول',
    heroDesc: 'رؤية، طموح، تأثير. نقدم رقمية متميزة — دون التنازل عن التنفيذ.',
    meetTeam: 'اكتشف الفريق',
    teamTitle: 'الفريق الذي يُحدث ثورة في الرقمية',
    teamDesc: 'فريق متماسك يصمم ويبني ويُنجز. عقلية المنتج أولاً — الوضوح والجودة، في كل مرة.',
    valuesDesc: 'ما يحركنا — وما نقدمه في كل مشروع.',
    passionateTeam: 'فريق شغوف',
    pureInnovation: 'ابتكار خالص',
    localExpertise: 'خبرة محلية',
    totalCommitment: 'التزام كامل',
    revelation: 'كانت المشاركة في هاكاثون نانت 2023 الشرارة. أدركنا أن العالم الرقمي يحتاج أكثر من مجرد كود — يحتاج روحًا، تنفيذًا متميزًا، وعقلية منتج تحل المشاكل فعلاً. كنا فخورين بتمثيل KLIK في فرنسا.',
    revelationTitle: 'إلهامنا',
    ceoMessage: 'رسالة من المديرة التنفيذية',
    peopleBehind: 'الأشخاص وراء',
    expertsDesc: 'مجموعة من الخبراء مكرسين لنجاحك.',
    headPR: 'رئيس العلاقات العامة',
    ceoTagline: 'رؤية واستراتيجية. تنفيذ متميز.',
    ctoTagline: 'التقنية والتصميم. هندسة المنتج، التسليم التقني.',
    cmoTagline: 'التسويق، النمو، العلامة التجارية. التأثير والرؤية.',
    prTagline: 'الشراكات، الصحافة، والصورة العامة.',
    founderMessage: "أنا المديرة التنفيذية لـ Klik، وأتيت بعقلية بسيطة: نتقدم، نختبر، نحسن، نفوز. أنا رائدة أعمال أولاً، شغوفة بالابتكار التقني وما يفتحه عند استخدامه بذكاء: سرعة أكثر، دقة أكثر، تأثير أكثر.\n\nبالنسبة لي، التسويق الجيد لا يجب أن \"يبدو جميلاً\" — يجب أن يُنميك. الموقع ليس واجهة عرض: إنه آلة تحويل. وكل إجراء رقمي يجب أن يخدم هدفاً واضحاً: جذب، إقناع، تحويل.\n\nفي Klik، نبني استراتيجيات قوية، ننتج محتوى يُعلق، وننشر أدوات حديثة للتقدم. لا نتبع الاتجاهات: نستغلها.",
  },
};

export default function About() {
  const { language } = useOutletContext<OutletCtx>();
  const t = texts[language];

  const founderMessage = (t as Record<string, string>).founderMessage;

  const values = [
    { title: t.passionateTeam, icon: Users },
    { title: t.pureInnovation, icon: Sparkles },
    { title: t.localExpertise, icon: Target },
    { title: t.totalCommitment, icon: Shield },
  ];

  const team = [
    { name: 'Ravaka S.', role: 'CEO', photo: 'saro-klik.jpg', tagline: t.ceoTagline },
    { name: 'Zoukari A.', role: 'CTO', photo: 'zouk klik.jpg', tagline: t.ctoTagline },
    { name: 'Sitraka S.', role: 'CMO', photo: 'sitraka klik.jpg', tagline: t.cmoTagline },
    { name: 'Alicia P.', role: t.headPR, photo: 'cara.jpg', tagline: t.prTagline },
  ];

  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="hero-dark-band min-h-[50vh] flex items-center relative z-10 overflow-hidden py-16 md:py-24 px-4 md:px-6 lg:px-10 lamp-section">
        <div className="hero-dark-glow" aria-hidden />
        <div className="hero-dark-glow hero-dark-glow-2" aria-hidden />
        <div className="container mx-auto px-4 md:px-6 lg:px-10 relative max-w-6xl">
          <div className="max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-sm p-8 md:p-12 text-center fade-in-up stagger-1">
            <div className="hero-dark-eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full text-violet-300 text-sm font-bold mb-6 mx-auto">
              <Users size={16} />
              <span>{t.ourStory}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
              {t.about} <br />
              <span className="text-gradient-anim">KLIK</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 mt-4 max-w-xl leading-relaxed mx-auto">
              {t.heroDesc}
            </p>
            <div className="mt-10 flex justify-center">
              <a href="#team" className="inline-flex items-center px-8 py-4 klik-btn klik-btn-primary text-lg">
                {t.meetTeam}
                <ArrowRight className="ml-2" size={22} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 1) Team + Values (integrated) */}
      <section className="py-16 md:py-20 glass-effect relative z-10 text-theme lamp-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-theme mb-3 pb-4 border-b-2 border-violet-500/30 inline-block">
            {t.teamTitle}
          </h2>
          <p className="text-theme-secondary mt-4 max-w-3xl mx-auto">
            {t.teamDesc}
          </p>
          </div>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, idx) => (
              <div
                key={v.title}
                className={`klik-card p-8 magnetic-hover shimmer rounded-[32px] fade-in-up stagger-${idx + 1}`}
              >
                <div className="w-16 h-16 bg-violet-500/10 border border-violet-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <v.icon className="w-8 h-8 text-violet-400" />
                </div>
                <div className="text-2xl font-black text-theme mb-4 uppercase tracking-tight">{v.title}</div>
                <div className="text-lg text-theme-secondary leading-relaxed">
                  {t.valuesDesc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2) Revelation (Modernisée) */}
      <section className="py-16 md:py-24 relative z-10 text-theme lamp-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-6xl">
          <div className="klik-card p-8 md:p-12 rounded-[32px] relative overflow-hidden group border border-amber-400/20">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-yellow-500/15 to-amber-600/10" />
            <div className="absolute inset-0 opacity-80 [mask-image:radial-gradient(70%_70%_at_10%_20%,black,transparent)] bg-gradient-to-br from-amber-400/30 via-transparent to-transparent" />

            <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
              <div className="max-w-2xl order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-sm font-bold mb-6 backdrop-blur-md">
                  <Trophy size={16} />
                  <span>2023 Revelation</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight"><span className="bg-gradient-to-r from-amber-200 via-amber-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(251,191,36,0.25)]">{(t as Record<string, string>).revelationTitle}</span></h2>
                <p className="text-lg md:text-2xl text-theme-secondary leading-relaxed font-medium">
                  {t.revelation}
                </p>
              </div>

              {/* Cup on the right */}
              <div className="relative flex justify-center order-1 lg:order-2">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-xl shadow-[0_0_48px_rgba(251,191,36,0.2)] flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <Trophy className="w-10 h-10 md:w-12 md:h-12 text-amber-300" />
                </div>
                <div className="absolute inset-0 -z-10 blur-2xl opacity-50 bg-gradient-to-br from-amber-400/30 to-amber-600/10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Founder message (Modernisée) */}
      <section className="py-16 md:py-24 relative z-10 text-theme lamp-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-6xl">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-12">
          <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-16 items-center">
            <div className="relative fade-in-up order-1 lg:order-1">
              <div className="max-w-[260px] md:max-w-[300px] lg:max-w-[280px] mx-auto klik-card p-2 rounded-2xl rotate-[-2deg]">
                <img src="saro-klik.jpg" alt="Ravaka S. - CEO" className="w-full h-auto rounded-xl object-cover" />
              </div>
            </div>
            <div className="fade-in-up stagger-2 order-2 lg:order-2 flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-6">
                <Users size={16} />
                <span>{t.ceoMessage}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 pb-4 border-b-2 border-violet-500/30 inline-block leading-tight">
                {t.ceoMessage}
              </h2>
              <div className="relative space-y-5">
                <span className="absolute -top-8 -left-8 text-7xl text-violet-500/10 font-serif">“</span>
                {founderMessage.split(/\n\n+/).map((paragraph, i) => (
                  <p key={i} className="text-base md:text-lg text-theme-secondary leading-relaxed font-medium italic">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* 4) Team (Modernisée) */}
      <section id="team" className="py-24 md:py-32 relative z-10 text-theme lamp-section">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 fade-in-up">
            <h2 className="text-4xl md:text-6xl font-black mb-6 pb-4 border-b-2 border-violet-500/30 inline-block">
              {t.peopleBehind} <span className="text-gradient-anim">KLIK</span>
            </h2>
            <p className="text-theme-secondary text-xl max-w-2xl mx-auto">
              {t.expertsDesc}
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 max-w-6xl mx-auto">
            {team.map((m, idx) => (
              <div
                key={`${m.name}-${idx}`}
                className="klik-card group rounded-2xl overflow-hidden border border-slate-200 p-8 md:p-10 flex flex-col sm:flex-row lg:flex-col items-center gap-6 text-center sm:text-left lg:text-center"
              >
                <div className="relative shrink-0">
                  <div className="p-[2px] rounded-xl bg-gradient-to-br from-violet-500/50 to-purple-500/30 w-28 h-28 md:w-32 md:h-32 shrink-0 overflow-hidden">
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-full h-full rounded-[10px] object-cover bg-black/30"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-lg md:text-xl font-black text-theme uppercase tracking-tight">{m.name}</div>
                  <div className="mt-2 inline-flex px-3 py-1 rounded-lg bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-bold">
                    {m.role}
                  </div>
                  <div className="mt-3 text-theme-secondary text-sm leading-relaxed">{m.tagline}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

