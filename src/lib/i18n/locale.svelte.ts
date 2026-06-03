export type Locale = 'en' | 'it';

// the SPA language
let locale = $state<Locale>('en');

export const setLocale = (l: Locale) => (locale = l);
export const getLocale = () => locale;
export const toggleLocale = () => (locale = locale === 'en' ? 'it' : 'en');