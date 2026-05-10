import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'motion/react';
import { useDeviceType } from './utils/useDeviceType';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThreeBackground from './components/ThreeBackground';
import CartDrawer from './components/CartDrawer';
import MobileLayout from './components/mobile/MobileLayout';
import MobileCartDrawer from './components/mobile/MobileCartDrawer';
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
  const device = useDeviceType();
  const isMobile = device === 'mobile';

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setIsCartOpen(true);
  };

  return (
    <AuthProvider>
      <Router key="router" basename={import.meta.env.BASE_URL}>
        <AppContent
          isMobile={isMobile}
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
  isMobile,
  items,
  isCartOpen,
  setIsCartOpen,
  handleAddToCart,
  updateQuantity,
  removeFromCart,
  total,
}) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Mobile layout
  if (isMobile && !isAdmin) {
    return (
      <MobileLayout
        cartCount={items.length}
        onOpenCart={() => setIsCartOpen(true)}
      >
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#FAFAFA',
              color: '#3F3F46',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: '500',
            },
          }}
        />
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/products" element={<Products onAddToCart={handleAddToCart} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/order" element={<Order />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/merchant-policy" element={<MerchantPolicy />} />
          </Routes>
        </PageWrapper>
        <MobileCartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={items}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          total={total}
        />
      </MobileLayout>
    );
  }

  // Desktop layout (or admin)
  return (
    <div className={`relative min-h-screen flex flex-col ${isAdmin ? 'bg-white' : 'bg-transparent'}`}>
      {!isAdmin && <ThreeBackground />}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: isAdmin ? '#09090B' : '#FAFAFA',
            color: isAdmin ? '#FAFAFA' : '#3F3F46',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
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
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/merchant-policy" element={<MerchantPolicy />} />
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
