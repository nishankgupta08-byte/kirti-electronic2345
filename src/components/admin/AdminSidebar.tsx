import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Tags,
  ClipboardList,
  Users,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const AdminSidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Categories', icon: Tags, path: '/admin/categories' },
    { name: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    { name: 'Retailers', icon: Users, path: '/admin/retailers' },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out from admin panel");
      navigate('/');
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-zinc-950 border-r border-zinc-800 z-50 hidden lg:flex flex-col">
      {/* Brand */}
      <div className="p-8 flex items-center gap-3">
        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter text-white leading-none">
            <span className="gradient-text">KIRTI</span> ELEC
          </h1>
          <span className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-widest mt-1">
            Admin Portal
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-3 rounded-xl transition-all group
              ${isActive
                ? 'bg-violet-600/15 text-violet-400 border-l-2 border-violet-500 font-bold'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon size={20} className={isActive ? 'text-violet-400' : 'text-zinc-500 group-hover:text-zinc-300'} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-6 border-t border-zinc-800 space-y-4">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user?.displayName?.charAt(0) || 'A'}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.displayName || 'Admin User'}</p>
            <p className="text-[10px] font-mono text-zinc-500 truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all text-sm font-bold group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
