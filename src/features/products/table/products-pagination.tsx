import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPageItems } from '@/lib/pagination';
import { cn } from '@/lib/utils';
import { formatProductCount } from '../domain/format';

type ProductsPaginationProps = {
  page: number;
  pageCount: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export function ProductsPagination({ page, pageCount, totalItems, onPageChange }: ProductsPaginationProps) {
  const items = getPageItems(page, pageCount);
  const hasManyPages = items.length > 3;

  return (
    <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
      <p className="text-xs text-muted-foreground">
        Strona {page} z {pageCount} · {formatProductCount(totalItems)}
      </p>
      <nav aria-label="Paginacja" className="flex flex-wrap items-center justify-center gap-1">
        <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          <ChevronLeft />
          <span className={cn(hasManyPages && 'max-sm:sr-only')}>Wstecz</span>
        </Button>
        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden
              className="flex size-8 items-center justify-center text-muted-foreground"
            >
              <MoreHorizontal className="size-4" />
            </span>
          ) : (
            <Button
              key={item}
              variant={item === page ? 'default' : 'ghost'}
              size="icon"
              className="size-8 rounded-md"
              aria-current={item === page ? 'page' : undefined}
              onClick={() => onPageChange(item)}
            >
              {item}
            </Button>
          ),
        )}
        <Button variant="ghost" size="sm" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>
          <span className={cn(hasManyPages && 'max-sm:sr-only')}>Dalej</span>
          <ChevronRight />
        </Button>
      </nav>
    </div>
  );
}
