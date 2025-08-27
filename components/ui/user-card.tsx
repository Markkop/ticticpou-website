import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EloDisplay } from '@/components/ui/elo-display';
import { ChevronRight, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserCardProps {
  user: {
    id?: string;
    publicId?: string;
    displayName: string;
    avatarUrl?: string | null;
    elo?: number;
    wins?: number;
    losses?: number;
    totalMatches?: number;
    isAmbassador?: boolean;
  };
  rank?: number;
  showStats?: boolean;
  showElo?: boolean;
  showRank?: boolean;
  isClickable?: boolean;
  compact?: boolean;
  className?: string;
  children?: React.ReactNode;
}

function getRankMedal(rank: number): string {
  switch (rank) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '';
  }
}

export function UserCard({
  user,
  rank,
  showStats = false,
  showElo = false,
  showRank = false,
  isClickable = true,
  compact = false,
  className,
  children
}: UserCardProps) {
  const content = (
    <Card className={cn(
      'transition-shadow',
      isClickable && 'hover:shadow-md cursor-pointer',
      className
    )}>
      <CardContent className={cn(compact ? 'p-2 sm:p-3' : 'p-4')}>
        {/* Mobile Layout */}
        {compact && (
          <div className="sm:hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {/* Rank Display */}
                {showRank && rank && (
                  <div className="text-lg font-bold text-muted-foreground min-w-[28px] text-center flex-shrink-0">
                    {getRankMedal(rank) || `#${rank}`}
                  </div>
                )}
                
                {/* Avatar */}
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={user.avatarUrl || undefined} alt={user.displayName} />
                  <AvatarFallback className="text-xs">{user.displayName[0]?.toUpperCase()}</AvatarFallback>
                </Avatar>
                
                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-foreground text-sm truncate">{user.displayName}</span>
                    {user.isAmbassador && (
                      <Crown className="h-3 w-3 text-primary flex-shrink-0" />
                    )}
                  </div>
                  {showStats && user.totalMatches !== undefined && (
                    <div className="text-xs text-muted-foreground">
                      {user.totalMatches} partidas
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right Side Content */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {showElo && user.elo && (
                  <EloDisplay elo={user.elo} size="xs" />
                )}
                {children}
                {isClickable && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        <div className={cn(compact ? 'hidden sm:flex' : 'flex', 'items-center justify-between')}>
          <div className="flex items-center gap-4">
            {/* Rank Display */}
            {showRank && rank && (
              <div className={cn(
                'font-bold text-muted-foreground text-center',
                compact ? 'text-xl w-10' : 'text-2xl w-12'
              )}>
                {getRankMedal(rank) || `#${rank}`}
              </div>
            )}
            
            {/* Avatar */}
            <Avatar className={cn(
              showRank ? (compact ? 'h-8 w-8' : 'h-10 w-10') : (compact ? 'h-10 w-10' : 'h-12 w-12')
            )}>
              <AvatarImage src={user.avatarUrl || undefined} alt={user.displayName} />
              <AvatarFallback className={compact ? 'text-xs' : ''}>{user.displayName[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            
            {/* User Info */}
            <div>
              <div className="flex items-center gap-2">
                <span className={cn(
                  'font-semibold text-foreground',
                  compact ? 'text-sm' : ''
                )}>{user.displayName}</span>
                {user.isAmbassador && (
                  <Crown className={cn('text-primary', compact ? 'h-3 w-3' : 'h-4 w-4')} />
                )}
              </div>
              {showStats && user.totalMatches !== undefined && (
                <div className={cn('text-muted-foreground', compact ? 'text-xs' : 'text-sm')}>
                  {user.totalMatches} partidas
                </div>
              )}
            </div>
          </div>
          
          {/* Right Side Content */}
          <div className="flex items-center gap-4">
            {showElo && user.elo && (
              <EloDisplay elo={user.elo} size={compact ? 'xs' : 'sm'} />
            )}
            {children}
            {isClickable && <ChevronRight className={cn('text-muted-foreground', compact ? 'h-4 w-4' : 'h-5 w-5')} />}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (isClickable && user.publicId) {
    return <Link href={`/profile/${user.publicId}`}>{content}</Link>;
  }

  return content;
}