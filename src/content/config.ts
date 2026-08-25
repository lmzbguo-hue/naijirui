import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    postKey: z.string(),
    lang: z.enum(['en', 'zh', 'ar', 'fr']),
    title: z.string(),
    seoTitle: z.string().optional(),
    seoDesc: z.string().optional(),
    date: z.union([z.string(), z.date()]).transform((d) => (typeof d === 'string' ? d : d.toISOString().slice(0, 10))),
    excerpt: z.string(),
  }),
});

export const collections = { blog };
