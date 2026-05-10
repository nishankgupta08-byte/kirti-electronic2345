import React from 'react';
import { Bell, Menu, User, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

interface AdminTopbarProps {
  title?: string;
}

const AdminTopbar: React.FC<AdminTopbarProps> = () => {
  const { user } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'System Dashboard';
    if (path === '/admin/products') return 'Inventory Control';
    if (path === '/admin/categories') return 'Category Architecture';
    if (path === '/admin/orders') return 'Order Management';
    if (path === '/admin/retailers') return 'Retailer Network';
    return 'Dashboard';
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-zinc-100 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 hover:bg-zinc-100 rounded-lg transition-colors">
          <Menu size={20} className="text-zinc-600" />
        </button>
        <h2 className="text-lg font-black tracking-tight text-zinc-900 uppercase">
          {getTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="hidden sm:flex relative items-center">
            <Search className="absolute left-3 text-zinc-400" size={16} />
            <input
                type="text"
                placeholder="Global telemetry search..."
                className="bg-zinc-50 border border-zinc-200 rounded-lg py-2 pl-9 pr-4 text-xs font-medium w-48 focus:w-64 focus:bg-white focus:border-violet-500 transition-all outline-none text-zinc-900 placeholder:text-zinc-400"
            />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-zinc-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all group">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 border-2 border-white rounded-full group-hover:scale-110 transition-transform"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-zinc-100">
          <div className="flex flex-col items-end hidden md:flex">
            <span className="text-xs font-bold text-zinc-900">{user?.displayName || 'Admin'}</span>
            <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest">Master Admin</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-600/20">
            {user?.displayName?.charAt(0) || <User size={20} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
