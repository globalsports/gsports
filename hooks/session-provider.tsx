"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

type SessionContextType = {
  session: Session | null;
  isLoading: boolean;
  getUserDisplayName: () => string;
  getInitials: () => string;
  handleSignOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Initial loading delay simulation (you might want to remove this in production)
    setTimeout(() => setIsLoading(false), 2000);

    // Set up Supabase auth state listener
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Cleanup subscription
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const getUserDisplayName = () => {
    if (!session?.user) return '';
    return session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'User';
  };

  const getInitials = () => {
    const displayName = getUserDisplayName();
    return displayName
      .split(' ')
      .map((name: string) => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setSession(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    session,
    isLoading,
    getUserDisplayName,
    getInitials,
    handleSignOut,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}