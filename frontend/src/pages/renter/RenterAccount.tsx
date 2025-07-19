import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RenterLayout } from '../../components/renter/RenterLayout';
import { Card } from '../../components/common/Layout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../context/CartContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  HelpCircle,
  LogOut,
  Edit,
  Save,
  X,
  Heart,
  History,
  ChevronDown,
  ChevronUp
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
  const { wishlist, removeFromWishlist } = useCart();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showWishlist, setShowWishlist] = useState(false);

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

  // FAQ Data for Renters
  const faqData = [
    {
      question: "How do I rent an item?",
      answer: "Browse categories, select an item, choose dates, and submit a request. The owner will approve or decline. Once confirmed, pay securely and arrange pickup/delivery."
    },
    {
      question: "What items can I rent?",
      answer: "You can rent electronics, tools, furniture, sports gear, and more. Check the listing for availability and rules."
    },
    {
      question: "How do I search for specific items?",
      answer: "Use the search bar or filter by category, price, or location."
    },
    {
      question: "Can I negotiate the rental price?",
      answer: "Some owners allow price negotiation. Use the in-app chat to discuss before booking."
    },
    {
      question: "How do I pay for a rental?",
      answer: "Payments are processed securely via the platform (credit card, digital wallets, etc.). You'll be charged once the owner confirms."
    },
    {
      question: "Is there a security deposit?",
      answer: "Some owners require a refundable deposit. It's held by the platform and returned after the item is safely returned."
    },
    {
      question: "What if I need to cancel my booking?",
      answer: "Go to \"My Bookings\" and cancel. Check the owner's cancellation policy—some may charge a fee."
    },
    {
      question: "What happens if the owner cancels my booking?",
      answer: "You'll get a full refund. We may also help you find a similar item."
    },
    {
      question: "How do I communicate with the owner?",
      answer: "Use the in-app messaging system for safety and record-keeping."
    },
    {
      question: "How do I pick up the item?",
      answer: "Arrange a meetup or pickup location with the owner. Some items may offer delivery (check the listing)."
    },
    {
      question: "What if the item is damaged or not as described?",
      answer: "Report it immediately via the app. Take photos as proof. We'll mediate a solution (refund, replacement, etc.)."
    },
    {
      question: "Can I extend my rental period?",
      answer: "Yes! Contact the owner via chat before the due date. Extra charges may apply."
    },
    {
      question: "What if I return the item late?",
      answer: "Late fees may apply (set by the owner). Always communicate delays to avoid penalties."
    },
    {
      question: "How do I leave a review?",
      answer: "After returning the item, go to \"My Bookings\" and rate the owner/item."
    },
    {
      question: "What if the owner accuses me of damage I didn't cause?",
      answer: "Dispute the claim with evidence (photos/videos from pickup). We'll investigate fairly."
    },
    {
      question: "Are there penalties for losing an item?",
      answer: "You're responsible for lost items. The owner may claim the security deposit or charge replacement costs."
    },
    {
      question: "Can I rent items long-term?",
      answer: "Yes! Many owners offer discounts for weekly/monthly rentals—message them to discuss."
    },
    {
      question: "How do I get help in an emergency?",
      answer: "Contact our 24/7 support team via chat or email for urgent issues."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes! We use encrypted payment gateways and never store your card details."
    },
    {
      question: "How do I report a suspicious listing or user?",
      answer: "Click \"Report\" on the listing/profile or contact support. We'll investigate and take action."
    }
  ];

  const quickActions = [
    {
      icon: Heart,
      title: 'Wishlist',
      description: 'View saved items',
      color: 'text-red-500 bg-red-100',
      action: () => setShowWishlist(true)
    },
    {
      icon: History,
      title: 'Order History',
      description: 'View past rentals',
      color: 'text-blue-500 bg-blue-100',
      action: () => navigate('/renter/rentals')
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help with your account',
      color: 'text-orange-500 bg-orange-100',
      action: () => setShowFAQ(true)
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
          {stats.map((stat) => (
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
                  <div onClick={action.action} className="cursor-pointer">
                    <Card className="p-4 hover:shadow-md transition-shadow">
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
                  </div>
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

      {/* FAQ Modal */}
      {showFAQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Help & Support</h2>
              </div>
              <button
                onClick={() => setShowFAQ(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    >
                      <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                      {expandedFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Safety Tips Section */}
              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-4">Safety Tips for Renters</h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <p className="text-blue-800">Inspect items before accepting them.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <p className="text-blue-800">Meet in public for exchanges (or use secure lockers if available).</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold">✓</span>
                    <p className="text-blue-800">Keep receipts/agreements in the app for dispute resolution.</p>
                  </div>
                </div>
              </div>

              {/* Contact Support Section */}
              <div className="mt-8 p-6 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-2">Still need help?</h3>
                <p className="text-orange-700 mb-4">
                  Can't find what you're looking for? Our support team is here to help you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                    Contact Support
                  </button>
                  <button className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors">
                    Email us at support@assetra.com
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Modal */}
      {showWishlist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                  {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={() => setShowWishlist(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {wishlist.length === 0 ? (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-600 mb-4">Start adding items you love to your wishlist!</p>
                  <Button onClick={() => setShowWishlist(false)} variant="outline">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-48 object-cover"
                        />
                        <button
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                        </button>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-emerald-600">₹{item.price}/day</span>
                          {item.owner && (
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-gray-600">Rating:</span>
                              <span className="text-sm font-medium text-yellow-600">
                                ★ {item.owner.rating}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {item.owner && (
                          <div className="mb-3">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Owner:</span> {item.owner.name}
                            </p>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => {
                              // Navigate to product details or rent directly
                              setShowWishlist(false);
                            }}
                          >
                            Rent Now
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </RenterLayout>
  );
};