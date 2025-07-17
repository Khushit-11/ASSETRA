export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'owner' | 'renter';
  address: {
    country: string;
    city: string;
    pincode: string;
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    landmark?: string;
  };
}

export interface Product {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  quantity: number;
  availableQuantity: number;
  rentPrice: number;
  securityAmount: number;
  status: 'available' | 'rented' | 'pending';
  createdAt: Date;
}

export interface RentalRequest {
  id: string;
  productId: string;
  renterId: string;
  ownerId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  securityAmount: number;
  status: 'pending' | 'accepted' | 'declined' | 'in-transit' | 'delivered' | 'rented' | 'return-scheduled' | 'returned';
  address: User['address'];
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'rental-request' | 'status-update' | 'payment' | 'reminder';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionData?: any;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  country: string;
  city: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  landmark?: string;
  isDefault: boolean;
}