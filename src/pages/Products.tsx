import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import EmptyState from '../components/EmptyState';
import { Product } from '../types';

interface ProductsProps {
  onAddToCart: (p: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  const [category, setCategory] = useState<string>('All');
  const { products, loading } = useProducts(category);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 border-b border-kirti-border pb-12">
        <span className="text-kirti-orange font-mono text-[10px] font-bold tracking-[0.4em] uppercase mb-2 block">// WAREHOUSE INVENTORY</span>
        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-kirti-cobalt">ALL ACTIVE CATALOG</h1>
        <p className="text-kirti-body text-sm max-w-lg mb-8 font-medium">
          Verified merchant nodes can secure priority allocation from our real-time stock matrix. 
          Bulk discounts apply dynamically on confirmation.
        </p>
        <CategoryFilter current={category} onChange={setCategory} />
      </div>

      {products.length === 0 && !loading ? (
        <EmptyState />
      ) : (
        <ProductGrid
          products={products}
          onAddToCart={onAddToCart}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Products;
