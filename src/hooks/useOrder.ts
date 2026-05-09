import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CartItem, Order, OrderStatus } from '../types';
import { submitOrderForm } from '../lib/formspree';
import { sendWhatsAppNotification } from '../lib/whatsapp';

export const useOrder = (items: CartItem[], total: number, clearCart: () => void) => {
  const [status, setStatus] = useState<OrderStatus>('idle');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const submitOrder = async (formData: {
    name: string;
    email: string;
    phone: string;
    shopName: string;
    retailerId: string;
    address: string;
    notes: string;
  }) => {
    setStatus('loading');
    setErrorMsg('');

    try {
      // Step 1 -- Generate order ID
      const generatedOrderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

      // Step 2 -- Build order object
      const orderData: Order = {
        orderId: generatedOrderId,
        retailerId: formData.retailerId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        shopName: formData.shopName,
        shippingAddress: formData.address,
        specialInstructions: formData.notes,
        items: items,
        total: total,
        status: 'pending',
        createdAt: serverTimestamp() as any // Firestore handles this
      };

      // Step 3 -- Save to Firestore (always first -- source of truth)
      await addDoc(collection(db, 'orders'), orderData);

      // Step 4 -- Submit to Formspree (replaces both EmailJS emails)
      await submitOrderForm({
        orderId: generatedOrderId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        shopName: formData.shopName,
        retailerId: formData.retailerId,
        shippingAddress: formData.address,
        specialInstructions: formData.notes,
        items: items.map(item => ({
          name: item.name,
          qty: item.quantity,
          unitPrice: item.price,
          subtotal: item.quantity * item.price,
        })),
        total: total,
      });

      // Step 5 -- WhatsApp deep-link (unchanged)
      sendWhatsAppNotification(orderData);

      // Step 6 -- Clear cart + set success
      setOrderId(generatedOrderId);
      setStatus('success');
      clearCart();
    } catch (err: any) {
      console.error('Order submission error:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Submission failed. Please try again.');
      // Cart is NOT cleared on error
    }
  };

  const resetStatus = () => {
    setStatus('idle');
    setOrderId(null);
    setErrorMsg('');
  };

  return { submitOrder, status, orderId, errorMsg, resetStatus };
};
