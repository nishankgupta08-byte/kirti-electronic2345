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
      <div className="flex bg-kirti-surface border border-kirti-border rounded-sm p-1 mb-8 relative">
        {(['login', 'signup'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-sm font-mono text-xs uppercase tracking-wider font-bold transition-all duration-200 relative z-10 ${tab === t ? 'text-white' : 'text-kirti-muted hover:text-kirti-cobalt'}`}
          >
            {tab === t && (
              <motion.div
                layoutId="auth-tab-bg"
                className="absolute inset-0 rounded-sm bg-kirti-orange shadow-sm"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
              />
            )}
            <span className="relative z-10">{t === 'login' ? 'Sign In' : 'Create Account'}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: tab === 'login' ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: tab === 'login' ? 10 : -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' } as any}
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
