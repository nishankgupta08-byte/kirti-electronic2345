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
    <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-kirti-border h-16 flex items-center justify-between px-6 select-none">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-lg font-bold tracking-tight font-heading">
            <span className="text-kirti-orange">KIRTI</span>
            <span className="text-kirti-cobalt"> ELECTRONIC</span>
          </span>
          <span className="hidden sm:inline-block font-mono text-[9px] bg-kirti-cobalt/5 text-kirti-muted px-1.5 py-0.5 border border-kirti-border rounded-sm">
            NODE::MAIN
          </span>
        </Link>
        <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-wider text-kirti-muted">
          <Link to="/" className="hover:text-kirti-cobalt hover-underline transition-colors duration-200">/Console</Link>
          <Link to="/products" className="hover:text-kirti-cobalt hover-underline transition-colors duration-200">/Warehouse</Link>
          {isApproved && <Link to="/order" className="hover:text-kirti-cobalt hover-underline transition-colors duration-200">/Allocations</Link>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-sm hover:bg-kirti-surface transition-colors duration-200">
          <Search size={18} className="text-kirti-cobalt" />
        </button>

        {user ? (
          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider bg-kirti-cobalt hover:bg-kirti-cobalt-hover text-white px-4 py-2.5 rounded-sm transition-all duration-200 active:translate-y-[1px]"
                title="Admin Console"
              >
                <Shield size={14} />
                <span className="hidden sm:inline">Admin</span>
              </button>
            )}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-sm overflow-hidden border border-kirti-border hover:border-kirti-orange transition-all active:scale-95"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-kirti-cobalt flex items-center justify-center text-white font-bold text-sm">
                    {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      className="absolute right-0 mt-3 w-64 bg-white border border-kirti-border rounded-lg shadow-lg overflow-hidden py-1"
                    >
                      <div className="px-4 py-3 border-b border-kirti-border bg-kirti-offwhite">
                        <p className="text-xs font-bold text-kirti-cobalt truncate font-heading">{user.displayName || 'Retail Partner'}</p>
                        <p className="text-[10px] font-mono text-kirti-muted truncate mt-0.5">{retailerData?.shop_name || user.email}</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => { navigate('/order'); setIsProfileOpen(false); }}
                          className="w-full px-4 py-2.5 text-left font-mono text-[11px] font-bold uppercase tracking-wider text-kirti-muted hover:text-kirti-cobalt hover:bg-kirti-surface flex items-center gap-3 transition-colors"
                        >
                          <Package size={14} className="text-kirti-orange" />
                          Allocations List
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => { navigate('/admin'); setIsProfileOpen(false); }}
                            className="w-full px-4 py-2.5 text-left font-mono text-[11px] font-bold uppercase tracking-wider text-kirti-orange hover:text-kirti-orange-hover hover:bg-kirti-surface flex items-center gap-3 transition-colors"
                          >
                            <Shield size={14} />
                            Admin Console
                          </button>
                        )}
                      </div>
                      <div className="pt-1 border-t border-kirti-border">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-3 text-left font-mono text-[11px] font-bold uppercase tracking-wider text-kirti-rose hover:bg-kirti-rose-light flex items-center gap-3 transition-colors"
                        >
                          <LogOut size={14} />
                          Disconnect Session
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <Link to="/login" className="text-xs font-mono font-bold uppercase tracking-wider bg-kirti-orange hover:bg-kirti-orange-hover text-white px-4 py-2.5 rounded-sm transition-all duration-200 active:translate-y-[1px]">
            Login
          </Link>
        )}

        <button
          onClick={onOpenCart}
          className="relative p-2 rounded-sm hover:bg-kirti-surface transition-colors duration-200"
        >
          <ShoppingCart size={18} className="text-kirti-cobalt" />
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-kirti-orange text-white text-[9px] font-mono font-bold flex items-center justify-center border border-white">
              {cartCount}
            </span>
          )}
        </button>
        <button className="md:hidden p-2 rounded-sm hover:bg-kirti-surface transition-colors duration-200">
          <Menu size={20} className="text-kirti-cobalt" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
