import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RenterLayout } from '../../components/renter/RenterLayout';
import { Card } from '../../components/common/Layout';
import { Button } from '../../components/common/Button';
import { 
  CheckCircle, 
  Calendar, 
  MapPin, 
  CreditCard,
  Package,
  Phone,
  MessageCircle
} from 'lucide-react';

export const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, product, startDate, endDate, duration, pricing, address, paymentMethod } = location.state || {};

  if (!orderId) {
    return (
      <RenterLayout>
        <div className="text-center py-12">
          <p className="text-gray-600">Order information not found</p>
          <Button onClick={() => navigate('/renter/home')} className="mt-4">
            Go to Home
          </Button>
        </div>
      </RenterLayout>
    );
  }

  return (
    <RenterLayout>
      <div className="space-y-6">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center py-8"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600">Your rental request has been sent to the owner</p>
        </motion.div>

        {/* Order Details */}
        <Card className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Order ID</h2>
            <p className="text-2xl font-bold text-emerald-600">{orderId}</p>
          </div>

          <div className="space-y-4">
            {/* Product Info */}
            <div className="flex space-x-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{product.title}</h3>
                <p className="text-sm text-gray-600">₹{product.price}/day</p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {startDate} to {endDate}
                  </span>
                  <span>{duration} days</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Delivery Address</p>
                <p className="text-sm text-gray-600">{address?.address}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-start space-x-3">
              <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Payment Method</p>
                <p className="text-sm text-gray-600">{paymentMethod?.label}</p>
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Rent Amount</span>
                  <span>₹{pricing.rentTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Security Deposit</span>
                  <span>₹{product.securityDeposit}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Paid</span>
                  <span>₹{pricing.total}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">What happens next?</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">1</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Owner Review</p>
                <p className="text-sm text-gray-600">The owner will review your request and respond within 2 hours</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">2</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Delivery Arrangement</p>
                <p className="text-sm text-gray-600">Once approved, delivery will be arranged to your address</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 text-sm font-semibold">3</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Enjoy Your Rental</p>
                <p className="text-sm text-gray-600">Use the item and return it on the scheduled date</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Owner Contact */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Owner Contact</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">{product.owner.name}</p>
              <p className="text-sm text-gray-600">Response time: Usually within 1 hour</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-1" />
                Chat
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/renter/rentals')}
            className="w-full"
            size="lg"
          >
            <Package className="w-5 h-5 mr-2" />
            Track Your Order
          </Button>
          <Button
            onClick={() => navigate('/renter/home')}
            variant="outline"
            className="w-full"
            size="lg"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </RenterLayout>
  );
};