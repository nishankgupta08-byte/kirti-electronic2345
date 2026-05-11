import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, ChevronRight, PackageSearch } from 'lucide-react';
import { Product } from '../../types';

interface StockAlertPanelProps {
  outOfStockItems: Product[];
  onMarkInStock: (id: string) => void;
}

const StockAlertPanel: React.FC<StockAlertPanelProps> = ({ outOfStockItems, onMarkInStock }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl flex flex-col h-full shadow-sm">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-orange-500" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Stock Replenishment Alerts</h3>
        </div>
        <span className="bg-orange-100 text-orange-600 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
            {outOfStockItems.length} ACTIONS
        </span>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4">
        {outOfStockItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500 mb-4">
                <CheckCircle2 size={24} />
            </div>
            <p className="text-sm font-bold text-green-600">Inventory Saturated</p>
            <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-widest">All units reported in stock</p>
          </div>
        ) : (
          outOfStockItems.map((item) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-sky-500/30 transition-all"
            >
              <div className="w-10 h-10 bg-white rounded-lg overflow-hidden shrink-0 border border-slate-200">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">{item.category}</p>
              </div>
              <button 
                onClick={() => onMarkInStock(item.id)}
                className="p-2 text-slate-400 hover:text-sky-500 hover:bg-white rounded-lg transition-all"
                title="Mark as In Stock"
              >
                <PackageSearch size={16} />
              </button>
            </motion.div>
          ))
        )}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto rounded-b-2xl">
        <button className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-mono font-bold text-slate-500 hover:text-sky-500 uppercase tracking-widest transition-colors">
            Analyze Supply Chain
            <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default StockAlertPanel;