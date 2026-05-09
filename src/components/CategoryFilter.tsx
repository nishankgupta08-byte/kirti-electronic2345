import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  current: Category;
  onChange: (category: Category) => void;
}

const categories: Category[] = ['All', 'Laptops', 'Smartphones', 'Audio', 'Accessories'];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ current, onChange }) => {
  return (
    <div className="flex flex-wrap gap-3 py-8 overflow-x-auto no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-6 py-2.5 text-[10px] font-mono font-bold tracking-widest border rounded-xl transition-all whitespace-nowrap active:scale-95 ${
            current === cat
              ? 'bg-sky-500 text-white border-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
              : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
          }`}
        >
          {cat.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
