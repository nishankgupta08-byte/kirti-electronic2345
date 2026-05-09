import React from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface HomeProps {
  onAddToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const { products, loading } = useProducts('All');
  const featured = products.slice(0, 4);

  return (
    <div className="pb-20">
      <Hero />
      
      <section className="px-6 max-w-7xl mx-auto py-24 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-sky-500 font-mono text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Current Allocations</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">Priority Inventory</h2>
          </div>
          <Link 
            to="/products"
            className="group flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-sky-400 hover:text-white transition-all"
          >
            View Full Warehouse
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid 
          products={featured} 
          onAddToCart={onAddToCart} 
          loading={loading} 
        />
      </section>

      <section className="px-6 py-40 bg-white/5 backdrop-blur-2xl border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.5em] text-sky-500 uppercase mb-6 block">Retailer First</span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.95] text-white">
              Fast Track <br />
              <span className="text-sky-500">Confirmations</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-md leading-relaxed font-medium">
              We understand the speed of retail. Our platform is designed for rapid 
              inventory securing, with most bulk bookings confirmed within 15 minutes 
              during business hours.
            </p>
            <div className="flex gap-6 items-center">
              <button className="px-10 py-5 bg-sky-500 text-white font-bold hover:bg-sky-400 transition-all rounded-2xl shadow-lg shadow-sky-500/20 active:scale-95">
                Register as Merchant
              </button>
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">KIRTI_B2B_PROTOCOL_V2.0</span>
            </div>
          </motion.div>
          
          <div className="relative group">
            <div className="aspect-square glass-morphism rounded-[40px] overflow-hidden p-8 group-hover:border-sky-500/30 transition-all duration-700">
              <img 
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800" 
                alt="Logistics detail"
                className="w-full h-full object-contain opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 scale-90 group-hover:scale-100"
              />
            </div>
            
            {/* Absolute element for visual texture */}
            <div className="absolute -bottom-10 -left-10 w-48 h-48 border border-sky-500/10 font-mono text-[6px] p-6 text-sky-500/20 overflow-hidden leading-none hidden lg:block rounded-full backdrop-blur-sm">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="mb-1">
                  SECURE_ALLOCATION_PACKET_{Math.random().toString(16).slice(2, 8).toUpperCase()}... OK
                </div>
              ))}
            </div>
            
            <div className="absolute top-10 -right-10 w-32 h-32 bg-sky-500/20 blur-3xl rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
