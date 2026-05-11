import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase/client'
import { Category } from '../types'
import { toast } from 'react-hot-toast'

const dbToCategory = (db: any): Category => ({
  id:        db.id,
  name:      db.name,
  icon:      db.icon,
  slug:      db.slug,
  createdAt: db.created_at,
  updatedAt: db.updated_at,
})

export const useAdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading,    setLoading]    = useState(true)

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) { toast.error('Failed to load categories'); return }
    setCategories((data || []).map(dbToCategory))
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()

    const channel = supabase
      .channel('categories-admin-changes')
      .on('postgres_changes', {
        event: '*', schema: 'public', table: 'categories'
      }, fetchCategories)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const addCategory = async (name: string, icon: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const { error } = await supabase
      .from('categories')
      .insert({ name, icon, slug })

    if (error) {
      toast.error(error.message.includes('unique') ? 'Category already exists.' : 'Failed to add category')
      return
    }
    toast.success('Category added!')
  }

  const updateCategory = async (id: string, name: string, icon: string) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    const { error } = await supabase
      .from('categories')
      .update({ name, icon, slug })
      .eq('id', id)

    if (error) { toast.error('Failed to update category'); return }
    toast.success('Category updated!')
  }

  const deleteCategory = async (id: string) => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) { toast.error('Failed to delete category'); return }
    toast.success('Category deleted.')
  }

  return { categories, loading, addCategory, updateCategory, deleteCategory }
}