import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const sampleProducts = [
  {
    name: 'S-Series Headphones',
    description: 'Minimalist over-ear headphones with studio-grade audio fidelity and aircraft-grade aluminum construction.',
    price: 32000,
    category: 'Audio',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'],
    specs: { 'Driver': '40mm Beryllium', 'Battery': '40h', 'Weight': '280g' },
    stock: 50,
    createdAt: Date.now()
  },
  {
    name: 'X1 Carbon Laptop',
    description: 'Ultra-thin architectural computing device with a 4K OLED display and tactile mechanical feedback.',
    price: 145000,
    category: 'Laptops',
    images: ['https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800'],
    specs: { 'CPU': 'M3 Pro', 'RAM': '32GB', 'Storage': '1TB' },
    stock: 20,
    createdAt: Date.now() + 1000
  },
  {
    name: 'Ghost Smartphone',
    description: 'A distraction-free mobile device with an e-ink display and surgical steel frame.',
    price: 58000,
    category: 'Smartphones',
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800'],
    specs: { 'Display': 'E-ink 120Hz', 'Network': '5G', 'Material': 'Steel' },
    stock: 15,
    createdAt: Date.now() + 2000
  },
  {
    name: 'Studio Monitors',
    description: 'Active near-field monitors designed for pure transparency and mathematical precision.',
    price: 85000,
    category: 'Audio',
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800'],
    specs: { 'Power': '200W', 'Range': '35Hz - 22kHz' },
    stock: 10,
    createdAt: Date.now() + 3000
  }
];

export const seedDatabase = async () => {
  const productsCol = collection(db, 'products');
  for (const product of sampleProducts) {
    await addDoc(productsCol, product);
  }
  console.log('Database seeded successfully');
};
