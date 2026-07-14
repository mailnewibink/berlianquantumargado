import React, { createContext, useContext, useState } from 'react';
import { translations } from '../utils/translations';

type Language = 'en' | 'id';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bqa_lang');
    return saved === 'id' ? 'id' : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('bqa_lang', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  const t = (path: string): string => {
    const keys = path.split('.');

    let value: any = translations[language];

    for (const key of keys) {
      value = value?.[key];
    }

    if (typeof value === 'string') return value;

    value = translations.en;

    for (const key of keys) {
      value = value?.[key];
    }

    return typeof value === 'string' ? value : path;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
};