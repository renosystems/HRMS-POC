import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import login from "./Pages/login.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        ...login.en,
      },
      // Add other translations as needed
    },
    // Define translations for other languages if needed
  },
});

export default i18n;
