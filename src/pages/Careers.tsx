/**
 * Page hors navigation — route commentée dans `router.tsx`.
 * Carte d’accueil associée retirée dans `HomeOverviewCards.tsx`.
 */
import React, { useMemo, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Mail, MessageCircle, Users } from 'lucide-react';
import type { Language } from '../types/klik';

type OutletCtx = { language: Language };

type FormState = {
  name: string;
  phone: string;
  sector: string;
  subSector: string;
  otherSector: string;
  city: string;
  experiences: string;
  diplomas: string;
};

const texts = {
  fr: { joinUs: 'Nous Rejoindre', careers: 'Carrières', heroDesc: "Construisez quelque chose qui compte. On recrute — et l'équipe veille au fit.", apply: 'Postuler', formDesc: 'Remplis le formulaire, puis envoie ton CV et ta photo sur WhatsApp — on te recontacte vite.', fullName: 'Nom complet', phone: 'Téléphone', city: 'Ville', sector: 'Secteur', select: 'Sélectionner', otherSpecify: 'Autre (précisez)', yourSector: 'Votre secteur...', subSector: 'Sous-secteur', experiences: 'Expériences', experiencesPlaceholder: 'Parlez-nous de votre parcours...', diplomas: 'Diplômes', diplomasPlaceholder: 'Diplômes et certifications...', applyWhatsApp: 'Postuler via WhatsApp', applyEmail: 'Postuler par email', questions: 'Questions ? WhatsApp ou email', msgIntro: 'Bonjour, je souhaite postuler dans votre société. ', msgBody: "Je m'appelle {name}, vous pouvez me joindre au {phone}. J'habite à {city}. Je suis intéressé(e) par le secteur {sector}{sub}. Mon parcours : {exp} Mes diplômes et certifications : {dip} Je vous enverrai mon CV et ma photo via WhatsApp. Merci." },
  en: { joinUs: 'Join Us', careers: 'Careers', heroDesc: 'Build something that matters. We hire — and our team vets for fit.', apply: 'Apply Now', formDesc: "Fill the form, then send your CV + photo on WhatsApp — we'll get back to you fast.", fullName: 'Full name', phone: 'Phone', city: 'City', sector: 'Sector', select: 'Select', otherSpecify: 'Other (specify)', yourSector: 'Your sector...', subSector: 'Sub-sector', experiences: 'Experiences', experiencesPlaceholder: 'Tell us about your background...', diplomas: 'Diplomas', diplomasPlaceholder: 'Degrees and certifications...', applyWhatsApp: 'Apply via WhatsApp', applyEmail: 'Apply by email', questions: 'Questions? WhatsApp or email', msgIntro: 'Hello, I would like to apply to your company. ', msgBody: `My name is {name}, you can reach me at {phone}. I am based in {city}. I am interested in the {sector} sector{sub}. My background: {exp} My diplomas and certifications: {dip} I will send my CV and photo via WhatsApp. Thank you.` },
  ar: { joinUs: 'انضم إلينا', careers: 'الوظائف', heroDesc: 'ابنِ شيئاً له معنى. نحن نوظف — والفريق يتحقق من الملاءمة.', apply: 'تقدم الآن', formDesc: 'املأ النموذج، ثم أرسل سيرتك الذاتية وصورتك على واتساب — سنتواصل معك بسرعة.', fullName: 'الاسم الكامل', phone: 'الهاتف', city: 'المدينة', sector: 'القطاع', select: 'اختر', otherSpecify: 'آخر (حدد)', yourSector: 'قطاعك...', subSector: 'القسم الفرعي', experiences: 'الخبرات', experiencesPlaceholder: 'حدثنا عن مسارك...', diplomas: 'الشهادات', diplomasPlaceholder: 'الشهادات والاعتمادات...', applyWhatsApp: 'تقدم عبر واتساب', applyEmail: 'تقدم بالبريد', questions: 'أسئلة؟ واتساب أو بريد', msgIntro: 'مرحباً، أود التقديم في شركتكم. ', msgBody: 'اسمي {name}، يمكنكم التواصل معي على {phone}. أقيم في {city}. مهتم بقطاع {sector}{sub}. خلفيتي: {exp} شهاداتي: {dip} سأرسل سيرتي وصورتي عبر واتساب. شكراً.' },
};

