import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';

export const useProducts = (category: string = 'All') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      
      if (category === 'All') {
        setProducts(data);
      } else {
        setProducts(data.filter(p => p.category === category));
      }
      setLoading(false);
    }, (err) => {
      console.error(err);
      setError('Failed to fetch products');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [category]);

  return { products, loading, error };
};
