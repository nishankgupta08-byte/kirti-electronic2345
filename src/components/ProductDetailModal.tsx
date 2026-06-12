import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Star, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '../types'
import { enrichProduct, getProductImages } from '../data/productReviews'

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (product: Product) => void
}

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 14 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        className={
          star <= Math.round(rating)
            ? 'text-kirti-amber fill-kirti-amber'
            : 'text-kirti-border fill-kirti-border'
        }
      />
    ))}
  </div>
)

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    setActiveImage(0)
  }, [product?.id])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, onClose])

  if (!product) return null

  const detail = enrichProduct(product)
  const images = getProductImages(detail)
  const reviews = detail.reviews ?? []
  const rating = detail.rating ?? 0

  const handleAddToCart = () => {
    onAddToCart(detail)
    onClose()
  }

  const prevImage = () => setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1))
  const nextImage = () => setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1))

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-kirti-cobalt/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative w-full sm:max-w-3xl lg:max-w-4xl bg-white border border-kirti-border sm:rounded-xl shadow-[4px_4px_0px_rgba(15,29,54,0.08)] flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-kirti-border shrink-0">
              <div>
                <span className="text-kirti-orange font-mono text-[10px] font-bold tracking-[0.3em] uppercase">
                  // PRODUCT_INTEL
                </span>
                <p className="font-mono text-[10px] text-kirti-muted mt-0.5">
                  SKU::{detail.id.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-sm bg-kirti-surface hover:bg-kirti-border flex items-center justify-center transition-colors border border-kirti-border"
                aria-label="Close"
              >
                <X size={14} className="text-kirti-cobalt" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">
              {/* Image gallery */}
              <div className="relative bg-kirti-surface border-b border-kirti-border">
                <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                  <img
                    src={images[activeImage]}
                    alt={`${detail.name} — image ${activeImage + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 border border-kirti-border rounded-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={16} className="text-kirti-cobalt" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 border border-kirti-border rounded-sm flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                      aria-label="Next image"
                    >
                      <ChevronRight size={16} className="text-kirti-cobalt" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            i === activeImage ? 'bg-kirti-orange' : 'bg-white/70 border border-kirti-border'
                          }`}
                          aria-label={`View image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex gap-2 px-5 py-3 overflow-x-auto scrollbar-hide">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`shrink-0 w-16 h-16 rounded-sm overflow-hidden border-2 transition-colors ${
                          i === activeImage ? 'border-kirti-orange' : 'border-kirti-border hover:border-kirti-orange/50'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-5 py-6 space-y-8">
                {/* Title & rating */}
                <div>
                  <span className="font-mono text-[9px] font-bold text-kirti-orange bg-kirti-orange-light border border-kirti-orange/20 px-2 py-0.5 rounded-sm uppercase">
                    SYS::{detail.category}
                  </span>
                  <h2 className="font-heading font-bold text-kirti-cobalt text-xl sm:text-2xl mt-3 leading-tight">
                    {detail.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <StarRating rating={rating} size={16} />
                    <span className="font-mono text-sm font-bold text-kirti-cobalt">{rating.toFixed(1)}</span>
                    <span className="font-mono text-[10px] text-kirti-muted">
                      ({reviews.length} RETAILER REVIEWS)
                    </span>
                    {detail.stockAvailable ? (
                      <span className="font-mono text-[9px] font-bold text-kirti-emerald bg-kirti-emerald-light border border-kirti-emerald/20 px-2 py-0.5 rounded-sm flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-kirti-emerald animate-pulse" />
                        ALLOCATABLE
                      </span>
                    ) : (
                      <span className="font-mono text-[9px] font-bold text-kirti-rose bg-kirti-rose-light border border-kirti-rose/20 px-2 py-0.5 rounded-sm">
                        DEPLETED
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-lg font-bold text-kirti-cobalt mt-4">
                    ₹{detail.price.toLocaleString()}
                    <span className="font-sans text-xs text-kirti-muted font-normal"> / UNIT</span>
                  </p>
                </div>

                {/* Overview */}
                <section>
                  <h3 className="font-mono text-[10px] font-bold text-kirti-orange uppercase tracking-[0.3em] mb-3">
                    // Overview
                  </h3>
                  <p className="font-sans text-sm text-kirti-body leading-relaxed">
                    {detail.overview ?? detail.description}
                  </p>
                </section>

                {/* Specs */}
                {detail.specs && Object.keys(detail.specs).length > 0 && (
                  <section>
                    <h3 className="font-mono text-[10px] font-bold text-kirti-orange uppercase tracking-[0.3em] mb-3">
                      // Technical Specs
                    </h3>
                    <div className="border border-kirti-border rounded-lg overflow-hidden">
                      {Object.entries(detail.specs).map(([key, value], i) => (
                        <div
                          key={key}
                          className={`flex items-center justify-between px-4 py-3 ${
                            i % 2 === 0 ? 'bg-kirti-surface' : 'bg-white'
                          } ${i > 0 ? 'border-t border-kirti-border' : ''}`}
                        >
                          <span className="font-mono text-[11px] font-bold text-kirti-muted uppercase">{key}</span>
                          <span className="font-sans text-sm text-kirti-cobalt font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Reviews */}
                <section>
                  <h3 className="font-mono text-[10px] font-bold text-kirti-orange uppercase tracking-[0.3em] mb-4">
                    // Retailer Reviews
                  </h3>
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border border-kirti-border rounded-lg p-4 bg-white shadow-[2px_2px_0px_rgba(15,29,54,0.02)]"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <p className="font-heading font-bold text-kirti-cobalt text-sm">{review.author}</p>
                            <p className="font-mono text-[9px] text-kirti-muted mt-0.5">{review.date}</p>
                          </div>
                          <StarRating rating={review.rating} size={12} />
                        </div>
                        <p className="font-sans text-xs text-kirti-body leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>

            {/* Sticky footer — Add to Cart */}
            <div className="shrink-0 border-t border-kirti-border bg-white px-5 py-4 flex items-center justify-between gap-4">
              <div className="hidden sm:block">
                <p className="font-mono text-[9px] text-kirti-muted uppercase">Min Order Qty</p>
                <p className="font-mono text-sm font-bold text-kirti-cobalt">{detail.minOrderQty} units</p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!detail.stockAvailable}
                className="flex-1 sm:flex-none sm:min-w-[220px] flex items-center justify-center gap-2 bg-kirti-orange hover:bg-kirti-orange-hover disabled:bg-kirti-muted/30 disabled:text-kirti-muted disabled:cursor-not-allowed text-white font-mono text-xs font-bold tracking-wider uppercase px-6 py-3.5 rounded-sm shadow-[2px_2px_0px_rgba(15,29,54,1)] active:translate-y-[1px] transition-all"
              >
                <ShoppingCart size={16} />
                {detail.stockAvailable ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProductDetailModal
