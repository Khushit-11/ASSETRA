import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RenterLayout } from '../../components/renter/RenterLayout';
import { Card } from '../../components/common/Layout';
import { Button } from '../../components/common/Button';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  RotateCcw,
  Star,
  Upload,
  Calendar,
  MapPin,
  Phone
} from 'lucide-react';

export const RenterRentals: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState<string | null>(null);

  // Mock rental data
  const rentals = [
    {
      id: '1',
      productName: 'Professional DSLR Camera',
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      ownerName: 'John Doe',
      ownerPhone: '+91 9876543210',
      status: 'rented',
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      rentAmount: 1500,
      securityAmount: 25000,
      address: 'Mumbai, Maharashtra',
      returnDeadline: '2024-01-18 18:00'
    },
    {
      id: '2',
      productName: 'Gaming Laptop',
      image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
      ownerName: 'Priya Patel',
      ownerPhone: '+91 9876543211',
      status: 'delivered',
      startDate: '2024-01-16',
      endDate: '2024-01-20',
      rentAmount: 3200,
      securityAmount: 45000,
      address: 'Pune, Maharashtra'
    },
    {
      id: '3',
      productName: 'Exercise Bike',
      image: 'https://images.pexels.com/photos/4046719/pexels-photo-4046719.jpeg',
      ownerName: 'Amit Singh',
      ownerPhone: '+91 9876543212',
      status: 'return-scheduled',
      startDate: '2024-01-10',
      endDate: '2024-01-15',
      rentAmount: 800,
      securityAmount: 5000,
      address: 'Delhi, India'
    }
  ];

  const statusConfig = {
    'request-sent': { label: 'Request Sent', color: 'bg-blue-100 text-blue-800', icon: Clock },
    'accepted': { label: 'Accepted', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    'out-for-delivery': { label: 'Out for Delivery', color: 'bg-yellow-100 text-yellow-800', icon: Truck },
    'delivered': { label: 'Delivered', color: 'bg-emerald-100 text-emerald-800', icon: Package },
    'rented': { label: 'In Use', color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
    'return-scheduled': { label: 'Return Scheduled', color: 'bg-orange-100 text-orange-800', icon: RotateCcw }
  };

  const filteredRentals = rentals.filter(rental => {
    if (filter === 'all') return true;
    return rental.status === filter;
  });

  const handleInitiateReturn = (rentalId: string) => {
    setSelectedRental(rentalId);
    setShowReturnModal(true);
  };

  const handleSubmitFeedback = (rentalId: string, rating: number, comment: string) => {
    console.log('Feedback submitted:', { rentalId, rating, comment });
    alert('Thank you for your feedback!');
  };

  return (
    <RenterLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Rentals</h1>
          <p className="text-gray-600">Track and manage your rental orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit overflow-x-auto">
          {[
            { key: 'all', label: 'All Rentals' },
            { key: 'delivered', label: 'Active' },
            { key: 'return-scheduled', label: 'Returning' },
            { key: 'returned', label: 'Completed' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Rentals List */}
        <div className="space-y-4">
          {filteredRentals.map((rental, index) => {
            const statusInfo = statusConfig[rental.status as keyof typeof statusConfig];
            const StatusIcon = statusInfo.icon;

            return (
              <motion.div
                key={rental.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={rental.image}
                        alt={rental.productName}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {rental.productName}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {rental.startDate} to {rental.endDate}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {rental.address}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusInfo.label}
                          </span>
                        </div>
                      </div>

                      {/* Owner Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <span>Owner: {rental.ownerName}</span>
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {rental.ownerPhone}
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="flex items-center space-x-6 text-sm mb-4">
                        <span>Rent: <span className="font-semibold text-emerald-600">₹{rental.rentAmount}</span></span>
                        <span>Security: <span className="font-semibold">₹{rental.securityAmount}</span></span>
                      </div>

                      {/* Return Deadline */}
                      {rental.returnDeadline && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                          <p className="text-sm text-yellow-800">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Return by: {rental.returnDeadline}
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex space-x-3">
                        {rental.status === 'rented' && (
                          <Button
                            onClick={() => handleInitiateReturn(rental.id)}
                            size="sm"
                          >
                            <RotateCcw className="w-4 h-4 mr-1" />
                            Initialize Return
                          </Button>
                        )}
                        
                        {rental.status === 'return-scheduled' && (
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-1" />
                            Upload After Image
                          </Button>
                        )}

                        <Button variant="outline" size="sm">
                          Track Order
                        </Button>

                        <Button variant="outline" size="sm">
                          Contact Owner
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredRentals.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No rentals found</h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "You haven't rented any items yet." 
                  : `No rentals with status: ${filter}`
                }
              </p>
              <Button onClick={() => window.location.href = '/renter/home'}>
                Browse Products
              </Button>
            </div>
          </div>
        )}

        {/* Return Modal */}
        {showReturnModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Initialize Return</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload After-Use Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate Your Experience
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <Star key={rating} className="w-6 h-6 text-yellow-400 cursor-pointer hover:text-yellow-500" />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments (Optional)
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    rows={3}
                    placeholder="Share your experience..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={() => setShowReturnModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button className="flex-1">
                  Submit Return Request
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </RenterLayout>
  );
};