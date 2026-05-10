import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const EmailLoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);

      const adminDoc = await getDoc(doc(db, 'admins', auth.currentUser!.uid));
      const isAdmin = adminDoc.exists();

      const retailerDoc = await getDoc(doc(db, 'retailers', auth.currentUser!.uid));
      const data = retailerDoc.data();

      if (!isAdmin && (!data || !data.isApproved)) {
        toast.error("Account not approved. Contact admin.");
        await signOut(auth);
        return;
      }

      toast.success(isAdmin ? "Admin signed in successfully!" : "Signed in successfully!");
      navigate(isAdmin ? '/admin' : '/products');
    } catch (error: any) {
      console.error(error);
      let message = "Login failed. Please try again.";
      if (error.code === 'auth/wrong-password') message = "Incorrect password.";
      if (error.code === 'auth/user-not-found') message = "No account found with this email.";
      if (error.code === 'auth/too-many-requests') message = "Too many attempts. Try again later.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent to your email!");
    } catch (error) {
      toast.error("Failed to send reset email.");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-5">
      <div className="space-y-2">
        <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-violet-500 transition-colors" size={18} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-4 pl-12 pr-4 text-zinc-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all font-medium placeholder:text-zinc-400"
            placeholder="retailer@company.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <label className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">Password</label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-[10px] font-mono font-bold uppercase tracking-widest text-violet-600 hover:text-violet-700 transition-colors"
          >
            Forgot Password?
          </button>
        </div>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-violet-500 transition-colors" size={18} />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl py-4 pl-12 pr-12 text-zinc-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-100 outline-none transition-all font-medium placeholder:text-zinc-400"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-violet-600/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
      >
        {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In to Portal"}
      </button>
    </form>
  );
};

export default EmailLoginForm;
