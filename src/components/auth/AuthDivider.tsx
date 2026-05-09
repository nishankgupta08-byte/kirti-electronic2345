import React from 'react';

const AuthDivider: React.FC = () => {
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/5"></div>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-[#020617] px-4 font-mono font-bold text-slate-600 tracking-widest">OR</span>
      </div>
    </div>
  );
};

export default AuthDivider;
