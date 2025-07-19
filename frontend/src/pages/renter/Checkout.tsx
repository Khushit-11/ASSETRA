import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RenterLayout } from '../../components/renter/RenterLayout';
import { Card } from '../../components/common/Layout';
import { Button } from '../../components/common/Button';
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Smartphone,
  Banknote,
  Check,
  Plus,
  Edit,
  CheckCircle,
  X
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};
  const products = Array.isArray(product) ? product : [product]; // Ensure array

  const [selectedAddress, setSelectedAddress] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const addresses = [
    {
      id: '1',
      label: 'Home',
      address: '123 Main Street, Near Central Mall, Mumbai, 400001',
      isDefault: true
    },
    {
      id: '2',
      label: 'Office',
      address: '456 Business Park, Tower A, Floor 12, Mumbai, 400051',
      isDefault: false
    }
  ];

  const paymentMethods = [
    { id: 'upi', label: 'UPI Payment', icon: Smartphone, description: 'Pay using UPI apps' },
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, etc.' },
    { id: 'cod', label: 'Cash on Delivery', icon: Banknote, description: 'Pay when item is delivered' }
  ];

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <RenterLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">No products selected for checkout</p>
          <Button onClick={() => navigate('/renter/home')} className="mt-4">
            Go to Home
          </Button>
        </div>
      </RenterLayout>
    );
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Show success modal immediately after short processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
      
      // Auto close modal and navigate to home page after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate('/renter/home');
      }, 3000);
    }, 1000);
  };

  const totalAmount = products.reduce(
    (sum, item) => sum + (item.pricing?.total || 0),
    0
  );

  return (
    <RenterLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Product Summary */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Order Summary</h3>
          <div className="flex flex-col gap-4">
            {products.map((item, idx) => (
              <div key={item.id || idx} className="flex space-x-4 border-b pb-3 last:border-b-0 last:pb-0">
                <img
                  src={item.image || (item.images?.[0])}
                  alt={item.name || item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.name || item.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {item.startDate} to {item.endDate}
                    </span>
                    <span>{item.duration} days</span>
                  </div>
                  <p className="text-emerald-600 font-semibold mt-1">
                    ₹{item.price}/day
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Delivery Address */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Delivery Address</h3>
            <button className="text-emerald-600 text-sm font-medium">
              <Plus className="w-4 h-4 inline mr-1" />
              Add New
            </button>
          </div>

          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedAddress === address.id
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedAddress(address.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 mt-1 ${
                        selectedAddress === address.id
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedAddress === address.id && (
                        <Check className="w-2 h-2 text-white m-0.5" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{address.label}</span>
                        {address.isDefault && (
                          <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{address.address}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    paymentMethod === method.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod(method.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      paymentMethod === method.id
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-gray-300'
                    }`}>
                      {paymentMethod === method.id && (
                        <Check className="w-2 h-2 text-white m-0.5" />
                      )}
                    </div>
                    <Icon className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">{method.label}</p>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Price Breakdown */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Price Details</h3>
          <div className="space-y-3">
            {products.map((item, idx) => (
              <div key={item.id || idx} className="mb-2 border-b pb-2 last:border-b-0 last:pb-0">
                <div className="flex justify-between text-sm">
                  <span>{item.name || item.title} (₹{item.price} × {item.duration} days)</span>
                  <span>₹{item.pricing?.rentTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Security Deposit</span>
                  <span>₹{item.pricing?.securityDeposit}</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between text-sm text-green-600">
              <span>Delivery</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold text-lg">
              <span>Total Amount</span>
              <span>₹{totalAmount}</span>
            </div>
            <p className="text-xs text-gray-600">
              *Security deposit will be refunded after successful return
            </p>
          </div>
        </Card>

        {/* Terms */}
        <Card className="p-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="terms" className="text-sm text-gray-700">
              I agree to the{' '}
              <button className="text-emerald-600 hover:text-emerald-700">
                Terms & Conditions
              </button>{' '}
              and{' '}
              <button className="text-emerald-600 hover:text-emerald-700">
                Rental Policy
              </button>
            </label>
          </div>
        </Card>

        {/* Place Order Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:relative lg:border-t-0 lg:bg-transparent lg:p-0">
          <Button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="w-full"
            size="lg"
          >
            {isProcessing ? 'Processing...' : `Place Order • ₹${totalAmount}`}
          </Button>
        </div>

        <div className="h-20 lg:hidden"></div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowSuccessModal(false)}
            >
              {/* Modal */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", duration: 0.6 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>

                {/* Success Message */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Thank You!
                  </h2>
                  <p className="text-lg text-gray-700 mb-2">
                    Your order has been placed successfully
                  </p>
                  <p className="text-sm text-gray-500 mb-6">
                    You will be redirected to the home page shortly
                  </p>
                </motion.div>

                {/* Close Button */}
                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Progress Indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3 }}
                  className="h-1 bg-blue-600 rounded-full mt-4"
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </RenterLayout>
  );
};
