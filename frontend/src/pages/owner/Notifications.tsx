import React from 'react';
import { motion } from 'framer-motion';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { Button } from '../../components/common/Button';
import { useData } from '../../contexts/DataContext';
import { 
  Bell, 
  Check, 
  X, 
  Clock, 
  DollarSign, 
  Package,
  AlertCircle
} from 'lucide-react';

export const Notifications: React.FC = () => {
  const { notifications, markNotificationAsRead } = useData();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'rental-request':
        return <Package className="w-5 h-5 text-blue-600" />;
      case 'payment':
        return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const handleAcceptRequest = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    // Here you would update the rental request status
    alert('Rental request accepted!');
  };

  const handleDeclineRequest = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    // Here you would update the rental request status
    alert('Rental request declined.');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600">
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                : 'All caught up!'
              }
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">{notifications.length} total</span>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`p-6 ${!notification.read ? 'border-l-4 border-emerald-500 bg-emerald-50/30' : ''}`}>
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {notification.createdAt.toLocaleDateString()} at {notification.createdAt.toLocaleTimeString()}
                        </p>
                      </div>
                      
                      {!notification.read && (
                        <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>

                    {/* Action Buttons for Rental Requests */}
                    {notification.type === 'rental-request' && !notification.read && (
                      <div className="flex space-x-3 mt-4">
                        <Button
                          onClick={() => handleAcceptRequest(notification.id)}
                          size="sm"
                          className="flex items-center"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          onClick={() => handleDeclineRequest(notification.id)}
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                      </div>
                    )}

                    {/* Mark as Read Button */}
                    {!notification.read && notification.type !== 'rental-request' && (
                      <button
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                When you receive rental requests or updates, they'll appear here.
              </p>
            </div>
          </div>
        )}

        {/* Mark All as Read */}
        {unreadCount > 0 && (
          <div className="flex justify-center pt-6">
            <Button
              onClick={() => {
                notifications.forEach(n => {
                  if (!n.read) markNotificationAsRead(n.id);
                });
              }}
              variant="outline"
            >
              Mark All as Read
            </Button>
          </div>
        )}
      </div>
    </OwnerLayout>
  );
};