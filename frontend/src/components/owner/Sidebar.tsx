import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home,
  Plus, 
  Package, 
  Activity, 
  User,
  Menu,
  X,
  Users,
  Shield
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  const navigationItems = [
    { icon: Home, label: 'Dashboard', path: '/owner/dashboard' },
    { icon: Plus, label: 'Add Product', path: '/owner/add-product' },
    { icon: Package, label: 'My Products', path: '/owner/my-products' },
    { icon: Activity, label: 'Rental Status', path: '/owner/rental-status' },
    { icon: Users, label: 'Rental Requests', path: '/owner/rental-requests' },
    { icon: Shield, label: 'Damage Detection', path: '/owner/damage-detection' },
    { icon: User, label: 'My Account', path: '/owner/account' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:relative lg:shadow-none lg:border-r lg:border-gray-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Assetra Owner</h2>
            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6">
            {/* Navigation */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
                Navigation
              </h3>
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => window.innerWidth < 1024 && onToggle()}
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
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu className="w-6 h-6" />
      </button>
    </>
  );
};