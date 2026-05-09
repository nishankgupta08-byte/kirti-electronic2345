import React, { useState } from 'react';
import { ClipboardList } from 'lucide-react';
import OrdersTable from '../../components/admin/orders/OrdersTable';
import OrderDetailModal from '../../components/admin/orders/OrderDetailModal';
import DeleteConfirmModal from '../../components/admin/products/DeleteConfirmModal';
import { useAdminOrders } from '../../hooks/useAdminOrders';
import { Order } from '../../types';

const AdminOrders: React.FC = () => {
  const { orders, loading, updateOrderStatus, deleteOrder } = useAdminOrders();
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      setSelectedOrder(order);
      setIsDeleteOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (!selectedOrder) return;
    setIsDeleting(true);
    try {
      await deleteOrder(selectedOrder.id);
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
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Operational Monitoring</h1>
          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
            Real-Time Network Traffic & Order Telemetry
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-white border border-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <OrdersTable 
          orders={orders}
          onView={handleView}
          onDelete={handleDeleteClick}
          onUpdateStatus={updateOrderStatus}
        />
      )}

      {/* Modals */}
      <OrderDetailModal 
        isOpen={isDetailOpen}
        order={selectedOrder}
        onClose={() => setIsDetailOpen(false)}
        onUpdateStatus={updateOrderStatus}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteOpen}
        title="Purge Transaction Node?"
        message="This operation will permanently remove this transaction's telemetry from the administrative mainframe. This action is irreversible."
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
        loading={isDeleting}
      />
    </div>
  );
};

export default AdminOrders;
