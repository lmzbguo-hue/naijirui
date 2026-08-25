// Central loader for CMS-editable content (products / faqs / cases).
// Files are edited via the Decap CMS admin (src/data/{products,faqs,cases}/items/*.json).
// This module normalizes the CMS-friendly file shape back to the rendering shape
// so page components stay unchanged.

const LANGS = ['en', 'zh', 'ar', 'fr'];

const productFiles = import.meta.glob('./products/items/*.json', { eager: true, import: 'default' }) as Record<string, any>;
const faqFiles = import.meta.glob('./faqs/items/*.json', { eager: true, import: 'default' }) as Record<string, any>;
const caseFiles = import.meta.glob('./cases/items/*.json', { eager: true, import: 'default' }) as Record<string, any>;

const pick = (obj: any, lang: string): string => (obj?.[lang] ?? obj?.en ?? '');

function normalizeProduct(p: any): any {
  return {
    ...p,
    intro: LANGS.reduce((acc: any, l) => {
      acc[l] = (p.intro?.[l] ?? '')
        .split(/\n{2,}/)
        .map((s: string) => s.trim())
        .filter(Boolean);
      return acc;
    }, {}),
    specs: LANGS.reduce((acc: any, l) => {
      acc[l] = (p.specs ?? []).map((s: any) => [
        pick(s.key, l) || pick(s.key, 'en'),
        pick(s.value, l) || pick(s.value, 'en'),
      ]);
      return acc;
    }, {}),
  };
}

export function getAllProducts(): any[] {
  return Object.values(productFiles).map(normalizeProduct);
}

export function getFaqs(): any[] {
  return Object.values(faqFiles);
}

export function getCases(): any[] {
  return Object.values(caseFiles);
}
