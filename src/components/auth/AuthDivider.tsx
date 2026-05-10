import React from 'react';

const AuthDivider: React.FC = () => {
  return (
    <div className="relative py-4">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-zinc-100"></div>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-4 font-mono font-bold text-zinc-400 tracking-widest">OR</span>
      </div>
    </div>
  );
};

export default AuthDivider;
