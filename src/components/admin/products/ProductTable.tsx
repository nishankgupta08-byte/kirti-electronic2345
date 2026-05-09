import React, { useState } from 'react';
import { Edit2, Trash2, Search, Filter, ChevronLeft, ChevronRight, Package, AlertCircle } from 'lucide-react';
import { Product } from '../../../types';

interface ProductTableProps {
  products: Product[];
  categories: string[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onToggleStock: (id: string, status: boolean) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ 
  products, 
  categories, 
  onEdit, 
  onDelete, 
  onToggleStock 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'in-stock' | 'out-of-stock'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtering
  const filteredProducts = products.filter(p => {
    const searchLower = searchTerm.toLowerCase();
    const specsString = p.specs ? Object.values(p.specs).join(' ').toLowerCase() : '';
    
    const matchesSearch = 
      p.name.toLowerCase().includes(searchLower) || 
      p.description?.toLowerCase().includes(searchLower) ||
      specsString.includes(searchLower);

    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    
    const matchesStock = 
      stockFilter === 'all' || 
      (stockFilter === 'in-stock' && p.stockAvailable) || 
      (stockFilter === 'out-of-stock' && !p.stockAvailable);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
      {/* Table Filters */}
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search inventory database..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-8 text-sm font-bold text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer"
            >
              <option value="all">Global Domains</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={stockFilter}
              onChange={(e) => { setStockFilter(e.target.value as any); setCurrentPage(1); }}
              className="bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-8 text-sm font-bold text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer"
            >
              <option value="all">Stock State</option>
              <option value="in-stock">Online (Synced)</option>
              <option value="out-of-stock">Offline (Reserve)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">
              <th className="px-6 py-4">Hardware Node</th>
              <th className="px-6 py-4">Domain</th>
              <th className="px-6 py-4">Valuation</th>
              <th className="px-6 py-4">MOQ</th>
              <th className="px-6 py-4">Sync Status</th>
              <th className="px-6 py-4 text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle size={32} className="text-slate-300" />
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No matching hardware found</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-sky-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group-hover:border-sky-500/50 transition-colors">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-slate-900 truncate tracking-tight">{product.name}</p>
                        <p className="text-[10px] font-mono text-slate-400">UID: {product.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-widest">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900">
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">
                    {product.minOrderQty} units
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onToggleStock(product.id, product.stockAvailable)}
                      className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${product.stockAvailable ? 'bg-emerald-500 shadow-sm shadow-emerald-500/20' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${product.stockAvailable ? 'translate-x-5.5' : 'translate-x-1'}`} />
                    </button>
                    <span className={`ml-2 text-[9px] font-mono font-bold uppercase ${product.stockAvailable ? 'text-emerald-600' : 'text-slate-400'}`}>
                      {product.stockAvailable ? 'Synced' : 'Offline'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onEdit(product)}
                        className="p-2 text-slate-400 hover:text-sky-500 hover:bg-white rounded-xl transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(product)}
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

      {/* Pagination Footer */}
      <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          Showing <span className="text-slate-900">{startIndex + 1}</span>–<span className="text-slate-900">{Math.min(startIndex + itemsPerPage, filteredProducts.length)}</span> of <span className="text-slate-900">{filteredProducts.length}</span> entries
        </p>
        
        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-sky-500 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'bg-white border border-slate-200 text-slate-400 hover:border-sky-500 hover:text-sky-500'}`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-sky-500 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
