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
  total,
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
            className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-zinc-100 z-50 shadow-[-20px_0_60px_rgba(0,0,0,0.08)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
              <div>
                <h2 className="font-heading font-bold text-zinc-900">Your Cart</h2>
                <p className="font-body text-xs text-zinc-400 mt-0.5">{items.length} items</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors duration-150"
              ><X size={16} className="text-zinc-600" /></button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-4">
                    <span className="text-2xl opacity-30">🛒</span>
                  </div>
                  <p className="font-body text-sm text-zinc-400">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start py-3 border-b border-zinc-50 last:border-b-0">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-50 shrink-0 border border-zinc-100">
                      {item.images[0] && (
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-semibold text-zinc-900 truncate">{item.name}</p>
                      <p className="font-body text-xs text-zinc-400">₹{item.price} × {item.quantity}</p>
                      <p className="font-heading text-sm font-bold text-violet-600 mt-0.5">
                        ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <button onClick={() => onRemove(item.id)} className="text-zinc-300 hover:text-rose-500 transition-colors">
                        <Trash2 size={15} />
                      </button>
                      <div className="flex items-center gap-1 bg-zinc-50 rounded-lg p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-md bg-white border border-zinc-200 text-zinc-600 flex items-center justify-center hover:border-violet-300 hover:text-violet-600 transition-colors text-xs font-bold"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="w-6 text-center font-body text-xs font-semibold text-zinc-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-md bg-white border border-zinc-200 text-zinc-600 flex items-center justify-center hover:border-violet-300 hover:text-violet-600 transition-colors text-xs font-bold"
                        >
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-zinc-100 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-zinc-500">Total</span>
                  <span className="font-heading text-xl font-bold text-zinc-900">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 flex gap-2">
                  <span className="text-amber-500 text-sm shrink-0">⚠</span>
                  <p className="font-body text-xs text-amber-700">Pre-booking only — no payment required at checkout.</p>
                </div>
                <button
                  onClick={handleProceed}
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-body font-semibold text-sm py-3.5 rounded-2xl transition-all duration-200 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)] active:scale-95 flex items-center justify-center gap-2"
                >
                  Proceed to Book <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;