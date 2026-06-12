import React from 'react';
import { motion } from 'motion/react';
import AuthTabs from '../components/auth/AuthTabs';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white border-2 border-kirti-cobalt rounded-xl p-1 shadow-[4px_4px_0px_rgba(15,29,54,1)]">
          <div className="border border-kirti-border rounded-lg p-8 md:p-10 relative bg-white overflow-hidden">
            
            {/* Corner labels */}
            <div className="absolute top-2 left-2 font-mono text-[8px] text-kirti-muted select-none">[AUTH_MODE]</div>
            <div className="absolute top-2 right-2 font-mono text-[8px] text-kirti-muted select-none">[SYS::LOCK]</div>

            <div className="text-center mb-8 pt-2">
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <span className="font-heading font-bold text-2xl">
                  <span className="text-kirti-orange">KIRTI</span>
                  <span className="text-kirti-cobalt"> ELECTRONIC</span>
                </span>
              </Link>
              <div className="font-mono text-[10px] text-kirti-muted tracking-wider uppercase mt-1">
                // Merchant Authentication Portal
              </div>
            </div>

            <AuthTabs redirect="/" />

            <p className="font-mono text-[10px] text-kirti-muted text-center mt-8 pt-4 border-t border-kirti-border/60">
              Retailer nodes only. Request clearance from{' '}
              <span className="text-kirti-orange font-bold font-sans">wholesale@kirtielec.com</span> to activate access.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;