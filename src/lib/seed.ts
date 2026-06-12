import { supabase } from './supabase/client'
import { demoProductsToDb } from '../data/demoProducts'

export const seedDatabase = async () => {
  const { error } = await supabase.from('products').insert(demoProductsToDb())
  if (error) {
    console.error('Seed error:', error.message)
  } else {
    console.log('Database seeded successfully')
  }
}
