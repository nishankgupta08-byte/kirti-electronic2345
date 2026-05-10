import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react'
import { CartItem } from '../../types'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

interface MobileCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (id: string, delta: number) => void
  onRemove: (id: string) => void
  total: number
}

const MobileCartDrawer: React.FC<MobileCartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, total }) => {
  const { user, isApproved } = useAuth()
  const navigate = useNavigate()

  const handleProceed = () => {
    if (!user) {
      toast.error('Please login to proceed')
      navigate('/login?redirect=/order')
      onClose()
      return
    }
    if (!isApproved) {
      toast.error('Your account is pending admin approval.')
      return
    }
    if (items.length === 0) {
      toast.error('Your cart is empty!')
      return
    }
    navigate('/order')
    onClose()
  }

  const count = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          />

          {/* Bottom sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[85vh] flex flex-col pb-safe"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2 shrink-0">
              <div className="w-10 h-1 rounded-full bg-zinc-200" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4 border-b border-zinc-100 shrink-0">
              <div>
                <h2 className="font-heading font-bold text-zinc-900 text-lg">Your Cart</h2>
                <p className="font-body text-xs text-zinc-400">{count} items</p>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center active:scale-90 transition-transform">
                <X size={18} className="text-zinc-600" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 ">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-4">
                    <ShoppingBag size={28} className="text-zinc-300" />
                  </div>
                  <p className="font-body text-sm text-zinc-400">Your cart is empty</p>
                  <p className="font-body text-xs text-zinc-300 mt-1">Add items to proceed</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center py-2 border-b border-zinc-50 last:border-b-0">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-semibold text-zinc-900 truncate">{item.name}</p>
                      <p className="font-body text-xs text-zinc-400">₹{item.price} × {item.quantity}</p>
                      <p className="font-heading text-sm font-bold text-violet-600 mt-0.5">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button onClick={() => onRemove(item.id)} className="text-zinc-300 active:text-rose-500 transition-colors shrink-0">
                        <Trash2 size={13} />
                      </button>
                      <div className="flex items-center gap-1 bg-zinc-50 rounded-lg p-0.5 shrink-0">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-7 h-7 rounded-md bg-white border border-zinc-200 text-zinc-600 flex items-center justify-center text-xs font-bold active:bg-zinc-100">
                          <Minus size={10} />
                        </button>
                        <span className="w-6 text-center font-body text-xs font-semibold text-zinc-900">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-7 h-7 rounded-md bg-white border border-zinc-200 text-zinc-600 flex items-center justify-center text-xs font-bold active:bg-zinc-100">
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
              <div className="shrink-0 px-5 py-4 border-t border-zinc-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm text-zinc-500">Total</span>
                  <span className="font-heading text-xl font-bold text-zinc-900">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <button
                  onClick={handleProceed}
                  className="w-full bg-violet-600 text-white font-body font-semibold text-sm py-4 rounded-2xl active:scale-95 transition-all duration-150 shadow-[0_4px_20px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2"
                >
                  Proceed to Book <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileCartDrawer
