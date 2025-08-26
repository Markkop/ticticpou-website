'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface User {
  id: string;
  displayName: string;
  email: string;
}

interface GameMode {
  name: string;
}

interface Class {
  name: string;
}

interface Participant {
  userId: string;
  className: string;
  placement: number;
  isWinner: boolean;
}

export function NewMatchForm() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [gameModes, setGameModes] = useState<GameMode[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    gameMode: '',
    location: '',
    playedAt: new Date().toISOString().split('T')[0],
  });
  
  const [participants, setParticipants] = useState<Participant[]>([
    { userId: '', className: '', placement: 1, isWinner: true },
    { userId: '', className: '', placement: 2, isWinner: false },
    { userId: '', className: '', placement: 3, isWinner: false },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, gameModesRes, classesRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/game-modes'),
        fetch('/api/classes'),
      ]);

      if (usersRes.ok) setUsers(await usersRes.json());
      if (gameModesRes.ok) setGameModes(await gameModesRes.json());
      if (classesRes.ok) setClasses(await classesRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { 
        userId: '', 
        className: '', 
        placement: participants.length + 1, 
        isWinner: false 
      },
    ]);
  };

  const removeParticipant = (index: number) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    // Recalculate placements
    setParticipants(
      newParticipants.map((p, i) => ({ ...p, placement: i + 1 }))
    );
  };

  const updateParticipant = (index: number, field: keyof Participant, value: string | number | boolean) => {
    const newParticipants = [...participants];
    newParticipants[index] = { ...newParticipants[index], [field]: value };
    
    // If updating isWinner to true, set others to false
    if (field === 'isWinner' && value === true) {
      newParticipants.forEach((p, i) => {
        if (i !== index) p.isWinner = false;
      });
    }
    
    setParticipants(newParticipants);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.gameMode || !formData.playedAt) {
      alert('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (participants.length < 2) {
      alert('At least 2 participants are required');
      setLoading(false);
      return;
    }

    const invalidParticipants = participants.some(p => !p.userId || !p.className);
    if (invalidParticipants) {
      alert('Please complete all participant information');
      setLoading(false);
      return;
    }

    const hasWinner = participants.some(p => p.isWinner);
    if (!hasWinner) {
      alert('Please select a winner');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/admin/matches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          participants,
        }),
      });

      if (response.ok) {
        router.push('/admin/matches');
      } else {
        const error = await response.text();
        alert(`Error creating match: ${error}`);
      }
    } catch (error) {
      console.error('Error creating match:', error);
      alert('Error creating match');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Match Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="gameMode">Game Mode *</Label>
            <Select
              value={formData.gameMode}
              onValueChange={(value) => setFormData({ ...formData, gameMode: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select game mode" />
              </SelectTrigger>
              <SelectContent>
                {gameModes.map((mode) => (
                  <SelectItem key={mode.name} value={mode.name}>
                    {mode.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Where was this match played?"
            />
          </div>

          <div>
            <Label htmlFor="playedAt">Date Played *</Label>
            <Input
              id="playedAt"
              type="date"
              value={formData.playedAt}
              onChange={(e) => setFormData({ ...formData, playedAt: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Participants</CardTitle>
            <Button type="button" variant="outline" onClick={addParticipant}>
              Add Participant
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {participants.map((participant, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 border rounded">
              <div className="flex-1">
                <Label>Player</Label>
                <Select
                  value={participant.userId}
                  onValueChange={(value) => updateParticipant(index, 'userId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select player" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <Label>Class</Label>
                <Select
                  value={participant.className}
                  onValueChange={(value) => updateParticipant(index, 'className', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls.name} value={cls.name}>
                        {cls.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Winner</Label>
                <div className="mt-2">
                  <input
                    type="checkbox"
                    checked={participant.isWinner}
                    onChange={(e) => updateParticipant(index, 'isWinner', e.target.checked)}
                  />
                </div>
              </div>

              {participants.length > 2 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeParticipant(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Match'}
        </Button>
      </div>
    </form>
  );
}