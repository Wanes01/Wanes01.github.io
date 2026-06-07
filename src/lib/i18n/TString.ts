import { getLocale, type Locale } from '$lib/i18n/locale.svelte';

export default class TString {
    // maps a language to its translation
    private translations = new Map<Locale, string>();

    // sets a new translation for the specified text
    // returns itself for fluent writing
    set(lang: Locale, text: string): TString {
        this.translations.set(lang, text);
        return this;
    }

    // translate method: get the translation for the current set language.
    // defaults to 'en' if the language is not registered and
    // throws an exeption if it cannot be found either
    toString(): string {
        const locale = getLocale();
        let translation = this.translations.get(locale);

        if (translation === undefined) {
            translation = this.translations.get('en');

            if (translation === undefined) {
                throw new Error(`No translation found for current locale "${locale}" and no fallback available for "en"`);
            }
        }

        return translation;
    }

    valueOf(): string {
        return this.toString();
    }
}

// helper to hide the new object creation
export function tString(): TString {
    return new TString();
}