import React from 'react';
import { seedDatabase } from '../lib/seed';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-white relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Col 1 — Brand */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-heading font-bold text-xl">
              <span className="gradient-text">KIRTI</span> ELECTRONIC
            </span>
          </div>
          <p className="font-body text-sm text-zinc-400 leading-relaxed max-w-sm">
            India's premier pre-booking platform for verified electronics retailers.
            Direct warehouse access, real-time allocations, and tiered dealer pricing.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">EST. 1998 / NEW DELHI</span>
            <button
              onClick={() => seedDatabase()}
              className="text-[10px] font-mono text-zinc-600 hover:text-violet-400 hover:underline transition-all uppercase tracking-widest font-bold"
            >
              System Initialize
            </button>
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h3 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-widest">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/" className="hover-underline font-body text-zinc-400 hover:text-white transition-colors duration-200">Home</Link></li>
            <li><Link to="/products" className="hover-underline font-body text-zinc-400 hover:text-white transition-colors duration-200">Products</Link></li>
            <li><Link to="/login" className="hover-underline font-body text-zinc-400 hover:text-white transition-colors duration-200">Login</Link></li>
            <li><Link to="/contact" className="hover-underline font-body text-zinc-400 hover:text-white transition-colors duration-200">Contact</Link></li>
          </ul>
        </div>

        {/* Col 3 — Legal */}
        <div>
          <h3 className="font-heading font-semibold text-white mb-5 text-sm uppercase tracking-widest">
            Legal
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/merchant-policy" className="hover-underline font-body text-zinc-400 hover:text-white transition-colors duration-200">Merchant Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover-underline font-body text-zinc-400 hover:text-white transition-colors duration-200">Terms of Trade</Link></li>
            <li><Link to="/privacy-policy" className="hover-underline font-body text-zinc-400 hover:text-white transition-colors duration-200">Privacy Protocol</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 px-6 py-5">
        <p className="text-xs text-zinc-600 text-center font-body">
          © 2026 KIRTI ELECTRONIC. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
