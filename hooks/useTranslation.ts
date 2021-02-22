import { useContext } from 'react';
import { LocaleContext } from 'context/LocaleContext';
import strings from 'translations/strings';
import { defaultLocale } from 'translations/config';

export default function useTranslation() {
  const { locale } = useContext(LocaleContext);

  function t(key: string, obj = {}) {
    if (!strings[locale][key]) {
      console.warn(`Translation '${key}' for locale '${locale}' not found.`);
    }

    let str = strings[locale][key] || strings[defaultLocale][key];

    if (!str) return `${locale}_${key}`;

    // Interpolate
    for (let index = 0; index < Object.keys(obj).length; index++) {
      const k = Object.keys(obj)[index];
      const regex = new RegExp(`{${k}}`, 'gi');
      str = str.replace(regex, obj[k]);
    }

    return str;
  }

  return {
    t,
    locale,
  };
}
