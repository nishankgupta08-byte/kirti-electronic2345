import React from 'react'
import { Link } from 'react-router-dom'

const MobileHero: React.FC = () => {
  return (
    <section className="px-5 pt-8 pb-10">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 text-violet-700 font-body text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
        Retailer-Only Platform
      </div>

      {/* Headline */}
      <h1 className="font-heading text-4xl font-extrabold leading-[1.15] mb-3">
        <span className="gradient-text">KIRTI</span>
        <br />
        <span className="text-zinc-900">ELECTRONIC</span>
      </h1>

      {/* Subtext */}
      <p className="font-body text-sm text-zinc-500 leading-relaxed mb-7 max-w-xs">
        India's trusted bulk pre-booking platform for electronics retailers.
      </p>

      {/* CTA buttons — stacked on mobile */}
      <div className="flex flex-col gap-3">
        <Link
          to="/products"
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-body font-semibold text-sm py-3.5 rounded-2xl active:scale-95 transition-all duration-150 shadow-[0_4px_20px_rgba(124,58,237,0.35)] text-center"
        >
          Browse Products →
        </Link>
        <Link
          to="/login"
          className="w-full bg-white text-zinc-800 font-body font-semibold text-sm py-3.5 rounded-2xl border border-zinc-200 active:scale-95 transition-all duration-150 text-center"
        >
          Retailer Login
        </Link>
      </div>

      {/* Stats — horizontal scrollable chips */}
      <div className="flex gap-3 mt-8 overflow-x-auto scrollbar-hide pb-1">
        {[
          { val: '500+', label: 'Products', color: 'violet' },
          { val: '200+', label: 'Retailers', color: 'sky' },
          { val: '5', label: 'Categories', color: 'emerald' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="shrink-0 bg-zinc-50 border border-zinc-100 rounded-2xl px-4 py-3 text-center"
          >
            <div className="font-heading text-lg font-bold gradient-text">{stat.val}</div>
            <div className="font-body text-[11px] text-zinc-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MobileHero
