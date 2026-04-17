const CATEGORY_COLORS: Record<string, string> = {
  '随笔': '#f59e0b',
  '学习笔记': '#6366f1',
  '其他': '#64748b',
  'web3': '#10b981',
  '个人博客': '#ec4899',
  '作品': '#a855f7',
  '技术分享': '#0ea5e9',
  '年终总结': '#d946ef',
  '发布一个node插件': '#f97316',
  '工具': '#14b8a6',
  '生活': '#ef4444',
};

const FALLBACK_PALETTE = [
  '#f59e0b',
  '#6366f1',
  '#10b981',
  '#ec4899',
  '#0ea5e9',
  '#a855f7',
  '#14b8a6',
  '#ef4444',
  '#d946ef',
  '#f97316',
];

export function getCategoryColor(name: string): string {
  if (CATEGORY_COLORS[name]) return CATEGORY_COLORS[name];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  }
  return FALLBACK_PALETTE[Math.abs(hash) % FALLBACK_PALETTE.length];
}
