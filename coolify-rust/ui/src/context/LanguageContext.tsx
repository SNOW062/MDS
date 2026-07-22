import React, { createContext, useContext, useState } from 'react';

export type Language = 'az' | 'en' | 'tr' | 'ru';

export const translations: Record<Language, Record<string, string>> = {
  az: {
    dashboard: 'İdarə Paneli',
    projects: 'Layihələr',
    servers: 'Serverlər',
    sources: 'Mənbələr',
    destinations: 'Hədəflər',
    storage: 'S3 Anbarları',
    sharedVariables: 'Ortaq Dəyişənlər',
    notifications: 'Bildirişlər',
    keys: 'Açarlar və Tokenlər',
    tags: 'Teqlər',
    terminal: 'Terminal',
    profile: 'Profil',
    teams: 'Komandalar',
    settings: 'Tənzimləmələr',
    newResource: 'Yeni Resurs',
    searchPlaceholder: 'Resursları axtarın...',
    noProjects: 'Heç bir layihə tapılmadı.',
    noKeys: 'Şəxsi SSH açarları tapılmadı.',
    online: 'Aktiv',
    redeploy: 'Yenidən Başlat',
    stop: 'Dayandır',
  },
  en: {
    dashboard: 'Dashboard',
    projects: 'Projects',
    servers: 'Servers',
    sources: 'Sources',
    destinations: 'Destinations',
    storage: 'S3 Storages',
    sharedVariables: 'Shared Variables',
    notifications: 'Notifications',
    keys: 'Keys & Tokens',
    tags: 'Tags',
    terminal: 'Terminal',
    profile: 'Profile',
    teams: 'Teams',
    settings: 'Settings',
    newResource: 'New Resource',
    searchPlaceholder: 'Search resources...',
    noProjects: 'No projects found.',
    noKeys: 'No private keys found.',
    online: 'Online',
    redeploy: 'Redeploy',
    stop: 'Stop',
  },
  tr: {
    dashboard: 'Kontrol Paneli',
    projects: 'Projeler',
    servers: 'Sunucular',
    sources: 'Kaynaklar',
    destinations: 'Hedefler',
    storage: 'S3 Depoları',
    sharedVariables: 'Ortak Değişkenler',
    notifications: 'Bildirimler',
    keys: 'Anahtarlar ve Jetonlar',
    tags: 'Etiketler',
    terminal: 'Terminal',
    profile: 'Profil',
    teams: 'Takımlar',
    settings: 'Ayarlar',
    newResource: 'Yeni Kaynak',
    searchPlaceholder: 'Kaynak ara...',
    noProjects: 'Henüz proje bulunamadı.',
    noKeys: 'Özel anahtar bulunamadı.',
    online: 'Aktif',
    redeploy: 'Yeniden Başlat',
    stop: 'Durdur',
  },
  ru: {
    dashboard: 'Панель управления',
    projects: 'Проекты',
    servers: 'Серверы',
    sources: 'Источники',
    destinations: 'Назначения',
    storage: 'Хранилища S3',
    sharedVariables: 'Общие переменные',
    notifications: 'Уведомления',
    keys: 'Ключи и токены',
    tags: 'Теги',
    terminal: 'Терминал',
    profile: 'Профиль',
    teams: 'Команды',
    settings: 'Настройки',
    newResource: 'Новый ресурс',
    searchPlaceholder: 'Поиск ресурсов...',
    noProjects: 'Проекты не найдены.',
    noKeys: 'Приватные ключи не найдены.',
    online: 'Онлайн',
    redeploy: 'Перезапустить',
    stop: 'Остановить',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('az');

  const t = (key: string) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
