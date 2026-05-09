import React from 'react';
import { CartItem } from '../../types';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  return (
    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 h-fit sticky top-32">
      <h2 className="text-xl font-black text-white mb-8 tracking-tighter">Order Summary</h2>
      
      <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto no-scrollbar pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-white/5 rounded-xl overflow-hidden shrink-0 border border-white/5">
              <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover opacity-80" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                <span className="text-xs font-mono font-bold text-slate-500 whitespace-nowrap">x{item.quantity}</span>
              </div>
              <span className="text-[10px] font-mono text-sky-500 font-bold uppercase tracking-widest">{item.category}</span>
              <div className="text-xs font-mono text-slate-400 mt-1">₹{(item.price * item.quantity).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-8 border-t border-white/5">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 font-medium tracking-tight">Subtotal ({items.length} items)</span>
          <span className="text-white font-mono font-bold">₹{total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 font-medium tracking-tight">Shipping Allocation</span>
          <span className="text-sky-500 font-mono font-bold uppercase text-[10px] tracking-widest">To be confirmed</span>
        </div>
        
        <div className="pt-4 border-t border-white/5 flex justify-between items-end">
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-[0.2em]">Total Pre-Booking</span>
          <span className="text-3xl font-black text-white leading-none">₹{total.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-8 bg-sky-500/5 border-l-4 border-sky-500 p-4 rounded-r-xl">
        <p className="text-[11px] text-sky-400 leading-relaxed">
          <span className="font-black uppercase tracking-widest block mb-1">⚠️ Retailer Notice</span>
          This is a formal pre-booking request. No payment is collected at this stage. 
          Availability will be confirmed via phone within 24 hours.
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <span className="text-[9px] font-mono font-bold text-slate-700 uppercase tracking-widest">
            {items.reduce((acc, curr) => acc + curr.quantity, 0)} Units in sequence
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
