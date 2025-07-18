import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { 
  Bell, 
  Shield,
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Eye,
  EyeOff,
  ChevronRight,
  ArrowLeft,
  Key,
  LogOut,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type AccountSection = 'profile' | 'security' | 'notifications' | 'billing' | 'change-password' | 'notification-preferences' | 'help' | 'transactions' | null;

export const OwnerAccount: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState<AccountSection>(null);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false
  });

  // Handle navigation from dashboard
  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location.state]);

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const mockTransactions = [
    { id: 1, date: '2024-01-15', description: 'Rental payment - DSLR Camera', amount: 1500, type: 'credit' },
    { id: 2, date: '2024-01-10', description: 'Security refund - Gaming Laptop', amount: -500, type: 'debit' },
    { id: 3, date: '2024-01-05', description: 'Rental payment - Fitness Equipment', amount: 800, type: 'credit' }
  ];

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600">Manage your account preferences and configurations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account Navigation */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveSection('profile')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg ${
                    activeSection === 'profile' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5" />
                    <span>Profile Information</span>
                  </div>
                </button>
                
                <button 
                  onClick={() => setActiveSection('security')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg ${
                    activeSection === 'security' || activeSection === 'change-password'
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5" />
                    <span>Security</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                {/* Security submenu */}
                {(activeSection === 'security' || activeSection === 'change-password') && (
                  <div className="ml-8 space-y-1">
                    <button
                      onClick={() => setActiveSection('change-password')}
                      className={`w-full text-left flex items-center space-x-3 px-4 py-2 rounded-lg text-sm ${
                        activeSection === 'change-password'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Key className="w-4 h-4" />
                      <span>Change Password</span>
                    </button>
                  </div>
                )}
                
                <button 
                  onClick={() => setActiveSection('notification-preferences')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg ${
                    activeSection === 'notification-preferences'
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={() => setActiveSection('billing')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg ${
                    activeSection === 'billing'
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5" />
                    <span>Billing & Payments</span>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveSection('transactions')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg ${
                    activeSection === 'transactions'
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5" />
                    <span>Transaction History</span>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveSection('help')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-lg ${
                    activeSection === 'help'
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5" />
                    <span>Help & Support</span>
                  </div>
                </button>

                {/* Logout Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button 
                    onClick={logout}
                    className="w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </Card>
          </div>

          {/* Account Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Default Welcome Section */}
            {activeSection === null && (
              <Card className="p-8">
                <div className="text-center">
                  <div className="bg-emerald-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to My Account</h3>
                  <p className="text-gray-600 mb-6">
                    Manage your account settings, security preferences, and more. 
                    Select an option from the menu on the left to get started.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button
                      onClick={() => setActiveSection('profile')}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <User className="w-6 h-6 text-emerald-600 mb-2" />
                      <h4 className="font-medium text-gray-900">Profile Information</h4>
                      <p className="text-sm text-gray-600">Update your personal details</p>
                    </button>
                    
                    <button
                      onClick={() => setActiveSection('security')}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <Shield className="w-6 h-6 text-emerald-600 mb-2" />
                      <h4 className="font-medium text-gray-900">Security</h4>
                      <p className="text-sm text-gray-600">Manage passwords and security</p>
                    </button>
                    
                    <button
                      onClick={() => setActiveSection('notification-preferences')}
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <Bell className="w-6 h-6 text-emerald-600 mb-2" />
                      <h4 className="font-medium text-gray-900">Notifications</h4>
                      <p className="text-sm text-gray-600">Configure notification settings</p>
                    </button>
                  </div>
                </div>
              </Card>
            )}
            
            {/* Profile Information */}
            {activeSection === 'profile' && (
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <User className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        defaultValue="john.doe@example.com"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        defaultValue="+91 9876543210"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        defaultValue="Mumbai, India"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      defaultValue="123 Main Street"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      defaultValue="Apartment 4B"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      defaultValue="Mumbai"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    <input
                      type="text"
                      defaultValue="400001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="Experienced rental business owner with a passion for providing quality products and excellent customer service."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <button className="flex items-center space-x-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </Card>
            )}

            {/* Security Menu */}
            {activeSection === 'security' && (
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Security Settings</h3>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setActiveSection('change-password')}
                    className="w-full text-left flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Key className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Change Password</p>
                        <p className="text-sm text-gray-600">Update your account password</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-gray-900">Login Sessions</p>
                        <p className="text-sm text-gray-600">Manage your active login sessions</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        View Sessions
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Change Password */}
            {activeSection === 'change-password' && (
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <button
                    onClick={() => setActiveSection('security')}
                    className="p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <Key className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Change Password</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• At least 8 characters long</li>
                      <li>• Include at least one uppercase letter</li>
                      <li>• Include at least one lowercase letter</li>
                      <li>• Include at least one number</li>
                      <li>• Include at least one special character</li>
                    </ul>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button 
                      onClick={() => setActiveSection('security')}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      Update Password
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Notification Preferences */}
            {activeSection === 'notification-preferences' && (
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <Bell className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Notification Preferences</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive rental updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.emailNotifications}
                        onChange={() => handleNotificationChange('emailNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-600">Receive urgent updates via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.smsNotifications}
                        onChange={() => handleNotificationChange('smsNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Push Notifications</p>
                      <p className="text-sm text-gray-600">Receive notifications in your browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.pushNotifications}
                        onChange={() => handleNotificationChange('pushNotifications')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Marketing Emails</p>
                      <p className="text-sm text-gray-600">Receive promotional content and tips</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.marketingEmails}
                        onChange={() => handleNotificationChange('marketingEmails')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">Notification Timing</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quiet Hours (No notifications during this time)
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">From</label>
                            <input
                              type="time"
                              defaultValue="22:00"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600 mb-1">To</label>
                            <input
                              type="time"
                              defaultValue="08:00"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="flex items-center space-x-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                      <Save className="w-4 h-4" />
                      <span>Save Preferences</span>
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Billing */}
            {activeSection === 'billing' && (
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Billing & Payments</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-emerald-900">Premium Plan</p>
                        <p className="text-sm text-emerald-700">Active until March 15, 2025</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Payment Method</h4>
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">•••• •••• •••• 4242</span>
                      <span className="text-sm text-gray-500">Expires 12/26</span>
                    </div>
                    <button className="mt-3 text-sm text-emerald-600 hover:text-emerald-700">
                      Update Payment Method
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Bank Account Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Account Holder</span>
                        <span className="font-medium">John Doe</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Account Number</span>
                        <span className="font-medium">•••• •••• 1234</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">IFSC Code</span>
                        <span className="font-medium">HDFC0001234</span>
                      </div>
                    </div>
                    <button className="mt-3 text-sm text-emerald-600 hover:text-emerald-700">
                      Update Bank Details
                    </button>
                  </div>
                </div>
              </Card>
            )}

            {/* Transaction History */}
            {activeSection === 'transactions' && (
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <CreditCard className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Transaction History</h3>
                </div>

                <div className="space-y-4">
                  {mockTransactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                      <div className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'credit' ? '+' : ''}₹{Math.abs(transaction.amount)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                    View All Transactions
                  </button>
                </div>
              </Card>
            )}

            {/* Help & Support */}
            {activeSection === 'help' && (
              <Card className="p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <HelpCircle className="w-6 h-6 text-gray-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Help & Support</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900 mb-2">Frequently Asked Questions</h4>
                      <p className="text-sm text-gray-600">Find answers to common questions about your account and rentals.</p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900 mb-2">Contact Support</h4>
                      <p className="text-sm text-gray-600">Get in touch with our support team for personalized help.</p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900 mb-2">User Guide</h4>
                      <p className="text-sm text-gray-600">Learn how to make the most of your Assetra account.</p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <h4 className="font-medium text-gray-900 mb-2">Report an Issue</h4>
                      <p className="text-sm text-gray-600">Let us know if you're experiencing any problems.</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">support@assetra.com</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-700">+91 1800-123-4567</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
};