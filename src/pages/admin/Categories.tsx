import React, { useState } from 'react';
import { Plus, Tags } from 'lucide-react';
import CategoryTable from '../../components/admin/categories/CategoryTable';
import CategoryFormModal from '../../components/admin/categories/CategoryFormModal';
import DeleteConfirmModal from '../../components/admin/products/DeleteConfirmModal';
import { useAdminCategories } from '../../hooks/useAdminCategories';
import { Category } from '../../types';

const AdminCategories: React.FC = () => {
  const { categories, loading, addCategory, updateCategory, deleteCategory } = useAdminCategories();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (data: Partial<Category>) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory.id, data.name || '', data.icon || '');
    } else {
      await addCategory(data.name || '', data.icon || '');
    }
  };

  const confirmDelete = async () => {
    if (!selectedCategory) return;
    setIsDeleting(true);
    try {
      await deleteCategory(selectedCategory.id);
      setIsDeleteOpen(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Domain Architecture</h1>
          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
            Global Namespace & Taxonomy Control
          </p>
        </div>
        
        <button 
          onClick={() => { setSelectedCategory(null); setIsFormOpen(true); }}
          className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-2xl font-bold text-sm hover:bg-sky-600 shadow-xl shadow-sky-500/20 active:scale-[0.98] transition-all group"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          Map Domain
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-white border border-slate-100 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <CategoryTable 
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Modals */}
      <CategoryFormModal 
        isOpen={isFormOpen}
        category={selectedCategory}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteOpen}
        title={`Deconstruct ${selectedCategory?.name}?`}
        message="Purging this domain will orphan any associated hardware entities. Their telemetry will remain but under 'uncategorized' status."
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteOpen(false)}
        loading={isDeleting}
      />
    </div>
  );
};

export default AdminCategories;
