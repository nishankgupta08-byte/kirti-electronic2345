import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase/client'
import { filterDemoProducts } from '../data/demoProducts'
import { Product } from '../types'

// ── Helpers ──────────────────────────────────────────────
const dbToProduct = (db: any): Product => ({
  id:            db.id,
  name:          db.name,
  description:   db.description || '',
  overview:      db.overview,
  price:         db.price,
  category:      db.category,
  images:        db.images || [],
  specs:         db.specs,
  stockAvailable: db.stock_available ?? true,
  minOrderQty:   db.min_order_qty ?? 1,
  rating:        db.rating,
  reviewCount:   db.review_count,
  reviews:       db.reviews,
  createdAt:     db.created_at,
  updatedAt:     db.updated_at,
})

export const useProducts = (category: string = 'All') => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const fetchProducts = async () => {
      let query = supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (category !== 'All') {
        query = query.eq('category', category)
      }

      const { data, error } = await query

      if (cancelled) return

      if (error) {
        setProducts(filterDemoProducts(category))
        setLoading(false)
        return
      }

      const fetched = (data || []).map(dbToProduct)
      setProducts(fetched.length > 0 ? fetched : filterDemoProducts(category))
      setLoading(false)
    }

    fetchProducts()

    const channel = supabase
      .channel('products-public-changes')
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'products'
      }, fetchProducts)
      .subscribe()

    return () => {
      cancelled = true
      supabase.removeChannel(channel)
    }
  }, [category])

  return { products, loading, error }
}