import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import es from './es.json'

const resources = { // list of languages
  es: {
    welcome: es.welcome,
    login: es.login,
    register: es.register,
    home: es.home,
  },
}

i18n.use(initReactI18next) // passes i18n down to react-i18next
 .init({
    compatibilityJSON: 'v3', //To make it work for Android devices, add this line.
    resources,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  })

export default i18n
