import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Shield, Truck, Star } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Easy to Use',
      description: 'Simple and intuitive interface'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure',
      description: 'Your data is protected'
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: 'Fast Delivery',
      description: 'Quick and reliable service'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Quality',
      description: 'Premium rental experience'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex">
      {/* Left side - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-blue-600" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-4">Welcome to Assetra</h1>
            <p className="text-xl mb-8 text-emerald-100">
              The smartest way to rent and lend items in your community
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="bg-white/20 rounded-lg p-2">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-emerald-100">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              <p className="text-gray-600 mt-2">{subtitle}</p>
            </div>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};