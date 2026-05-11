import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase/client';
import { Loader2 } from 'lucide-react';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      // Check for code in URL (from OAuth redirect)
      const code = searchParams.get('code');
      const redirect = searchParams.get('redirect') || '/products';

      if (code) {
        // Exchange code for session
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error && data.user) {
          // Check if first-time Google login
          const { data: existing } = await supabase
            .from('retailers')
            .select('id')
            .eq('id', data.user.id)
            .single();

          if (!existing) {
            // First time login - create retailer profile
            await supabase.from('retailers').insert({
              id: data.user.id,
              name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'Retailer',
              email: data.user.email!,
              phone: data.user.user_metadata?.phone || '',
              shop_name: '',
              city: '',
              is_approved: true,
              login_method: 'google',
              photo_url: data.user.user_metadata?.avatar_url || null,
            });
          }
        }
      }

      // Also handle hash fragment (Supabase sends #access_token in some flows)
      const hash = window.location.hash;
      if (hash && hash.includes('access_token')) {
        // Supabase handles this automatically in onAuthStateChange
        // But we need to redirect after the session is set
        setTimeout(() => { navigate(redirect); }, 500);
        return;
      }

      // Redirect to intended destination or products
      navigate(redirect, { replace: true });
    };

    handleCallback();
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-10 h-10 text-violet-600 animate-spin mx-auto" />
        <p className="mt-4 font-body text-sm text-zinc-500">Verifying your account...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
