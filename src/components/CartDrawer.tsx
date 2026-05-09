import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  total: number;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove, 
  total 
}) => {
  const { user, isApproved } = useAuth();
  const navigate = useNavigate();

  const handleProceed = () => {
    if (!user) {
      toast.error("Please login to proceed with pre-booking");
      navigate('/login?redirect=/order');
      onClose();
      return;
    }

    if (!isApproved) {
      toast.error("Your account is pending admin approval.");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    navigate('/order');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-950 border-l border-white/10 z-50 shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tighter text-white">Pre-Booking Bag</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-2xl transition-colors text-slate-400"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <span className="text-sky-500 text-6xl mb-6">⚡</span>
                  <p className="text-xs font-mono font-bold uppercase tracking-[0.4em]">Zero confirmed items</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="w-24 aspect-square glass-morphism overflow-hidden rounded-2xl shrink-0">
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-base font-bold text-white truncate pr-4">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-slate-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <span className="text-xs font-mono text-sky-400 font-bold mb-4 block">₹{item.price.toLocaleString()}</span>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1.5 hover:bg-white/5 transition-colors text-slate-400"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-xs font-mono font-bold text-white">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1.5 hover:bg-white/5 transition-colors text-slate-400"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-white/5 space-y-6 bg-slate-950/80 backdrop-blur-xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-[0.3em]">Total Pre-Booking Value</span>
                  <span className="text-2xl font-black text-white">₹{total.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleProceed}
                  className="w-full bg-sky-500 text-white py-5 flex items-center justify-center gap-3 hover:bg-sky-400 transition-all rounded-2xl font-bold shadow-lg shadow-sky-500/20 active:scale-[0.98]"
                >
                  Confirm Pre-Booking
                  <ArrowRight size={20} />
                </button>
                <div className="text-[9px] text-center text-slate-600 uppercase tracking-widest font-mono font-bold">
                  * Final Confirmation subject to tier verification
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
