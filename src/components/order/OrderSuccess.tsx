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
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border-2 border-kirti-cobalt rounded-lg p-12 text-center shadow-[4px_4px_0px_rgba(15,29,54,1)] relative overflow-hidden max-w-lg w-full"
    >
      {/* Confetti particles in brand copper/cobalt */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-1.5 h-1.5 ${Math.random() > 0.5 ? 'bg-kirti-orange' : 'bg-kirti-cobalt'} rounded-full pointer-events-none opacity-0`}
          style={{
            left: '50%',
            top: '50%',
            "--dx": `${(Math.random() - 0.5) * 300}px`,
            "--dy": `${-50 - Math.random() * 150}px`,
            animation: `confetti-burst 0.8s ${Math.random() * 0.5}s ease-out forwards`
          } as any}
        />
      ))}

      {/* Success check badge in matrix-green */}
      <div className="w-20 h-20 bg-kirti-emerald-light border border-kirti-emerald/20 rounded-sm flex items-center justify-center mx-auto mb-8 relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
        >
          <CheckCircle2 size={44} className="text-kirti-emerald" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-heading text-3xl font-bold text-kirti-cobalt mb-2 tracking-tight">BATCH ALLOCATED</h2>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-kirti-surface border border-kirti-border rounded-sm mb-8 font-mono">
          <Package size={14} className="text-kirti-muted" />
          <span className="text-xs font-bold text-kirti-orange uppercase tracking-wider">{orderId}</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-6 max-w-sm mx-auto"
      >
        <p className="font-sans text-xs text-kirti-body font-semibold leading-relaxed">
          We've dispatched a digital inventory receipt to <span className="text-kirti-cobalt font-bold">{email}</span>. 
          Our distribution console team will verify routing details and contact your retail node within 24 hours.
        </p>

        <div className="pt-6 border-t border-kirti-border">
          <Link
            to="/products"
            className="w-full bg-kirti-orange hover:bg-kirti-orange-hover text-white py-4 rounded-sm font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-[2px_2px_0px_rgba(15,29,54,1)] active:translate-y-[1px]"
          >
            Scan Warehouse Catalog
            <ArrowRight size={14} />
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
