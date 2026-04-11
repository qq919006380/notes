import { getCollection } from 'astro:content';

/**
 * Count words in markdown content.
 * Returns [chineseCount, englishCount]
 */
export function countWords(content: string): [number, number] {
  const cn = (content.match(/[\u4E00-\u9FA5]/g) || []).length;
  const en = (
    content
      .replace(/[\u4E00-\u9FA5]/g, '')
      .match(
        /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|[\u00E4\u00C4\u00E5\u00C5\u00F6\u00D6]+|\w+/g
      ) || []
  ).length;
  return [cn, en];
}

/**
 * Calculate estimated reading time in minutes.
 */
export function readingTime(content: string, cnPerMin = 300, enPerMin = 160): string {
  const [cn, en] = countWords(content);
  const minutes = cn / cnPerMin + en / enPerMin;

  if (minutes > 1440) {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes - days * 1440) / 60);
    return hours > 0 ? `${days}d${hours}h` : `${days}d`;
  }
  if (minutes > 60) {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes - hours * 60);
    return mins > 0 ? `${hours}h${mins}m` : `${hours}h`;
  }
  return minutes < 1 ? '1m' : `${Math.round(minutes * 10) / 10}m`;
}

/**
 * Format word count for display.
 */
export function formatWordCount(content: string): string {
  const [cn, en] = countWords(content);
  const total = cn + en;
  return total >= 1000 ? `${Math.round(total / 100) / 10}k` : `${total}`;
}

/**
 * Extract excerpt from content using <!-- more --> separator.
 */
export function extractExcerpt(content: string, maxLength = 200): string {
  const moreIndex = content.indexOf('<!-- more -->');
  if (moreIndex > -1) {
    return content
      .slice(0, moreIndex)
      .replace(/^---[\s\S]*?---/, '')
      .replace(/[#*`>\-\[\]()!]/g, '')
      .trim();
  }
  const body = content
    .replace(/^---[\s\S]*?---/, '')
    .replace(/[#*`>\-\[\]()!]/g, '')
    .trim();
  return body.length > maxLength ? body.slice(0, maxLength) + '...' : body;
}

/**
 * Get all unique categories from a collection of articles.
 */
export function getAllCategories(articles: { data: { categories: string[] } }[]): Map<string, number> {
  const categories = new Map<string, number>();
  for (const article of articles) {
    for (const cat of article.data.categories) {
      categories.set(cat, (categories.get(cat) || 0) + 1);
    }
  }
  return categories;
}

/**
 * Get all unique tags from a collection of articles.
 */
export function getAllTags(articles: { data: { tags: string[] } }[]): Map<string, number> {
  const tags = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.data.tags) {
      tags.set(tag, (tags.get(tag) || 0) + 1);
    }
  }
  return tags;
}

/**
 * Fetch all publishable articles from blog, notes, posts collections.
 * Filtered (no drafts, article !== false) and sorted by date descending.
 */
export async function getAllArticles() {
  const [blog, notes, posts] = await Promise.all([
    getCollection('blog'),
    getCollection('notes'),
    getCollection('posts'),
  ]);
  return [...blog, ...notes, ...posts]
    .filter(a => a.data.article !== false && !a.data.draft)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
}
