import React from 'react';
import { SlidersHorizontal, Laptop, Headphones, Cable, Smartphone } from 'lucide-react';

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
  { name: 'All', slug: 'All', icon: <SlidersHorizontal size={12} /> },
  { name: 'Laptops', slug: 'Laptops', icon: <Laptop size={12} /> },
  { name: 'Smartphones', slug: 'Smartphones', icon: <Smartphone size={12} /> },
  { name: 'Audio', slug: 'Audio', icon: <Headphones size={12} /> },
  { name: 'Accessories', slug: 'Accessories', icon: <Cable size={12} /> },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ current, onChange }) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onChange(cat.slug)}
          className={`shrink-0 font-mono text-[11px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-sm border transition-all duration-200 flex items-center gap-2 ${
            current === cat.slug
              ? 'bg-kirti-orange text-white border-kirti-orange'
              : 'bg-white text-kirti-muted border-kirti-border hover:border-kirti-orange hover:text-kirti-orange'
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
