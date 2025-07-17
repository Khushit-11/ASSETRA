import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RenterLayout } from '../../components/renter/RenterLayout';
import { Chatbot } from '../../components/renter/Chatbot';
import { Card } from '../../components/common/Layout';
import { Button } from '../../components/common/Button';
import { 
  Search, 
  Smartphone, 
  Home as HomeIcon, 
  Shirt, 
  Dumbbell, 
  Sofa, 
  Wrench,
  TrendingUp,
  MapPin,
  Star,
  Heart,
  ShoppingCart,
  Package
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const RenterHome: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(1);
  const navigate = useNavigate();

  const categories = [
    { icon: Smartphone, label: 'Electronics', color: 'bg-blue-100 text-blue-600', path: 'electronics' },
    { icon: HomeIcon, label: 'Home Appliances', color: 'bg-green-100 text-green-600', path: 'home-appliances' },
    { icon: Shirt, label: 'Clothing', color: 'bg-purple-100 text-purple-600', path: 'clothing' },
    { icon: Dumbbell, label: 'Fitness', color: 'bg-red-100 text-red-600', path: 'fitness' },
    { icon: Sofa, label: 'Furniture', color: 'bg-yellow-100 text-yellow-600', path: 'furniture' },
    { icon: Wrench, label: 'Tools', color: 'bg-gray-100 text-gray-600', path: 'tools' }
  ];

  const bannerSlides = [
    {
      title: 'Rent Premium Electronics',
      subtitle: 'Latest gadgets at unbeatable prices',
      image: 'https://images.pexels.com/photos/4050314/pexels-photo-4050314.jpeg',
      cta: 'Explore Now'
    },
    {
      title: 'Home Appliances Made Easy',
      subtitle: 'Everything you need for your home',
      image: 'https://images.pexels.com/photos/5585952/pexels-photo-5585952.jpeg',
      cta: 'Browse Collection'
    },
    {
      title: 'Fitness Equipment Rentals',
      subtitle: 'Stay fit without the commitment',
      image: 'https://images.pexels.com/photos/5717985/pexels-photo-5717985.jpeg',
      cta: 'Get Started'
    }
  ];

  const trendingProducts = [
    {
      id: '1',
      title: 'Professional DSLR Camera',
      price: 500,
      originalPrice: 25000,
      images: [
        'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
        'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
        'https://images.pexels.com/photos/225157/pexels-photo-225157.jpeg'
      ],
      rating: 4.8,
      location: '2.5 km away',
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
      price: 800,
      originalPrice: 45000,
      images: [
        'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg'
      ],
      rating: 4.9,
      location: '1.2 km away',
      securityDeposit: 5000,
      owner: {
        name: 'Jane Smith',
        rating: 4.8,
        totalRentals: 120,
        phone: '+91 9876543211'
      },
      features: [
        'High performance',
        'RGB keyboard',
        'Gaming mouse included'
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
      price: 300,
      originalPrice: 15000,
      images: [
        'https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg'
      ],
      rating: 4.7,
      location: '3.1 km away',
      securityDeposit: 5000,
      owner: {
        name: 'Sam Lee',
        rating: 4.7,
        totalRentals: 60,
        phone: '+91 9876543212'
      },
      features: [
        'Surround sound',
        'Bluetooth connectivity',
        'Remote included'
      ],
      specifications: {
        brand: 'Sony',
        model: 'HT-S700RF',
        type: 'Home Theater',
        condition: 'Excellent'
      }
    }
  ];

  const aiRecommendations = [
    {
      id: '4',
      title: 'Coffee Machine',
      price: '₹150/day',
      image: 'https://images.pexels.com/photos/4224694/pexels-photo-4224694.jpeg',
      reason: 'Perfect for your morning routine'
    },
    {
      id: '5',
      title: 'Exercise Bike',
      price: '₹200/day',
      image: 'https://images.pexels.com/photos/4046719/pexels-photo-4046719.jpeg',
      reason: 'Great for home workouts'
    }
  ];

  const handleCategoryClick = (categoryPath: string) => {
    navigate(`/renter/category/${categoryPath}`);
  };

  const handleProductClick = (productId: string) => {
    navigate(`/renter/product/${productId}`);
  };

  const handleRentNowClick = (product: any) => {
    setSelectedProduct(product);
    setShowRentModal(true);
    setStartDate('');
    setEndDate('');
    setSelectedDuration(1);
  };

  const calculateTotal = () => {
    if (!selectedProduct) return { rentTotal: 0, total: 0, days: selectedDuration };
    const days = selectedDuration;
    const price = parseInt(selectedProduct.price.replace(/[^0-9]/g, ''));
    const securityDeposit = selectedProduct.securityDeposit || 5000;
    const rentTotal = price * days;
    const total = rentTotal + securityDeposit;
    return { rentTotal, total, days };
  };

  const handleRentSubmit = () => {
    if (!startDate || !endDate) {
      alert('Please select rental dates');
      return;
    }
    setShowRentModal(false);
    navigate('/renter/checkout', {
      state: {
        product: selectedProduct,
        startDate,
        endDate,
        duration: selectedDuration,
        pricing: calculateTotal()
      }
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Unauthorized. Please log in.</div>;

  return (
    <RenterLayout onChatToggle={() => setShowChat(!showChat)}>
      <div className="space-y-6">
        {/* Rent Modal */}
        {showRentModal && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowRentModal(false)}
              >
                ×
              </button>
              <h3 className="font-semibold text-gray-900 mb-4">Rent {selectedProduct.title}</h3>
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
                  <span>Rent (₹{selectedProduct.price} × {selectedDuration} days)</span>
                  <span>₹{parseInt(selectedProduct.price.replace(/[^0-9]/g, '')) * selectedDuration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Security Deposit</span>
                  <span>₹{selectedProduct.securityDeposit || 5000}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{(parseInt(selectedProduct.price.replace(/[^0-9]/g, '')) * selectedDuration) + (selectedProduct.securityDeposit || 5000)}</span>
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
        {/* Search Bar */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for electronics, furniture, appliances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </Card>

        {/* Banner Carousel */}
        <div className="relative h-48 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-600">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative h-full flex items-center justify-center text-white text-center p-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome to Assetra</h2>
                <p className="text-emerald-100 mb-4">Rent anything, anytime, anywhere</p>
                <Button variant="secondary">Explore Categories</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Browse Categories</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card 
                    className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleCategoryClick(category.path)}
                  >
                    <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-medium text-gray-900">{category.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
              <p className="text-gray-600 text-sm">AI-powered suggestions based on your preferences</p>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-purple-700">✨ AI Powered</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiRecommendations.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex space-x-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
                      <p className="text-emerald-600 font-bold mb-1">{product.price}</p>
                      <p className="text-xs text-blue-600 mb-2">{product.reason}</p>
                      <Button size="sm" className="w-full">
                        <Button size="sm" className="w-full" onClick={() => handleRentNowClick(product)}>
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Rent Now
                        </Button>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trending Near You */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
              Trending Near You
            </h2>
            <button className="text-emerald-600 text-sm font-medium">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                    />
                    <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="absolute bottom-3 left-3 bg-white/90 px-2 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">{product.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-lg font-bold text-emerald-600">{product.price}</p>
                        <p className="text-xs text-gray-500 line-through">{product.originalPrice}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {product.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1" onClick={() => handleRentNowClick(product)}>
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Rent Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleProductClick(product.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Most Rented */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Most Rented Items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Gaming Chair', 'WiFi Router', 'Projector', 'Sound System'].map((item, index) => (
              <Card key={item} className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-900">{item}</p>
            <p className="text-xs text-gray-500">From ₹{(index + 1) * 100}/day</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot isOpen={showChat} onClose={() => setShowChat(false)} />
    </RenterLayout>
  );
};