import React from 'react';
import { PackageOpen } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center border border-dashed border-kirti-border rounded-sm bg-kirti-surface">
      <div className="w-14 h-14 rounded-sm bg-kirti-orange-light border border-kirti-orange/20 flex items-center justify-center mb-5">
        <PackageOpen size={24} className="text-kirti-orange" />
      </div>
      <h3 className="font-heading font-bold text-kirti-cobalt text-sm mb-2">
        NO STOCKS REGISTERED
      </h3>
      <p className="font-sans text-xs text-kirti-muted max-w-xs leading-relaxed font-semibold">
        The catalog registry is empty. The gateway admin has not uploaded any product nodes yet. Check back soon.
      </p>
    </div>
  );
};

export default EmptyState;
