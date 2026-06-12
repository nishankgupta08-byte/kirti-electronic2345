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
            { icon: Package,     code: 'PRT-ALLOC', label: 'Bulk Pre-Booking',    desc: 'Order in wholesale quantities with ease and full inventory priority.' },
            { icon: Zap,         code: 'INST-FEED', label: 'Instant Confirmation', desc: 'Secure allocation the moment your pre-booking is placed.'    },
            { icon: ShieldCheck, code: 'APRV-ONLY', label: 'Retailer Exclusive',  desc: 'Platform access strictly verified and locked to approved retail partners.' },
          ].map((f) => (
            <div key={f.label} className="bg-white border border-kirti-border rounded-lg p-6 relative overflow-hidden shadow-[3px_3px_0px_rgba(15,29,54,0.03)] group hover:border-kirti-orange transition-colors duration-300">
              <div className="absolute top-2.5 right-3 font-mono text-[9px] text-kirti-muted select-none">[{f.code}]</div>
              <div className="w-10 h-10 rounded border border-kirti-orange/20 bg-kirti-orange-light flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <f.icon size={20} className="text-kirti-orange" />
              </div>
              <h3 className="font-heading font-bold text-kirti-cobalt text-base mb-1.5">{f.label}</h3>
              <p className="font-sans text-xs text-kirti-body leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 max-w-7xl mx-auto py-16 relative z-10 bg-white border border-kirti-border rounded-xl shadow-[4px_4px_0px_rgba(15,29,54,0.04)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-kirti-orange font-mono text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block">// PRIORITY ALLOCATIONS</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-kirti-cobalt">AVAILABLE INVENTORY</h2>
          </div>
          <Link
            to="/products"
            className="group flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-kirti-orange hover:text-kirti-orange-hover transition-colors hover-underline"
          >
            Scan Warehouse Catalog
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <ProductGrid
          products={featured}
          onAddToCart={onAddToCart}
          loading={loading}
        />
      </section>

      {/* Info Section */}
      <section className="px-6 py-20 bg-kirti-surface border-y border-kirti-border mt-20 relative overflow-hidden">
        {/* Decorative Grid Trace */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-kirti-orange uppercase block">// WAREHOUSE METRICS</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-kirti-cobalt leading-none">
              RAPID ROUTING <br />
              <span className="gradient-text">CONFIRMATIONS</span>
            </h2>
            <p className="text-kirti-body text-base max-w-md leading-relaxed font-medium">
              We understand the velocity of retail commerce. Our backend allocation router 
              secures inventory instantly, validating bulk retailer orders within 15 minutes during trading hours.
            </p>
            <div className="flex gap-4 items-center">
              <Link
                to="/login"
                className="bg-kirti-orange hover:bg-kirti-orange-hover text-white font-mono text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-sm shadow-[2px_2px_0px_rgba(15,29,54,1)] active:translate-y-[1px] transition-all"
              >
                Register Merchant Node
              </Link>
            </div>
          </motion.div>

          <div className="relative group">
            {/* Double border blueprint card for imagery */}
            <div className="bg-white border-2 border-kirti-cobalt rounded-lg p-1 shadow-[4px_4px_0px_rgba(15,29,54,1)]">
              <div className="aspect-square bg-kirti-offwhite rounded border border-kirti-border overflow-hidden p-8 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800"
                  alt="Logistics telemetry"
                  className="w-full h-full object-contain opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-95 group-hover:scale-100"
                />
              </div>
            </div>
            {/* Badge overlay on image */}
            <div className="absolute -bottom-4 -right-4 bg-kirti-cobalt text-white font-mono text-[9px] font-bold px-3 py-2 rounded-sm border border-kirti-border shadow-md">
              FEED_LINK: ACTIVE
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
