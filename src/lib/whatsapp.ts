import { Order } from '../types';

const OWNER_WHATSAPP = 'TODO_91XXXXXXXXXX';

export const sendWhatsAppNotification = (order: Order) => {
  const message = encodeURIComponent(
`🛒 *NEW PRE-BOOKING — KIRTI ELECTRONIC*

📋 *Order ID:* ${order.orderId}
👤 *Retailer:* ${order.name}
🏪 *Shop:* ${order.shopName}
🆔 *Retailer ID:* ${order.retailerId}
📞 *Phone:* ${order.phone}
📧 *Email:* ${order.email}

📦 *Items Ordered:*
${order.items.map(i => `• ${i.name} × ${i.quantity} = ₹${i.price * i.quantity}`).join('\n')}

💰 *Total: ₹${order.total.toLocaleString('en-IN')}*

🚚 *Ship To:*
${order.shippingAddress}

📝 *Notes:* ${order.specialInstructions || 'None'}
🕐 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
  );

  if (OWNER_WHATSAPP === 'TODO_91XXXXXXXXXX') {
    console.warn('WhatsApp number not configured');
    return;
  }

  window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${message}`, '_blank');
};
