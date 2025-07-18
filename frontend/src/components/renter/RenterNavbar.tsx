import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Package, 
  MapPin, 
  User, 
  Menu, 
  X,
  MessageCircle,
  ShoppingCart
} from 'lucide-react';

interface RenterNavbarProps {
  onChatToggle?: () => void;
}

export const RenterNavbar: React.FC<RenterNavbarProps> = ({ onChatToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/renter/home' },
    { icon: Package, label: 'My Rentals', path: '/renter/rentals' },
    { icon: MapPin, label: 'Addresses', path: '/renter/addresses' },
    { icon: User, label: 'My Account', path: '/renter/account' },
    { icon: ShoppingCart, label: 'My Cart', path: '/renter/cart' }
    
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-xl font-bold text-emerald-600">Assetra</h1>
            <div className="flex items-center space-x-3">
              {onChatToggle && (
                <button
                  onClick={onChatToggle}
                  className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-30 bg-black/50" onClick={() => setIsOpen(false)} />
        )}

        {/* Mobile Menu */}
        <motion.div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          initial={false}
          animate={{ x: isOpen ? 0 : 256 }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </motion.div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t shadow-lg lg:hidden">
          <div className="grid grid-cols-4">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center py-3 px-2 ${
                    isActive ? 'text-emerald-600' : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:shadow-sm">
        <div className="flex items-center px-6 py-4 border-b">
          <h1 className="text-2xl font-bold text-emerald-600">Assetra</h1>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-700 border-r-2 border-emerald-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {onChatToggle && (
          <div className="p-4 border-t">
            <button
              onClick={onChatToggle}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">AI Assistant</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};