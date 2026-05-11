import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase/client';
import { User, Mail, Lock, Eye, EyeOff, Phone, Store, MapPin, Loader2, Hash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import GoogleAuthButton from './GoogleAuthButton';
import AuthDivider from './AuthDivider';

interface SignUpFormProps {
  redirect: string;
  onSwitchToLogin: () => void;
}

interface SignUpData {
  name: string; email: string; password: string; confirm: string;
  phone: string; shop_name: string; city: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ redirect, onSwitchToLogin }) => {
  const nav = useNavigate();
  const [form, setForm] = useState<SignUpData>({ name: '', email: '', password: '', confirm: '', phone: '', shop_name: '', city: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setField = (key: keyof SignUpData) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [key]: e.target.value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = 'Enter your full name';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(form.password)) e.password = e.password || 'Password must contain at least one uppercase letter';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter valid 10-digit mobile number';
    if (form.shop_name.trim().length < 2) e.shop_name = 'Enter your shop or company name';
    if (form.city.trim().length < 2) e.city = 'Enter your city';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: form.email, password: form.password,
      options: { data: { full_name: form.name, phone: form.phone } }
    });

    if (error) {
      setLoading(false);
      toast.error(error.message === 'User already registered' ? 'An account with this email already exists.' : error.message);
      return;
    }
    if (!data.user) { setLoading(false); toast.error('Signup failed.'); return; }

    const { error: profileError } = await supabase.from('retailers').insert({
      id: data.user.id, name: form.name, email: form.email, phone: form.phone,
      shop_name: form.shop_name, city: form.city, is_approved: true, login_method: 'email',
    });

    if (profileError) {
      setLoading(false);
      toast.error('Profile creation failed.');
      console.error(profileError);
      return;
    }

    toast.success(`Welcome, ${form.name.split(' ')[0]}! 🎉`);
    nav(redirect);
  };

  const fields = [
    { k: 'name' as const, l: 'Full Name', t: 'text', i: User, p: 'Your full name' },
    { k: 'email' as const, l: 'Email Address', t: 'email', i: Mail, p: 'you@example.com' },
    { k: 'phone' as const, l: 'Phone Number', t: 'tel', i: Phone, p: '9876543210' },
    { k: 'shop_name' as const, l: 'Shop / Company', t: 'text', i: Store, p: 'Your business name' },
    { k: 'city' as const, l: 'City', t: 'text', i: MapPin, p: 'Mumbai, Delhi...' },
  ];

  return (
    <div className="space-y-3">
      <GoogleAuthButton redirect={redirect} mode="signup" />
      <AuthDivider text="or sign up with email" />
      {fields.map(({ k, l, t, i: Icon, p }) => (
        <div key={k}>
          <label className="font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5 block">{l} *</label>
          <div className="relative">
            <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input type={t} value={form[k]} onChange={setField(k)} placeholder={p}
              className={`w-full pl-10 pr-4 py-3 bg-zinc-50 border rounded-xl font-body text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-100 ${errors[k] ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-500'}`}
            />
          </div>
          {errors[k] && <p className="font-body text-xs text-rose-500 mt-1 ml-1">{errors[k]}</p>}
        </div>
      ))}
      <div>
        <label className="font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5 block">Password *</label>
        <div className="relative">
          <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input type={showPass ? 'text' : 'password'} value={form.password} onChange={setField('password')} placeholder="Min 8 chars, 1 uppercase"
            className={`w-full pl-10 pr-12 py-3 bg-zinc-50 border rounded-xl font-body text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-100 ${errors.password ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-500'}`}
          />
          <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">{showPass ? <EyeOff size={15} /> : <Eye size={15} />}</button>
        </div>
        <div className="flex gap-1 mt-2">
          {[1,2,3,4].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${
            form.password.length === 0 ? 'bg-zinc-200' : form.password.length < 6 ? (i <= 1 ? 'bg-rose-400' : 'bg-zinc-200') : form.password.length < 8 ? (i <= 2 ? 'bg-amber-400' : 'bg-zinc-200') : !/[A-Z]/.test(form.password) ? (i <= 3 ? 'bg-amber-400' : 'bg-zinc-200') : 'bg-emerald-500'
          }`} />)} </div>
        {errors.password && <p className="font-body text-xs text-rose-500 mt-1 ml-1">{errors.password}</p>}
      </div>
      <div>
        <label className="font-body text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5 block">Confirm Password *</label>
        <div className="relative">
          <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={setField('confirm')} placeholder="Re-enter password"
            className={`w-full pl-10 pr-12 py-3 bg-zinc-50 border rounded-xl font-body text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-violet-100 ${errors.confirm ? 'border-rose-400' : 'border-zinc-200 focus:border-violet-500'}`}
          />
          <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">{showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}</button>
        </div>
        {form.confirm.length > 0 && <p className={`font-body text-xs mt-1 ml-1 ${form.password === form.confirm ? 'text-emerald-500' : 'text-rose-500'}`}>{form.password === form.confirm ? '✓ Passwords match' : '✗ Passwords do not match'}</p>}
        {errors.confirm && <p className="font-body text-xs text-rose-500 mt-1 ml-1">{errors.confirm}</p>}
      </div>
      <button onClick={handleSignUp} disabled={loading}
        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-body font-semibold text-sm py-3.5 rounded-xl mt-2 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)] active:scale-95 flex items-center justify-center gap-2"
      >
        {loading ? <><Loader2 size={16} className="animate-spin" /> Creating Account...</> : 'Create Account →'}
      </button>
      <p className="font-body text-xs text-zinc-400 text-center pt-1">
        Already have an account? <button onClick={onSwitchToLogin} className="text-violet-600 font-semibold hover:text-violet-700">Sign in</button>
      </p>
    </div>
  );
};

export default SignUpForm;
