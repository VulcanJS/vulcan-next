import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// TODO: use the same pattern as next-i18next with a public folder of JSON files
// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "__Debug message": "Hi, I am in English 🇬🇧", // to be kept for testing purpose
    },
  },
  fr: {
    translation: {
      "__Debug message": "Bonjour, je suis en français 🇫🇷", // to be kept for testing purpose
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // TODO: detect users language

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
