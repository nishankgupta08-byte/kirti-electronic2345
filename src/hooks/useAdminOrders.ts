import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase/client'
import { Order, CartItem } from '../types'
import { toast } from 'react-hot-toast'

const dbToOrder = (db: any): Order => ({
  id:          db.id,
  retailerId:  db.retailer_id,
  retailerInfo: {
    name:       db.name,
    email:      db.email,
    phone:      db.phone,
    shopName:   db.shop_name,
    retailerId: db.retailer_id,
  },
  shippingInfo: {
    address: db.shipping_address,
    city:    '',
    state:   '',
    pincode: '',
  },
  additionalInfo: db.special_instructions ? { notes: db.special_instructions } : undefined,
  items: db.items ? (Array.isArray(db.items) ? db.items.map((item: any) => ({
    id:          item.name,
    name:        item.name,
    description: '',
    price:       item.unit_price,
    category:    '',
    images:      [],
    stockAvailable: true,
    minOrderQty: 1,
    createdAt:   db.created_at,
    quantity:    item.qty,
  } as CartItem)) : []) : [],
  totalAmount: db.total ?? 0,
  status:      db.status as Order['status'],
  createdAt:   db.created_at,
})

export const useAdminOrders = () => {
  const [orders,  setOrders]  = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) { toast.error('Failed to load orders'); return }
    setOrders((data || []).map(dbToOrder))
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()

    const channel = supabase
      .channel('orders-admin-changes')
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'orders'
      }, fetchOrders)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)

    if (error) { toast.error('Failed to update status'); return }
    toast.success(`Order marked as ${status}`)
  }

  const deleteOrder = async (id: string) => {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)

    if (error) { toast.error('Failed to delete order'); return }
    toast.success('Order deleted.')
  }

  return { orders, loading, updateOrderStatus, deleteOrder }
}