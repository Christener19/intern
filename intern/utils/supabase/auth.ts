// utils/auth.ts
import { useEffect, useState } from 'react';
import { supabase } from '@supabase/ssr';

export const useAuth = () => {
  const [user, setUser] = useState(supabase.auth.user());

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      // Cleanup the subscription when the component unmounts
      authListener?.unsubscribe();
    };
  }, []);

  return user;
};
