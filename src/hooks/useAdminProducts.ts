import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase/client'
import { Product } from '../types'
import { toast } from 'react-hot-toast'

// ── Helpers ──────────────────────────────────────────────
const dbToProduct = (db: any): Product => ({
  id:            db.id,
  name:          db.name,
  description:   db.description || '',
  price:         db.price,
  category:      db.category,
  images:        db.images || [],
  specs:         db.specs,
  stockAvailable: db.stock_available ?? true,
  minOrderQty:   db.min_order_qty ?? 1,
  createdAt:     db.created_at,
  updatedAt:     db.updated_at,
})

const uploadImage = async (file: File): Promise<string> => {
  const path = `${Date.now()}_${file.name.replace(/\s/g, '_')}`

  const { error } = await supabase.storage
    .from('product-images')
    .upload(path, file, { cacheControl: '3600', upsert: false })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(path)

  return data.publicUrl
}

const deleteImage = async (url: string) => {
  const path = url.split('/product-images/')[1]
  if (!path) return
  await supabase.storage.from('product-images').remove([path])
}

// ── Hook ──────────────────────────────────────────────────
export const useAdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) { toast.error('Failed to load products'); setLoading(false); return }
    setProducts((data || []).map(dbToProduct))
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()

    const channel = supabase
      .channel('products-admin-changes')
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'products'
      }, fetchProducts)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  // ── ADD ───────────────────────────────────────────────────
  const addProduct = async (
    data: Partial<Product>,
    imageFiles: File[]
  ) => {
    try {
      const imageURLs = await Promise.all(imageFiles.map(uploadImage))

      const { error } = await supabase.from('products').insert({
        ...data,
        images: imageURLs,
      })

      if (error) throw new Error(error.message)
      toast.success('Product added!')
    } catch (err: any) {
      toast.error(err.message || 'Failed to add product')
    }
  }

  // ── UPDATE ────────────────────────────────────────────────
  const updateProduct = async (
    id: string,
    data: Partial<Product>,
    newImageFiles: File[],
    existingImageURLs: string[],
    removedImageURLs: string[]
  ) => {
    try {
      await Promise.all(removedImageURLs.map(deleteImage))
      const newURLs = await Promise.all(newImageFiles.map(uploadImage))

      const { error } = await supabase
        .from('products')
        .update({ ...data, images: [...existingImageURLs, ...newURLs] })
        .eq('id', id)

      if (error) throw new Error(error.message)
      toast.success('Product updated!')
    } catch (err: any) {
      toast.error(err.message || 'Failed to update product')
    }
  }

  // ── DELETE ────────────────────────────────────────────────
  const deleteProduct = async (product: Product) => {
    try {
      await Promise.all(product.images.map(deleteImage))

      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id)

      if (error) throw new Error(error.message)
      toast.success('Product deleted.')
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete product')
    }
  }

  // ── TOGGLE STOCK ──────────────────────────────────────────
  const toggleStock = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ stock_available: !current })
      .eq('id', id)

    if (error) { toast.error('Failed to update stock'); return }
    toast.success(current ? 'Marked out of stock' : 'Marked in stock')
  }

  return {
    products, loading,
    addProduct, updateProduct, deleteProduct, toggleStock
  }
}