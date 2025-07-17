import React from 'react';
import { motion } from 'framer-motion';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { useData } from '../../contexts/DataContext';
import { 
  Clock, 
  Truck, 
  Package, 
  CheckCircle, 
  RotateCcw,
  User,
  Phone,
  MapPin
} from 'lucide-react';

export const RentalStatus: React.FC = () => {
  const { products, rentalRequests } = useData();

  const statusSteps = [
    { key: 'pending', label: 'Request Accepted', icon: CheckCircle },
    { key: 'in-transit', label: 'In Transit', icon: Truck },
    { key: 'delivered', label: 'Delivered', icon: Package },
    { key: 'rented', label: 'Rented', icon: Clock },
    { key: 'return-scheduled', label: 'Scheduled Return', icon: RotateCcw }
  ];

  // Mock rental data since we don't have actual rentals
  const mockRentals = [
    {
      id: '1',
      productId: '1',
      productName: 'Professional DSLR Camera',
      renterName: 'Rahul Sharma',
      renterPhone: '+91 9876543210',
      status: 'rented',
      startDate: '2024-01-15',
      endDate: '2024-01-18',
      address: 'Mumbai, Maharashtra'
    },
    {
      id: '2',
      productId: '2',
      productName: 'Gaming Laptop',
      renterName: 'Priya Patel',
      renterPhone: '+91 9876543211',
      status: 'in-transit',
      startDate: '2024-01-16',
      endDate: '2024-01-20',
      address: 'Pune, Maharashtra'
    }
  ];

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rental Status</h1>
          <p className="text-gray-600">Track your products and rental progress</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-emerald-100 rounded-lg p-3">
                <Package className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Currently Rented</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.status === 'rented').length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-lg p-3">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.reduce((acc, p) => acc + p.availableQuantity, 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-lg p-3">
                <Truck className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Active Rentals */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Active Rentals</h2>
          
          {mockRentals.map((rental, index) => (
            <motion.div
              key={rental.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  {/* Product and Renter Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {rental.productName}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{rental.renterName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{rental.renterPhone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{rental.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{rental.startDate} to {rental.endDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Timeline */}
                  <div className="lg:w-96">
                    <div className="flex items-center justify-between">
                      {statusSteps.map((step, stepIndex) => {
                        const Icon = step.icon;
                        const currentIndex = getStatusIndex(rental.status);
                        const isActive = stepIndex <= currentIndex;
                        const isCurrent = stepIndex === currentIndex;
                        
                        return (
                          <div key={step.key} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isActive 
                                ? isCurrent 
                                  ? 'bg-emerald-600 text-white' 
                                  : 'bg-emerald-100 text-emerald-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <p className={`text-xs mt-1 text-center ${
                              isActive ? 'text-gray-900' : 'text-gray-400'
                            }`}>
                              {step.label}
                            </p>
                            {stepIndex < statusSteps.length - 1 && (
                              <div className={`w-8 h-1 ${
                                stepIndex < currentIndex ? 'bg-emerald-600' : 'bg-gray-200'
                              }`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {mockRentals.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No active rentals</h3>
              <p className="text-gray-600">
                When someone rents your products, you'll see their status here.
              </p>
            </div>
          </div>
        )}
      </div>
    </OwnerLayout>
  );
};