import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.coerce.string(),
  slug: z.coerce.string(),
  date: z.coerce.date(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.coerce.string()).default([]),
  description: z.string().optional(),
  titleTag: z.string().optional(),
  author: z.object({
    name: z.string(),
    link: z.string().url().optional(),
  }).default({ name: '夏天夏', link: 'https://github.com/qq919006380' }),
  sidebar: z.union([z.literal('auto'), z.boolean()]).optional(),
  article: z.boolean().default(true),
  draft: z.boolean().default(false),
  sortOrder: z.number().default(0),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: articleSchema,
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: articleSchema,
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: articleSchema,
});

const works = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
  schema: articleSchema,
});

export const collections = { blog, notes, posts, works };
