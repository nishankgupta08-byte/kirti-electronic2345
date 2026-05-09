import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../hooks/useCart';
import { useOrder } from '../hooks/useOrder';
import { useNavigate } from 'react-router-dom';
import OrderForm from '../components/order/OrderForm';
import OrderSummary from '../components/order/OrderSummary';
import OrderSuccess from '../components/order/OrderSuccess';
import { motion } from 'motion/react';
import { toast } from 'react-hot-toast';

const Order: React.FC = () => {
  const { user, isApproved, loading: authLoading } = useAuth();
  const { items, total, clearCart } = useCart();
  const { submitOrder, status, orderId } = useOrder(items, total, clearCart);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        toast.error("Please login to proceed");
        navigate('/login?redirect=/order');
      } else if (!isApproved) {
        toast.error("Account pending approval");
        navigate('/');
      } else if (items.length === 0 && status !== 'success') {
        toast.error("Your cart is empty");
        navigate('/products');
      }
    }
  }, [user, isApproved, items, authLoading, navigate, status]);

  if (authLoading) return null;

  if (status === 'success' && orderId) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen flex items-center justify-center">
        <OrderSuccess orderId={orderId} email={user?.email || ''} />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <span className="text-sky-500 font-mono text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Merchant Secure Checkout</span>
        <h1 className="text-5xl font-black mb-4 tracking-tighter text-white leading-none">Pre-Booking Dispatch</h1>
        <p className="text-slate-400 max-w-lg font-medium">
          Finalize your bulk allocation request. Our dispatch team will verify dealer 
          credentials before confirming warehouse release.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        <OrderForm onSubmit={submitOrder} loading={status === 'loading'} />
        <OrderSummary items={items} total={total} />
      </div>
    </div>
  );
};

export default Order;
