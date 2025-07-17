import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { RenterLayout } from '../../components/renter/RenterLayout';
import { Card } from '../../components/common/Layout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  HelpCircle,
  LogOut,
  Edit,
  Save,
  X,
  Heart,
  History,
  CreditCard
} from 'lucide-react';

interface ProfileForm {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  landmark?: string;
}

export const RenterAccount: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: user?.address.country || '',
      city: user?.address.city || '',
      pincode: user?.address.pincode || '',
      addressLine1: user?.address.addressLine1 || '',
      addressLine2: user?.address.addressLine2 || '',
      addressLine3: user?.address.addressLine3 || '',
      landmark: user?.address.landmark || ''
    }
  });

  const onSubmit = (data: ProfileForm) => {
    updateUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: {
        country: data.country,
        city: data.city,
        pincode: data.pincode,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        addressLine3: data.addressLine3,
        landmark: data.landmark
      }
    });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  const quickActions = [
    {
      icon: Heart,
      title: 'Wishlist',
      description: 'View saved items',
      color: 'text-red-500 bg-red-100',
      action: () => console.log('Wishlist')
    },
    {
      icon: History,
      title: 'Order History',
      description: 'View past rentals',
      color: 'text-blue-500 bg-blue-100',
      action: () => console.log('Order History')
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Manage payment options',
      color: 'text-green-500 bg-green-100',
      action: () => console.log('Payment Methods')
    },
    {
      icon: Lock,
      title: 'Change Password',
      description: 'Update your password',
      color: 'text-purple-500 bg-purple-100',
      action: () => console.log('Change Password')
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help with your account',
      color: 'text-orange-500 bg-orange-100',
      action: () => console.log('Help')
    }
  ];

  const stats = [
    { label: 'Total Rentals', value: '12', color: 'text-blue-600' },
    { label: 'Amount Saved', value: '₹15,450', color: 'text-green-600' },
    { label: 'Active Rentals', value: '2', color: 'text-purple-600' }
  ];

  return (
    <RenterLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600">Manage your profile and preferences</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="p-6 text-center">
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Profile Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button onClick={handleSubmit(onSubmit)} size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline" size="sm">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <form className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                icon={<User className="w-5 h-5 text-gray-400" />}
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
                disabled={!isEditing}
              />
              <Input
                label="Email Address"
                type="email"
                icon={<Mail className="w-5 h-5 text-gray-400" />}
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message}
                disabled={!isEditing}
              />
            </div>

            <Input
              label="Phone Number"
              type="tel"
              icon={<Phone className="w-5 h-5 text-gray-400" />}
              {...register('phone', { required: 'Phone is required' })}
              error={errors.phone?.message}
              disabled={!isEditing}
            />

            {/* Address */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Address Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Country"
                  {...register('country', { required: 'Country is required' })}
                  error={errors.country?.message}
                  disabled={!isEditing}
                />
                <Input
                  label="City"
                  {...register('city', { required: 'City is required' })}
                  error={errors.city?.message}
                  disabled={!isEditing}
                />
              </div>

              <Input
                label="Pincode"
                {...register('pincode', { required: 'Pincode is required' })}
                error={errors.pincode?.message}
                disabled={!isEditing}
              />

              <Input
                label="Address Line 1"
                {...register('addressLine1', { required: 'Address is required' })}
                error={errors.addressLine1?.message}
                disabled={!isEditing}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Address Line 2"
                  {...register('addressLine2')}
                  disabled={!isEditing}
                />
                <Input
                  label="Address Line 3"
                  {...register('addressLine3')}
                  disabled={!isEditing}
                />
              </div>

              <Input
                label="Landmark"
                {...register('landmark')}
                disabled={!isEditing}
              />
            </div>
          </form>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={action.action}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Logout Section */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Account Actions</h3>
              <p className="text-gray-600">Manage your account settings</p>
            </div>
            <Button 
              onClick={logout}
              variant="danger"
              className="flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </RenterLayout>
  );
};