import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabase/client';

// Types
export type UserRole = 'retailer' | 'admin'

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
}

export interface RetailerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  shop_name: string;
  city: string;
  retailer_id: string;
  is_approved: boolean;
  login_method: string;
  photo_url: string | null;
  created_at: string;
}

interface AuthContextType {
  user: AuthUser | null;
  rawUser: User | null;
  session: Session | null;
  retailerData: RetailerData | null;
  isAdmin: boolean;
  isApproved: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  rawUser: null,
  session: null,
  retailerData: null,
  isAdmin: false,
  isApproved: false,
  loading: true,
  signOut: async () => {},
  refreshUser: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rawUser, setRawUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [retailerData, setRetailerData] = useState<RetailerData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auth user adapter
  const user: AuthUser | null = rawUser
    ? {
        uid: rawUser.id,
        email: rawUser.email,
        displayName: rawUser.user_metadata?.full_name || rawUser.email?.split('@')[0] || 'User',
        photoURL: rawUser.user_metadata?.avatar_url || null,
        role: isAdmin ? 'admin' : 'retailer',
      }
    : null;

  // Fetch profile (retailer + admin check)
  const fetchProfile = async (uid: string) => {
    if (!uid) return;
    try {
      // Check if admin first
      const { data: adminData } = await supabase
        .from('admins')
        .select('id')
        .eq('id', uid)
        .single();

      if (adminData) {
        setIsAdmin(true);
        setRetailerData(null);
        return;
      }

      // Fetch retailer profile
      const { data: retailerData } = await supabase
        .from('retailers')
        .select('*')
        .eq('id', uid)
        .single();

      if (retailerData) {
        setRetailerData(retailerData as RetailerData);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Initial session + listener
  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(session);
        setRawUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        }
      } catch (error) {
        console.warn('Auth session initialization error:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initSession();

    let subscription: { unsubscribe: () => void } | null = null;
    try {
      subscription = supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return;
        setSession(session);
        setRawUser(session?.user ?? null);
        setRetailerData(null);
        setIsAdmin(false);
        if (session?.user) {
          fetchProfile(session.user.id);
        }
      }).data.subscription;
    } catch (error) {
      console.warn('Auth state listener error:', error);
    }

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.warn('Sign out error:', error);
    }
    setRawUser(null);
    setSession(null);
    setRetailerData(null);
    setIsAdmin(false);
    toast.success('Signed out successfully');
  };

  const refreshUser = async () => {
    if (rawUser) await fetchProfile(rawUser.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        rawUser,
        session,
        retailerData,
        isAdmin,
        isApproved: retailerData?.is_approved || isAdmin || false,
        loading,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);