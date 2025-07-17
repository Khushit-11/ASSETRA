import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, RentalRequest, Notification, Address } from '../types';

interface DataContextType {
  products: Product[];
  rentalRequests: RentalRequest[];
  notifications: Notification[];
  addresses: Address[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addRentalRequest: (request: Omit<RentalRequest, 'id' | 'createdAt'>) => void;
  updateRentalRequest: (id: string, updates: Partial<RentalRequest>) => void;
  markNotificationAsRead: (id: string) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const mockProducts: Product[] = [
  {
    id: '1',
    ownerId: '1',
    title: 'Professional DSLR Camera',
    description: 'High-quality Canon EOS R5 with 24-105mm lens',
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'],
    quantity: 2,
    availableQuantity: 1,
    rentPrice: 500,
    securityAmount: 25000,
    status: 'available',
    createdAt: new Date()
  },
  {
    id: '2',
    ownerId: '1',
    title: 'Gaming Laptop',
    description: 'High-performance laptop for gaming and work',
    category: 'Electronics',
    images: ['https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'],
    quantity: 1,
    availableQuantity: 0,
    rentPrice: 800,
    securityAmount: 45000,
    status: 'rented',
    createdAt: new Date()
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'rental-request',
    title: 'New Rental Request',
    message: 'Someone wants to rent your DSLR Camera for 3 days',
    read: false,
    createdAt: new Date(),
    actionData: { requestId: '1' }
  }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addRentalRequest = (request: Omit<RentalRequest, 'id' | 'createdAt'>) => {
    const newRequest: RentalRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setRentalRequests(prev => [...prev, newRequest]);
  };

  const updateRentalRequest = (id: string, updates: Partial<RentalRequest>) => {
    setRentalRequests(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: Date.now().toString()
    };
    setAddresses(prev => [...prev, newAddress]);
  };

  const updateAddress = (id: string, updates: Partial<Address>) => {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  return (
    <DataContext.Provider value={{
      products,
      rentalRequests,
      notifications,
      addresses,
      addProduct,
      updateProduct,
      deleteProduct,
      addRentalRequest,
      updateRentalRequest,
      markNotificationAsRead,
      addAddress,
      updateAddress,
      deleteAddress
    }}>
      {children}
    </DataContext.Provider>
  );
};