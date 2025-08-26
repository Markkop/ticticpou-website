import { cn, getEloColor, getEloRankName } from '@/lib/utils';

interface EloDisplayProps {
  elo: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-xl',
  lg: 'text-2xl',
};

export function EloDisplay({ elo, size = 'md', showLabel = false, className }: EloDisplayProps) {
  const colorClass = getEloColor(elo);
  const rank = getEloRankName(elo);

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className={cn('font-bold', sizeClasses[size], colorClass)}>
        {elo}
      </div>
      {showLabel && (
        <div className="text-xs text-muted-foreground">
          {rank}
        </div>
      )}
    </div>
  );
}