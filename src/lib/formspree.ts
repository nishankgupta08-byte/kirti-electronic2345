// lib/formspree.ts
// Central Formspree submission utility -- used by both forms

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnjwgrrj'

// -- CONTACT FORM SUBMISSION -----------------------------------
export interface ContactFormData {
  name:    string
  email:   string
  message: string
}

export const submitContactForm = async (data: ContactFormData): Promise<void> => {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method:  'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept':        'application/json',
    },
    body: JSON.stringify({
      _subject:  `New Contact Message -- KIRTI ELECTRONIC`,
      name:       data.name,
      email:      data.email,
      message:    data.message,
      _source:    'Contact Form',
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData?.errors?.[0]?.message || 'Contact form submission failed.')
  }
}

// -- ORDER FORM SUBMISSION ------------------------------------
export interface OrderFormspreeData {
  orderId:              string
  name:                 string
  email:                string
  phone:                string
  shopName:             string
  retailerId:           string
  shippingAddress:      string
  specialInstructions?: string
  items:                Array<{
    name:      string
    qty:       number
    unitPrice: number
    subtotal:  number
  }>
  total: number
}

export const submitOrderForm = async (data: OrderFormspreeData): Promise<void> => {
  // Format items into a readable string for the email Formspree sends:
  const itemsList = data.items
    .map(i => `• ${i.name}  ×${i.qty}  @ ₹${i.unitPrice}  = ₹${i.subtotal.toLocaleString('en-IN')}`)
    .join('\n')

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method:  'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept':        'application/json',
    },
    body: JSON.stringify({
      _subject:               `🛒 New Pre-Booking #${data.orderId} -- KIRTI ELECTRONIC`,
      order_id:               data.orderId,
      retailer_name:          data.name,
      retailer_email:         data.email,
      retailer_phone:         data.phone,
      shop_name:              data.shopName,
      retailer_id:            data.retailerId,
      items_ordered:          itemsList,
      order_total:            `₹${data.total.toLocaleString('en-IN')}`,
      shipping_address:       data.shippingAddress,
      special_instructions:   data.specialInstructions || 'None',
      submitted_at:           new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      _source:                'Pre-Booking Order Form',
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData?.errors?.[0]?.message || 'Order submission failed.')
  }
}
