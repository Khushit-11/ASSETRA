import React from 'react';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { 
  Users, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';

export const RentalRequests: React.FC = () => {
  const rentalRequests = [
    {
      id: 1,
      customerName: 'Rahul Sharma',
      customerEmail: 'rahul.sharma@email.com',
      customerPhone: '+91 9876543210',
      productName: 'DSLR Camera - Canon EOS R5',
      requestDate: '2024-07-12',
      startDate: '2024-07-15',
      endDate: '2024-07-20',
      duration: '5 days',
      totalAmount: '₹2,500',
      status: 'pending',
      location: 'Mumbai, Maharashtra'
    },
    {
      id: 2,
      customerName: 'Priya Patel',
      customerEmail: 'priya.patel@email.com',
      customerPhone: '+91 8765432109',
      productName: 'Gaming Laptop - ROG Strix',
      requestDate: '2024-07-11',
      startDate: '2024-07-14',
      endDate: '2024-07-21',
      duration: '7 days',
      totalAmount: '₹3,500',
      status: 'approved',
      location: 'Pune, Maharashtra'
    },
    {
      id: 3,
      customerName: 'Amit Kumar',
      customerEmail: 'amit.kumar@email.com',
      customerPhone: '+91 7654321098',
      productName: 'Fitness Equipment Set',
      requestDate: '2024-07-10',
      startDate: '2024-07-13',
      endDate: '2024-07-18',
      duration: '5 days',
      totalAmount: '₹1,800',
      status: 'rejected',
      location: 'Delhi, India'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rental Requests</h1>
            <p className="text-gray-600">Manage incoming rental requests from customers</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-white px-4 py-2 rounded-lg border">
              <span className="text-sm text-gray-600">Total Requests: </span>
              <span className="font-semibold text-gray-900">{rentalRequests.length}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-lg p-3">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rentalRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-lg p-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rentalRequests.filter(r => r.status === 'approved').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center">
              <div className="bg-red-100 rounded-lg p-3">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {rentalRequests.filter(r => r.status === 'rejected').length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Rental Requests List */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Requests</h3>
          </div>

          <div className="space-y-4">
            {rentalRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 rounded-full p-3">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{request.customerName}</h4>
                      <p className="text-sm text-gray-600">{request.productName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(request.status)}
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{request.customerEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{request.customerPhone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{request.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span>Rental Period: </span>
                    <span className="font-medium">{request.startDate} to {request.endDate}</span>
                    <span className="ml-4">Total: </span>
                    <span className="font-bold text-gray-900">{request.totalAmount}</span>
                  </div>
                  
                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Reject
                      </button>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </OwnerLayout>
  );
};
