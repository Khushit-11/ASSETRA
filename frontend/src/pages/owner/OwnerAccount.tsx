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
  HelpCircle,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type AccountSection = 'profile' | 'security' | 'notifications' | 'billing' | 'change-password' | 'notification-preferences' | 'help' | 'transactions' | null;

export const OwnerAccount: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [activeSection, setActiveSection] = useState<AccountSection>(null);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
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

  // FAQ Data
  const faqData = [
    {
      question: "How do I list an item for rent?",
      answer: "Go to your dashboard, click 'Add Product,' fill in the details (photos, description, pricing, availability), and submit. Once approved, your item will be live."
    },
    {
      question: "What types of items can I rent out?",
      answer: "You can rent out almost anything—electronics, furniture, tools, vehicles, sports gear, etc., as long as it complies with our Prohibited Items Policy."
    },
    {
      question: "How do I set rental pricing?",
      answer: "You decide the daily/weekly/monthly rate. Check similar listings for competitive pricing. You can also offer discounts for longer rentals."
    },
    {
      question: "Can I reject a rental request?",
      answer: "Yes, you can decline requests if the renter doesn't meet your criteria or if the item is unavailable."
    },
    {
      question: "How do I handle security deposits?",
      answer: "You can require a refundable deposit. The platform can hold it securely and release it back to the renter after the item is returned undamaged."
    },
    {
      question: "What if my item gets damaged?",
      answer: "Renters are responsible for damages. You can file a claim through our resolution center, and we'll help mediate the issue."
    },
    {
      question: "How are payments processed?",
      answer: "Payments are securely processed through the platform. You'll receive payouts (minus service fees) after the rental period ends."
    },
    {
      question: "When do I get paid?",
      answer: "Payouts are released within 2-3 business days after the rental ends, depending on your bank."
    },
    {
      question: "Can I meet the renter before handing over the item?",
      answer: "Yes, you can arrange a meet-up or verify the renter's ID for security."
    },
    {
      question: "How do I handle late returns?",
      answer: "You can charge extra fees for late returns. Set your policy in the listing, and the platform will enforce it."
    },
    {
      question: "Can I edit my listing after posting?",
      answer: "Yes, you can update availability, pricing, or descriptions anytime from your dashboard."
    },
    {
      question: "How do I increase my chances of getting rentals?",
      answer: "High-quality photos, detailed descriptions, competitive pricing, and good reviews help attract renters."
    },
    {
      question: "What if a renter doesn't return my item?",
      answer: "Report it immediately. We assist in recovery efforts and may compensate you if the renter is unresponsive."
    },
    {
      question: "Are there any fees for listing items?",
      answer: "Listing is free, but we charge a service fee (e.g., 10-15%) on completed rentals."
    },
    {
      question: "How do I cancel a confirmed booking?",
      answer: "Go to 'My Bookings,' select the rental, and cancel (excessive cancellations may affect your ranking)."
    },
    {
      question: "Can I rent out items long-term?",
      answer: "Yes! You can set monthly rates and negotiate long-term deals with renters."
    },
    {
      question: "How do I handle insurance for my rented items?",
      answer: "We recommend checking if your homeowner's/renter's insurance covers rentals. Some items may require additional coverage."
    },
    {
      question: "What happens if a renter claims the item wasn't as described?",
      answer: "We mediate disputes. Provide clear photos and descriptions to avoid misunderstandings."
    },
    {
      question: "Can I block certain renters?",
      answer: "Yes, you can block users with poor ratings or suspicious activity."
    },
    {
      question: "How do I delete my listing?",
      answer: "Go to 'My Listings,' select the item, and click 'Deactivate' or 'Delete.'"
    }
  ];

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
                    <div 
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setShowFAQ(true)}
                    >
                      <h4 className="font-medium text-gray-900 mb-2">Frequently Asked Questions</h4>
                      <p className="text-sm text-gray-600">Find answers to common questions about your account and rentals.</p>
                    </div>

                    <div 
                      className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => setShowUserGuide(true)}
                    >
                      <h4 className="font-medium text-gray-900 mb-2">User Guide</h4>
                      <p className="text-sm text-gray-600">Learn how to make the most of your Assetra account.</p>
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

      {/* FAQ Modal */}
      {showFAQ && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>
              <button
                onClick={() => setShowFAQ(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    >
                      <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                      {expandedFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    {expandedFAQ === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Support Section */}
              <div className="mt-8 p-6 bg-emerald-50 rounded-lg">
                <h3 className="font-semibold text-emerald-900 mb-2">Still need help?</h3>
                <p className="text-emerald-700 mb-4">
                  Can't find what you're looking for? Our support team is here to help you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    Contact Support
                  </button>
                  <button className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors">
                    Email us at support@assetra.com
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Guide Modal */}
      {showUserGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">Owner's User Guide</h2>
              </div>
              <button
                onClick={() => setShowUserGuide(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 mb-8">
                  Welcome to Assetra, where you can earn money by renting out your unused items! This guide will help you get started.
                </p>

                {/* Section 1 */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">1. Creating Your Account</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">1</div>
                      <div>
                        <p className="font-medium text-gray-900">Sign Up:</p>
                        <p className="text-gray-700">Register using your email or social media account.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">2</div>
                      <div>
                        <p className="font-medium text-gray-900">Verify Your Identity:</p>
                        <p className="text-gray-700">Complete profile verification for trust and security.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">3</div>
                      <div>
                        <p className="font-medium text-gray-900">Set Up Payout Method:</p>
                        <p className="text-gray-700">Add your bank account or digital wallet to receive payments.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">2. Listing Your Item for Rent</h3>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Step 1: Click "Add New Product"</h4>
                      <p className="text-gray-700">Go to your Dashboard → Click "Add Product."</p>
                    </div>

                    <div className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Step 2: Fill in Item Details</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Title & Description: Be clear and detailed (e.g., "Canon EOS R5 Camera – 4K Video, 45MP").</li>
                        <li>Category: Select the right category (e.g., Electronics, Tools, Furniture).</li>
                        <li>Upload High-Quality Photos: Show different angles and any wear/tear.</li>
                        <li>Set Pricing: Choose daily/weekly/monthly rates.</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Step 3: Set Rental Terms</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Availability Calendar: Mark when the item is free.</li>
                        <li>Security Deposit: Optional, but recommended for high-value items.</li>
                        <li>Late Fees: Define charges for overdue returns.</li>
                        <li>Pickup/Delivery Options: Choose if you'll deliver or require pickup.</li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-emerald-500 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Step 4: Publish Your Listing</h4>
                      <p className="text-gray-700">Submit for review. Once approved, your item goes live!</p>
                    </div>
                  </div>
                </div>

                {/* Section 3 */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">3. Managing Rental Requests</h3>
                  <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                    <p className="text-gray-700"><span className="font-medium">Accept/Reject Requests:</span> Check renter profiles and ratings before confirming.</p>
                    <p className="text-gray-700"><span className="font-medium">Communicate via In-App Chat:</span> Discuss pickup/drop-off details securely.</p>
                    <p className="text-gray-700"><span className="font-medium">Confirm Booking:</span> Once agreed, the renter pays, and the booking is secured.</p>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">4. Handing Over the Item</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-900 mb-2">Safety First</p>
                      <p className="text-gray-700 text-sm">Meet in a Safe Location (or use a secure locker if available).</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-900 mb-2">Document Everything</p>
                      <p className="text-gray-700 text-sm">Inspect the Item Together: Note any existing damages (take photos if needed).</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <p className="font-medium text-gray-900 mb-2">Provide Instructions</p>
                    <p className="text-gray-700">Explain how to use the item (if necessary).</p>
                  </div>
                </div>

                {/* Section 5 */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">5. After the Rental Ends</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">1</div>
                      <p className="text-gray-700">Check for Damages: Compare the item's condition before and after.</p>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm">2</div>
                      <p className="text-gray-700">Release Security Deposit (if applicable): Refund if no issues.</p>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">3</div>
                      <p className="text-gray-700">Leave a Review: Rate the renter to help the community.</p>
                    </div>
                  </div>
                </div>

                {/* Section 6 */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">6. Getting Paid</h3>
                  <div className="bg-emerald-50 p-4 rounded-lg space-y-2">
                    <p className="text-gray-700"><span className="font-medium">Payout Timeline:</span> Funds are released 2-3 business days after rental completion.</p>
                    <p className="text-gray-700"><span className="font-medium">View Earnings:</span> Check your Transaction History in the dashboard.</p>
                  </div>
                </div>

                {/* Section 7 */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">7. Safety & Dispute Resolution</h3>
                  <div className="bg-red-50 p-4 rounded-lg space-y-2">
                    <p className="text-gray-700">Report Issues Immediately if the item is damaged, lost, or not returned.</p>
                    <p className="text-gray-700">Our Support Team will mediate disputes fairly.</p>
                  </div>
                </div>

                {/* Tips Section */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Tips for Success</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="font-medium text-purple-900 mb-2">Stay Updated</p>
                      <p className="text-purple-700 text-sm">Keep your calendar updated to avoid double bookings.</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="font-medium text-blue-900 mb-2">Be Responsive</p>
                      <p className="text-blue-700 text-sm">Respond quickly to rental requests for better rankings.</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="font-medium text-green-900 mb-2">Offer Discounts</p>
                      <p className="text-green-700 text-sm">Offer discounts for longer rentals to attract more renters.</p>
                    </div>
                  </div>
                </div>

                {/* Need Help Section */}
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">Visit our Help Center for more detailed guides</p>
                    <p className="text-gray-700">Contact our support team at support@assetra.com</p>
                    <p className="text-gray-700">Call us at +91 1800-123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </OwnerLayout>
  );
};