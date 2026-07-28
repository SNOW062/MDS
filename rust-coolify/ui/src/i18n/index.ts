import { az } from './az';
import { en } from './en';
import { tr } from './tr';
import { ru } from './ru';

export type Language = 'az' | 'en' | 'tr' | 'ru';

const dictionaries = { az, en, tr, ru };

let currentLang: Language = (localStorage.getItem('md_lang') as Language) || 'en';

const listeners = new Set<(lang: Language) => void>();

export const i18n = {
  get t() {
    return dictionaries[currentLang];
  },
  
  get language() {
    return currentLang;
  },

  setLanguage(lang: Language) {
    if (dictionaries[lang]) {
      currentLang = lang;
      localStorage.setItem('md_lang', lang);
      listeners.forEach((listener) => listener(lang));
    }
  },

  subscribe(listener: (lang: Language) => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
};
