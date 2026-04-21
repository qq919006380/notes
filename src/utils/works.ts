import type { CollectionEntry } from 'astro:content';

export type WorkEntry = CollectionEntry<'works'>;

const SITE_HOST = 'weibaichao.com';

export function buildDemoUrl(work: WorkEntry['data']): string {
  const sep = work.demo.includes('?') ? '&' : '?';
  const params = `utm_source=${SITE_HOST}&utm_medium=portfolio&utm_campaign=works_${work.slug}`;
  return `${work.demo}${sep}${params}`;
}

export function sortWorks(entries: WorkEntry[]): WorkEntry[] {
  return [...entries]
    .filter((e) => !e.data.draft)
    .sort((a, b) => {
      if (b.data.sortOrder !== a.data.sortOrder) {
        return b.data.sortOrder - a.data.sortOrder;
      }
      return a.data.title.localeCompare(b.data.title);
    });
}
