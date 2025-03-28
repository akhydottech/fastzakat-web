import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "@/locales/fr.json";
import en from "@/locales/en.json";

// Récupérer la langue sauvegardée ou utiliser le français par défaut
const savedLanguage = typeof window !== 'undefined' ? localStorage.getItem('language') : null;
const defaultLanguage = savedLanguage || 'fr';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: en
      },
      fr: {
        translation: fr
      }
    },
    lng: defaultLanguage,
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

// Sauvegarder la langue dans le localStorage quand elle change
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', lng);
  }
});

export default i18n;