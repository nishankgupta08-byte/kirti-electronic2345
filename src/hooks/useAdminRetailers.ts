import { useState, useEffect } from 'react';
import { 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  updateDoc, 
  deleteDoc, 
  doc,
  setDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Retailer } from '../types';
import { toast } from 'react-hot-toast';

export const useAdminRetailers = () => {
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'retailers'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as Retailer));
      setRetailers(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const approveRetailer = async (uid: string) => {
    try {
      await updateDoc(doc(db, 'retailers', uid), { isApproved: true });
      toast.success("Network access granted. Node cleared for operation.");
    } catch (error) {
      toast.error("Access clearance failed");
    }
  };

  const rejectRetailer = async (uid: string) => {
    try {
      await updateDoc(doc(db, 'retailers', uid), { isApproved: false });
      toast.success("Network access revoked. Node quarantined.");
    } catch (error) {
      toast.error("Revocation failure");
    }
  };

  const deleteRetailer = async (uid: string) => {
    try {
      await deleteDoc(doc(db, 'retailers', uid));
      toast.success("Entity purged from network map");
    } catch (error) {
      toast.error("Purge sequence failed");
    }
  };

  const addRetailer = async (uid: string, data: Partial<Retailer>) => {
    try {
      await setDoc(doc(db, 'retailers', uid), {
        ...data,
        isApproved: true, // Admin created are auto-approved
        createdAt: serverTimestamp()
      });
      toast.success("New network entity registered");
    } catch (error) {
      toast.error("Entity registration failed");
    }
  };

  return { retailers, loading, approveRetailer, rejectRetailer, deleteRetailer, addRetailer };
};
