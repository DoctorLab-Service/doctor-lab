import i18next from "i18next"
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from "react-i18next"

import { localStorageKey } from "core/localstorage"
import { translations } from 'utils'



const fallbackLng = ['en']


const { enAuth, enError } = translations
const { ruAuth, ruError } = translations

const languages = {
    en: {
        ...enAuth,
        ...enError
    },
    ru: {
        ...ruAuth,
        ...ruError
    }
}

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    debug: false,
    resources: languages,
    fallbackLng,
    detection: {
        // order and from where user language should be detected
        order: ['querystring', 'cookie', 'localStorage'],
        // order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

        // keys or params to lookup language from
        lookupQuerystring: localStorageKey.language,
        lookupCookie: localStorageKey.language,
        lookupLocalStorage: localStorageKey.language,

        // Default params
        // lookupQuerystring: 'lng',
        // lookupCookie: 'i18next',
        // lookupLocalStorage: 'i18nextLng',
        // lookupSessionStorage: 'i18nextLng',
        // lookupFromPathIndex: 0,
        // lookupFromSubdomainIndex: 0,

        // cache user language on
        caches: ['localStorage', 'cookie'],
        excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

        // optional expire and domain for set cookie
        // cookieMinutes: 10,
        // cookieDomain: 'myDomain',

        // optional htmlTag with lang attribute, the default is:
        // htmlTag: document.documentElement,

        // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
        cookieOptions: { path: '/', sameSite: 'strict' }
    }
})

export default i18next