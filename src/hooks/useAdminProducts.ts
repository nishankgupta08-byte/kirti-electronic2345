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
import { 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Product } from '../types';
import { toast } from 'react-hot-toast';

export const useAdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(items);
      setLoading(false);
    }, (error) => {
      console.error("Products subscription error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const uploadImage = (file: File, onProgress?: (progress: number) => void): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.(progress);
        },
        (error) => reject(error),
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const addProduct = async (data: Partial<Product>, imageFiles: File[]) => {
    try {
      const imageURLs = await Promise.all(imageFiles.map(file => uploadImage(file)));
      await addDoc(collection(db, 'products'), {
        ...data,
        images: imageURLs,
        createdAt: serverTimestamp()
      });
      toast.success("New hardware entity integrated successfully");
    } catch (error) {
      console.error("Add product error:", error);
      toast.error("Integration failure. Check system logs.");
      throw error;
    }
  };

  const updateProduct = async (id: string, data: Partial<Product>, newImageFiles: File[], removedImageURLs: string[]) => {
    try {
      // 1. Delete removed images from storage
      await Promise.all(removedImageURLs.map(async (url) => {
        try {
          const imageRef = ref(storage, url);
          await deleteObject(imageRef);
        } catch (e) {
          console.warn("Could not delete image from storage:", url, e);
        }
      }));

      // 2. Upload new images
      const newImageURLs = await Promise.all(newImageFiles.map(file => uploadImage(file)));

      // 3. Filter out removed URLs from existing images and add new ones
      const finalImages = [
        ...(data.images || []).filter(url => !removedImageURLs.includes(url)),
        ...newImageURLs
      ];

      // 4. Update Firestore
      await updateDoc(doc(db, 'products', id), {
        ...data,
        images: finalImages,
        updatedAt: serverTimestamp()
      });
      toast.success("Hardware telemetry updated");
    } catch (error) {
      console.error("Update product error:", error);
      toast.error("Telemetry update failed");
      throw error;
    }
  };

  const deleteProduct = async (product: Product) => {
    try {
      // 1. Delete all images from storage
      await Promise.all((product.images || []).map(async (url) => {
        try {
          const imageRef = ref(storage, url);
          await deleteObject(imageRef);
        } catch (e) {
          console.warn("Storage deletion skip:", url);
        }
      }));

      // 2. Delete Firestore doc
      await deleteDoc(doc(db, 'products', product.id));
      toast.success("Hardware entity purged from registry");
    } catch (error) {
      console.error("Delete product error:", error);
      toast.error("Purge sequence failed");
      throw error;
    }
  };

  const toggleStock = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'products', id), {
        stockAvailable: !currentStatus
      });
      toast.success(`Inventory state flipped: ${!currentStatus ? 'ACTIVE' : 'INACTIVE'}`);
    } catch (error) {
      toast.error("State transition failure");
    }
  };

  return { 
    products, 
    loading, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleStock,
    uploadImage 
  };
};
