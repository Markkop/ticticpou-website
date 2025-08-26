import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const categoryBadgeVariants = cva(
  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
  {
    variants: {
      category: {
        base: 'bg-primary/20 text-primary',
        extra: 'bg-accent/20 text-accent-foreground', 
        team: 'bg-secondary/20 text-secondary-foreground',
        default: 'bg-muted/20 text-muted-foreground',
      },
    },
    defaultVariants: {
      category: 'default',
    },
  }
);

export interface CategoryBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof categoryBadgeVariants> {
  category: 'base' | 'extra' | 'team' | null | undefined;
}

const categoryLabels = {
  base: 'Base',
  extra: 'Extra', 
  team: 'Equipe',
} as const;

export function CategoryBadge({ category, className, ...props }: CategoryBadgeProps) {
  if (!category) return null;

  const validCategory = category in categoryLabels ? category : 'default';
  const label = validCategory !== 'default' ? categoryLabels[validCategory as keyof typeof categoryLabels] : category;

  return (
    <span 
      className={cn(categoryBadgeVariants({ category: validCategory as 'base' | 'extra' | 'team' | 'default' }), className)}
      {...props}
    >
      {label}
    </span>
  );
}