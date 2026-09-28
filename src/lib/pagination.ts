export type PageItem = number | 'ellipsis';

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => from + index);

export const getPageItems = (page: number, pageCount: number, siblings = 1): PageItem[] => {
  const edgeCount = siblings * 2 + 3;
  if (pageCount <= edgeCount + 2) return range(1, pageCount);

  const start = Math.max(page - siblings, 1);
  const end = Math.min(page + siblings, pageCount);

  if (start <= 3) return [...range(1, edgeCount), 'ellipsis', pageCount];
  if (end >= pageCount - 2) return [1, 'ellipsis', ...range(pageCount - edgeCount + 1, pageCount)];
  return [1, 'ellipsis', ...range(start, end), 'ellipsis', pageCount];
};
