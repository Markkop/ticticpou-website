import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6', 
  lg: 'h-8 w-8',
};

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div 
          className={cn(
            'animate-spin rounded-full border-2 border-muted border-t-primary',
            sizeClasses[size],
            className
          )}
        />
        {text && (
          <p className="text-sm text-muted-foreground">{text}</p>
        )}
      </div>
    </div>
  );
}

export function LoadingCard({ text = 'Carregando...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center h-64 w-full">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}