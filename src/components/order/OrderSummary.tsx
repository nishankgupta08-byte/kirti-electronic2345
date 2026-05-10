import React from 'react';
import { CartItem } from '../../types';
import { AlertTriangle } from 'lucide-react';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  return (
    <div className="bg-white rounded-3xl border border-zinc-200 p-8 h-fit shadow-sm">
      <h2 className="font-heading text-xl font-bold text-zinc-900 mb-6">Order Summary</h2>

      <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto no-scrollbar pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center py-3 border-b border-zinc-50 last:border-b-0">
            <div className="w-14 h-14 bg-zinc-50 rounded-xl overflow-hidden shrink-0 border border-zinc-100">
              {item.images[0] && (
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-body text-sm font-semibold text-zinc-900 truncate">{item.name}</h3>
                <span className="font-body text-xs text-zinc-400 whitespace-nowrap">x{item.quantity}</span>
              </div>
              <span className="font-body text-[10px] text-violet-600 font-semibold uppercase tracking-wider">{item.category}</span>
              <div className="font-heading text-sm font-bold text-zinc-900 mt-0.5">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-6 border-t border-zinc-100">
        <div className="flex justify-between text-sm">
          <span className="font-body text-zinc-500">Subtotal ({items.length} items)</span>
          <span className="font-body font-semibold text-zinc-900">₹{total.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-body text-zinc-500">Shipping Allocation</span>
          <span className="font-body text-xs font-semibold text-violet-600 uppercase">To be confirmed</span>
        </div>

        <div className="pt-4 border-t border-zinc-100 flex justify-between items-end">
          <span className="font-body text-xs text-zinc-400 font-medium">Total Pre-Booking</span>
          <span className="font-heading text-3xl font-bold text-zinc-900">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 p-4 rounded-2xl">
        <div className="flex gap-3">
          <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="font-body text-xs text-amber-700 leading-relaxed">
            <span className="font-bold block mb-0.5">Retailer Notice</span>
            This is a formal pre-booking request. No payment is collected at this stage.
            Availability will be confirmed via phone within 24 hours.
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <span className="font-body text-[10px] text-zinc-400 font-medium">
          {items.reduce((acc, curr) => acc + curr.quantity, 0)} Units in sequence
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
