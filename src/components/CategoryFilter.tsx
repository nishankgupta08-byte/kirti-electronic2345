import React from 'react';
import { Type, SlidersHorizontal, Laptop, Headphones, Cable, Smartphone } from 'lucide-react';

interface CategoryFilterProps {
  current: string;
  onChange: (slug: string) => void;
}

interface CategoryItem {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

const categories: CategoryItem[] = [
  { name: 'All', slug: 'All', icon: <SlidersHorizontal size={14} /> },
  { name: 'Laptops', slug: 'Laptops', icon: <Laptop size={14} /> },
  { name: 'Smartphones', slug: 'Smartphones', icon: <Smartphone size={14} /> },
  { name: 'Audio', slug: 'Audio', icon: <Headphones size={14} /> },
  { name: 'Accessories', slug: 'Accessories', icon: <Cable size={14} /> },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ current, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className={`shrink-0 font-body text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 flex items-center gap-1.5 ${
            current === cat.slug
              ? 'bg-violet-600 text-white border-violet-600 shadow-[0_2px_12px_rgba(124,58,237,0.3)]'
              : 'bg-white text-zinc-600 border-zinc-200 hover:border-violet-300 hover:text-violet-600'
          }`}
        >
          {cat.icon}
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
