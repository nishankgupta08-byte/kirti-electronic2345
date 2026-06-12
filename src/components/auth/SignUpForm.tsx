import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase/client';
import { User, Mail, Lock, Eye, EyeOff, Phone, Store, MapPin, Loader2 } from 'lucide-react';
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
    { k: 'name' as const, l: 'Full Name', t: 'text', i: User, p: 'Full Name' },
    { k: 'email' as const, l: 'Email Address', t: 'email', i: Mail, p: 'you@domain.com' },
    { k: 'phone' as const, l: 'Phone Number', t: 'tel', i: Phone, p: 'Mobile number' },
    { k: 'shop_name' as const, l: 'Shop / Company', t: 'text', i: Store, p: 'Business Name' },
    { k: 'city' as const, l: 'City', t: 'text', i: MapPin, p: 'City Location' },
  ];

  return (
    <div className="space-y-3">
      <GoogleAuthButton redirect={redirect} mode="signup" />
      <AuthDivider text="or sign up with email" />
      
      {fields.map(({ k, l, t, i: Icon, p }) => (
        <div key={k}>
          <label className="font-mono text-[10px] font-bold text-kirti-muted uppercase tracking-wider mb-1 block">// {l} *</label>
          <div className="relative">
            <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kirti-muted" />
            <input type={t} value={form[k]} onChange={setField(k)} placeholder={p}
              className={`w-full pl-9 pr-4 py-2.5 bg-kirti-surface border rounded-sm font-sans text-xs text-kirti-cobalt placeholder:text-kirti-muted outline-none transition-all duration-200 focus:border-kirti-orange focus:ring-1 focus:ring-kirti-orange/20 ${errors[k] ? 'border-kirti-rose' : 'border-kirti-border'}`}
            />
          </div>
          {errors[k] && <p className="font-mono text-[10px] text-kirti-rose mt-1 ml-1">{errors[k]}</p>}
        </div>
      ))}

      <div>
        <label className="font-mono text-[10px] font-bold text-kirti-muted uppercase tracking-wider mb-1 block">// Password *</label>
        <div className="relative">
          <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kirti-muted" />
          <input type={showPass ? 'text' : 'password'} value={form.password} onChange={setField('password')} placeholder="Min 8 chars, 1 uppercase"
            className={`w-full pl-9 pr-12 py-2.5 bg-kirti-surface border rounded-sm font-sans text-xs text-kirti-cobalt placeholder:text-kirti-muted outline-none transition-all duration-200 focus:border-kirti-orange focus:ring-1 focus:ring-kirti-orange/20 ${errors.password ? 'border-kirti-rose' : 'border-kirti-border'}`}
          />
          <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-kirti-muted hover:text-kirti-cobalt">{showPass ? <EyeOff size={14} /> : <Eye size={14} />}</button>
        </div>
        <div className="flex gap-1 mt-2">
          {[1,2,3,4].map(i => <div key={i} className={`h-1 flex-1 rounded-sm transition-all duration-300 ${
            form.password.length === 0 ? 'bg-kirti-border' : form.password.length < 6 ? (i <= 1 ? 'bg-kirti-rose' : 'bg-kirti-border') : form.password.length < 8 ? (i <= 2 ? 'bg-kirti-amber' : 'bg-kirti-border') : !/[A-Z]/.test(form.password) ? (i <= 3 ? 'bg-kirti-amber' : 'bg-kirti-border') : 'bg-kirti-emerald'
          }`} />)} </div>
        {errors.password && <p className="font-mono text-[10px] text-kirti-rose mt-1 ml-1">{errors.password}</p>}
      </div>

      <div>
        <label className="font-mono text-[10px] font-bold text-kirti-muted uppercase tracking-wider mb-1 block">// Confirm Password *</label>
        <div className="relative">
          <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-kirti-muted" />
          <input type={showConfirm ? 'text' : 'password'} value={form.confirm} onChange={setField('confirm')} placeholder="Re-enter password"
            className={`w-full pl-9 pr-12 py-2.5 bg-kirti-surface border rounded-sm font-sans text-xs text-kirti-cobalt placeholder:text-kirti-muted outline-none transition-all duration-200 focus:border-kirti-orange focus:ring-1 focus:ring-kirti-orange/20 ${errors.confirm ? 'border-kirti-rose' : 'border-kirti-border'}`}
          />
          <button onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-kirti-muted hover:text-kirti-cobalt">{showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}</button>
        </div>
        {form.confirm.length > 0 && <p className={`font-mono text-[10px] mt-1 ml-1 ${form.password === form.confirm ? 'text-kirti-emerald' : 'text-kirti-rose'}`}>{form.password === form.confirm ? '✓ Passwords match' : '✗ Passwords do not match'}</p>}
        {errors.confirm && <p className="font-mono text-[10px] text-kirti-rose mt-1 ml-1">{errors.confirm}</p>}
      </div>

      <button onClick={handleSignUp} disabled={loading}
        className="w-full bg-kirti-orange hover:bg-kirti-orange-hover disabled:bg-kirti-muted/20 disabled:text-kirti-muted disabled:cursor-not-allowed text-white font-mono text-xs font-bold tracking-wider uppercase py-3 mt-4 shadow-[2px_2px_0px_rgba(15,29,54,1)] active:translate-y-[1px] transition-all flex items-center justify-center gap-2"
      >
        {loading ? <><Loader2 size={14} className="animate-spin" /> CREATING NODE...</> : 'Initialize Account →'}
      </button>

      <p className="font-mono text-[10px] text-kirti-muted text-center pt-2">
        Already registered? <button onClick={onSwitchToLogin} className="text-kirti-orange font-bold hover:text-kirti-orange-hover">[Sign in]</button>
      </p>
    </div>
  );
};

export default SignUpForm;
