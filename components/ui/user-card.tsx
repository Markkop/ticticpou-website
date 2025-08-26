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
    isAmbassador?: boolean;
  };
  rank?: number;
  showStats?: boolean;
  showElo?: boolean;
  showRank?: boolean;
  isClickable?: boolean;
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
  className,
  children
}: UserCardProps) {
  const content = (
    <Card className={cn(
      'transition-shadow',
      isClickable && 'hover:shadow-md cursor-pointer',
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Rank Display */}
            {showRank && rank && (
              <div className="text-2xl font-bold text-muted-foreground w-12 text-center">
                {getRankMedal(rank) || `#${rank}`}
              </div>
            )}
            
            {/* Avatar */}
            <Avatar className={cn(showRank ? 'h-10 w-10' : 'h-12 w-12')}>
              <AvatarImage src={user.avatarUrl || undefined} alt={user.displayName} />
              <AvatarFallback>{user.displayName[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            
            {/* User Info */}
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{user.displayName}</span>
                {user.isAmbassador && (
                  <Crown className="h-4 w-4 text-primary" />
                )}
              </div>
              {showStats && user.wins !== undefined && user.losses !== undefined && (
                <div className="text-sm text-muted-foreground">
                  {user.wins}V / {user.losses}D
                  {user.wins + user.losses > 0 && (
                    <span> • {((user.wins / (user.wins + user.losses)) * 100).toFixed(1)}% WR</span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Side Content */}
          <div className="flex items-center gap-4">
            {showElo && user.elo && (
              <EloDisplay elo={user.elo} size="sm" />
            )}
            {children}
            {isClickable && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
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