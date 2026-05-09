import { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  specs?: Record<string, string>;
  stock: number;
  stockAvailable: boolean;
  minOrderQty: number;
  createdAt: any;
  updatedAt?: any;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
  createdAt: any;
  updatedAt?: any;
}

export interface Retailer {
  uid: string;
  name: string;
  email: string;
  phone: string;
  shopName: string;
  retailerId: string;
  isApproved: boolean;
  loginMethod: 'google' | 'email';
  photoURL?: string;
  createdAt: any;
}

export interface Order {
  id: string;
  retailerId: string;
  retailerInfo: {
    name: string;
    email: string;
    phone: string;
    shopName: string;
    retailerId: string;
  };
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  additionalInfo?: {
    notes: string;
  };
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: any;
}

export type OrderStatus = 'idle' | 'loading' | 'success' | 'error';
