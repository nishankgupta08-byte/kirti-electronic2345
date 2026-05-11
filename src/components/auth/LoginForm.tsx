import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { supabase } from '../../lib/supabase/client';
import GoogleAuthButton from './GoogleAuthButton';
import AuthDivider from './AuthDivider';

interface LoginFormProps {
  redirect: string;
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirect, onSwitchToSignup }) => {
  const { refreshUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address';
    if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);
      const msg = {
        'Invalid login credentials': 'Incorrect email or password.',
        'Email not confirmed': 'Please verify your email first.',
        'Too many requests': 'Too many attempts. Try again later.',
      }[error.message] ?? error.message;
      toast.error(msg);
      return;
    }

    await refreshUser();
    toast.success('Welcome back!');
    window.location.href = redirect;
  };

  const handleForgotPassword = async () => {
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Enter your email above first.');
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });
    if (error) { toast.error(error.message); return; }
    toast.success('Password reset link sent! Check your inbox.');
  };

  return (
    <div className="space-y-4">
      <GoogleAuthButton redirect={redirect} mode="login" />
      <AuthDivider />
      <div>
        <label className="font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5 block">
          Email Address
        </label>
        <div className="relative">
          <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={`w-full pl-10 pr-4 py-3.5 bg-zinc-50 border rounded-xl font-body text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-100 ${errors.email ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-500'}`}
          />
        </div>
        {errors.email && <p className="font-body text-xs text-rose-500 mt-1 ml-1">{errors.email}</p>}
      </div>
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide">Password</label>
          <button onClick={handleForgotPassword} className="font-body text-xs text-violet-600 hover:text-violet-700 transition-colors">
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full pl-10 pr-12 py-3.5 bg-zinc-50 border rounded-xl font-body text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-100 ${errors.password ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-500'}`}
          />
          <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {errors.password && <p className="font-body text-xs text-rose-500 mt-1 ml-1">{errors.password}</p>}
      </div>
      <button onClick={handleLogin} disabled={loading}
        className="w-full bg-violet-600 hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold text-sm py-3.5 rounded-xl mt-2 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)] active:scale-95 flex items-center justify-center gap-2"
      >
        {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : 'Sign In →'}
      </button>
      <p className="font-body text-xs text-zinc-400 text-center pt-1">
        Don't have an account?{' '}
        <button onClick={onSwitchToSignup} className="text-violet-600 font-semibold hover:text-violet-700">Create one</button>
      </p>
    </div>
  );
};

export default LoginForm;
