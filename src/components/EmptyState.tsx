import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
      <div className="w-16 h-16 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center mb-5">
        <PackageOpen size={28} className="text-violet-400" />
      </div>
      <h3 className="font-heading font-semibold text-zinc-900 mb-2">
        No Products Yet
      </h3>
      <p className="font-body text-sm text-zinc-400 max-w-xs leading-relaxed">
        The admin is setting up the product catalog. Check back soon!
      </p>
    </div>
  );
};

export default EmptyState;
