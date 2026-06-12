import React from 'react';
import { CartItem } from '../../types';
import { AlertTriangle } from 'lucide-react';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
  return (
    <div className="bg-white border-2 border-kirti-cobalt rounded-lg p-6 h-fit shadow-[3px_3px_0px_rgba(15,29,54,0.05)] relative overflow-hidden">
      {/* Schematic Corner Marks */}
      <div className="absolute top-2 left-2 font-mono text-[8px] text-kirti-muted select-none">[SUMMARY_NODE]</div>
      <div className="absolute top-2 right-2 font-mono text-[8px] text-kirti-muted select-none">SYS_CHECK::OK</div>

      <h2 className="font-heading text-lg font-bold text-kirti-cobalt mb-6 pt-2">Allocation Batch</h2>

      <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto no-scrollbar pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center py-3 border-b border-kirti-border/40 last:border-b-0">
            <div className="w-12 h-12 bg-kirti-surface rounded-sm overflow-hidden shrink-0 border border-kirti-border">
              {item.images[0] && (
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-heading font-bold text-xs text-kirti-cobalt truncate">{item.name}</h3>
                <span className="font-mono text-[10px] text-kirti-muted whitespace-nowrap">x{item.quantity}</span>
              </div>
              <span className="font-mono text-[9px] text-kirti-orange font-bold uppercase tracking-wider">SYS::{item.category.toUpperCase()}</span>
              <div className="font-mono text-xs font-bold text-kirti-cobalt mt-0.5">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-6 border-t border-kirti-border">
        <div className="flex justify-between text-xs font-mono text-kirti-muted">
          <span>Subtotal ({items.length} batches)</span>
          <span className="font-bold text-kirti-cobalt">₹{total.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-xs font-mono text-kirti-muted">
          <span>Routing Dispatch Allocation</span>
          <span className="font-bold text-kirti-orange uppercase text-[10px]">TBC</span>
        </div>

        <div className="pt-4 border-t border-kirti-border flex justify-between items-end">
          <span className="font-mono text-[10px] text-kirti-muted uppercase tracking-wider">Total Pre-Booked</span>
          <span className="font-mono text-xl font-bold text-kirti-cobalt">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="mt-6 bg-kirti-amber-light border border-kirti-amber/20 p-4 rounded-sm">
        <div className="flex gap-3">
          <AlertTriangle size={15} className="text-kirti-amber shrink-0 mt-0.5" />
          <p className="font-sans text-[11px] text-kirti-amber leading-relaxed font-semibold">
            <span className="font-bold block mb-0.5 text-xs">Retailer Notice</span>
            This is a formal pre-booking trace request. No upfront capital is processed. 
            Batch allocations will be verified and dispatched within 24 hours.
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-center border-t border-kirti-border/40 pt-4">
        <span className="font-mono text-[9px] text-kirti-muted tracking-wider">
          BATCH_QTY: {items.reduce((acc, curr) => acc + curr.quantity, 0)} UNITS IN CONSIGNMENT
        </span>
      </div>
    </div>
  );
};

export default OrderSummary;
