import dayjs from 'dayjs';

export function formatDate(date: Date | string, format = 'YYYY/MM/DD'): string {
  return dayjs(date).format(format);
}

export function formatDateTime(date: Date | string): string {
  return dayjs(date).format('YYYY/MM/DD, HH:mm:ss');
}

export function daysSince(startDate: string): number {
  const start = dayjs(startDate);
  const now = dayjs();
  return now.diff(start, 'day');
}

export function timeDiff(date: Date | string): string {
  const diff = Math.abs(dayjs().diff(dayjs(date), 'second'));
  if (diff === 0) return '刚刚';
  if (diff < 60) return `${diff} 秒`;
  if (diff < 3600) return `${Math.floor(diff / 60)} 分`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} 时`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} 天`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} 月`;
  return `${Math.floor(diff / 31536000)} 年`;
}
