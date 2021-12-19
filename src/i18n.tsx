import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import { development } from "./environment/profile";
import translationFI from "./assets/locales/fi/common.json";
import translationEN from "./assets/locales/en/common.json";
import config from "./config/config";

i18n
    .use(detector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            fi: {
                translation: translationFI
            },
            en: {
                translation: translationEN
            }
        },
        debug: development,
        fallbackLng: config.general.languages.fi, // use fi if detected lng is not available
        interpolation: {
            escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

export default i18n;
