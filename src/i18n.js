import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend) // load translations using http (default public/assets/locals/en/translations)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng: false, // download only detected/chosen language.
    whitelist: ["en", "ru"],
    load: 'languageOnly',

    detection: {
      checkWhitelist: true, // options for language detection
    },

    debug: false,

    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
  });

export default i18n;
