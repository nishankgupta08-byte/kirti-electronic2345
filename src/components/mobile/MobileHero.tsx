import React from 'react'
import { Link } from 'react-router-dom'
import { Terminal } from 'lucide-react'

const MobileHero: React.FC = () => {
  return (
    <section className="px-5 pt-8 pb-10">
      {/* Schematic Outer Casing */}
      <div className="bg-white border border-kirti-cobalt rounded-lg p-5 shadow-[3px_3px_0px_rgba(15,29,54,1)] relative overflow-hidden">
        
        {/* Technical Corner Labels */}
        <div className="absolute top-1 left-2 font-mono text-[8px] text-kirti-muted">[PORTABLE_NODE]</div>
        <div className="absolute top-1 right-2 font-mono text-[8px] text-kirti-muted">[REV: 2.0.4]</div>

        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 border border-kirti-orange/20 bg-kirti-orange-light text-kirti-orange font-mono text-[10px] font-bold px-2.5 py-1 rounded-sm mt-3 mb-5">
          <Terminal size={10} className="animate-pulse" />
          B2B ALLOCATION ROUTER
        </div>

        {/* Headline */}
        <h1 className="font-heading text-3xl font-bold leading-none mb-3 text-kirti-cobalt">
          KIRTI ELECTRONIC
        </h1>
        <h2 className="font-heading text-lg font-bold text-kirti-orange mb-3 tracking-tight">
          DIRECT INVENTORY GATEWAY
        </h2>

        {/* Subtext */}
        <p className="font-sans text-xs text-kirti-body leading-relaxed mb-6 font-medium">
          India's trusted bulk pre-booking network for electronics retailers. Secure allocations instantly with zero capital down.
        </p>

        {/* CTA buttons — stacked */}
        <div className="flex flex-col gap-2.5">
          <Link
            to="/products"
            className="w-full bg-kirti-orange hover:bg-kirti-orange-hover text-white font-mono text-xs font-bold tracking-wider uppercase py-3 rounded-sm text-center shadow-[1px_1px_0px_rgba(15,29,54,1)] active:translate-y-[1px] transition-all"
          >
            Scan Catalog →
          </Link>
          <Link
            to="/login"
            className="w-full bg-white text-kirti-cobalt border border-kirti-cobalt font-mono text-xs font-bold tracking-wider uppercase py-3 rounded-sm text-center active:translate-y-[1px] transition-all"
          >
            Retailer Login
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-kirti-border font-mono text-center">
          {[
            { val: '500+ SKU', label: 'INVENTORY' },
            { val: '200+ NODE', label: 'MERCHANTS' },
            { val: '15-MIN', label: 'CONFIRM' },
          ].map((stat) => (
            <div key={stat.label} className="py-1">
              <div className="text-xs font-bold text-kirti-cobalt">{stat.val}</div>
              <div className="text-[8px] text-kirti-muted mt-0.5 tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default MobileHero
