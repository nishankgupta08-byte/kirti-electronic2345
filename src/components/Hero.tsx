import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Terminal, Activity, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const TELEMETRY_LOGS = [
  "ALLOCATED: Samsung OLED 55\" [QTY: 40] ➔ Bengaluru_Hub",
  "ROUTED: OnePlus 12R [QTY: 100] ➔ Mumbai_Retailer",
  "CHECKED: Priority stock status ➔ Delhi_West_Showroom",
  "CONFIRMED: Xiaomi Pad 6 [QTY: 85] ➔ Chennai_Wholesale",
  "DISPATCHED: HP Pavilion [QTY: 15] ➔ Kolkata_Terminal",
];

const Hero: React.FC = () => {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % TELEMETRY_LOGS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-6 min-h-[85vh] flex flex-col justify-center items-center text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl relative z-10 w-full"
      >
        {/* Double-layered structural casing border */}
        <div className="bg-white border-2 border-kirti-cobalt rounded-xl p-1 shadow-[4px_4px_0px_0px_rgba(15,29,54,1)]">
          <div className="border border-kirti-border rounded-lg p-8 md:p-14 relative bg-white overflow-hidden">
            
            {/* Schematic Corner Marks */}
            <div className="absolute top-2 left-2 font-mono text-[9px] text-kirti-muted select-none">[SYS_LOC: 09-A]</div>
            <div className="absolute top-2 right-2 font-mono text-[9px] text-kirti-muted select-none">[REV: 2.0.4]</div>
            <div className="absolute bottom-2 left-2 font-mono text-[9px] text-kirti-muted select-none">▲ COBALT_OS</div>
            <div className="absolute bottom-2 right-2 font-mono text-[9px] text-kirti-muted select-none">⚡ COPPER_LINK</div>

            {/* Live Ticker Terminal Strip */}
            <div className="flex items-center justify-between border border-kirti-border bg-kirti-offwhite px-4 py-2.5 rounded-md mb-8 text-left">
              <div className="flex items-center gap-2 text-kirti-orange">
                <Terminal size={14} className="animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Live Allocations Feed</span>
              </div>
              <div className="font-mono text-[11px] text-kirti-cobalt font-medium truncate max-w-[70%] text-right transition-all duration-300">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={logIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {TELEMETRY_LOGS[logIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 border border-kirti-orange/20 bg-kirti-orange-light text-kirti-orange font-mono text-[11px] font-bold px-3.5 py-1.5 rounded-sm mb-6 select-none">
              <Activity size={12} className="animate-pulse" />
              B2B ELECTRONICS TRACE GATEWAY
            </div>

            {/* Headline in Space Grotesk */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-none tracking-tight text-kirti-cobalt">
              INVENTORY SECURING <br />
              <span className="gradient-text">WITHOUT UPFRONT CAPITAL</span>
            </h1>

            <p className="font-sans text-kirti-body text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto font-medium">
              India's premium bulk pre-booking console for independent electronics retailers. 
              Confirm priority warehouse allocations instantly.
            </p>

            {/* CTA Row - schematic styled buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                to="/products"
                className="w-full sm:w-auto bg-kirti-orange hover:bg-kirti-orange-hover text-white font-mono text-xs font-bold tracking-wider uppercase px-8 py-4 rounded-sm transition-all duration-200 shadow-[2px_2px_0px_rgba(15,29,54,1)] hover:translate-y-[-1px] active:translate-y-[1px] inline-flex items-center justify-center gap-2"
              >
                Scan Catalog <ArrowRight size={14} />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto bg-white hover:bg-kirti-offwhite text-kirti-cobalt font-mono text-xs font-bold tracking-wider uppercase px-8 py-4 rounded-sm border-2 border-kirti-cobalt transition-all duration-200 active:translate-y-[1px] inline-flex items-center justify-center gap-2"
              >
                Merchant Authentication
              </Link>
            </div>

            {/* Tech Specs Parameter Row */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-kirti-border font-mono">
              {[
                { val: '500+ SKU', label: 'INVENTORY' },
                { val: '200+ NODE', label: 'MERCHANTS' },
                { val: '15-MIN', label: 'CONFIRMATION' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-lg md:text-xl font-bold text-kirti-cobalt">{stat.val}</div>
                  <div className="text-[9px] text-kirti-muted mt-1 tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
