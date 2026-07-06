import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Clock, Mail, MapPin, MessageCircle } from 'lucide-react';
import type { Language } from '../types/klik';
import HeroInteractiveBackground from '../components/HeroInteractiveBackground';

type OutletCtx = { language: Language };

const SUBJECTS = [
  { value: 'devis', fr: 'Devis / Quote', en: 'Quote', ar: 'عرض سعر' },
  { value: 'projet', fr: 'Projet / Project', en: 'Project', ar: 'مشروع' },
  { value: 'partenariat', fr: 'Partenariat', en: 'Partnership', ar: 'شراكة' },
  { value: 'autre', fr: 'Autre', en: 'Other', ar: 'آخر' },
];

const texts = {
  fr: { getInTouch: 'Contactez-nous', start: 'Démarrer', projet: 'un Projet', heroDesc: 'Parlez-nous de votre vision — on en fera une réalité digitale premium.', contact: 'Contact', contactDesc: 'Plutôt discuter ? Joignez-nous directement — on répond vite.', fastReply: 'Réponse rapide', email: 'Email', reply24h: 'Réponse sous 24h', availability: 'Disponibilité', base: 'Implantation', baseDesc: 'Djibouti · Télétravail international', sendMessage: 'Envoyer un message', formDesc: 'Réponse rapide sur WhatsApp — on vous répond vite.', name: 'Nom', namePlaceholder: 'Votre nom', phone: 'Téléphone', subject: 'Sujet', choose: 'Choisir', message: 'Message', messagePlaceholder: 'Comment pouvons-nous vous aider ?', sendWhatsApp: 'Envoyer via WhatsApp', sendEmail: 'Envoyer par email' },
  en: { getInTouch: 'Get In Touch', start: 'Start', projet: 'a Project', heroDesc: "Let's discuss your project and build something premium together.", contact: 'Contact', contactDesc: 'Prefer a quick chat? Reach us directly — we reply fast.', fastReply: 'Fast reply', email: 'Email', reply24h: 'We reply within 24h', availability: 'Availability', base: 'Base', baseDesc: 'Djibouti · Remote worldwide', sendMessage: 'Send a message', formDesc: 'Fast reply on WhatsApp — we respond quickly.', name: 'Name', namePlaceholder: 'Your name', phone: 'Phone', subject: 'Subject', choose: 'Choose', message: 'Message', messagePlaceholder: 'How can we help you?', sendWhatsApp: 'Send via WhatsApp', sendEmail: 'Send via email' },
  ar: { getInTouch: 'تواصل معنا', start: 'ابدأ', projet: 'مشروعاً', heroDesc: 'لنتحدث عن مشروعك ونبني شيئاً متميزاً معاً.', contact: 'التواصل', contactDesc: 'تفضل المحادثة السريعة؟ تواصل معنا مباشرة — نرد بسرعة.', fastReply: 'رد سريع', email: 'البريد', reply24h: 'نرد خلال 24 ساعة', availability: 'التوفر', base: 'المقر', baseDesc: 'جيبوتي · عمل عن بعد عالمياً', sendMessage: 'أرسل رسالة', formDesc: 'رد سريع على واتساب — نرد بسرعة.', name: 'الاسم', namePlaceholder: 'اسمك', phone: 'الهاتف', subject: 'الموضوع', choose: 'اختر', message: 'الرسالة', messagePlaceholder: 'كيف يمكننا مساعدتك؟', sendWhatsApp: 'إرسال عبر واتساب', sendEmail: 'إرسال بالبريد' },
};

