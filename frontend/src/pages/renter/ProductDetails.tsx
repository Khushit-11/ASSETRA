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
  const { addToCart, addToWishlist, wishlist } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showRentModal, setShowRentModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(1);

  // Products data (should match the data from RenterHome)
  const products = [
    {
      id: '1',
      title: 'Professional DSLR Camera',
      description: 'High-quality Canon EOS R5 with 24-105mm lens. Perfect for professional photography, events, and creative projects. Includes camera bag, extra batteries, and memory cards.',
      price: 500,
      originalPrice: 25000,
      category: 'Electronics',
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
    },
    {
      id: '2',
      title: 'Gaming Laptop',
      description: 'High-performance Dell Alienware laptop perfect for gaming, video editing, and professional work. Features RGB keyboard and comes with gaming mouse.',
      price: 800,
      originalPrice: 45000,
      category: 'Electronics',
      images: [
        'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'
      ],
      rating: 4.9,
      reviewCount: 89,
      location: '1.2 km away',
      available: true,
      securityDeposit: 5000,
      owner: {
        name: 'Jane Smith',
        rating: 4.8,
        totalRentals: 120,
        phone: '+91 9876543211'
      },
      features: [
        'High performance CPU',
        'RGB keyboard included',
        'Gaming mouse included',
        'High refresh rate display',
        'Professional grade cooling'
      ],
      specifications: {
        brand: 'Dell',
        model: 'Alienware',
        type: 'Gaming Laptop',
        condition: 'Excellent'
      }
    },
    {
      id: '3',
      title: 'Home Theater System',
      description: 'Sony HT-S700RF surround sound system perfect for movie nights and entertainment. Features Bluetooth connectivity and crystal clear audio.',
      price: 300,
      originalPrice: 15000,
      category: 'Home Appliances',
      images: [
        'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg'
      ],
      rating: 4.7,
      reviewCount: 45,
      location: '3.1 km away',
      available: true,
      securityDeposit: 3000,
      owner: {
        name: 'Sam Lee',
        rating: 4.7,
        totalRentals: 60,
        phone: '+91 9876543212'
      },
      features: [
        'Surround sound system',
        'Bluetooth connectivity',
        'Remote included',
        'Multiple input options',
        'Easy setup'
      ],
      specifications: {
        brand: 'Sony',
        model: 'HT-S700RF',
        type: 'Home Theater',
        condition: 'Excellent'
      }
    },
    {
      id: '4',
      title: 'Coffee Machine',
      description: 'Premium coffee machine perfect for home or office use. Makes delicious espresso, cappuccino, and regular coffee with ease.',
      price: 150,
      originalPrice: 8000,
      category: 'Home Appliances',
      images: [
        'https://images.pexels.com/photos/4224694/pexels-photo-4224694.jpeg'
      ],
      rating: 4.6,
      reviewCount: 32,
      location: '1.8 km away',
      available: true,
      securityDeposit: 3000,
      owner: {
        name: 'Mike Johnson',
        rating: 4.6,
        totalRentals: 45,
        phone: '+91 9876543213'
      },
      features: [
        'Multiple coffee types',
        'Easy to use',
        'Auto-clean function',
        'Milk frother included',
        'Timer function'
      ],
      specifications: {
        brand: 'De\'Longhi',
        model: 'EC685M',
        type: 'Coffee Machine',
        condition: 'Excellent'
      }
    },
    {
      id: '5',
      title: 'Exercise Bike',
      description: 'High-quality exercise bike perfect for home workouts. Features adjustable resistance, digital display, and comfortable seating.',
      price: 200,
      originalPrice: 12000,
      category: 'Fitness',
      images: [
        'https://images.pexels.com/photos/4046719/pexels-photo-4046719.jpeg'
      ],
      rating: 4.5,
      reviewCount: 28,
      location: '2.3 km away',
      available: true,
      securityDeposit: 4000,
      owner: {
        name: 'Sarah Wilson',
        rating: 4.5,
        totalRentals: 38,
        phone: '+91 9876543214'
      },
      features: [
        'Adjustable resistance',
        'Digital display',
        'Comfortable seating',
        'Heart rate monitor',
        'Compact design'
      ],
      specifications: {
        brand: 'Schwinn',
        model: 'IC4',
        type: 'Exercise Bike',
        condition: 'Excellent'
      }
    }
  ];

  // Find the product based on productId
  const product = products.find(p => p.id === productId);

  // If product not found, show error or redirect
  if (!product) {
    return (
      <RenterLayout>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/renter')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </RenterLayout>
    );
  }

  const calculateTotal = () => {
    const days = selectedDuration;
    const rentTotal = product.price * days;
    const total = rentTotal + product.securityDeposit;
    return { rentTotal, total, days };
  };

  const handleRentNow = () => {
    setShowRentModal(true);
  };

  // Wishlist functionality
  const isInWishlist = () => {
    return wishlist.some(item => item.id === product.id);
  };

  const handleWishlistToggle = () => {
    const cartItem = {
      id: product.id,
      name: product.title,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      securityDeposit: product.securityDeposit,
      owner: {
        name: product.owner.name,
        rating: product.owner.rating,
        phone: product.owner.phone
      }
    };
    addToWishlist(cartItem);
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
            <button 
              onClick={handleWishlistToggle}
              className={`p-2 rounded-lg hover:bg-gray-100 ${
                isInWishlist() ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist() ? 'fill-current' : ''}`} />
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