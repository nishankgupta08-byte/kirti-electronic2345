import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    const googleProvider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const adminDoc = await getDoc(doc(db, 'admins', user.uid));
      const isAdmin = adminDoc.exists();

      const retailerDoc = await getDoc(doc(db, 'retailers', user.uid));

      if (!retailerDoc.exists() && !isAdmin) {
        await setDoc(doc(db, 'retailers', user.uid), {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          phone: '',
          shopName: '',
          retailerId: `RTL-${Date.now()}`,
          isApproved: false,
          loginMethod: 'google',
          photoURL: user.photoURL || '',
          createdAt: serverTimestamp()
        });
        toast.error("Account pending approval. Admin will contact you.");
        await signOut(auth);
        return;
      }

      const retailer = retailerDoc.data();
      if (!isAdmin && retailer && !retailer.isApproved) {
        toast.error("Your account is pending admin approval.");
        await signOut(auth);
        return;
      }

      toast.success(isAdmin ? `Welcome Admin, ${user.displayName?.split(' ')[0]}!` : `Welcome back, ${user.displayName?.split(' ')[0]}!`);
      navigate(isAdmin ? '/admin' : '/products');
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        toast.dismiss();
        toast('Sign-in cancelled', { icon: 'ℹ️' });
      } else {
        console.error(err);
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="w-full h-14 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center gap-3 hover:bg-zinc-50 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="font-bold text-zinc-700 tracking-tight">Continue with Google</span>
        </>
      )}
    </button>
  );
};

export default GoogleLoginButton;