export default function Contact() {
  const { language } = useOutletContext<OutletCtx>();
  const t = texts[language] ?? texts.fr;
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const openWhatsApp = (prefill: string) => {
    const url = `https://wa.me/25377141498?text=${encodeURIComponent(prefill)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative z-10">
      {/* Hero */}
      <section className="hero-dark-band min-h-[50vh] flex items-center relative z-10 overflow-hidden py-16 md:py-24 px-4 md:px-6 lg:px-10 lamp-section">
        <div className="hero-dark-glow" aria-hidden />
        <div className="hero-dark-glow hero-dark-glow-2" aria-hidden />
        <HeroInteractiveBackground />
        <div className="container mx-auto px-4 md:px-6 lg:px-10 relative max-w-6xl">
          <div className="max-w-3xl mx-auto rounded-2xl p-8 md:p-12 text-center fade-in-up stagger-1">
            <div className="hero-dark-eyebrow inline-flex items-center gap-2 px-4 py-2 rounded-full text-violet-300 text-sm font-bold mb-6 mx-auto">
              <Mail size={16} />
              <span>{t.getInTouch}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
              {t.start} <br />
              <span className="text-gradient-anim">{t.projet}</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 mt-4 max-w-xl leading-relaxed mx-auto">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Form + Infos */}
      <section className="py-16 md:py-24 relative z-10 text-theme lamp-section">
        <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Infos à gauche */}
            <div className="rounded-2xl klik-card p-8 md:p-10 border border-slate-200 form-fixed overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold text-theme mb-2">
                  {t.contact}
                </h2>
                <p className="text-theme-secondary mb-8 leading-relaxed">
                  {t.contactDesc}
                </p>
                <div className="space-y-6">
                  <a href="https://wa.me/25377141498" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 transition-colors group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-bold text-theme">WhatsApp</p>
                      <p className="text-emerald-400 text-sm">+253 77 14 14 98</p>
                      <p className="text-theme-secondary text-xs mt-1">{t.fastReply}</p>
                    </div>
                  </a>
                  <a href="mailto:contact@klik.dj" className="flex items-center gap-4 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/15 transition-colors group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Mail className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-bold text-theme">{t.email}</p>
                      <p className="text-violet-400 text-sm">contact@klik.dj</p>
                      <p className="text-theme-secondary text-xs mt-1">{t.reply24h}</p>
                    </div>
                  </a>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-theme-secondary" />
                    </div>
                    <div>
                      <p className="font-bold text-theme">{t.availability}</p>
                      <p className="text-theme-secondary text-sm">24/24</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-theme-secondary" />
                    </div>
                    <div>
                      <p className="font-bold text-theme">{t.base}</p>
                      <p className="text-theme-secondary text-sm">{t.baseDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire à droite */}
            <div className="rounded-2xl klik-card p-8 md:p-10 border border-slate-200 form-fixed">
            <h2 className="text-2xl md:text-3xl font-bold text-theme mb-2">
              {t.sendMessage}
            </h2>
            <p className="text-theme-secondary mb-6 text-sm">
              {t.formDesc}
            </p>

            <form
              className="grid grid-cols-1 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                const subjectLabel = SUBJECTS.find((s) => s.value === form.subject);
                const sub = subjectLabel ? (subjectLabel as Record<string, string>)[language] ?? subjectLabel.fr : form.subject;
                const msg =
                  language === 'en'
                    ? `Hello KLIK, my name is ${form.name}. My email is ${form.email} and my phone number is ${form.phone}. I am contacting you regarding: ${sub}. Here is my message: ${form.message}`
                    : language === 'ar'
                    ? `مرحباً KLIK، اسمي ${form.name}. بريدي ${form.email} وهاتفي ${form.phone}. أتواصل بخصوص: ${sub}. رسالتي: ${form.message}`
                    : `Bonjour KLIK, je m'appelle ${form.name}. Mon email est ${form.email} et mon téléphone ${form.phone}. Je vous contacte au sujet de : ${sub}. Voici mon message : ${form.message}`;
                openWhatsApp(msg);
              }}
            >
              <div className="space-y-2">
                <label className="block text-theme text-sm font-medium">{t.name}</label>
                <input
                  required
                  placeholder={t.namePlaceholder}
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-theme text-sm font-medium">{t.email}</label>
                <input
                  required
                  type="email"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-theme text-sm font-medium">{t.phone}</label>
                <input
                  required
                  placeholder="+33 ..."
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-theme text-sm font-medium">{t.subject}</label>
                <select
                  required
                  value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 [&>option]:bg-gray-100 [&>option]:text-gray-900"
                  style={{ colorScheme: 'light' }}
                >
                  <option value="">{t.choose}</option>
                  {SUBJECTS.map((s) => (
                    <option key={s.value} value={s.value}>{(s as Record<string, string>)[language] ?? s.fr}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-theme text-sm font-medium">{t.message}</label>
                <textarea
                  required
                  rows={4}
                  placeholder={t.messagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold">
                  <MessageCircle className="w-4 h-4" />
                  {t.sendWhatsApp}
                </button>
                <a
                  href={`mailto:contact@klik.dj?subject=${encodeURIComponent(form.subject || 'Contact')}&body=${encodeURIComponent(`Nom: ${form.name}\nEmail: ${form.email}\nTél: ${form.phone}\n\n${form.message}`)}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold hover:bg-slate-50"
                >
                  <Mail className="w-4 h-4" />
                  {t.sendEmail}
                </a>
              </div>
            </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

