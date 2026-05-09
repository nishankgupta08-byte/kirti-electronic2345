import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Category } from '../types';
import { toast } from 'react-hot-toast';

export const useAdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'categories'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as any as Category));
      setCategories(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addCategory = async (data: Partial<Category>) => {
    try {
      await addDoc(collection(db, 'categories'), {
        ...data,
        createdAt: serverTimestamp()
      });
      toast.success("Domain classification established");
    } catch (error) {
      toast.error("Failed to establish domain");
    }
  };

  const updateCategory = async (id: string, data: Partial<Category>) => {
    try {
      await updateDoc(doc(db, 'categories', id), {
        ...data,
        updatedAt: serverTimestamp()
      });
      toast.success("Architecture updated");
    } catch (error) {
      toast.error("Architecture update failed");
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
      toast.success("Domain purged");
    } catch (error) {
      toast.error("Domain purge failed");
    }
  };

  return { categories, loading, addCategory, updateCategory, deleteCategory };
};
