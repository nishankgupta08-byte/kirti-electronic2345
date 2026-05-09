import React, { useState } from 'react';
import { ShoppingCart, Menu, Search, User, LogOut, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const { user, retailerData, logout, isApproved } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/5 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-sky-400 text-2xl group-hover:scale-110 transition-transform">⚡</span>
          <span className="text-xl font-bold tracking-tighter text-white">
            <span className="text-sky-500">KIRTI</span> ELECTRONIC
          </span>
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/products" className="hover:text-white transition-colors">Products</Link>
          {isApproved && <Link to="/order" className="hover:text-white transition-colors">Bookings</Link>}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-white transition-colors">
          <Search size={20} />
        </button>
        
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 hover:border-sky-500/50 transition-all active:scale-95"
            >
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm">
                  {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                </div>
              )}
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <>
                  <div className="fixed inset-0" onClick={() => setIsProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-64 bg-slate-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-sm font-bold text-white truncate">{user.displayName || 'Retail Member'}</p>
                      <p className="text-[10px] font-mono text-slate-500 truncate">{retailerData?.shopName || user.email}</p>
                    </div>
                    <div className="py-2">
                       <button 
                        onClick={() => { navigate('/order'); setIsProfileOpen(false); }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 flex items-center gap-3 transition-colors"
                      >
                        <Package size={16} />
                        Booking History
                      </button>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <button 
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-left text-xs font-bold text-red-500 hover:bg-red-500/5 flex items-center gap-3 transition-colors"
                      >
                        <LogOut size={16} />
                        Sign Out Portal
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link to="/login" className="hidden sm:block border border-sky-500/30 text-sky-400 px-5 py-2 rounded-xl hover:bg-sky-500/10 transition-all text-sm font-black tracking-tight outline-none">
            Retailer Login
          </Link>
        )}

        <button 
          onClick={onOpenCart}
          className="relative text-slate-400 hover:text-sky-400 transition-colors"
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-[0_0_10px_rgba(14,165,233,0.5)]">
              {cartCount}
            </span>
          )}
        </button>
        <button className="md:hidden text-slate-400 hover:text-white transition-colors">
          <Menu size={22} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
