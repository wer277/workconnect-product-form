import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect } from 'react';

export const PAGE_SIZE = 5;

const pageParser = parseAsInteger.withDefault(1).withOptions({ history: 'push', scroll: true });

export function useProductsPagination(totalItems: number, pageSize = PAGE_SIZE) {
  const [requestedPage, setPage] = useQueryState('page', pageParser);
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(Math.max(requestedPage, 1), pageCount);

  useEffect(() => {
    if (requestedPage !== page) void setPage(page, { history: 'replace', scroll: false });
  }, [requestedPage, page, setPage]);

  return { page, pageCount, pageSize, setPage };
}
