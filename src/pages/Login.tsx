import React from 'react';
import { motion } from 'motion/react';
import GoogleLoginButton from '../components/auth/GoogleLoginButton';
import EmailLoginForm from '../components/auth/EmailLoginForm';
import AuthDivider from '../components/auth/AuthDivider';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-[0_20px_80px_rgba(0,0,0,0.08)] p-10">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
              <span className="font-heading font-extrabold text-2xl">
                <span className="gradient-text">KIRTI</span>
                <span className="text-zinc-900"> ELECTRONIC</span>
              </span>
            </Link>
            <p className="font-body text-sm text-zinc-400 mt-1">
              Retailer Portal — Sign in to continue
            </p>
          </div>

          <div className="space-y-5">
            <GoogleLoginButton />
            <AuthDivider />
            <EmailLoginForm />
          </div>

          <p className="font-body text-xs text-zinc-400 text-center mt-8">
            Retailer access only. Contact admin at{' '}
            <span className="text-violet-600">wholesale@kirtielec.com</span> to get your shop approved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
