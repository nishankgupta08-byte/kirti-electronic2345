import React from 'react';
import { seedDatabase } from '../lib/seed';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-kirti-ink text-white relative z-10 border-t border-kirti-cobalt">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Col 1 — Brand */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-heading font-bold text-xl tracking-tight">
              <span className="text-kirti-orange">KIRTI</span> ELECTRONIC
            </span>
          </div>
          <p className="font-sans text-xs text-kirti-muted leading-relaxed max-w-sm font-medium">
            India's premier pre-booking gateway for verified electronics retailers. 
            Direct warehouse allocations, real-time logistics mapping, and tiered dealer pricing models.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <span className="text-[9px] font-mono font-bold text-kirti-muted uppercase tracking-widest">EST. 1998 / NEW DELHI</span>
            <button
              onClick={() => seedDatabase()}
              className="text-[9px] font-mono text-kirti-muted hover:text-kirti-orange hover:underline transition-all uppercase tracking-widest font-bold"
            >
              [Reset Console Database]
            </button>
          </div>
        </div>

        {/* Col 2 — Navigation */}
        <div className="font-mono">
          <h3 className="font-bold text-white mb-5 text-[11px] uppercase tracking-wider text-kirti-orange">
            // Warehouse Nodes
          </h3>
          <ul className="space-y-3 text-[11px] font-bold uppercase tracking-wider">
            <li><Link to="/" className="hover-underline text-kirti-muted hover:text-white transition-colors duration-200">/Console</Link></li>
            <li><Link to="/products" className="hover-underline text-kirti-muted hover:text-white transition-colors duration-200">/Warehouse</Link></li>
            <li><Link to="/login" className="hover-underline text-kirti-muted hover:text-white transition-colors duration-200">/Identity</Link></li>
          </ul>
        </div>

        {/* Col 3 — Trade Protocols */}
        <div className="font-mono">
          <h3 className="font-bold text-white mb-5 text-[11px] uppercase tracking-wider text-kirti-orange">
            // Legal Protocols
          </h3>
          <ul className="space-y-3 text-[11px] font-bold uppercase tracking-wider">
            <li><Link to="/merchant-policy" className="hover-underline text-kirti-muted hover:text-white transition-colors duration-200">Merchant_Rules</Link></li>
            <li><Link to="/terms-conditions" className="hover-underline text-kirti-muted hover:text-white transition-colors duration-200">Terms_of_Trade</Link></li>
            <li><Link to="/privacy-policy" className="hover-underline text-kirti-muted hover:text-white transition-colors duration-200">Privacy_Protocol</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-kirti-cobalt/40 px-6 py-5">
        <p className="text-[10px] text-kirti-muted text-center font-mono tracking-wider">
          © 2026 KIRTI ELECTRONIC. ALL RIGHTS RESERVED. SYS::ONLINE [REV::2.0.4]
        </p>
      </div>
    </footer>
  );
};

export default Footer;
