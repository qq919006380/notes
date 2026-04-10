import { getCollection } from 'astro:content';

export interface SidebarItem {
  text: string;
  link: string;
  sortOrder: number;
  active?: boolean;
}

export interface SidebarGroup {
  text: string;
  sortOrder: number;
  items: SidebarItem[];
  collapsed: boolean;
}

/**
 * Build a sidebar tree from a content collection.
 *
 * Groups articles by the second-level category (categories[1]).
 * Falls back to categories[0] when only one level exists.
 * Within each group, articles are sorted by sortOrder ascending.
 * Groups themselves are sorted by the minimum sortOrder of their items.
 */
export async function buildSidebarTree(
  collectionName: 'blog' | 'notes' | 'posts',
  currentSlug?: string,
): Promise<SidebarGroup[]> {
  const articles = await getCollection(collectionName, (entry) => {
    return entry.data.article !== false && !entry.data.draft;
  });

  // Group by subcategory
  const groupMap = new Map<string, SidebarItem[]>();

  for (const article of articles) {
    const cats = article.data.categories;
    const groupName = cats[1] ?? cats[0] ?? '其他';
    const slug = article.data.slug;

    const item: SidebarItem = {
      text: article.data.title,
      link: `/pages/${slug}/`,
      sortOrder: article.data.sortOrder,
      active: currentSlug !== undefined && slug === currentSlug,
    };

    const existing = groupMap.get(groupName);
    if (existing) {
      existing.push(item);
    } else {
      groupMap.set(groupName, [item]);
    }
  }

  // Build groups sorted by minimum sortOrder, then by name
  const groups: SidebarGroup[] = [];

  for (const [name, items] of groupMap) {
    items.sort((a, b) => a.sortOrder - b.sortOrder);

    const hasActivePage = items.some((item) => item.active);
    const minOrder = Math.min(...items.map((i) => i.sortOrder));

    groups.push({
      text: name,
      sortOrder: minOrder,
      items,
      collapsed: !hasActivePage,
    });
  }

  groups.sort((a, b) => a.sortOrder - b.sortOrder || a.text.localeCompare(b.text));

  return groups;
}
