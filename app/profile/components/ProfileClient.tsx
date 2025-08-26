'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Heart, Gamepad2, Trophy, QrCode } from 'lucide-react';
import { UserButton } from '@stackframe/stack';
import type { User as DbUser, Class, GameMode } from '@/lib/db';
import QRCodeModal from './QRCodeModal';

interface SafeUser {
  publicId: string;
  displayName: string;
  avatarUrl?: string | null;
}

interface ProfileClientProps {
  user: SafeUser;
  userProfile: DbUser;
  classes: Class[];
  gameModes: GameMode[];
  userRank: number;
  totalMatches: number;
  ttpYears: number;
  isOwnProfile: boolean;
}

export default function ProfileClient({ user, userProfile, classes, gameModes, userRank, totalMatches, ttpYears, isOwnProfile }: ProfileClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user.displayName || '',
    avatarUrl: user.avatarUrl || '',
    favoriteClass: userProfile.favoriteClass || '',
    favoriteGameMode: userProfile.favoriteGameMode || ''
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          publicId: user.publicId,
          displayName: formData.displayName || null,
          avatarUrl: formData.avatarUrl || null,
          favoriteClass: formData.favoriteClass || null,
          favoriteGameMode: formData.favoriteGameMode || null,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setIsEditing(false);
        window.location.reload();
      } else {
        throw new Error(data.error || 'Erro ao atualizar perfil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: user.displayName || '',
      avatarUrl: user.avatarUrl || '',
      favoriteClass: userProfile.favoriteClass || '',
      favoriteGameMode: userProfile.favoriteGameMode || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
          {/* Mobile Layout */}
          <div className="sm:hidden">
            <div className="flex items-start gap-3 mb-4">
              {/* Avatar */}
              {user.avatarUrl ? (
                <Image 
                  src={user.avatarUrl} 
                  alt={user.displayName || 'User avatar'}
                  width={60}
                  height={60}
                  className="w-15 h-15 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-15 h-15 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0">
                  {user.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              
              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="mb-1">
                  <span className="text-muted-foreground text-xs">RANK #{userRank}</span>
                  <h1 className="text-lg font-bold text-foreground truncate">
                    {user.displayName}
                  </h1>
                </div>
                <p className="text-muted-foreground text-xs truncate">ID: {user.publicId}</p>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowQRModal(true)}
                  className="p-2"
                >
                  <QrCode className="w-4 h-4" />
                </Button>
                {isOwnProfile && (
                  <UserButton />
                )}
              </div>
            </div>
            
            {/* Mobile Stats Cards */}
            <div className="grid grid-cols-2 gap-2">
              <Card className="bg-chart-1/10 border-chart-1/20">
                <CardContent className="p-2 text-center">
                  <div className="text-lg font-bold text-chart-1">#{userRank}</div>
                  <div className="text-xs text-muted-foreground">RANK</div>
                </CardContent>
              </Card>
              <Card className="bg-chart-2/10 border-chart-2/20">
                <CardContent className="p-2 text-center">
                  <div className="text-lg font-bold text-chart-2">{totalMatches}</div>
                  <div className="text-xs text-muted-foreground">MATCHES</div>
                </CardContent>
              </Card>
              <Card className="bg-chart-3/10 border-chart-3/20">
                <CardContent className="p-2 text-center">
                  <div className="text-lg font-bold text-chart-3">{userProfile.wins}</div>
                  <div className="text-xs text-muted-foreground">WINS</div>
                </CardContent>
              </Card>
              <Card className="bg-chart-4/10 border-chart-4/20">
                <CardContent className="p-2 text-center">
                  <div className="text-lg font-bold text-chart-4">{ttpYears}</div>
                  <div className="text-xs text-muted-foreground">TTP YEARS</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:block">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              {user.avatarUrl ? (
                <Image 
                  src={user.avatarUrl} 
                  alt={user.displayName || 'User avatar'}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                  {user.displayName?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              
              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-muted-foreground text-sm">RANK #{userRank}</span>
                  <h1 className="text-2xl font-bold text-foreground">
                    {user.displayName}
                  </h1>
                </div>
                <p className="text-muted-foreground">ID: {user.publicId}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4">
                {/* QR Code Button - always visible */}
                <Button
                  variant="outline"
                  onClick={() => setShowQRModal(true)}
                  className="flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  Código QR
                </Button>
                
                {/* Auth Stack Button - only show for own profile */}
                {isOwnProfile && (
                  <UserButton />
                )}
              </div>
            </div>

            {/* Desktop Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <Card className="bg-chart-1/10 border-chart-1/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-chart-1 mb-1">#{userRank}</div>
                  <div className="text-sm text-muted-foreground">RANKING</div>
                </CardContent>
              </Card>
              
              <Card className="bg-chart-2/10 border-chart-2/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-chart-2 mb-1">{totalMatches}</div>
                  <div className="text-sm text-muted-foreground">TOTAL MATCHES</div>
                </CardContent>
              </Card>
              
              <Card className="bg-chart-3/10 border-chart-3/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-chart-3 mb-1">{userProfile.wins}</div>
                  <div className="text-sm text-muted-foreground">WINS</div>
                </CardContent>
              </Card>
              
              <Card className="bg-chart-4/10 border-chart-4/20">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-chart-4 mb-1">{ttpYears}</div>
                  <div className="text-sm text-muted-foreground">TTP YEARS</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        userData={{
          userId: userProfile.publicId,
          displayName: userProfile.displayName,
          avatarUrl: user.avatarUrl || undefined,
        }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4 sm:mb-8 grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="text-sm">Profile</TabsTrigger>
            <TabsTrigger value="matches" className="text-sm">Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 sm:space-y-6">
            {/* Game Preferences */}
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  Game Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Display Name */}
                <div>
                  <Label className="flex items-center gap-2 mb-2 text-sm">
                    <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    Display Name
                  </Label>
                  {isEditing ? (
                    <Input
                      value={formData.displayName}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        displayName: e.target.value
                      }))}
                      placeholder="Enter your display name"
                      className="text-sm"
                    />
                  ) : (
                    <div className="p-2 sm:p-3 bg-muted rounded-md text-sm">
                      {user.displayName}
                    </div>
                  )}
                </div>

                {/* Avatar URL */}
                <div>
                  <Label className="mb-2 block text-sm">Avatar URL</Label>
                  {isEditing ? (
                    <Input
                      value={formData.avatarUrl}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        avatarUrl: e.target.value
                      }))}
                      placeholder="Enter avatar URL (optional)"
                      className="text-sm"
                    />
                  ) : (
                    <div className="p-2 sm:p-3 bg-muted rounded-md text-sm break-all">
                      {user.avatarUrl || (
                        <span className="text-muted-foreground italic">No avatar URL</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Mobile compact layout for preferences */}
                <div className="sm:hidden space-y-3">
                  {/* Favorite Class */}
                  <div>
                    <Label className="flex items-center gap-2 mb-2 text-sm">
                      <Heart className="w-3 h-3" />
                      Favorite Class
                    </Label>
                    {isEditing ? (
                      <Select 
                        value={formData.favoriteClass || 'none'} 
                        onValueChange={(value) => setFormData(prev => ({ 
                          ...prev, 
                          favoriteClass: value === 'none' ? '' : value
                        }))}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Choose favorite class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No preference</SelectItem>
                          {classes.map((cls) => (
                            <SelectItem key={cls.id} value={cls.name}>
                              {cls.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-muted rounded-md text-sm">
                        {userProfile.favoriteClass || 'No preference'}
                      </div>
                    )}
                  </div>

                  {/* Favorite Game Mode */}
                  <div>
                    <Label className="flex items-center gap-2 mb-2 text-sm">
                      <Gamepad2 className="w-3 h-3" />
                      Favorite Game Mode
                    </Label>
                    {isEditing ? (
                      <Select 
                        value={formData.favoriteGameMode || 'none'} 
                        onValueChange={(value) => setFormData(prev => ({ 
                          ...prev, 
                          favoriteGameMode: value === 'none' ? '' : value
                        }))}
                      >
                        <SelectTrigger className="text-sm">
                          <SelectValue placeholder="Choose favorite mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No preference</SelectItem>
                          {gameModes.map((mode) => (
                            <SelectItem key={mode.id} value={mode.name}>
                              {mode.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-2 bg-muted rounded-md text-sm">
                        {userProfile.favoriteGameMode || 'No preference'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Desktop layout for preferences */}
                <div className="hidden sm:block space-y-6">
                  {/* Favorite Class */}
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4" />
                      Favorite Class
                    </Label>
                    {isEditing ? (
                      <Select 
                        value={formData.favoriteClass || 'none'} 
                        onValueChange={(value) => setFormData(prev => ({ 
                          ...prev, 
                          favoriteClass: value === 'none' ? '' : value
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your favorite class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No preference</SelectItem>
                          {classes.map((cls) => (
                            <SelectItem key={cls.id} value={cls.name}>
                              {cls.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-3 bg-muted rounded-md">
                        {userProfile.favoriteClass || 'No preference'}
                      </div>
                    )}
                  </div>

                  {/* Favorite Game Mode */}
                  <div>
                    <Label className="flex items-center gap-2 mb-2">
                      <Gamepad2 className="w-4 h-4" />
                      Favorite Game Mode
                    </Label>
                    {isEditing ? (
                      <Select 
                        value={formData.favoriteGameMode || 'none'} 
                        onValueChange={(value) => setFormData(prev => ({ 
                          ...prev, 
                          favoriteGameMode: value === 'none' ? '' : value
                        }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your favorite mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No preference</SelectItem>
                          {gameModes.map((mode) => (
                            <SelectItem key={mode.id} value={mode.name}>
                              {mode.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="p-3 bg-muted rounded-md">
                        {userProfile.favoriteGameMode || 'No preference'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons - only show for own profile */}
                {isOwnProfile && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    {isEditing ? (
                      <>
                        <Button 
                          onClick={handleSave}
                          disabled={isLoading}
                          className="flex-1"
                          size="sm"
                        >
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={handleCancel}
                          disabled={isLoading}
                          size="sm"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} className="flex-1" size="sm">
                        Edit Preferences
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                  Match History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-6 sm:py-8 text-sm">
                  Match history feature coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}