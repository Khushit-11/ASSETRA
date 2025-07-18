import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { 
  Package, 
  DollarSign, 
  Activity,
  Bell,
  Eye,
  Plus,
  Users,
  TrendingUp,
  ArrowRight,
  TrendingDown,
  Calendar,
  CreditCard
} from 'lucide-react';

export const OwnerDashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const { products = [], notifications = [] } = useData?.() || {};
  const navigate = useNavigate();

  if (isLoading) return <div className="flex items-center justify-center h-screen"><p className="text-lg text-gray-600">Loading...</p></div>;
  if (!user) return <div className="flex items-center justify-center h-screen"><p className="text-lg text-gray-600">Unauthorized. Please log in.</p></div>;

  // Calculate monthly revenue based on active rentals
  const activeRentals = products.filter(p => p.status === 'rented');
  const monthlyRevenue = activeRentals.reduce((total, product) => total + (product.rentPrice * 30), 0);
  const formattedRevenue = monthlyRevenue > 1000 ? 
    `₹${(monthlyRevenue / 1000).toFixed(1)}K` : 
    `₹${monthlyRevenue}`;

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
      path: '/owner/my-products',
      clickable: true
    },
    {
      title: 'Active Rentals',
      value: products.filter(p => p.status === 'rented').length,
      icon: Activity,
      color: 'bg-emerald-500',
      change: '+8%',
      path: '/owner/rental-status',
      clickable: true
    },
    {
      title: 'Monthly Revenue',
      value: formattedRevenue,
      icon: DollarSign,
      color: 'bg-yellow-500',
      change: '+23%',
      path: '/owner/account',
      clickable: true,
      section: 'billing'
    },
    {
      title: 'Total Views',
      value: '1.2K',
      icon: Eye,
      color: 'bg-purple-500',
      change: '+15%',
      path: '/owner/analytics',
      clickable: true
    }
  ];

  // Handle stat card clicks
  const handleStatClick = (stat: any) => {
    if (!stat.clickable) return;
    
    if (stat.section === 'billing') {
      // Navigate to account page and set active section to billing
      navigate(stat.path, { state: { activeSection: 'billing' } });
    } else {
      navigate(stat.path);
    }
  };

  const recentActivity = [
    {
      id: 1,
      action: 'New rental request for DSLR Camera',
      time: '2 hours ago',
      type: 'request'
    },
    {
      id: 2,
      action: 'Gaming Laptop returned successfully',
      time: '1 day ago',
      type: 'return'
    },
    {
      id: 3,
      action: 'Product "Fitness Equipment" added',
      time: '2 days ago',
      type: 'product'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'List a new item for rent',
      icon: Plus,
      color: 'bg-emerald-500',
      path: '/owner/add-product'
    },
    {
      title: 'View Requests',
      description: 'Manage rental requests',
      icon: Users,
      color: 'bg-blue-500',
      path: '/owner/rental-requests'
    },
    {
      title: 'Analytics',
      description: 'Check performance metrics',
      icon: TrendingUp,
      color: 'bg-purple-500',
      path: '/owner/analytics'
    }
  ];

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">Here's what's happening with your rentals</p>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-400" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleStatClick(stat)}
                className={`${stat.clickable ? 'cursor-pointer' : ''}`}
              >
                <Card className={`p-6 h-full transition-all duration-200 ${
                  stat.clickable 
                    ? 'hover:shadow-lg hover:border-emerald-300 hover:scale-105' 
                    : ''
                }`}>
                  <div className="flex items-start space-x-4">
                    <div className={`${stat.color} rounded-lg p-3 flex-shrink-0 ${
                      stat.clickable ? 'group-hover:scale-110 transition-transform' : ''
                    }`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-600 mb-2 truncate">{stat.title}</p>
                      <div className="flex items-baseline flex-wrap gap-2">
                        <p className="text-2xl font-bold text-gray-900 break-words">{stat.value}</p>
                        <span className="text-sm text-green-600 font-medium flex-shrink-0">
                          {stat.change}
                        </span>
                      </div>
                      {stat.clickable && (
                        <div className="mt-2 flex items-center text-emerald-600 text-xs">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to view details
                          </span>
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Monthly Revenue Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Breakdown</h3>
              <button 
                onClick={() => navigate('/owner/account', { state: { activeSection: 'transactions' } })}
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center"
              >
                View All Transactions
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Active Rentals Revenue</p>
                    <p className="text-sm text-gray-600">{activeRentals.length} products currently rented</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-green-600">₹{monthlyRevenue.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Average Revenue per Product</p>
                    <p className="text-sm text-gray-600">Monthly average</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-blue-600">
                  ₹{activeRentals.length > 0 ? Math.round(monthlyRevenue / activeRentals.length).toLocaleString() : '0'}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Potential Revenue</p>
                    <p className="text-sm text-gray-600">If all products were rented</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-yellow-600">
                  ₹{products.reduce((total, product) => total + (product.rentPrice * 30), 0).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Revenue Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/owner/my-products')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">Optimize Pricing</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
              
              <button 
                onClick={() => navigate('/owner/add-product')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Plus className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">Add New Product</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
              
              <button 
                onClick={() => navigate('/owner/rental-requests')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium">Review Requests</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-medium">Revenue Goal</span>
              </div>
              <p className="text-sm opacity-90">Monthly Target: ₹25,000</p>
              <div className="mt-2 w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-300"
                  style={{ width: `${Math.min((monthlyRevenue / 25000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1 opacity-90">
                {Math.round((monthlyRevenue / 25000) * 100)}% completed
              </p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.a
                  key={action.title}
                  href={action.path}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group p-4 border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${action.color} rounded-lg p-3 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {action.title}
                      </h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Products Overview */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Products</h3>
            <a href="/owner/my-products" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-medium text-gray-900 mb-1">{product.title}</h4>
                <p className="text-sm text-gray-600 mb-2">₹{product.rentPrice}/day</p>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === 'available' 
                    ? 'bg-green-100 text-green-800'
                    : product.status === 'rented'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </OwnerLayout>
  );
};