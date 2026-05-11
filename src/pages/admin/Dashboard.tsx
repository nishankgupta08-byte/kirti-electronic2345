import React, { useState, useEffect } from 'react';
import { 
  Package, 
  ClipboardList, 
  Users, 
  Tags,
  AlertCircle
} from 'lucide-react';
import StatCard from '../../components/admin/StatCard';
import RecentOrdersTable from '../../components/admin/RecentOrdersTable';
import StockAlertPanel from '../../components/admin/StockAlertPanel';
import { useAdminOrders } from '../../hooks/useAdminOrders';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { useAdminCategories } from '../../hooks/useAdminCategories';
import { useAdminRetailers } from '../../hooks/useAdminRetailers';
import { toast } from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { orders: recentOrders, updateOrderStatus } = useAdminOrders();
  const { products } = useAdminProducts();
  const { categories } = useAdminCategories();
  const { retailers } = useAdminRetailers();

  const outOfStockItems = products.filter(p => !p.stockAvailable);
  const pendingOrders = recentOrders.filter(o => o.status === 'pending');
  const pendingRetailers = retailers.filter(r => !r.isApproved);

  const stats = {
    totalProducts: products.length,
    outOfStock: outOfStockItems.length,
    ordersToday: recentOrders.filter(o => {
      const today = new Date().toISOString().split('T')[0];
      const orderDate = new Date(o.createdAt).toISOString().split('T')[0];
      return orderDate === today;
    }).length,
    pendingOrders: pendingOrders.length,
    totalRetailers: retailers.length,
    pendingRetailers: pendingRetailers.length,
    totalCategories: categories.length
  };

  const handleUpdateOrderStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      await updateOrderStatus(id, status);
      toast.success(`Order ${id.slice(0, 8)} updated: ${status}`);
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleMarkInStock = async (id: string) => {
    try {
      const { toggleStock } = useAdminProducts();
      const product = products.find(p => p.id === id);
      if (product) { toggleStock(id, product.stockAvailable); }
    } catch (error) {
      toast.error("Failed to update stock status");
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Hardware" 
          value={stats.totalProducts} 
          subtitle={`${stats.outOfStock} items out of sync`}
          subtitleColor={stats.outOfStock > 0 ? 'text-red-500' : 'text-slate-500'}
          icon={Package}
          delay={0.1}
        />
        <StatCard 
          title="Daily Throughput" 
          value={stats.ordersToday} 
          subtitle={`${stats.pendingOrders} pending confirmation`}
          subtitleColor={stats.pendingOrders > 0 ? 'text-amber-500' : 'text-slate-500'}
          icon={ClipboardList}
          delay={0.2}
        />
        <StatCard 
          title="Network Entities" 
          value={stats.totalRetailers} 
          subtitle={`${stats.pendingRetailers} awaiting clearance`}
          subtitleColor={stats.pendingRetailers > 0 ? 'text-blue-500' : 'text-slate-500'}
          icon={Users}
          delay={0.3}
        />
        <StatCard 
          title="Logical Domains" 
          value={stats.totalCategories} 
          subtitle="System categories active"
          icon={Tags}
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 min-h-[500px]">
          <RecentOrdersTable 
            orders={recentOrders} 
            onView={(order) => console.log('View:', order)}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        </div>

        <div className="xl:col-span-1 h-full">
          <StockAlertPanel 
            outOfStockItems={outOfStockItems} 
            onMarkInStock={handleMarkInStock}
          />
        </div>
      </div>
      
      <div className="bg-sky-500/5 border border-sky-500/20 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-500 animate-pulse">
            <AlertCircle size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 tracking-tight">Mainframe Operational</p>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">All systems normalized. Latency: 14ms</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">Live Sync Enabled</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;