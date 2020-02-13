import moment from 'moment';
import 'moment/locale/fr';
import i18n from 'i18n-js';

import en from './locales/en';
import fr from './locales/fr';

i18n.fallbacks = true;
i18n.translations = { en, fr };
i18n.defaultLocale = 'en';

const loadLanguage = async () => {
  i18n.locale = (await localStorage.getItem('LANGUAGE')) || 'en';
  moment.locale(i18n.locale);
};

loadLanguage();

export const t = (name, params = {}) => i18n.t(name, params);

export const setLocale = async locale => {
  await localStorage.setItem('LANGUAGE', locale);

  i18n.locale = locale;
  moment.locale(locale);
};

export const getLocale = () => {
  return i18n.locale;
};
