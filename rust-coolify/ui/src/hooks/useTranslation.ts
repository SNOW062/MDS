import { useState, useEffect } from 'react';
import { i18n } from '../i18n';
import type { Language } from '../i18n';

export function useTranslation() {
  const [lang, setLang] = useState<Language>(i18n.language);

  useEffect(() => {
    const unsubscribe = i18n.subscribe((nextLang) => {
      setLang(nextLang);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    t: i18n.t,
    language: lang,
    setLanguage: i18n.setLanguage
  };
}
