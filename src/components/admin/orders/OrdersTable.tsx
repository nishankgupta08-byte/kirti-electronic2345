import React, { useState } from 'react';
import { Eye, Trash2, Search, Filter, Calendar, ChevronLeft, ChevronRight, Hash, Clock } from 'lucide-react';
import { Order } from '../../../types';
import { formatFirebaseDateTime } from '../../../lib/dateUtils';

interface OrdersTableProps {
  orders: Order[];
  onView: (order: Order) => void;
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders, onView, onDelete, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.retailerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.retailerInfo.shopName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'confirmed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
      {/* Filters Header */}
      <div className="p-6 border-b border-slate-100 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex-1 max-w-xl flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Query order mainframe (ID, Retailer, Shop)..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
              className="bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-10 pr-8 text-sm font-bold text-slate-600 appearance-none outline-none focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer"
            >
              <option value="all">Global Phases</option>
              <option value="pending">⏳ Pending</option>
              <option value="confirmed">✅ Confirmed</option>
              <option value="cancelled">❌ Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-3">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">Temporal Range: All Time</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">
              <th className="px-6 py-4">Operational Node ID</th>
              <th className="px-6 py-4">Entity Info</th>
              <th className="px-6 py-4">Throughput</th>
              <th className="px-6 py-4">Net Valuation</th>
              <th className="px-6 py-4">Phase State</th>
              <th className="px-6 py-4 text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No matching telemetry records</p>
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-sky-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Hash size={12} className="text-slate-300" />
                        <span className="font-mono font-black text-slate-900">{order.id?.slice(0, 10).toUpperCase()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                        <Clock size={10} />
                        <span className="text-[9px] font-mono font-bold tracking-tighter">{formatFirebaseDateTime(order.createdAt)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-slate-900 tracking-tight">{order.retailerInfo.shopName}</p>
                    <p className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">{order.retailerInfo.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">{order.items.length} Unique SKUs</span>
                        <span className="text-[10px] font-mono text-slate-400">{order.items.reduce((acc, item) => acc + item.quantity, 0)} Total Units</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black text-sky-600">₹{order.totalAmount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={order.status}
                      onChange={(e) => onUpdateStatus(order.id, e.target.value as any)}
                      className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border appearance-none outline-none cursor-pointer transition-all ${getStatusStyle(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onView(order)}
                        className="p-2 text-slate-400 hover:text-sky-500 hover:bg-white rounded-xl transition-all"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                         onClick={() => onDelete(order.id)}
                         className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

       {/* Pagination Footer */}
       <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
          Telemetry Segment <span className="text-slate-900">{startIndex + 1}</span>–<span className="text-slate-900">{Math.min(startIndex + itemsPerPage, filteredOrders.length)}</span> of <span className="text-slate-900">{filteredOrders.length}</span> entries
        </p>
        
        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-sky-500 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20' : 'bg-white border border-slate-200 text-slate-400 hover:border-sky-500 hover:text-sky-500'}`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-sky-500 disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
