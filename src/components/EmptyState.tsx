import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState: React.FC = () => {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-md">
        <PackageOpen size={40} className="text-sky-500/40" />
      </div>
      <h3 className="text-2xl font-black mb-3 text-white tracking-tighter">Inventory Depleted</h3>
      <p className="text-slate-500 mb-10 max-w-xs mx-auto font-medium">
        The requested allocation is currently unavailable in our warehouse. 
        Please select another category or check back later.
      </p>
      <Link 
        to="/"
        className="px-8 py-4 bg-white/5 border border-white/10 text-white text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white/10 transition-all rounded-2xl active:scale-95"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default EmptyState;
