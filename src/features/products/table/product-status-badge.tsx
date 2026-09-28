import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function ProductStatusBadge({ isAvailable }: { isAvailable: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'rounded-full border-transparent px-2 py-0 font-normal',
        isAvailable ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600',
      )}
    >
      {isAvailable ? 'Dostępny' : 'Niedostępny'}
    </Badge>
  );
}
