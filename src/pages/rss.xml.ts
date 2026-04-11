import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const [blog, notes, posts] = await Promise.all([
    getCollection('blog'),
    getCollection('notes'),
    getCollection('posts'),
  ]);
  const articles = [...blog, ...notes, ...posts]
    .filter(a => a.data.article !== false && !a.data.draft)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: '夏天夏',
    description: 'web前端技术博客,专注web前端学习与总结。',
    site: context.site!,
    items: articles.map(article => ({
      title: article.data.title,
      pubDate: article.data.date,
      link: `/pages/${article.data.slug}/`,
    })),
  });
}
