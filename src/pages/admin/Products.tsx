import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ProductTable from '../../components/admin/products/ProductTable';
import ProductFormModal from '../../components/admin/products/ProductFormModal';
import DeleteConfirmModal from '../../components/admin/products/DeleteConfirmModal';
import { useAdminProducts } from '../../hooks/useAdminProducts';
import { Product } from '../../types';
import { useAdminCategories } from '../../hooks/useAdminCategories';

const AdminProducts: React.FC = () => {
  const { products, loading, deleteProduct, toggleStock } = useAdminProducts();
  const { categories } = useAdminCategories();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    setIsDeleting(true);
    try {
      await deleteProduct(selectedProduct);
      setIsDeleteOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Inventory Console</h1>
          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
            Global Hardware Registry & Synchronizer
          </p>
        </div>

        <button
          onClick={() => { setSelectedProduct(null); setIsFormOpen(true); }}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-2xl font-bold text-sm hover:bg-sky-600 shadow-xl shadow-sky-500/20 active:scale-[0.98] transition-all group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Register Hardware
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-white border border-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <ProductTable
          products={products}
          categories={categories.map(c => c.name || '')}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
          onToggleStock={toggleStock}
        />
      )}

      {/* Modals */}
      <ProductFormModal
        isOpen={isFormOpen}
        product={selectedProduct}
        categories={categories}
        onClose={() => { setIsFormOpen(false); setSelectedProduct(null); }}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title={`Purge ${selectedProduct?.name || 'Product'}?`}
        message="This operation will permanently erase this hardware entity and its associated visual assets from the mainframe."
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
        loading={isDeleting}
      />
    </div>
  );
};

export default AdminProducts;