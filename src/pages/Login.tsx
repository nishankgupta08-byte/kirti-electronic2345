import React from 'react';
import { motion } from 'motion/react';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';
import EmailLoginForm from '../components/auth/EmailLoginForm';
import AuthDivider from '../components/auth/AuthDivider';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <span className="text-sky-400 text-3xl group-hover:scale-110 transition-transform">⚡</span>
              <span className="text-2xl font-black tracking-tighter text-white">
                <span className="text-sky-500">KIRTI</span> ELECTRONIC
              </span>
            </Link>
            <h1 className="text-xl font-bold text-white mb-2">Retailer Portal</h1>
            <p className="text-slate-500 text-sm font-medium">Sign in to access bulk inventory & pre-booking</p>
          </div>

          <div className="space-y-6">
            <GoogleLoginButton />
            <AuthDivider />
            <EmailLoginForm />
          </div>

          <div className="mt-10 text-center">
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-600 leading-relaxed">
              Retailer access only. <br />
              Contact admin at <span className="text-sky-500/50">wholesale@kirtielec.com</span> <br />
              to get your shop approved.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
