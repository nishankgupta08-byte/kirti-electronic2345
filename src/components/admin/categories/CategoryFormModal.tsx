import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Loader2, Sparkles, Hash } from 'lucide-react';
import { Category } from '../../../types';

interface CategoryFormModalProps {
  isOpen: boolean;
  category?: Category | null;
  onClose: () => void;
  onSubmit: (data: Partial<Category>) => Promise<void>;
}

const CategoryFormModal: React.FC<CategoryFormModalProps> = ({ 
  isOpen, 
  category, 
  onClose,
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    icon: '📦',
    slug: ''
  });
  const [loading, setLoading] = useState(false);

  const icons = ['📡', '🔌', '🔋', '📺', '🗜️', '📱', '📦', '💡', '📶'];

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        icon: category.icon || '📦',
        slug: category.slug
      });
    } else {
      setFormData({ name: '', icon: '📦', slug: '' });
    }
  }, [category, isOpen]);

  const handleNameChange = (name: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setFormData({ ...formData, name, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
                  {category ? 'Update Architecture' : 'Map New Domain'}
                </h2>
                <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Structural Mapping Tool v1.2
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-900 rounded-xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Domain Alias</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Remote Systems"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold focus:bg-white focus:border-sky-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Identifier (Slug)</label>
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border border-slate-200 rounded-2xl text-[11px] font-mono font-black text-slate-500">
                  <Hash size={14} className="text-slate-400" />
                  {formData.slug || 'awaiting-input...'}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Symbolic Identifier</label>
                <div className="flex flex-wrap gap-2">
                  {icons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all ${formData.icon === icon ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20 scale-110' : 'bg-slate-50 border border-slate-100 grayscale hover:grayscale-0 hover:border-sky-500/30'}`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-6 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
                >
                  Terminate
                </button>
                <button 
                  disabled={loading || !formData.name}
                  className="px-6 py-4 bg-sky-500 text-white rounded-2xl font-bold text-sm hover:bg-sky-600 shadow-xl shadow-sky-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      {category ? 'Update Map' : 'Finalize Map'}
                      <Sparkles size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CategoryFormModal;
