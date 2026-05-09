import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Retailer } from '../types';

interface AuthContextType {
  user: FirebaseUser | null;
  retailerData: Retailer | null;
  loading: boolean;
  isApproved: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [retailerData, setRetailerData] = useState<Retailer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const retailerDoc = await getDoc(doc(db, 'retailers', currentUser.uid));
          if (retailerDoc.exists()) {
            setRetailerData(retailerDoc.data() as Retailer);
          } else {
            setRetailerData(null);
          }
        } catch (error) {
          console.error("Error fetching retailer data:", error);
          setRetailerData(null);
        }
      } else {
        setRetailerData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const isApproved = retailerData?.isApproved || false;

  return (
    <AuthContext.Provider value={{ user, retailerData, loading, isApproved, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
