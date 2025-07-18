import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RenterLayout } from '../../components/renter/RenterLayout';
import { Card } from '../../components/common/Layout';
import { Button } from '../../components/common/Button';
import { 
  Search, 
  Star, 
  MapPin, 
  Heart, 
  ShoppingCart,
  ArrowLeft,
  SlidersHorizontal
} from 'lucide-react';

export const CategoryProducts: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Mock products data based on category
  const getProductsByCategory = (cat: string) => {
    const allProducts = {
      electronics: [
        {
          id: '1',
          title: 'Professional DSLR Camera',
          price: 500,
          originalPrice: 25000,
          image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
          rating: 4.8,
          location: '2.5 km away',
          available: true,
          securityDeposit: 5000
        },
        {
          id: '2',
          title: 'Gaming Laptop',
          price: 800,
          originalPrice: 45000,
          image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
          rating: 4.9,
          location: '1.2 km away',
          available: true,
          securityDeposit: 8000
        },
        {
          id: '3',
          title: 'Wireless Headphones',
          price: 150,
          originalPrice: 8000,
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
          rating: 4.6,
          location: '3.1 km away',
          available: true,
          securityDeposit: 1500
        },
        {
          id: '4',
          title: 'Smart TV 55 inch',
          price: 400,
          originalPrice: 35000,
          image: 'https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg',
          rating: 4.7,
          location: '4.2 km away',
          available: false,
          securityDeposit: 6000
        }
      ],
      'home-appliances': [
        {
          id: '5',
          title: 'Washing Machine',
          price: 300,
          originalPrice: 25000,
          image: 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg',
          rating: 4.5,
          location: '1.8 km away',
          available: true,
          securityDeposit: 4000
        },
        {
          id: '6',
          title: 'Refrigerator',
          price: 450,
          originalPrice: 30000,
          image: 'https://images.pexels.com/photos/2343468/pexels-photo-2343468.jpeg',
          rating: 4.8,
          location: '2.1 km away',
          available: true,
          securityDeposit: 5500
        },
        {
          id: '7',
          title: 'Microwave Oven',
          price: 120,
          originalPrice: 12000,
          image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg',
          rating: 4.4,
          location: '3.5 km away',
          available: true,
          securityDeposit: 2000
        }
      ],
      clothing: [
        {
          id: '8',
          title: 'Designer Wedding Suit',
          price: 200,
          originalPrice: 15000,
          image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
          rating: 4.9,
          location: '1.5 km away',
          available: true,
          securityDeposit: 3000
        },
        {
          id: '9',
          title: 'Party Dress',
          price: 150,
          originalPrice: 8000,
          image: 'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg',
          rating: 4.7,
          location: '2.8 km away',
          available: true,
          securityDeposit: 2000
        }
      ],
      fitness: [
        {
          id: '10',
          title: 'Treadmill',
          price: 250,
          originalPrice: 40000,
          image: 'https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg',
          rating: 4.6,
          location: '1.9 km away',
          available: true,
          securityDeposit: 4500
        },
        {
          id: '11',
          title: 'Exercise Bike',
          price: 180,
          originalPrice: 25000,
          image: 'https://images.pexels.com/photos/4046719/pexels-photo-4046719.jpeg',
          rating: 4.5,
          location: '3.2 km away',
          available: true,
          securityDeposit: 3000
        }
      ],
      furniture: [
        {
          id: '12',
          title: 'Office Chair',
          price: 100,
          originalPrice: 15000,
          image: 'https://images.pexels.com/photos/586996/pexels-photo-586996.jpeg',
          rating: 4.4,
          location: '2.3 km away',
          available: true,
          securityDeposit: 2500
        },
        {
          id: '13',
          title: 'Dining Table Set',
          price: 200,
          originalPrice: 35000,
          image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
          rating: 4.8,
          location: '4.1 km away',
          available: true,
          securityDeposit: 4000
        }
      ],
      tools: [
        {
          id: '14',
          title: 'Power Drill Set',
          price: 80,
          originalPrice: 8000,
          image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg',
          rating: 4.3,
          location: '1.7 km away',
          available: true,
          securityDeposit: 1500
        },
        {
          id: '15',
          title: 'Lawn Mower',
          price: 150,
          originalPrice: 20000,
          image: 'https://images.pexels.com/photos/589/garden-grass-meadow-green.jpg',
          rating: 4.6,
          location: '3.8 km away',
          available: true,
          securityDeposit: 3000
        }
      ]
    };
    return allProducts[cat as keyof typeof allProducts] || [];
  };

  const products = getProductsByCategory(category || '');
  
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryTitle = (cat: string) => {
    const titles = {
      electronics: 'Electronics',
      'home-appliances': 'Home Appliances',
      clothing: 'Clothing Items',
      fitness: 'Fitness Equipment',
      furniture: 'Furniture',
      tools: 'Tools & Equipment'
    };
    return titles[cat as keyof typeof titles] || 'Products';
  };

  const handleRentNow = (productId: string) => {
    navigate(`/renter/product/${productId}`);
  };


  return (
    <RenterLayout>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/renter/home')}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {getCategoryTitle(category || '')}
            </h1>
            <p className="text-gray-600 text-sm">{filteredProducts.length} items available</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="flex space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </motion.div>
          )}
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
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
                  {!product.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Not Available
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-lg font-bold text-emerald-600">₹{product.price}/day</p>
                      <p className="text-xs text-gray-500">Security: ₹{product.securityDeposit}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="w-3 h-3 mr-1" />
                        {product.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleRentNow(product.id)}
                      disabled={!product.available}
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Rent Now
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => addToCart({
                        id: product.id,
                        name: product.title,
                        image: product.image,
                        price: product.price,
                        quantity: 1,
                        securityDeposit: product.securityDeposit || 5000,
                        owner: {
                          name: 'Product Owner',
                          rating: 4.5,
                          phone: '+91 9876543210'
                        }
                      })}
                      disabled={!product.available}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your search or browse other categories
              </p>
            </div>
          </div>
        )}
      </div>
    </RenterLayout>
  );
};