import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]">
          <div className="w-16 h-16 bg-sky-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-sky-400/30">
            <svg className="w-10 h-10 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          
          <span className="text-[10px] font-mono font-bold tracking-[0.5em] uppercase text-sky-400 mb-6 block drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]">
            Retailer Pre-Booking Platform
          </span>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-[0.95] text-white">
            KIRTI ELECTRONIC
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            Browse & pre-book electronics in bulk. Fast confirmations, secure portal, and zero payment upfront for <span className="text-white">verified retailers</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="group px-10 py-5 bg-sky-500 text-white flex items-center justify-center gap-3 hover:bg-sky-400 transition-all rounded-2xl font-bold shadow-lg shadow-sky-500/25 active:scale-95"
            >
              Browse Products
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all rounded-2xl backdrop-blur-md active:scale-95">
              Retailer Login
            </button>
          </div>

          <div className="mt-12 flex justify-center gap-12 text-[10px] font-mono border-t border-white/5 pt-8 uppercase tracking-widest text-slate-500">
            <div className="text-center">
              <div className="text-white font-bold text-lg leading-none mb-1">500+</div>
              <div>Products</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-lg leading-none mb-1">200+</div>
              <div>Retailers</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-lg leading-none mb-1">5</div>
              <div>Categories</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
