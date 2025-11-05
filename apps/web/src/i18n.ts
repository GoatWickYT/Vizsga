// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import hu from './locales/hu.json';
import ge from './locales/ge.json';
import rs from './locales/rs.json';
import ro from './locales/ro.json';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        hu: { translation: hu },
        ge: { translation: ge },
        rs: { translation: rs },
        ro: { translation: ro },
    },
    lng: 'hu',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

export default i18n;
