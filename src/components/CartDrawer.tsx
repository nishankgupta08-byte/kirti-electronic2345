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
            className="fixed inset-0 bg-kirti-cobalt/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-kirti-border z-50 shadow-lg flex flex-col font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-kirti-border">
              <div>
                <h2 className="font-heading font-bold text-kirti-cobalt text-lg">Allocation Basket</h2>
                <p className="font-mono text-[10px] text-kirti-muted mt-0.5">// QTY::{items.length} ACTIVE BATCHES</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-sm bg-kirti-surface hover:bg-kirti-border flex items-center justify-center transition-colors duration-150 border border-kirti-border"
              ><X size={14} className="text-kirti-cobalt" /></button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded border border-kirti-border bg-kirti-surface flex items-center justify-center mb-4">
                    <span className="font-mono text-[10px] font-bold text-kirti-muted">EMPTY</span>
                  </div>
                  <p className="font-mono text-[11px] text-kirti-muted uppercase tracking-wider">No batches selected</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start py-3 border-b border-kirti-border/40 last:border-b-0">
                    <div className="w-14 h-14 rounded-sm overflow-hidden bg-kirti-surface shrink-0 border border-kirti-border">
                      {item.images[0] && (
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-xs text-kirti-cobalt truncate">{item.name}</p>
                      <p className="font-mono text-[10px] text-kirti-muted mt-0.5">₹{item.price.toLocaleString()} × {item.quantity}</p>
                      <p className="font-mono text-xs font-bold text-kirti-orange mt-1">
                        ₹{(item.quantity * item.price).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button onClick={() => onRemove(item.id)} className="text-kirti-muted hover:text-kirti-rose transition-colors">
                        <Trash2 size={13} />
                      </button>
                      <div className="flex items-center gap-1 bg-kirti-surface border border-kirti-border rounded-sm p-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded-sm bg-white border border-kirti-border text-kirti-cobalt flex items-center justify-center hover:border-kirti-orange hover:text-kirti-orange transition-colors text-xs font-bold"
                        >
                          <Minus size={8} />
                        </button>
                        <span className="w-6 text-center font-mono text-[11px] font-bold text-kirti-cobalt">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded-sm bg-white border border-kirti-border text-kirti-cobalt flex items-center justify-center hover:border-kirti-orange hover:text-kirti-orange transition-colors text-xs font-bold"
                        >
                          <Plus size={8} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-kirti-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs uppercase tracking-wider font-bold text-kirti-muted">Estimated Total</span>
                  <span className="font-mono text-lg font-bold text-kirti-cobalt">₹{total.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="bg-kirti-amber-light border border-kirti-amber/20 rounded-sm px-4 py-3 flex gap-2">
                  <span className="text-kirti-amber text-xs shrink-0 select-none">⚠️</span>
                  <p className="font-sans text-[11px] text-kirti-amber leading-relaxed font-semibold">
                    PRE-BOOKING MODE: Allocation request only. Zero payment due at dispatch checkout.
                  </p>
                </div>
                
                <button
                  onClick={handleProceed}
                  className="w-full bg-kirti-orange hover:bg-kirti-orange-hover text-white font-mono text-xs font-bold tracking-wider uppercase py-3.5 rounded-sm shadow-[2px_2px_0px_rgba(15,29,54,1)] active:translate-y-[1px] transition-all flex items-center justify-center gap-2"
                >
                  Proceed to Secure Allocation <ArrowRight size={14} />
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