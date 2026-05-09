import React from 'react';
import { Check, X, Trash2, Mail, Phone, Store, User, Shield, ShieldAlert, Hash } from 'lucide-react';
import { Retailer } from '../../../types';

interface RetailerTableProps {
  retailers: Retailer[];
  onApprove: (uid: string) => void;
  onReject: (uid: string) => void;
  onDelete: (uid: string) => void;
  filter: 'all' | 'approved' | 'pending';
}

const RetailerTable: React.FC<RetailerTableProps> = ({ 
  retailers, 
  onApprove, 
  onReject, 
  onDelete,
  filter 
}) => {
  const filteredRetailers = retailers.filter(r => {
    if (filter === 'approved') return r.isApproved;
    if (filter === 'pending') return !r.isApproved;
    return true;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden min-h-[400px]">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em]">
              <th className="px-6 py-4">Network Node Entity</th>
              <th className="px-6 py-4">Communication Meta</th>
              <th className="px-6 py-4">Node ID</th>
              <th className="px-6 py-4">Auth Protocol</th>
              <th className="px-6 py-4">Clearance Status</th>
              <th className="px-6 py-4 text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-sm">
            {filteredRetailers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-20 text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No active network nodes detected</p>
                </td>
              </tr>
            ) : (
              filteredRetailers.map((retailer) => (
                <tr key={retailer.uid} className="hover:bg-sky-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:border-sky-500/50 transition-all font-bold">
                        {retailer.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-slate-900 tracking-tight truncate">{retailer.name}</p>
                        <div className="flex items-center gap-1.5 text-sky-600 font-bold text-[10px] uppercase">
                            <Store size={10} />
                            {retailer.shopName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-y-1">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <Mail size={12} className="text-slate-400" />
                      {retailer.email}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                      <Phone size={12} className="text-slate-400" />
                      {retailer.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                        <Hash size={12} />
                        {retailer.retailerId || 'PENDING'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${
                      retailer.loginMethod === 'google' 
                        ? 'bg-sky-50 text-sky-600 border-sky-100' 
                        : 'bg-slate-50 text-slate-600 border-slate-100'
                    }`}>
                        {retailer.loginMethod === 'google' ? 'Google' : 'Email'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {retailer.isApproved ? (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Shield size={14} />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Cleared</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-amber-500">
                        <ShieldAlert size={14} />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Quarantined</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                       {retailer.isApproved ? (
                         <button 
                            onClick={() => onReject(retailer.uid)}
                            className="p-2 text-slate-400 hover:text-amber-500 hover:bg-white rounded-xl transition-all"
                            title="Revoke Access"
                          >
                            <X size={18} />
                          </button>
                       ) : (
                          <button 
                            onClick={() => onApprove(retailer.uid)}
                            className="p-2 text-slate-400 hover:text-emerald-500 hover:bg-white rounded-xl transition-all"
                            title="Grant Access"
                          >
                            <Check size={18} />
                          </button>
                       )}
                      <button 
                         onClick={() => onDelete(retailer.uid)}
                         className="p-2 text-slate-400 hover:text-red-500 hover:bg-white rounded-xl transition-all"
                         title="Purge Node"
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
    </div>
  );
};

export default RetailerTable;
