import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// we're creating a custom detector because we want it to default to
// a region-less version of the locale if the region-specific version
// is not supported.
const staDetector = {
    name: 'staDetector',

    lookup(options) {

        const localeAndRegionlessLocale = (locale) => {
            if (locale.indexOf('-') >= 0) {
                return  [locale, locale.substring(0, locale.indexOf('-'))];
            } else {
                return [ locale ];
            }
        }

        const found = [];

        if (typeof navigator !== 'undefined') {
            if (navigator.languages) { // chrome only; not an array, so can't use .push.apply instead of iterating
                for (let i = 0; i < navigator.languages.length; i++) {
                    localeAndRegionlessLocale(navigator.languages[i]).forEach(l =>
                        found.push(l)
                    );
                }
            }
            if (navigator['userLanguage']) {
                localeAndRegionlessLocale(navigator['userLanguage']).forEach(l =>
                    found.push(l)
                );
            }
            if (navigator.language) {
                localeAndRegionlessLocale(navigator.language).forEach(l =>
                    found.push(l)
                );
            }
        }

        return found.length > 0 ? found : undefined;
    }
};

const supportedLanguages = ['en', 'en-CA', 'en-US', 'es', 'de', 'fr'];

const languageDetector = new LanguageDetector();
languageDetector.addDetector(staDetector);

export const getNavigatorLanguage = () => {
    let found = staDetector.lookup({})?.filter(l => supportedLanguages.indexOf(l) >= 0);
    return found?.length ? found[0] : "en";
}

export const isEnglishDefault = () => {
    let language = getNavigatorLanguage();
    console.log(language);
    return language.indexOf('en') === 0;
}

i18n.use(initReactI18next)
    .use(languageDetector)
    .init({
        fallbackLng: 'en',
        supportedLngs: supportedLanguages,
        resources: {
            'en-CA': {
                translations: require('./locales/en/translations.json')
            },
            'en-US': {
                translations: require('./locales/en/translations.json')
            },
            en: {
                translations: require('./locales/en/translations.json')
            },
            es: {
                translations: require('./locales/es/translations.json')
            },
            de: {
                translations: require('./locales/de/translations.json')
            },
            fr: {
                translations: require('./locales/fr/translations.json')
            }
        },
        detection: {
            order: ["staDetector"],
        },
        ns: ['translations'],
        defaultNS: 'translations',
        debug: true
    });

export default i18n;
