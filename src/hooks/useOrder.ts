import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CartItem, Order, OrderStatus } from '../types';
import { sendCustomerEmail, sendOwnerEmail } from '../lib/emailjs';
import { sendWhatsAppNotification } from '../lib/whatsapp';

export const useOrder = (items: CartItem[], total: number, clearCart: () => void) => {
  const [status, setStatus] = useState<OrderStatus>('idle');
  const [orderId, setOrderId] = useState<string | null>(null);

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

    try {
      // 1. Generate order ID
      const generatedOrderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

      // 2. Build order object
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

      // 3. Save to Firestore
      await addDoc(collection(db, 'orders'), orderData);

      // 4. Send emails simultaneously
      await Promise.all([
        sendCustomerEmail({
          name: formData.name,
          email: formData.email,
          retailerId: formData.retailerId,
          shopName: formData.shopName,
          orderId: generatedOrderId,
          items: items,
          total: total,
          address: formData.address
        }),
        sendOwnerEmail({
          name: formData.name,
          email: formData.email,
          retailerId: formData.retailerId,
          shopName: formData.shopName,
          orderId: generatedOrderId,
          items: items,
          total: total,
          address: formData.address,
          phone: formData.phone,
          notes: formData.notes
        })
      ]);

      // 5. WhatsApp notification
      sendWhatsAppNotification(orderData);

      // 6. Success handling
      setOrderId(generatedOrderId);
      setStatus('success');
      clearCart();
    } catch (err) {
      console.error('Order submission failed:', err);
      setStatus('error');
    }
  };

  const resetStatus = () => {
    setStatus('idle');
    setOrderId(null);
  };

  return { submitOrder, status, orderId, resetStatus };
};
