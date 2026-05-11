import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase/client'
import { Retailer } from '../types'
import { toast } from 'react-hot-toast'

const dbToRetailer = (db: any): Retailer => ({
  id:           db.id,
  name:         db.name,
  email:        db.email,
  phone:        db.phone,
  shopName:     db.shop_name,
  retailerId:   db.retailer_id,
  isApproved:   db.is_approved ?? true,
  loginMethod:  db.login_method === 'google' || db.login_method === 'email' ? db.login_method : 'email',
  photoURL:     db.photo_url,
  createdAt:    db.created_at,
})

export const useAdminRetailers = () => {
  const [retailers, setRetailers] = useState<Retailer[]>([])
  const [loading,   setLoading]   = useState(true)

  const fetchRetailers = async () => {
    const { data, error } = await supabase
      .from('retailers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) { toast.error('Failed to load retailers'); return }
    setRetailers((data || []).map(dbToRetailer))
    setLoading(false)
  }

  useEffect(() => {
    fetchRetailers()

    const channel = supabase
      .channel('retailers-admin-changes')
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'retailers'
      }, fetchRetailers)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const approveRetailer = async (id: string) => {
    const { error } = await supabase
      .from('retailers')
      .update({ is_approved: true })
      .eq('id', id)

    if (error) { toast.error('Failed to approve retailer'); return }
    toast.success('Retailer approved!')
  }

  const rejectRetailer = async (id: string) => {
    const { error } = await supabase
      .from('retailers')
      .update({ is_approved: false })
      .eq('id', id)

    if (error) { toast.error('Failed to reject retailer'); return }
    toast.success('Retailer rejected.')
  }

  const deleteRetailer = async (id: string) => {
    const { error } = await supabase
      .from('retailers')
      .delete()
      .eq('id', id)

    if (error) { toast.error('Failed to delete retailer'); return }
    toast.success('Retailer removed.')
  }

  return { retailers, loading, approveRetailer, rejectRetailer, deleteRetailer }
}