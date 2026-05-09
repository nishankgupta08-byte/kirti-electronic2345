import React from 'react';
import { seedDatabase } from '../lib/seed';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950/50 backdrop-blur-md border-t border-white/5 py-16 px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sky-400 text-2xl">⚡</span>
            <h2 className="text-2xl font-black tracking-tighter text-white">
              <span className="text-sky-500">KIRTI</span> ELECTRONIC
            </h2>
          </div>
          <p className="text-slate-500 max-w-sm mb-8 font-medium">
            India's premier pre-booking platform for verified electronics retailers. 
            Direct warehouse access, real-time allocations, and tiered dealer pricing.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest">EST. 1998 / NEW DELHI</span>
            <button 
              onClick={() => seedDatabase()}
              className="text-[10px] font-mono text-sky-500/20 hover:text-sky-500 hover:underline transition-all uppercase tracking-widest font-bold"
            >
              System Initialize
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white mb-6">Legal Framework</h3>
          <ul className="space-y-3 text-sm text-slate-500 font-medium">
            <li><Link to="/merchant-policy" className="hover:text-sky-400 transition-colors">Merchant Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-sky-400 transition-colors">Terms of Trade</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-sky-400 transition-colors">Privacy Protocol</Link></li>
            <li><Link to="/support" className="hover:text-sky-400 transition-colors">Support Matrix</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white mb-6">Communications</h3>
          <ul className="space-y-4 text-sm text-slate-500 font-medium">
            <li className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-700 uppercase">Primary Email</span>
              <a href="mailto:wholesale@kirtielec.com" className="hover:text-sky-400 transition-colors text-white">wholesale@kirtielec.com</a>
            </li>
            <li className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-700 uppercase">Retailer Hotline</span>
              <span className="text-white">+91 91234 56789</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-slate-700 uppercase font-bold tracking-widest">
        <span>© 2026 KIRTI ELECTRONIC. NO 0492-W-INV</span>
        <div className="flex gap-6">
          <span className="text-sky-500/40">Status: System Operational</span>
          <span>Terms of Trade</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
