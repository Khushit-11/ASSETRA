import React from 'react';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const Analytics: React.FC = () => {
  const analyticsData = [
    {
      title: 'Revenue Growth',
      value: '+23.5%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Rental Frequency',
      value: '+12.3%',
      trend: 'up',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Customer Base',
      value: '+8.7%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Average Revenue',
      value: '-2.1%',
      trend: 'down',
      icon: DollarSign,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Track your rental business performance</p>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.map((item, index) => {
            const Icon = item.icon;
            const TrendIcon = item.trend === 'up' ? ArrowUpRight : ArrowDownRight;
            
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`${item.bgColor} rounded-lg p-3`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className={`flex items-center ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-600">{item.title}</p>
                  <p className={`text-2xl font-bold ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.value}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
            </div>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - Revenue trends over time</p>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Users className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Customer Analytics</h3>
            </div>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - Customer engagement metrics</p>
            </div>
          </Card>
        </div>

        {/* Additional Insights */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-green-800">
                Your DSLR Camera category is performing 35% better than last month
              </p>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <p className="text-sm text-blue-800">
                Weekend rentals show 28% higher demand than weekdays
              </p>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm text-yellow-800">
                Consider adding more gaming equipment to meet growing demand
              </p>
            </div>
          </div>
        </Card>
      </div>
    </OwnerLayout>
  );
};
