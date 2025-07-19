import React, { useState, useRef } from 'react';
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
  Phone,
  X,
  Check
} from 'lucide-react';

export const RenterRentals: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedRental, setSelectedRental] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingLink, setTrackingLink] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock rental data - using state to allow updates
  const [rentals, setRentals] = useState([
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
  ]);

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
    // Reset form state
    setUploadedImage(null);
    setImagePreview(null);
    setRating(0);
    setComments('');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleSubmitReturn = async () => {
    if (!uploadedImage || rating === 0) {
      alert('Please upload an image and provide a rating before submitting.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Return submitted:', {
        rentalId: selectedRental,
        image: uploadedImage,
        rating,
        comments
      });

      // Close modal and show success message
      setShowReturnModal(false);
      setShowSuccessMessage(true);

      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);

    } catch (error) {
      console.error('Error submitting return:', error);
      alert('Error submitting return. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RenterLayout>
      <div className="space-y-6">
        {/* Success Message */}
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3"
          >
            <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">Return Initialized Successfully!</p>
              <p className="text-green-600 text-sm">Your return is being processed. You'll be notified once it's approved.</p>
            </div>
          </motion.div>
        )}

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

                        <Button variant="outline" size="sm">
                          Track Order
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
              className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Initialize Return</h3>
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload After-Use Image *
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div 
                    onClick={handleFileUploadClick}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-emerald-500 transition-colors"
                  >
                    {imagePreview ? (
                      <div className="space-y-2">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover mx-auto rounded-lg"
                        />
                        <p className="text-sm text-emerald-600">Image uploaded successfully!</p>
                        <p className="text-xs text-gray-500">Click to change image</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate Your Experience *
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map(starRating => (
                      <Star 
                        key={starRating} 
                        className={`w-6 h-6 cursor-pointer transition-colors ${
                          starRating <= rating 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300 hover:text-yellow-400'
                        }`}
                        onClick={() => handleStarClick(starRating)}
                      />
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      You rated: {rating} star{rating > 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments (Optional)
                  </label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={3}
                    placeholder="Share your experience with this rental..."
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <Button
                  onClick={() => setShowReturnModal(false)}
                  variant="outline"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmitReturn}
                  className="flex-1"
                  disabled={isSubmitting || !uploadedImage || rating === 0}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Return Request'}
                </Button>
              </div>

              {(!uploadedImage || rating === 0) && (
                <p className="text-xs text-red-500 mt-2 text-center">
                  * Image upload and rating are required
                </p>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </RenterLayout>
  );
};