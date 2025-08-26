'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface Match {
  id: string;
  gameMode: string;
  location: string;
  playedAt: string;
  createdAt: string;
  ambassador: {
    username: string;
    email: string;
  };
  participantCount: number;
}

export function MatchesClient() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await fetch('/api/admin/matches');
      if (response.ok) {
        const data = await response.json();
        setMatches(data);
      }
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMatch = async (matchId: string) => {
    if (!confirm('Are you sure you want to delete this match? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/matches/${matchId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMatches(matches.filter(match => match.id !== matchId));
      }
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  if (loading) {
    return <div>Loading matches...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Match Management</h1>
          <p className="text-gray-600">Create, edit, and manage matches</p>
        </div>
        <Link href="/admin/matches/new">
          <Button>Create New Match</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Match Details</TableHead>
              <TableHead>Ambassador</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No matches found. Create your first match to get started.
                </TableCell>
              </TableRow>
            ) : (
              matches.map((match) => (
                <TableRow key={match.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{match.gameMode}</div>
                      <div className="text-sm text-gray-500">
                        {match.location && `${match.location} • `}
                        {new Date(match.playedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{match.ambassador.username}</div>
                      <div className="text-sm text-gray-500">{match.ambassador.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {match.participantCount} players
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {new Date(match.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/admin/matches/${match.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteMatch(match.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}