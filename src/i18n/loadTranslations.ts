import type { KlikTranslations, Language } from '../types/klik';
import fr from './fr';

export function getSavedLanguage(): Language {
  try {
    const saved = localStorage.getItem('language');
    if (saved === 'fr' || saved === 'en' || saved === 'ar') return saved;
  } catch {
    /* private mode */
  }
  return 'fr';
}

export async function loadTranslations(lang: Language): Promise<KlikTranslations> {
  if (lang === 'fr') return fr;
  if (lang === 'en') return (await import('./en')).default;
  return (await import('./ar')).default;
}

export { fr };
