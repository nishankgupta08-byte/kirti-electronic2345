import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import EmptyState from '../components/EmptyState';
import { Product, Category } from '../types';

interface ProductsProps {
  onAddToCart: (p: Product) => void;
}

const Products: React.FC<ProductsProps> = ({ onAddToCart }) => {
  const [category, setCategory] = useState<Category>('All');
  const { products, loading } = useProducts(category);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12 border-b border-white/5 pb-12">
        <span className="text-sky-500 font-mono text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Warehouse Inventory</span>
        <h1 className="text-5xl font-black mb-4 tracking-tighter text-white">Full Collection</h1>
        <p className="text-slate-400 max-w-lg mb-8 font-medium">
          Verified retailers can pre-book from our real-time inventory. 
          Bulk discounts apply automatically at checkout for established partners.
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
