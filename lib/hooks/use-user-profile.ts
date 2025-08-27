import { useState, useEffect } from 'react';
import { useUser } from '@stackframe/stack';

interface UserProfile {
  displayName: string;
  avatarUrl: string | null;
  publicId: string;
}

export function useUserProfile() {
  const user = useUser();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    setLoading(true);
    fetch('/api/user/me')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setProfile(data);
        }
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return { profile, loading, stackUser: user };
}
