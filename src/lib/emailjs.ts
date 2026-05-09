import emailjs from '@emailjs/browser';
import { CustomerEmailParams, OwnerEmailParams } from '../types';

// TODO: Replace with your EmailJS credentials
const SERVICE_ID = 'TODO_YOUR_SERVICE_ID';
const OWNER_TEMPLATE_ID = 'TODO_OWNER_TEMPLATE_ID';
const CUSTOMER_TEMPLATE_ID = 'TODO_CUSTOMER_TEMPLATE_ID';
const PUBLIC_KEY = 'TODO_YOUR_PUBLIC_KEY';

export const initEmailJS = () => emailjs.init(PUBLIC_KEY);

export const sendCustomerEmail = async (params: CustomerEmailParams) => {
  if (SERVICE_ID === 'TODO_YOUR_SERVICE_ID') {
    console.warn('EmailJS Service ID not configured');
    return;
  }
  
  return emailjs.send(SERVICE_ID, CUSTOMER_TEMPLATE_ID, {
    to_name: params.name,
    to_email: params.email,
    retailer_id: params.retailerId,
    shop_name: params.shopName,
    order_id: params.orderId,
    order_items: params.items.map(i =>
      `${i.name} × ${i.quantity} units @ ₹${i.price} = ₹${i.price * i.quantity}`
    ).join('\n'),
    order_total: `₹${params.total.toLocaleString('en-IN')}`,
    shipping_addr: params.address,
    order_date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric'
    }),
    support_email: 'wholesale@kirtielec.com',
    support_phone: '+91 91234 56789',
  });
};

export const sendOwnerEmail = async (params: OwnerEmailParams) => {
  if (SERVICE_ID === 'TODO_YOUR_SERVICE_ID') {
    console.warn('EmailJS Service ID not configured');
    return;
  }

  return emailjs.send(SERVICE_ID, OWNER_TEMPLATE_ID, {
    to_email: 'wholesale@kirtielec.com',
    order_id: params.orderId,
    retailer_name: params.name,
    retailer_email: params.email,
    retailer_phone: params.phone,
    shop_name: params.shopName,
    retailer_id: params.retailerId,
    order_items: params.items.map(i =>
      `${i.name} × ${i.quantity} @ ₹${i.price} = ₹${i.price * i.quantity}`
    ).join('\n'),
    order_total: `₹${params.total.toLocaleString('en-IN')}`,
    shipping_addr: params.address,
    special_notes: params.notes || 'None',
    order_time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  });
};
