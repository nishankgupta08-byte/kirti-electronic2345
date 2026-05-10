import React from 'react';
import Hero from '../components/Hero';
import MobileHero from '../components/mobile/MobileHero';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';
import { useDeviceType } from '../utils/useDeviceType';
import { ArrowRight, Package, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

interface HomeProps {
  onAddToCart: (p: Product) => void;
}

const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const device = useDeviceType();
  const isMobile = device === 'mobile';
  const { products, loading } = useProducts('All');
  const featured = products.slice(0, isMobile ? 2 : 4);

  return (
    <div className="pb-20">
      {isMobile ? <MobileHero /> : <Hero />}

      {/* Feature Strip */}
      <section className="px-6 max-w-7xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Package,  color: 'violet', label: 'Bulk Pre-Booking',    desc: 'Order in wholesale quantities with ease and full flexibility.', border: 'border-violet-500',  bg: 'bg-violet-50',  icontext: 'text-violet-600'  },
            { icon: Zap,      color: 'sky',    label: 'Instant Confirmation', desc: 'Email confirmation the moment your pre-booking is placed.',    border: 'border-sky-500',     bg: 'bg-sky-50',     icontext: 'text-sky-600'     },
            { icon: ShieldCheck,color:'emerald',label:'Retailer Exclusive',  desc: 'Platform access strictly for approved retail partners only.',   border: 'border-emerald-500', bg: 'bg-emerald-50', icontext: 'text-emerald-600' },
          ].map((f) => (
            <div key={f.label} className="bg-white rounded-2xl p-6 border border-zinc-100 border-l-4" style={{ borderLeftColor: f.color === 'violet' ? '#7C3AED' : f.color === 'sky' ? '#0EA5E9' : '#10B981' }}>
              <div className={`w-10 h-10 rounded-xl ${f.bg} flex items-center justify-center mb-4`}>
                <f.icon size={20} className={f.icontext} />
              </div>
              <h3 className="font-heading font-semibold text-zinc-900 mb-1">{f.label}</h3>
              <p className="font-body text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 max-w-7xl mx-auto py-16 relative z-10 bg-white rounded-3xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-violet-600 font-mono text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block">Current Allocations</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900">Priority Inventory</h2>
          </div>
          <Link
            to="/products"
            className="group flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-all hover-underline"
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

      {/* Info Section */}
      <section className="px-6 py-20 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.5em] text-violet-600 uppercase mb-4 block">Retailer First</span>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-zinc-900">
              Fast Track <br />
              <span className="gradient-text">Confirmations</span>
            </h2>
            <p className="text-zinc-500 text-lg mb-8 max-w-md leading-relaxed font-medium">
              We understand the speed of retail. Our platform is designed for rapid
              inventory securing, with most bulk bookings confirmed within 15 minutes
              during business hours.
            </p>
            <div className="flex gap-4 items-center">
              <button className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-violet-600/25 transition-all hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)] active:scale-95">
                Register as Merchant
              </button>
            </div>
          </motion.div>

          <div className="relative group">
            <div className="aspect-square glass rounded-3xl overflow-hidden p-8 border border-white/60 shadow-[0_32px_80px_rgba(124,58,237,0.12)]">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800"
                alt="Logistics detail"
                className="w-full h-full object-contain opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-90 transition-all duration-1000 scale-90 group-hover:scale-100"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
