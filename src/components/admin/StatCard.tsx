import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  subtitleColor?: string;
  icon: LucideIcon;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  subtitleColor = 'text-slate-500', 
  icon: Icon,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-sky-500 transition-colors">
            {title}
          </p>
          <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
          <p className={`text-xs font-medium ${subtitleColor}`}>
            {subtitle}
          </p>
        </div>
        <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
