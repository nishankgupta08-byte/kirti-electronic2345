import React from 'react';
import { motion } from 'motion/react';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';
import { enrichProduct } from '../data/productReviews';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onSelect: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onSelect }) => {
  const detail = enrichProduct(product);
  const rating = detail.rating ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(product)}
        onKeyDown={(e) => e.key === 'Enter' && onSelect(product)}
        className="relative bg-white rounded-lg overflow-hidden border border-kirti-border shadow-[2px_2px_0px_rgba(15,29,54,0.03)] hover:border-kirti-orange transition-colors duration-300 cursor-pointer"
      >
        {/* Image Spec Container */}
        <div className="relative aspect-[4/3] bg-kirti-surface overflow-hidden border-b border-kirti-border">
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
          />

          {/* Allocation Availability Badge */}
          <div className="absolute top-2.5 right-2.5 font-mono select-none">
            {product.stockAvailable ? (
              <span className="bg-kirti-emerald-light text-kirti-emerald border border-kirti-emerald/20 text-[9px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-kirti-emerald animate-pulse" />
                ALLOCATABLE
              </span>
            ) : (
              <span className="bg-kirti-rose-light text-kirti-rose border border-kirti-rose/20 text-[9px] font-bold px-2 py-0.5 rounded-sm">
                DEPLETED
              </span>
            )}
          </div>

          {/* Technical Category Label */}
          <div className="absolute top-2.5 left-2.5 font-mono select-none">
            <span className="bg-kirti-cobalt text-white border border-white/10 text-[9px] font-bold px-2 py-0.5 rounded-sm">
              SYS::{product.category.toUpperCase()}
            </span>
          </div>

          {/* Quick add button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={!product.stockAvailable}
            className="absolute bottom-2.5 right-2.5 bg-kirti-orange text-white p-2.5 hover:bg-kirti-orange-hover hover:scale-105 disabled:bg-kirti-muted/20 disabled:text-kirti-muted disabled:scale-100 disabled:cursor-not-allowed transition-all rounded-sm shadow-sm opacity-0 group-hover:opacity-100 duration-200"
            title="Book Allocation"
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>

        {/* Product Details - Blueprint Sheet style */}
        <div className="p-4 space-y-3 relative">
          <div className="absolute top-0 right-4 translate-y-[-50%] bg-white px-2 py-0.5 border border-kirti-border rounded-sm font-mono text-[9px] text-kirti-muted">
            SKU::{product.id.slice(0, 6).toUpperCase()}
          </div>

          <h3 className="font-heading font-bold text-kirti-cobalt text-sm leading-snug line-clamp-2 pt-1">
            {product.name}
          </h3>

          {/* Rating preview */}
          <div className="flex items-center gap-1.5">
            <Star size={11} className="text-kirti-amber fill-kirti-amber" />
            <span className="font-mono text-[10px] font-bold text-kirti-cobalt">{rating.toFixed(1)}</span>
            <span className="font-mono text-[9px] text-kirti-muted">
              ({detail.reviewCount ?? 0})
            </span>
          </div>

          <p className="font-sans text-[11px] text-kirti-muted line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Pricing parameters in IBM Plex Mono */}
          <div className="flex items-center justify-between pt-2 border-t border-kirti-border/60">
            <span className="font-mono text-sm font-bold text-kirti-cobalt">
              ₹{product.price.toLocaleString()}
              <span className="font-sans text-[10px] text-kirti-muted font-normal"> / UNIT</span>
            </span>
            <span className="font-mono text-[9px] text-kirti-orange bg-kirti-orange-light border border-kirti-orange/20 px-2 py-0.5 rounded-sm">
              MIN_QTY: {product.minOrderQty}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
