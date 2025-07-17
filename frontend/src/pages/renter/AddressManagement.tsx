import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { RenterLayout } from '../../components/renter/RenterLayout';
import { Card } from '../../components/common/Layout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Plus, 
  MapPin, 
  Edit, 
  Trash2, 
  Home as HomeIcon,
  Building,
  User,
  Check
} from 'lucide-react';

interface AddressForm {
  label: string;
  country: string;
  city: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  landmark?: string;
}

export const AddressManagement: React.FC = () => {
  const { user } = useAuth();
  const { addresses, addAddress, updateAddress, deleteAddress } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<AddressForm>();

  // Mock addresses since we don't have real data
  const mockAddresses = [
    {
      id: '1',
      userId: user?.id || '1',
      label: 'Home',
      country: 'India',
      city: 'Mumbai',
      pincode: '400001',
      addressLine1: '123 Main Street',
      addressLine2: 'Near Central Mall',
      landmark: 'Opposite Metro Station',
      isDefault: true
    },
    {
      id: '2',
      userId: user?.id || '1',
      label: 'Office',
      country: 'India',
      city: 'Mumbai',
      pincode: '400051',
      addressLine1: '456 Business Park',
      addressLine2: 'Tower A, Floor 12',
      landmark: 'Next to Coffee Shop',
      isDefault: false
    }
  ];

  const addressLabels = [
    { value: 'home', label: 'Home' },
    { value: 'office', label: 'Office' },
    { value: 'other', label: 'Other' }
  ];

  const countries = [
    { value: 'india', label: 'India' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
  ];

  const onSubmit = (data: AddressForm) => {
    if (editingAddress) {
      updateAddress(editingAddress, { ...data, isDefault: false });
    } else {
      addAddress({
        ...data,
        userId: user?.id || '1',
        isDefault: mockAddresses.length === 0
      });
    }
    
    setShowForm(false);
    setEditingAddress(null);
    reset();
  };

  const handleEdit = (address: any) => {
    setEditingAddress(address.id);
    reset({
      label: address.label,
      country: address.country,
      city: address.city,
      pincode: address.pincode,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      addressLine3: address.addressLine3,
      landmark: address.landmark
    });
    setShowForm(true);
  };

  const handleDelete = (addressId: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress(addressId);
    }
  };

  const setAsDefault = (addressId: string) => {
    // Update all addresses to not be default
    mockAddresses.forEach(addr => {
      updateAddress(addr.id, { isDefault: addr.id === addressId });
    });
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Location detected: ${position.coords.latitude}, ${position.coords.longitude}`);
          // In a real app, you would reverse geocode these coordinates
        },
        (error) => {
          alert('Unable to detect location. Please enter manually.');
        }
      );
    }
  };

  const getAddressIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'home':
        return <HomeIcon className="w-5 h-5 text-emerald-600" />;
      case 'office':
        return <Building className="w-5 h-5 text-blue-600" />;
      default:
        return <User className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <RenterLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Address Management</h1>
            <p className="text-gray-600">Manage your delivery addresses</p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Address
          </Button>
        </div>

        {/* Add/Edit Address Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <Card className="p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h2>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={detectLocation}
                    variant="outline"
                    size="sm"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    Auto-detect
                  </Button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingAddress(null);
                      reset();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Select
                  label="Address Type"
                  options={addressLabels}
                  {...register('label', { required: 'Address type is required' })}
                  error={errors.label?.message}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Country"
                    options={countries}
                    {...register('country', { required: 'Country is required' })}
                    error={errors.country?.message}
                  />
                  <Input
                    label="City"
                    {...register('city', { required: 'City is required' })}
                    error={errors.city?.message}
                  />
                </div>

                <Input
                  label="Pincode"
                  {...register('pincode', { required: 'Pincode is required' })}
                  error={errors.pincode?.message}
                />

                <Input
                  label="Address Line 1"
                  placeholder="House/Flat number, Street name"
                  {...register('addressLine1', { required: 'Address is required' })}
                  error={errors.addressLine1?.message}
                />

                <Input
                  label="Address Line 2 (Optional)"
                  placeholder="Area, Locality"
                  {...register('addressLine2')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Address Line 3 (Optional)"
                    placeholder="District"
                    {...register('addressLine3')}
                  />
                  <Input
                    label="Landmark (Optional)"
                    placeholder="Near..."
                    {...register('landmark')}
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingAddress(null);
                      reset();
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1">
                    {editingAddress ? 'Update Address' : 'Add Address'}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Addresses List */}
        <div className="space-y-4">
          {mockAddresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`p-6 ${address.isDefault ? 'border-2 border-emerald-200 bg-emerald-50' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {getAddressIcon(address.label)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900 capitalize">
                          {address.label}
                        </h3>
                        {address.isDefault && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            <Check className="w-3 h-3 mr-1" />
                            Default
                          </span>
                        )}
                      </div>
                      
                      <div className="text-gray-600 space-y-1">
                        <p>{address.addressLine1}</p>
                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                        {address.addressLine3 && <p>{address.addressLine3}</p>}
                        <p>{address.city}, {address.pincode}</p>
                        <p>{address.country}</p>
                        {address.landmark && (
                          <p className="text-sm text-gray-500">Near: {address.landmark}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-4">
                        {!address.isDefault && (
                          <button
                            onClick={() => setAsDefault(address.id)}
                            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                          >
                            Set as Default
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(address)}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(address.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {mockAddresses.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No addresses yet</h3>
              <p className="text-gray-600 mb-4">
                Add your first address to start ordering rentals
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </div>
          </div>
        )}
      </div>
    </RenterLayout>
  );
};