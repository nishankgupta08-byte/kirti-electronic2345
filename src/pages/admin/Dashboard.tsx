import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, getDocs, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
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
import { Order, Product, Retailer, Category } from '../../types';
import { toast } from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    outOfStock: 0,
    ordersToday: 0,
    pendingOrders: 0,
    totalRetailers: 0,
    pendingRetailers: 0,
    totalCategories: 0
  });
  
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [outOfStockItems, setOutOfStockItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch Stats & onSnapshot for real-time updates
    const fetchStats = async () => {
      try {
        const prodSnap = await getDocs(collection(db, 'products'));
        const catSnap = await getDocs(collection(db, 'categories'));
        const retSnap = await getDocs(collection(db, 'retailers'));
        
        // Orders today
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const todayOrdersQuery = query(collection(db, 'orders'), where('createdAt', '>=', startOfToday.getTime()));
        const todaySnap = await getDocs(todayOrdersQuery);

        setStats(prev => ({
          ...prev,
          totalProducts: prodSnap.size,
          totalCategories: catSnap.size,
          totalRetailers: retSnap.size,
          ordersToday: todaySnap.size
        }));
      } catch (error) {
        console.error("Dashboard stats error:", error);
      }
    };

    // 2. Real-time Listeners
    const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(10));
    const unsubOrders = onSnapshot(ordersQuery, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as any as Order));
      setRecentOrders(orders);
      setStats(prev => ({ ...prev, pendingOrders: orders.filter(o => o.status === 'pending').length }));
    });

    const stockQuery = query(collection(db, 'products'), where('stockAvailable', '==', false));
    const unsubStock = onSnapshot(stockQuery, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setOutOfStockItems(items);
      setStats(prev => ({ ...prev, outOfStock: items.length }));
    });

    const pendingRetailersQuery = query(collection(db, 'retailers'), where('isApproved', '==', false));
    const unsubRetailers = onSnapshot(pendingRetailersQuery, (snapshot) => {
      setStats(prev => ({ ...prev, pendingRetailers: snapshot.size }));
    });

    fetchStats();
    setLoading(false);

    return () => {
      unsubOrders();
      unsubStock();
      unsubRetailers();
    };
  }, []);

  const handleUpdateOrderStatus = async (id: string, status: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status });
      toast.success(`Order node ${id.slice(0, 8)} status adjusted: ${status}`);
    } catch (error) {
      toast.error("Failed to reconfigure order state");
    }
  };

  const handleMarkInStock = async (id: string) => {
    try {
      await updateDoc(doc(db, 'products', id), { stockAvailable: true });
      toast.success("Product reinstated to inventory flow");
    } catch (error) {
      toast.error("Telemetry update failure");
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
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
        {/* Main Records Table */}
        <div className="xl:col-span-2 min-h-[500px]">
          <RecentOrdersTable 
            orders={recentOrders} 
            onView={(order) => console.log('View:', order)}
            onUpdateStatus={handleUpdateOrderStatus}
          />
        </div>

        {/* Sidebar Alerts */}
        <div className="xl:col-span-1 h-full">
          <StockAlertPanel 
            outOfStockItems={outOfStockItems} 
            onMarkInStock={handleMarkInStock}
          />
        </div>
      </div>
      
      {/* System Status Banner */}
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
