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
      <div className="relative aspect-[1/1] glass-morphism overflow-hidden mb-6 rounded-3xl group-hover:border-sky-500/50 transition-all duration-500">
        <img 
          src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 bg-sky-500 text-white p-3 hover:bg-sky-400 hover:scale-110 transition-all rounded-xl shadow-lg shadow-sky-500/20 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      </div>
      
      <div className="px-2">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] font-mono text-sky-400 font-bold uppercase tracking-[0.2em] block mb-1">
              {product.category}
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-sky-400 transition-colors">
              {product.name}
            </h3>
          </div>
          <span className="text-base font-mono font-bold text-white">
            ₹{product.price.toLocaleString()}
          </span>
        </div>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-medium">
          {product.description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
