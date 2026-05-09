import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Order from './pages/Order';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminCategories from './pages/admin/Categories';
import AdminOrders from './pages/admin/Orders';
import AdminRetailers from './pages/admin/Retailers';
import PrivacyPolicy from './pages/policies/PrivacyPolicy';
import TermsConditions from './pages/policies/TermsConditions';
import MerchantPolicy from './pages/policies/MerchantPolicy';
import { useCart } from './hooks/useCart';
import { AuthProvider } from './context/AuthContext';
import { initEmailJS } from './lib/emailjs';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, addToCart, removeFromCart, updateQuantity, total, clearCart } = useCart();

  useEffect(() => {
    initEmailJS();
  }, []);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <AuthProvider>
      <Router>
        <AppContent 
          items={items} 
          isCartOpen={isCartOpen} 
          setIsCartOpen={setIsCartOpen}
          handleAddToCart={handleAddToCart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          total={total}
        />
      </Router>
    </AuthProvider>
  );
};

const AppContent: React.FC<any> = ({ 
  items, isCartOpen, setIsCartOpen, handleAddToCart, updateQuantity, removeFromCart, total 
}) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className={`relative min-h-screen flex flex-col ${isAdmin ? 'bg-slate-50' : 'bg-transparent'}`}>
      {!isAdmin && <ThreeBackground />}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: isAdmin ? '#1e293b' : '#0f172a',
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '500',
          }
        }}
      />
      
      {!isAdmin && (
        <Navbar 
          cartCount={items.length} 
          onOpenCart={() => setIsCartOpen(true)} 
        />
      )}
      
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
          <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />

          {/* Policy Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/merchant-policy" element={<MerchantPolicy />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="retailers" element={<AdminRetailers />} />
          </Route>
        </Routes>
      </PageWrapper>

      {!isAdmin && <Footer />}

      {!isAdmin && (
        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={items}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          total={total}
        />
      )}
    </div>
  );
};

export default App;
