import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, MapPin, User, Package, Calculator, Phone, Mail, ShoppingBag } from 'lucide-react';
import { Order } from '../../../types';
import { formatFirebaseDateTime } from '../../../lib/dateUtils';

interface OrderDetailModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ isOpen, order, onClose, onUpdateStatus }) => {
  if (!order) return null;

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
            className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 bg-slate-900 text-white relative">
                <div className="absolute top-0 right-0 p-8 h-full flex items-center opacity-10 pointer-events-none">
                    <ShoppingBag size={120} strokeWidth={1} />
                </div>
                
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-[0.3em]">Operational Detail</span>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black tracking-tighter">Order #{order.id?.slice(0, 8).toUpperCase()}</h2>
                        <div className="flex items-center gap-3 mt-2">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest border ${
                                order.status === 'pending' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
                                order.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                                'bg-rose-500/20 text-rose-300 border-rose-500/30'
                            }`}>
                                {order.status}
                            </span>
                            <span className="text-slate-500 text-xs font-medium">Placed {formatFirebaseDateTime(order.createdAt)}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-slate-500 text-[10px] font-mono font-bold uppercase tracking-widest mb-1">Total Valuation</p>
                        <p className="text-4xl font-black text-white tracking-tighter">₹{order.totalAmount.toLocaleString()}</p>
                    </div>
                </div>
            </div>

            {/* Content Scroll Area */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-8">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 text-sky-500">
                    <User size={18} />
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Retailer Entity</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-black text-slate-900 tracking-tight leading-none">{order.retailerInfo.name}</p>
                    <p className="text-sm font-bold text-sky-600">{order.retailerInfo.shopName}</p>
                    <div className="pt-2 space-y-1">
                        <p className="flex items-center gap-2 text-xs font-medium text-slate-500"><Phone size={12} /> {order.retailerInfo.phone}</p>
                        <p className="flex items-center gap-2 text-xs font-medium text-slate-500"><Mail size={12} /> {order.retailerInfo.email}</p>
                        <p className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-2">ID: {order.retailerInfo.retailerId}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4">
                  <div className="flex items-center gap-2 text-sky-500">
                    <MapPin size={18} />
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Geographic Node</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-700 leading-relaxed">{order.shippingInfo.address}</p>
                    <p className="text-sm font-black text-slate-900">{order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}</p>
                    {order.additionalInfo?.notes && (
                      <div className="mt-4 p-3 bg-white/50 border border-slate-200 rounded-xl relative">
                        <span className="absolute -top-2 left-3 bg-white px-2 text-[8px] font-mono font-bold text-slate-400">OPERATIONAL NOTES</span>
                        <p className="text-xs italic text-slate-500">"{order.additionalInfo.notes}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package size={18} className="text-sky-500" />
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Hardware Allocation</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">{order.items.length} UNIQUE NODES</span>
                </div>

                <div className="border border-slate-100 rounded-3xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      <tr>
                        <th className="px-6 py-3">Hardware Entity</th>
                        <th className="px-6 py-3 text-center">Qty</th>
                        <th className="px-6 py-3 text-right">Unit Val</th>
                        <th className="px-6 py-3 text-right">Block Val</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {order.items.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                                <img src={item.images[0]} alt={item.name} className="w-10 h-10 rounded-lg object-cover border border-slate-200" />
                                <span className="font-bold text-slate-900 tracking-tight">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-mono font-black text-slate-600">x{item.quantity}</td>
                          <td className="px-6 py-4 text-right text-slate-500">₹{item.price.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right font-black text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-slate-50/50">
                      <tr>
                         <td colSpan={3} className="px-6 py-4 text-right text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Gross Inventory Mass</td>
                         <td className="px-6 py-4 text-right">
                             <span className="text-lg font-black text-sky-600">₹{order.totalAmount.toLocaleString()}</span>
                         </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Phase Adjust:</span>
                <div className="flex bg-white border border-slate-200 p-1 rounded-xl">
                    {(['pending', 'confirmed', 'cancelled'] as Order['status'][]).map((status) => (
                        <button
                            key={status}
                            onClick={() => onUpdateStatus(order.id, status)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-tighter ${
                                order.status === status 
                                ? status === 'pending' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' :
                                  status === 'confirmed' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' :
                                  'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                                : 'text-slate-400 hover:text-slate-900'
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={onClose}
                  className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Terminate View
                </button>
                <button 
                  className="px-6 py-3 bg-sky-500 text-white rounded-2xl text-xs font-bold hover:bg-sky-600 shadow-xl shadow-sky-500/20 transition-all flex items-center gap-2"
                >
                  <Calculator size={14} />
                  Export Telemetry
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderDetailModal;
