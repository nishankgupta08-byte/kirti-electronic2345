import React from 'react'
import { Product } from '../../types'

interface MobileProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const MobileProductCard: React.FC<MobileProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm flex overflow-hidden active:scale-[0.99] transition-transform duration-150">
      {/* Image — square left panel */}
      <div className="relative w-28 min-w-[112px] h-28 bg-zinc-50 shrink-0">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {/* Stock dot */}
        <div className="absolute top-2 left-2">
          <span className={`w-2 h-2 rounded-full block ${product.stockAvailable ? 'bg-emerald-500' : 'bg-rose-500'}`} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
        <div>
          {/* Category */}
          <span className="font-body text-[10px] font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full">
            {product.category}
          </span>

          {/* Name */}
          <h3 className="font-heading font-semibold text-zinc-900 text-[13px] leading-snug mt-1.5 line-clamp-2">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Price */}
          <div>
            <span className="font-heading font-bold text-zinc-900 text-sm">₹{product.price}</span>
            <span className="font-body text-[10px] text-zinc-400 ml-1">/unit</span>
          </div>

          {/* Add button */}
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.stockAvailable}
            className={`w-8 h-8 rounded-lg flex items-center justify-center font-body font-bold text-lg active:scale-90 transition-all duration-150 ${
              product.stockAvailable
                ? 'bg-violet-600 text-white shadow-[0_2px_10px_rgba(124,58,237,0.35)]'
                : 'bg-zinc-100 text-zinc-300 cursor-not-allowed'
            }`}
          >
            +
          </button>
        </div>

        {/* MOQ */}
        <p className="font-body text-[10px] text-amber-600 mt-1">Min. {product.minOrderQty} units</p>
      </div>
    </div>
  )
}

export default MobileProductCard
