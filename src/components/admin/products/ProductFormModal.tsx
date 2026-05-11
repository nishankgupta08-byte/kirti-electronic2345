import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, Plus, Trash2, Loader2, Image as ImageIcon } from 'lucide-react';
import { Product, Category } from '../../../types';
import { useAdminProducts } from '../../../hooks/useAdminProducts';

interface ProductFormModalProps {
  isOpen: boolean;
  product?: Product | null;
  categories: Category[];
  onClose: () => void;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ 
  isOpen, 
  product, 
  categories,
  onClose 
}) => {
  const { addProduct, updateProduct } = useAdminProducts();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    minOrderQty: 0,
    description: '',
    stockAvailable: true
  });

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [removedImageURLs, setRemovedImageURLs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        minOrderQty: product.minOrderQty,
        description: product.description,
        stockAvailable: product.stockAvailable
      });
      setExistingImages(product.images || []);
      setNewImageFiles([]);
      setPreviews([]);
      setRemovedImageURLs([]);
    } else {
      setFormData({
        name: '',
        category: '',
        price: 0,
        minOrderQty: 0,
        description: '',
        stockAvailable: true
      });
      setExistingImages([]);
      setNewImageFiles([]);
      setPreviews([]);
      setRemovedImageURLs([]);
    }
  }, [product, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setNewImageFiles(prev => [...prev, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index: number) => {
    setNewImageFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (url: string) => {
    setExistingImages(prev => prev.filter(u => u !== url));
    setRemovedImageURLs(prev => [...prev, url]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (product) {
        await updateProduct(product.id, formData, newImageFiles, existingImages, removedImageURLs);
      } else {
        await addProduct(formData, newImageFiles);
      }
      onClose();
    } catch (error) {
      console.error("Submit error:", error);
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
            className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
                  {product ? 'Reconfigure Hardware' : 'Register New Hardware'}
                </h2>
                <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
                  Product Entry System v3.0
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Scroll Area */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Entity Alias</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Remote Module RTL-90"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold placeholder:text-slate-300 focus:bg-white focus:border-sky-500 transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Domain Classification</label>
                    <select 
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold text-slate-600 appearance-none outline-none focus:bg-white focus:border-sky-500 transition-all cursor-pointer"
                    >
                      <option value="">Select Domain</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Unit Valuation (₹)</label>
                      <input 
                        required
                        type="number" 
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        placeholder="0.00"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold focus:bg-white focus:border-sky-500 transition-all outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">MOQ Threshold</label>
                      <input 
                        required
                        type="number" 
                        value={formData.minOrderQty || ''}
                        onChange={(e) => setFormData({ ...formData, minOrderQty: Number(e.target.value) })}
                        placeholder="Min 1"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-bold focus:bg-white focus:border-sky-500 transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Stock & Description */}
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div>
                      <p className="text-sm font-black text-slate-900 tracking-tight">Sync Visibility</p>
                      <p className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">Active in inventory flow</p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setFormData({ ...formData, stockAvailable: !formData.stockAvailable })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${formData.stockAvailable ? 'bg-sky-500' : 'bg-slate-300'}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.stockAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Technical Specs</label>
                    <textarea 
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      placeholder="Input comprehensive device specifications..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-sm font-medium focus:bg-white focus:border-sky-500 transition-all outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload Area */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest ml-1">Visual Assets</label>
                  <span className="text-[10px] font-mono text-slate-300 font-bold">MAX 4 IMAGES / 5MB EACH</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {/* Image Slots */}
                  {existingImages.map((url, i) => (
                    <div key={url} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group">
                      <img src={url} alt="product" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeExistingImage(url)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}

                  {previews.map((preview, i) => (
                    <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-sky-500/30 group">
                      <img src={preview} alt="preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-sky-500/10" />
                      <button 
                        type="button"
                        onClick={() => removeNewImage(i)}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={12} />
                      </button>
                      <span className="absolute bottom-2 left-2 bg-sky-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-mono font-bold">STAGING</span>
                    </div>
                  ))}

                  {/* Add Image Button */}
                  {(existingImages.length + newImageFiles.length) < 4 && (
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-sky-500 hover:text-sky-500 hover:bg-sky-50 transition-all group"
                    >
                      <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-white transition-colors">
                        <Upload size={20} />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Inbound</span>
                    </button>
                  )}
                </div>
                <input 
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                 <button 
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="px-8 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all disabled:opacity-50"
                >
                  Terminate
                </button>
                <button 
                  disabled={loading || (existingImages.length + newImageFiles.length === 0)}
                  className="px-8 py-4 bg-sky-500 text-white rounded-2xl font-bold text-sm hover:bg-sky-600 shadow-xl shadow-sky-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      {product ? 'Update Matrix' : 'Deploy Entity'}
                      <Plus size={20} />
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

export default ProductFormModal;
