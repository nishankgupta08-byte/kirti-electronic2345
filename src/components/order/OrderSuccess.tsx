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
      className="bg-white border border-zinc-200 rounded-3xl p-12 text-center shadow-[0_32px_80px_rgba(0,0,0,0.08)] relative overflow-hidden"
    >
      {/* Confetti particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-violet-400 rounded-full pointer-events-none opacity-0"
          style={{
            left: '50%',
            top: '50%',
            "--dx": `${(Math.random() - 0.5) * 300}px`,
            "--dy": `${-50 - Math.random() * 150}px`,
            animation: `confetti-burst 0.8s ${Math.random() * 0.5}s ease-out forwards`
          } as any}
        />
      ))}

      <div className="w-24 h-24 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-8 relative border border-violet-100">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
        >
          <CheckCircle2 size={56} className="text-violet-600" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-heading text-4xl font-black text-zinc-900 mb-2 tracking-tight">Pre-Booking Confirmed</h2>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl mb-8">
            <Package size={14} className="text-zinc-500" />
            <span className="font-body text-xs font-bold text-violet-600 uppercase tracking-widest">{orderId}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6 max-w-sm mx-auto"
      >
        <p className="font-body text-zinc-500 font-medium leading-relaxed">
          We've sent a detailed confirmation to <span className="text-zinc-900 font-semibold">{email}</span>.
          Our warehouse team will contact you within 24 business hours to finalize logistics.
        </p>

        <div className="pt-8 flex flex-col gap-4">
          <Link
            to="/products"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-600/25 active:scale-[0.98]"
          >
            Browse More Products
            <ArrowRight size={20} />
          </Link>
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
