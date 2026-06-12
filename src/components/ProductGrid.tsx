import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, loading }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/5] bg-neutral-100 mb-4 rounded-sm" />
            <div className="h-4 bg-neutral-100 w-1/4 mb-2" />
            <div className="h-6 bg-neutral-100 w-3/4 mb-2" />
            <div className="h-4 bg-neutral-100 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onSelect={setSelectedProduct}
          />
        ))}
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </>
  );
};

export default ProductGrid;
