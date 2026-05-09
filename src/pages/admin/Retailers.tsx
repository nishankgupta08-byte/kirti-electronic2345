import React, { useState } from 'react';
import { Users, UserPlus, Filter } from 'lucide-react';
import RetailerTable from '../../components/admin/retailers/RetailerTable';
import AddRetailerModal from '../../components/admin/retailers/AddRetailerModal';
import DeleteConfirmModal from '../../components/admin/products/DeleteConfirmModal';
import { useAdminRetailers } from '../../hooks/useAdminRetailers';

const AdminRetailers: React.FC = () => {
  const { retailers, loading, approveRetailer, rejectRetailer, deleteRetailer } = useAdminRetailers();
  
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (uid: string) => {
    setSelectedUid(uid);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedUid) return;
    setIsDeleting(true);
    try {
      await deleteRetailer(selectedUid);
      setIsDeleteOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Network Architecture</h1>
          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
            Retailer Nodes & Permission Clearance Matrix
          </p>
        </div>
        
        <button 
          onClick={() => setIsAddOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-2xl font-bold text-sm hover:bg-sky-600 shadow-xl shadow-sky-500/20 active:scale-[0.98] transition-all group"
        >
          <UserPlus size={20} className="group-hover:scale-110 transition-transform" />
          Inject Node
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3">
        {(['all', 'approved', 'pending'] as const).map((f) => (
            <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-3 rounded-2xl text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all ${
                    filter === f 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                    : 'bg-white border border-slate-200 text-slate-400 hover:text-slate-900'
                }`}
            >
                {f} Entries
            </button>
        ))}
        <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-slate-400 font-bold uppercase">
            <Filter size={14} />
            Filter Intelligence Alpha
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-white border border-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <RetailerTable 
          retailers={retailers}
          onApprove={approveRetailer}
          onReject={rejectRetailer}
          onDelete={handleDeleteClick}
          filter={filter}
        />
      )}

      {/* Modals */}
      <AddRetailerModal 
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteOpen}
        title="Sever Network Node?"
        message="This will permanently disconnect this retailer's telemetry. All associated auth protocols and local mappings will be purged from the mainframe."
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
        loading={isDeleting}
      />
    </div>
  );
};

export default AdminRetailers;
