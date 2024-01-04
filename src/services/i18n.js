import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "../public/locales/en/translation.json";
import translationFR from "../public/locales/fr/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    detection: {
      order: [
        "localStorage",
        "htmlTag",
        "navigator",
        "cookie",
        "sessionStorage",
      ],
    },
    fallbackLng: "en",
    supportedLngs: ["en", "en-GB", "en-US", "fr", "fr-FR"],
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: translationEN,
      },
      fr: {
        translation: translationFR,
      },
    },
  });

export default i18n;
