import React from 'react';
import { Eye, Check, X, Clock, ExternalLink } from 'lucide-react';
import { Order } from '../../types';
import { formatDateTime } from '../../lib/dateUtils';

interface RecentOrdersTableProps {
  orders: Order[];
  onView: (order: Order) => void;
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({ orders, onView, onUpdateStatus }) => {
  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'cancelled':
        return 'bg-rose-50 text-rose-600 border-rose-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <Clock size={18} className="text-sky-500" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Recent Telemetry Entries</h3>
        </div>
        <button className="text-[10px] font-mono font-bold text-sky-500 hover:text-sky-600 uppercase tracking-widest flex items-center gap-1">
            Browse All Records
            <ExternalLink size={12} />
        </button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto no-scrollbar">
        <table className="w-full text-left">
          <thead className="sticky top-0 bg-slate-50 border-b border-slate-100 z-10">
            <tr>
              <th className="px-6 py-3 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">Order Node</th>
              <th className="px-6 py-3 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">Retailer Entities</th>
              <th className="px-6 py-3 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">Total Valuation</th>
              <th className="px-6 py-3 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">Phase Status</th>
              <th className="px-6 py-3 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest text-right">Terminal Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.length === 0 ? (
                <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No active traffic detected</p>
                    </td>
                </tr>
            ) : (
                orders.map((order) => (
                    <tr key={order.id} className="hover:bg-sky-50/50 transition-colors group">
                        <td className="px-6 py-4">
                            <span className="text-[10px] font-mono font-bold text-slate-900 truncate block w-20">#{order.id?.slice(0, 8)}...</span>
                            <span className="text-[9px] font-mono text-slate-400">{formatDateTime(order.createdAt)}</span>
                        </td>
                        <td className="px-6 py-4">
                            <p className="text-xs font-bold text-slate-900">{order.retailerInfo.name}</p>
                            <p className="text-[10px] font-mono text-slate-400 truncate w-32">{order.retailerInfo.shopName}</p>
                        </td>
                        <td className="px-6 py-4">
                            <span className="text-xs font-black text-slate-900">₹{order.totalAmount.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${getStatusStyle(order.status)}`}>
                                {order.status}
                            </span>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => onView(order)}
                                    className="p-1.5 text-slate-400 hover:text-sky-500 hover:bg-white rounded-lg transition-all"
                                    title="View Details"
                                >
                                    <Eye size={16} />
                                </button>
                                {order.status === 'pending' && (
                                    <>
                                        <button 
                                            onClick={() => onUpdateStatus(order.id, 'confirmed')}
                                            className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-white rounded-lg transition-all"
                                            title="Confirm Order"
                                        >
                                            <Check size={16} />
                                        </button>
                                        <button 
                                            onClick={() => onUpdateStatus(order.id, 'cancelled')}
                                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition-all"
                                            title="Cancel Order"
                                        >
                                            <X size={16} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrdersTable;