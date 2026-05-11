interface WhatsAppItem {
  name: string;
  qty: number;
  subtotal: number;
}

interface WhatsAppOrder {
  orderId: string;
  name: string;
  shopName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  items: WhatsAppItem[];
  total: number;
}

const OWNER_WHATSAPP = 'TODO_91XXXXXXXXXX';

export const sendWhatsAppNotification = (order: WhatsAppOrder) => {
  const message = encodeURIComponent(
`🛒 *NEW PRE-BOOKING — KIRTI ELECTRONIC*

📋 *Order ID:* ${order.orderId}
👤 *Retailer:* ${order.name}
🏪 *Shop:* ${order.shopName}
📞 *Phone:* ${order.phone}
📧 *Email:* ${order.email}

📦 *Items Ordered:*
${order.items.map(i => `• ${i.name} × ${i.qty} = ₹${i.subtotal.toLocaleString('en-IN')}`).join('\n')}

💰 *Total: ₹${order.total.toLocaleString('en-IN')}*

🚚 *Ship To:*
${order.address}

📝 *Notes:* ${order.notes || 'None'}
🕐 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
  );

  if (OWNER_WHATSAPP === 'TODO_91XXXXXXXXXX') {
    console.warn('WhatsApp number not configured');
    return;
  }

  window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${message}`, '_blank');
};
