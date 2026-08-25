import ui from './data/ui.json';

export const locales = ['en', 'zh', 'ar', 'fr'] as const;
export type Lang = (typeof locales)[number];

/** Pick a language value from a { en, zh, ar, fr } object, falling back to en. */
export function t(obj: any, lang: string): string {
  if (obj == null) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] ?? obj.en ?? '';
}

/** Array picker for per-language arrays (highlights, features, applications...). */
export function ta(arr: any, lang: string): any[] {
  if (Array.isArray(arr)) return arr;
  if (arr && typeof arr === 'object') return arr[lang] ?? arr.en ?? [];
  return [];
}

/** UI strings for a locale. */
export function U(lang: string) {
  return (ui as any)[lang] ?? ui.en;
}

/** URL path with language prefix (en = no prefix). */
export function langPath(lang: string, path: string): string {
  if (path === '') path = '/';
  return lang === 'en' ? path : `/${lang}${path.startsWith('/') ? path : '/' + path}`;
}

/** dir attribute for a locale (Arabic = RTL). */
export function getDir(lang: string): 'ltr' | 'rtl' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

/** Full alternate URLs for hreflang (all locales). */
export function alternates(canonicalPath: string): { lang: string; url: string }[] {
  return locales.map((l) => ({ lang: l, url: 'https://naijirui.com' + langPath(l, canonicalPath) }));
}
