import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out group">
        <div className="relative aspect-[4/3] bg-zinc-50 overflow-hidden">
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Stock badge */}
          <div className="absolute top-3 right-3">
            {product.stockAvailable ? (
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-body text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                In Stock
              </span>
            ) : (
              <span className="bg-rose-50 text-rose-700 border border-rose-200 font-body text-[11px] font-semibold px-2.5 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-violet-700 border border-violet-100 font-body text-[11px] font-semibold px-2.5 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="absolute bottom-4 right-4 bg-violet-600 text-white p-3 hover:bg-violet-700 hover:scale-110 transition-all rounded-xl shadow-lg shadow-violet-600/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="p-5 space-y-3">
          <h3 className="font-heading font-semibold text-zinc-900 text-[15px] leading-snug line-clamp-2">
            {product.name}
          </h3>
          <p className="font-body text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price + Min Qty */}
          <div className="flex items-center justify-between pt-1">
            <span className="font-heading text-lg font-bold text-zinc-900">
              ₹{product.price.toLocaleString()}
              <span className="font-body text-xs text-zinc-400 font-normal"> / unit</span>
            </span>
            <span className="font-body text-[11px] text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
              Min: {product.minOrderQty} units
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
