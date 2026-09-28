import type { CSSProperties } from 'react';
import { CircleCheckIcon } from 'lucide-react';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const toasterStyle: CSSProperties & Record<`--${string}`, string> = {
  '--normal-bg': 'var(--popover)',
  '--normal-text': 'var(--popover-foreground)',
  '--normal-border': 'var(--border)',
};

const Toaster = (props: ToasterProps) => (
  <Sonner
    className="toaster group"
    icons={{ success: <CircleCheckIcon className="size-4 fill-green-600 text-white" /> }}
    toastOptions={{ classNames: { title: 'text-sm' } }}
    style={toasterStyle}
    {...props}
  />
);

export { Toaster };
