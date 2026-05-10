import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 px-6 min-h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl relative z-10 w-full"
      >
        <div className="glass rounded-3xl p-12 md:p-16 shadow-[0_32px_80px_rgba(124,58,237,0.12)] border border-white/60">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 font-body text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            Retailer-Only Platform
          </div>

          {/* Headline */}
          <h1 className="font-heading text-5xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight">
            <span className="gradient-text">KIRTI</span>
            <br />
            <span className="text-zinc-900">ELECTRONIC</span>
          </h1>

          <p className="font-body text-zinc-500 text-lg mb-8 leading-relaxed max-w-lg mx-auto">
            India's trusted bulk pre-booking platform for electronics retailers.
            Fast confirmations, zero payment upfront.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/products"
              className="bg-violet-600 hover:bg-violet-700 text-white font-body font-semibold text-sm px-8 py-3.5 rounded-2xl transition-all duration-200 hover:shadow-[0_8px_30px_rgba(124,58,237,0.4)] active:scale-95 inline-flex items-center justify-center gap-2"
            >
              Browse Products <ArrowRight size={18} />
            </Link>
            <Link
              to="/login"
              className="bg-white hover:bg-zinc-50 text-zinc-800 font-body font-semibold text-sm px-8 py-3.5 rounded-2xl border border-zinc-200 transition-all duration-200 hover:border-violet-300 active:scale-95 inline-flex items-center justify-center gap-2"
            >
              Retailer Login
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex justify-center gap-8 mt-10 pt-8 border-t border-zinc-100">
            {[
              { val: '500+', label: 'Products' },
              { val: '200+', label: 'Retailers' },
              { val: '5',    label: 'Categories' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-2xl font-bold gradient-text">{stat.val}</div>
                <div className="font-body text-xs text-zinc-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
