import { parseAsInteger, useQueryState } from 'nuqs';

export const PAGE_SIZE = 5;

const pageParser = parseAsInteger.withDefault(1).withOptions({ history: 'push' });

export function useProductsPagination(totalItems: number, pageSize = PAGE_SIZE) {
  const [requestedPage, setPage] = useQueryState('page', pageParser);
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(requestedPage, 1), pageCount);

  return { page, pageCount, pageSize, setPage };
}
