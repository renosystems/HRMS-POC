import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import login from "./Pages/login.json";
import Globals from "./Globals.json";

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
        ...Globals.en,
      },
      // Add other translations as needed
    },
    ar: {
      translation: {
        ...login.ar,
        ...Globals.ar,
      },
      // Add other translations as needed
    },
    // Define translations for other languages if needed
  },
});

const switchLanguage = (lang) => {
  if (lang === "ar") {
    document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  } else {
    document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
  }

  i18n.changeLanguage(lang);
};

const getCurrentLang = () => i18n.language;

export default i18n;

export { switchLanguage, getCurrentLang };
