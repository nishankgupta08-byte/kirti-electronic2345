import React, { useState } from 'react';
import { ShoppingCart, Menu, Search, Package, LogOut, Shield } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const { user, retailerData, isAdmin, signOut: signOutFn, isApproved } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOutFn();
      toast.success("Logged out successfully");
      navigate('/');
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-zinc-100 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">KIRTI</span>
            <span className="text-zinc-900"> ELECTRONIC</span>
          </span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
          <Link to="/" className="hover:text-zinc-900 hover-underline transition-colors duration-200">Home</Link>
          <Link to="/products" className="hover:text-zinc-900 hover-underline transition-colors duration-200">Products</Link>
          {isApproved && <Link to="/order" className="hover:text-zinc-900 hover-underline transition-colors duration-200">Bookings</Link>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-xl hover:bg-zinc-100 transition-colors duration-200">
          <Search size={20} className="text-zinc-700" />
        </button>

        {user ? (
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_4px_16px_rgba(124,58,237,0.35)] active:scale-95"
                title="Admin Panel"
              >
                <Shield size={16} />
                <span className="hidden sm:inline">Admin Panel</span>
              </button>
            )}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-xl overflow-hidden border border-zinc-200 hover:border-violet-300 transition-all active:scale-95"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-violet-600 flex items-center justify-center text-white font-bold text-sm">
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
                      className="absolute right-0 mt-4 w-64 bg-white border border-zinc-100 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.08)] overflow-hidden py-2"
                    >
                      <div className="px-4 py-3 border-b border-zinc-100">
                        <p className="text-sm font-bold text-zinc-900 truncate">{user.displayName || 'Retail Member'}</p>
                        <p className="text-[10px] text-zinc-500 truncate">{retailerData?.shop_name || user.email}</p>
                      </div>
                      <div className="py-2">
                      <button
                        onClick={() => { navigate('/order'); setIsProfileOpen(false); }}
                        className="w-full px-4 py-2 text-left text-xs font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 flex items-center gap-3 transition-colors"
                      >
                        <Package size={16} />
                        Booking History
                      </button>
                      {isAdmin && (
                        <button
                          onClick={() => { navigate('/admin'); setIsProfileOpen(false); }}
                          className="w-full px-4 py-2 text-left text-xs font-medium text-violet-600 hover:text-violet-800 hover:bg-violet-50 flex items-center gap-3 transition-colors"
                        >
                          <Shield size={16} />
                          Admin Panel
                        </button>
                      )}
                      </div>
                      <div className="pt-2 border-t border-zinc-100">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 text-left text-xs font-bold text-rose-500 hover:bg-rose-50 flex items-center gap-3 transition-colors"
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
          </div>
        ) : (
          <Link to="/login" className="text-sm font-semibold bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_4px_16px_rgba(124,58,237,0.35)] active:scale-95">
            Retailer Login
          </Link>
        )}

        <button
          onClick={onOpenCart}
          className="relative p-2 rounded-xl hover:bg-zinc-100 transition-colors duration-200"
        >
          <ShoppingCart size={20} className="text-zinc-700" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">{cartCount}</span>
          )}
        </button>
        <button className="md:hidden p-2 rounded-xl hover:bg-zinc-100 transition-colors duration-200">
          <Menu size={22} className="text-zinc-700" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
