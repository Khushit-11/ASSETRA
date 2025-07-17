import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '../components/common/Layout';
import { Button } from '../components/common/Button';
import { 
  Smartphone, 
  Home as HomeIcon, 
  Shirt, 
  Dumbbell, 
  Shield, 
  Clock, 
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// ✅ Import the image
import assetraLogo from './image-7.png';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'All items are verified and insured for your peace of mind'
    },
    {
      icon: Clock,
      title: 'Quick Delivery',
      description: 'Get items delivered within 2-4 hours in your area'
    },
    {
      icon: Star,
      title: 'Quality Assured',
      description: 'Only premium quality items from verified owners'
    },
    {
      icon: CheckCircle,
      title: 'Easy Returns',
      description: 'Hassle-free return process with AI-powered damage detection'
    },
    {
      icon: Sparkles,
      title: 'Gen AI Powered',
      description: 'Experience smarter recommendations and seamless interactions with generative AI.'
    }
  ];

  const categories = [
    { icon: Smartphone, label: 'Electronics', count: '500+' },
    { icon: HomeIcon, label: 'Appliances', count: '300+' },
    { icon: Shirt, label: 'Clothing', count: '200+' },
    { icon: Dumbbell, label: 'Fitness', count: '150+' }
  ];

  const stats = [
    { value: '10,000+', label: 'Happy Users' },
    { value: '5,000+', label: 'Items Available' },
    { value: '50+', label: 'Cities' },
    { value: '4.8/5', label: 'User Rating' }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 to-blue-600/10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* ✅ Updated heading with image */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="inline-flex items-center gap-2">
                Assetra
                <img
                  src={assetraLogo}
                  alt="Assetra Logo"
                  className="w-32 h-32"
                />
              </span>
              <br />
              <br />
              Your Stuff Works,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                When You Don't
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The smartest way to access items you need without the commitment of buying. 
              Join thousands who are already saving money and space.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login?type=renter">
                <Button size="lg" className="w-full sm:w-auto flex items-center justify-center">
                  <span className="flex items-center">
                    Find what you need
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                </Button>
              </Link>
              <Link to="/login?type=owner">
                <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center justify-center">
                  <span className="flex items-center">
                    Lend Your Items
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </span>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-emerald-600" />
          </div>
        </div>
        <div className="absolute bottom-32 right-10 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <HomeIcon className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Categories
            </h2>
            <p className="text-xl text-gray-600">
              Discover thousands of items across various categories
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{category.label}</h3>
                  <p className="text-sm text-gray-600">{category.count} items</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Assetra?
            </h2>
            <p className="text-xl text-gray-600">
              Built with cutting-edge technology and user-first approach
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-1 px-1">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-emerald-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Rental Journey?
            </h2>
            <p className="text-xl mb-8 text-emerald-100">
              Join thousands of users who are already saving money and space
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup?type=renter">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white !text-black hover:bg-gray-100">
                  Explore Rentals
                </Button>
              </Link>
              <Link to="/signup?type=owner">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                  List Your Items
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
