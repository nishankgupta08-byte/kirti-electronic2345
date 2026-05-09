import React from 'react';
import { Edit2, Trash2, Tag, ChevronRight, Hash } from 'lucide-react';
import { Category } from '../../../types';

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">
              <th className="px-6 py-4">Domain Alias</th>
              <th className="px-6 py-4">Protocol Path (Slug)</th>
              <th className="px-6 py-4">System Node ID</th>
              <th className="px-6 py-4 text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No domains mapped</p>
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-sky-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-xl group-hover:bg-white group-hover:border-sky-500/50 transition-all shadow-sm">
                        {category.icon || '📦'}
                      </div>
                      <span className="font-black text-slate-900 tracking-tight">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <ChevronRight size={12} />
                      <code className="text-xs font-mono font-bold text-sky-500 bg-sky-50 px-2 py-0.5 rounded-lg">
                        /{category.slug}
                      </code>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      <Hash size={12} />
                      {category.id.slice(0, 12)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                        onClick={() => onEdit(category)}
                        className="p-2 text-slate-400 hover:text-sky-500 hover:bg-white rounded-xl transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(category)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;
