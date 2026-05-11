import { useState } from 'react'
import { supabase } from '../lib/supabase/client'
import { CartItem } from '../types'
import { submitOrderForm } from '../lib/formspree'
import { sendWhatsAppNotification } from '../lib/whatsapp'
import { toast } from 'react-hot-toast'

type OrderStatus = 'idle' | 'loading' | 'success' | 'error'

const generateOrderId = () =>
  `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

export const useOrder = (
  items: CartItem[],
  total: number,
  clearCart: () => void
) => {
  const [status,   setStatus]   = useState<OrderStatus>('idle')
  const [orderId,  setOrderId]  = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const submitOrder = async (formData: {
    name: string
    email: string
    phone: string
    shopName: string
    retailerId: string
    address: string
    notes: string
  }) => {
    setStatus('loading')
    setErrorMsg('')

    try {
      // 1) Generate order ID
      const generatedOrderId = generateOrderId()

      // 2) Build order
      const orderRow = {
        order_id:             generatedOrderId,
        retailer_id:          formData.retailerId, // adjust if your table uses auth.uid() via RLS
        name:                 formData.name,
        email:                formData.email,
        phone:                formData.phone,
        shop_name:            formData.shopName,
        shipping_address:     formData.address,
        special_instructions:   formData.notes || '',
        items:                items.map(item => ({
          name:       item.name,
          qty:        item.quantity,
          unit_price: item.price,
          subtotal:   item.quantity * item.price,
        })),
        total,
        status: 'pending',
      }

      // 3) Save to Supabase
      const { error: dbError } = await supabase
        .from('orders')
        .insert(orderRow)

      if (dbError) throw new Error(dbError.message)

      // 4) Submit to Formspree
      await submitOrderForm({
        orderId:             generatedOrderId,
        name:                formData.name,
        email:               formData.email,
        phone:               formData.phone,
        shopName:            formData.shopName,
        retailerId:          formData.retailerId,
        shippingAddress:     formData.address,
        specialInstructions: formData.notes,
        items:               items.map(item => ({
          name:      item.name,
          qty:       item.quantity,
          unitPrice: item.price,
          subtotal:  item.quantity * item.price,
        })),
        total,
      })

      // 5) WhatsApp deep-link
      sendWhatsAppNotification({
        orderId: generatedOrderId,
        name:    formData.name,
        shopName:formData.shopName,
        phone:   formData.phone,
        email:   formData.email,
        address: formData.address,
        notes:   formData.notes || '',
        items:   items.map(c => ({ name: c.name, qty: c.quantity, subtotal: c.quantity * c.price })),
        total,
      })

      clearCart()
      setOrderId(generatedOrderId)
      setStatus('success')
    } catch (err: any) {
      console.error('Order error:', err)
      setStatus('error')
      setErrorMsg(err.message || 'Submission failed. Please try again.')
    }
  }

  const resetStatus = () => {
    setStatus('idle')
    setOrderId(null)
    setErrorMsg('')
  }

  return { submitOrder, status, orderId, errorMsg, resetStatus }
}
