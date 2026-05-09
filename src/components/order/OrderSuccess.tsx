import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderSuccessProps {
  orderId: string;
  email: string;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ orderId, email }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] p-12 text-center shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden"
    >
      {/* Confetti particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-sky-400 rounded-full pointer-events-none opacity-0"
          style={{
            left: '50%',
            top: '50%',
            "--dx": `${(Math.random() - 0.5) * 300}px`,
            "--dy": `${-50 - Math.random() * 150}px`,
            animation: `confetti-burst 0.8s ${Math.random() * 0.5}s ease-out forwards`
          } as any}
        />
      ))}

      <div className="w-24 h-24 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-8 relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
        >
          <CheckCircle2 size={56} className="text-sky-400" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">Pre-Booking Confirmed</h2>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-xl mb-8">
            <Package size={14} className="text-slate-500" />
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">{orderId}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6 max-w-sm mx-auto"
      >
        <p className="text-slate-400 font-medium leading-relaxed">
          We've sent a detailed confirmation to <span className="text-white">{email}</span>. 
          Our warehouse team will contact you within 24 business hours to finalize logistics.
        </p>

        <div className="pt-8 flex flex-col gap-4">
          <Link
            to="/products"
            className="w-full bg-sky-500 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/25 active:scale-95"
          >
            Browse More Products
            <ArrowRight size={20} />
          </Link>
          <button className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
            Download Order Summary (PDF)
          </button>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes confetti-burst {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) rotate(720deg); opacity: 0; }
        }
      `}} />
    </motion.div>
  );
};

export default OrderSuccess;
