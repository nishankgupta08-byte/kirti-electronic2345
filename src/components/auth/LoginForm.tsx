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
        <label className="font-mono text-[10px] font-bold text-kirti-muted uppercase tracking-wider mb-1.5 block">
          // Email Identifier
        </label>
        <div className="relative">
          <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kirti-muted" />
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="retailer@domain.com"
            className={`w-full pl-9 pr-4 py-3.5 bg-kirti-surface border rounded-sm font-sans text-xs text-kirti-cobalt placeholder:text-kirti-muted outline-none transition-all duration-200 focus:border-kirti-orange focus:ring-1 focus:ring-kirti-orange/20 ${errors.email ? 'border-kirti-rose' : 'border-kirti-border'}`}
          />
        </div>
        {errors.email && <p className="font-mono text-[10px] text-kirti-rose mt-1 ml-1">{errors.email}</p>}
      </div>

      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="font-mono text-[10px] font-bold text-kirti-muted uppercase tracking-wider block">// Password Key</label>
          <button onClick={handleForgotPassword} className="font-mono text-[10px] font-bold text-kirti-orange hover:text-kirti-orange-hover transition-colors">
            [Forgot key?]
          </button>
        </div>
        <div className="relative">
          <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kirti-muted" />
          <input
            type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className={`w-full pl-9 pr-12 py-3.5 bg-kirti-surface border rounded-sm font-sans text-xs text-kirti-cobalt placeholder:text-kirti-muted outline-none transition-all duration-200 focus:border-kirti-orange focus:ring-1 focus:ring-kirti-orange/20 ${errors.password ? 'border-kirti-rose' : 'border-kirti-border'}`}
          />
          <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-kirti-muted hover:text-kirti-cobalt">
            {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        </div>
        {errors.password && <p className="font-mono text-[10px] text-kirti-rose mt-1 ml-1">{errors.password}</p>}
      </div>

      <button onClick={handleLogin} disabled={loading}
        className="w-full bg-kirti-orange hover:bg-kirti-orange-hover disabled:bg-kirti-muted/20 disabled:text-kirti-muted disabled:cursor-not-allowed text-white font-mono text-xs font-bold tracking-wider uppercase py-3.5 rounded-sm mt-4 shadow-[2px_2px_0px_rgba(15,29,54,1)] active:translate-y-[1px] transition-all flex items-center justify-center gap-2"
      >
        {loading ? <><Loader2 size={14} className="animate-spin" /> ESTABLISHING LINK...</> : 'Authenticate →'}
      </button>

      <p className="font-mono text-[10px] text-kirti-muted text-center pt-2">
        Need credential access?{' '}
        <button onClick={onSwitchToSignup} className="text-kirti-orange font-bold hover:text-kirti-orange-hover">[Create node]</button>
      </p>
    </div>
  );
};

export default LoginForm;
