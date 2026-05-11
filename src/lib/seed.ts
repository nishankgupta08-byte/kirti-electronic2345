import { supabase } from './supabase/client';

const sampleProducts = [
  {
    name: 'S-Series Headphones',
    description: 'Minimalist over-ear headphones with studio-grade audio fidelity and aircraft-grade aluminum construction.',
    price: 32000,
    category: 'Audio',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'],
    specs: { 'Driver': '40mm Beryllium', 'Battery': '40h', 'Weight': '280g' },
    stock_available: true,
    min_order_qty: 1,
    created_at: new Date().toISOString(),
  },
  {
    name: 'X1 Carbon Laptop',
    description: 'Ultra-thin architectural computing device with a 4K OLED display and tactile mechanical feedback.',
    price: 145000,
    category: 'Laptops',
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800'],
    specs: { 'CPU': 'M3 Pro', 'RAM': '32GB', 'Storage': '1TB' },
    stock_available: true,
    min_order_qty: 1,
    created_at: new Date().toISOString(),
  },
  {
    name: 'Ghost Smartphone',
    description: 'A distraction-free mobile device with an e-ink display and surgical steel frame.',
    price: 58000,
    category: 'Smartphones',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800'],
    specs: { 'Display': 'E-ink 120Hz', 'Network': '5G', 'Material': 'Steel' },
    stock_available: true,
    min_order_qty: 1,
    created_at: new Date().toISOString(),
  },
  {
    name: 'Studio Monitors',
    description: 'Active near-field monitors designed for pure transparency and mathematical precision.',
    price: 85000,
    category: 'Audio',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800'],
    specs: { 'Power': '200W', 'Range': '35Hz - 22kHz' },
    stock_available: true,
    min_order_qty: 1,
    created_at: new Date().toISOString(),
  }
];

export const seedDatabase = async () => {
  const { error } = await supabase.from('products').insert(sampleProducts);
  if (error) {
    console.error('Seed error:', error.message);
  } else {
    console.log('Database seeded successfully');
  }
};
