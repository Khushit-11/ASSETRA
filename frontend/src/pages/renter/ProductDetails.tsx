import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RenterLayout } from '../../components/renter/RenterLayout';
import { Card } from '../../components/common/Layout';
import { Button } from '../../components/common/Button';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Heart, 
  Share2,
  Calendar,
  Shield,
  Truck,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const ProductDetails: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showRentModal, setShowRentModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(1);

  // Mock product data
  const product = {
    id: productId,
    title: 'Professional DSLR Camera',
    description: 'High-quality Canon EOS R5 with 24-105mm lens. Perfect for professional photography, events, and creative projects. Includes camera bag, extra batteries, and memory cards.',
    price: 500,
    originalPrice: 25000,
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
      'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg'
    ],
    rating: 4.8,
    reviewCount: 124,
    location: '2.5 km away',
    available: true,
    securityDeposit: 5000,
    owner: {
      name: 'John Doe',
      rating: 4.9,
      totalRentals: 89,
      phone: '+91 9876543210'
    },
    features: [
      '24-105mm lens included',
      'Extra batteries provided',
      'Memory cards included',
      'Camera bag provided',
      'Professional grade'
    ],
    specifications: {
      brand: 'Canon',
      model: 'EOS R5',
      type: 'Mirrorless Camera',
      condition: 'Excellent'
    }
  };

  const calculateTotal = () => {
    const days = selectedDuration;
    const rentTotal = product.price * days;
    const total = rentTotal + product.securityDeposit;
    return { rentTotal, total, days };
  };

  const handleRentNow = () => {
    setShowRentModal(true);
  };

  const handleRentSubmit = () => {
    if (!startDate || !endDate) {
      alert('Please select rental dates');
      return;
    }
    setShowRentModal(false);
    navigate('/renter/checkout', { 
      state: { 
        product, 
        startDate, 
        endDate, 
        duration: selectedDuration,
        pricing: calculateTotal()
      } 
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id || '',
      name: product.title,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      securityDeposit: product.securityDeposit,
      owner: product.owner
    });
    window.alert('Added to cart!');
  };

  return (
    <RenterLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <Card className="overflow-hidden">
          <div className="relative h-64 md:h-80">
            <img
              src={product.images[currentImageIndex]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Product Info */}
        <Card className="p-4">
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{product.rating} ({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{product.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-emerald-600">₹{product.price}/day</p>
                <p className="text-sm text-gray-500">Security: ₹{product.securityDeposit}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Available
                </span>
              </div>
            </div>

            <p className="text-gray-700">{product.description}</p>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">What's Included</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Owner Info */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-semibold">
                  {product.owner.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{product.owner.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span>{product.owner.rating} • {product.owner.totalRentals} rentals</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>

        {/* Rental Duration */}
        {/* Rent Modal */}
        {showRentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowRentModal(false)}
              >
                ×
              </button>
              <h3 className="font-semibold text-gray-900 mb-4">Rent This Product</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (days)</label>
                <div className="flex space-x-2">
                  {[1, 3, 7, 15, 30].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedDuration === duration
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {duration} day{duration > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Rent (₹{product.price} × {selectedDuration} days)</span>
                  <span>₹{product.price * selectedDuration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Security Deposit</span>
                  <span>₹{product.securityDeposit}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{(product.price * selectedDuration) + product.securityDeposit}</span>
                </div>
                <p className="text-xs text-gray-600">
                  *Security deposit will be refunded after return
                </p>
              </div>
              <Button className="w-full" onClick={handleRentSubmit}>
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}

        {/* Safety Features */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Safety & Trust</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm font-medium">Verified Owner</p>
                <p className="text-xs text-gray-600">Identity verified</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Truck className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium">Safe Delivery</p>
                <p className="text-xs text-gray-600">Contactless option</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium">Flexible Return</p>
                <p className="text-xs text-gray-600">Easy return process</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 lg:relative lg:border-t-0 lg:bg-transparent lg:p-0">
          <div className="flex space-x-3 max-w-md mx-auto lg:max-w-none">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <Button
              className="flex-1"
              onClick={handleRentNow}
            >
              Rent Now
            </Button>
          </div>
        </div>

        {/* Bottom spacing for mobile */}
        <div className="h-20 lg:hidden"></div>
      </div>
    </RenterLayout>
  );
};