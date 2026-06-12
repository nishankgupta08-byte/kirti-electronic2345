import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase/client';
import { toast } from 'react-hot-toast';

const GoogleLogo = () => (
  <svg width="14" height="14" viewBox="0 0 18 18" className="shrink-0">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
  </svg>
);

interface GoogleAuthButtonProps {
  redirect: string;
  mode?: 'login' | 'signup';
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ redirect, mode = 'login' }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}` },
    });
    if (error) { toast.error('Google login failed. Try again.'); setLoading(false); }
  };

  return (
    <button onClick={handleGoogle} disabled={loading}
      className="w-full flex items-center justify-center gap-3 bg-white hover:bg-kirti-offwhite border-2 border-kirti-cobalt text-kirti-cobalt font-mono text-xs font-bold uppercase tracking-wider py-3.5 rounded-sm transition-all duration-200 shadow-[2px_2px_0px_rgba(15,29,54,1)] active:translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? <Loader2 size={14} className="animate-spin text-kirti-muted" /> : <GoogleLogo />}
      {loading ? 'LINKING...' : mode === 'signup' ? 'Google Auth (New Node)' : 'Google Auth (Verify Node)'}
    </button>
  );
};

export default GoogleAuthButton;