export default function Careers() {
  const { language } = useOutletContext<OutletCtx>();
  const t = texts[language] ?? texts.fr;
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    sector: '',
    subSector: '',
    city: '',
    experiences: '',
    diplomas: '',
  });

  const sectors = useMemo(
    () => [
      { value: 'Marketing', label: language === 'en' ? 'Marketing' : 'Marketing', subs: ['Social', 'Ads', 'Brand'] },
      { value: 'Design', label: language === 'en' ? 'Design' : 'Design', subs: ['UI/UX', 'Brand', 'Motion'] },
      { value: 'Tech', label: language === 'en' ? 'Engineering' : 'Tech', subs: ['Frontend', 'Backend', 'Mobile'] },
      { value: 'Sales', label: language === 'en' ? 'Sales' : 'Commercial', subs: ['B2B', 'Partnerships'] },
      { value: 'Autre', label: language === 'en' ? 'Other' : 'Autre', subs: [] as string[] },
    ],
    [language]
  );

  const selectedSector = sectors.find((s) => s.value === form.sector);
  const shouldShowSub = !!selectedSector?.subs?.length;
  const isOther = form.sector === 'Autre';

  const submitToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const sectorLabel = isOther ? (form.otherSector || 'Autre') : form.sector;
    const subPart = shouldShowSub ? ` (${form.subSector})` : '';
    const body = (t as Record<string, string>).msgBody
      ?.replace('{name}', form.name)
      ?.replace('{phone}', form.phone)
      ?.replace('{city}', form.city)
      ?.replace('{sector}', sectorLabel)
      ?.replace('{sub}', subPart)
      ?.replace('{exp}', form.experiences)
      ?.replace('{dip}', form.diplomas) ?? '';
    const msg = ((t as Record<string, string>).msgIntro ?? '') + body;
    const url = `https://wa.me/25377141498?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

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
              <span>{t.joinUs}</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
              {t.careers} <br />
              <span className="text-gradient-anim">@ KLIK</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 mt-4 max-w-xl leading-relaxed mx-auto">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 md:py-32 relative z-10 text-theme lamp-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-[48px] klik-card p-10 md:p-20 relative overflow-hidden shadow-[0_0_100px_rgba(124,58,237,0.1)] form-fixed">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-violet-600/5 via-transparent to-purple-600/5" />
            <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold mb-10 uppercase tracking-widest">
              Application Portal
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-theme mb-6 tracking-tighter">
              {t.apply}
            </h2>
            <p className="text-xl text-theme-secondary mb-12 font-medium max-w-2xl leading-relaxed">
              {t.formDesc}
            </p>

            <form onSubmit={submitToWhatsApp} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="block text-theme text-sm font-black uppercase tracking-widest mb-2">
                  {t.fullName}
                </label>
                <input
                  required
                  type="text"
                  placeholder="Jean Dupont"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full px-5 py-3 klik-input text-base font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-theme text-sm font-black uppercase tracking-widest mb-2">
                  {t.phone}
                </label>
                <input
                  required
                  type="tel"
                  placeholder="+33 ..."
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full px-5 py-3 klik-input text-base font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-theme text-sm font-black uppercase tracking-widest mb-2">
                  {t.city}
                </label>
                <input
                  required
                  type="text"
                  placeholder="Nantes"
                  value={form.city}
                  onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                  className="w-full px-5 py-3 klik-input text-base font-medium"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-theme text-sm font-black uppercase tracking-widest mb-2">
                  {t.sector}
                </label>
                <select
                  required
                  value={form.sector}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, sector: e.target.value, subSector: '' }))
                  }
                  className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                >
                  <option value="">{t.select}</option>
                  {sectors.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {isOther && (
                <div className="md:col-span-2 space-y-3">
                  <label className="block text-theme text-sm font-black uppercase tracking-widest mb-2">
                    {t.otherSpecify}
                  </label>
                  <input
                    type="text"
                    placeholder={t.yourSector}
                    value={form.otherSector}
                    onChange={(e) => setForm((p) => ({ ...p, otherSector: e.target.value }))}
                    className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  />
                </div>
              )}

              <div className={`space-y-3 ${shouldShowSub ? '' : 'opacity-30 pointer-events-none'}`}>
                <label className="block text-theme text-sm font-black uppercase tracking-widest mb-2">
                  {t.subSector}
                </label>
                <select
                  value={form.subSector}
                  onChange={(e) => setForm((p) => ({ ...p, subSector: e.target.value }))}
                  disabled={!shouldShowSub}
                  className="w-full px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-base font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">{t.select}</option>
                  {selectedSector?.subs?.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="block text-theme text-sm font-black uppercase tracking-widest mb-2">
                  {t.experiences}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t.experiencesPlaceholder}
                  value={form.experiences}
                  onChange={(e) => setForm((p) => ({ ...p, experiences: e.target.value }))}
                  className="w-full px-5 py-3 klik-input text-base font-medium resize-none"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="block text-theme text-sm font-black uppercase tracking-widest mb-2">
                  {t.diplomas}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={t.diplomasPlaceholder}
                  value={form.diplomas}
                  onChange={(e) => setForm((p) => ({ ...p, diplomas: e.target.value }))}
                  className="w-full px-5 py-3 klik-input text-base font-medium resize-none"
                />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row gap-6 mt-6">
                <button type="submit" className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#25D366] text-white text-base font-black uppercase tracking-widest border-0">
                  <MessageCircle className="w-6 h-6" />
                  {t.applyWhatsApp}
                </button>
                <a
                  href="mailto:contact@klik.dj?subject=Postuler%20KLIK"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-slate-200 bg-white text-slate-800 text-base font-black uppercase tracking-widest hover:bg-slate-50"
                >
                  <Mail className="w-6 h-6" />
                  {t.applyEmail}
                </a>
                <a
                  href="https://wa.me/25377141498"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-slate-200 bg-white text-slate-800 text-base font-black uppercase tracking-widest hover:bg-slate-50"
                >
                  {t.questions}
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

