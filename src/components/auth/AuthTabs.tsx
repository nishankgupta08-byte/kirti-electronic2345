import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

interface AuthTabsProps {
  redirect: string;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ redirect }) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  return (
    <div>
      <div className="flex bg-zinc-100 rounded-2xl p-1 mb-8 relative">
        {(['login', 'signup'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl font-body text-sm font-semibold transition-all duration-200 relative z-10 ${tab === t ? 'text-white' : 'text-zinc-500 hover:text-zinc-700'}`}
          >
            {tab === t && (
              <motion.div
                layoutId="auth-tab-bg"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 shadow-[0_2px_12px_rgba(124,58,237,0.4)]"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{t === 'login' ? 'Sign In' : 'Create Account'}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: tab === 'login' ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: tab === 'login' ? 20 : -20 }}
          transition={{ duration: 0.25, ease: 'easeOut' } as any}
        >
          {tab === 'login'
            ? <LoginForm redirect={redirect} onSwitchToSignup={() => setTab('signup')} />
            : <SignUpForm redirect={redirect} onSwitchToLogin={() => setTab('login')} />
          }
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AuthTabs;
