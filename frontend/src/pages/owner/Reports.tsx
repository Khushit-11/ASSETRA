import React from 'react';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { 
  FileText, 
  Download, 
  Calendar,
  Filter,
  TrendingUp,
  BarChart3,
  PieChart,
  FileSpreadsheet
} from 'lucide-react';

export const Reports: React.FC = () => {
  const reportTypes = [
    {
      title: 'Revenue Report',
      description: 'Detailed breakdown of earnings and revenue trends',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      lastGenerated: '2 hours ago'
    },
    {
      title: 'Rental Summary',
      description: 'Overview of all rental activities and transactions',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      lastGenerated: '1 day ago'
    },
    {
      title: 'Product Performance',
      description: 'Analytics on which products are most popular',
      icon: PieChart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      lastGenerated: '3 days ago'
    },
    {
      title: 'Financial Statement',
      description: 'Complete financial overview and profit analysis',
      icon: FileSpreadsheet,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      lastGenerated: '1 week ago'
    }
  ];

  const recentReports = [
    {
      name: 'Monthly Revenue Report - December 2024',
      type: 'Revenue',
      generatedDate: '2024-12-28',
      size: '2.4 MB'
    },
    {
      name: 'Q4 Rental Summary Report',
      type: 'Rental',
      generatedDate: '2024-12-25',
      size: '1.8 MB'
    },
    {
      name: 'Product Performance Analysis',
      type: 'Analytics',
      generatedDate: '2024-12-20',
      size: '3.1 MB'
    }
  ];

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600">Generate and download business reports</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
            </button>
          </div>
        </div>

        {/* Report Generation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report, index) => {
            const Icon = report.icon;
            
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`${report.bgColor} rounded-lg p-3`}>
                      <Icon className={`w-6 h-6 ${report.color}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Last generated: {report.lastGenerated}</p>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                    <FileText className="w-4 h-4" />
                    <span>Generate</span>
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Reports */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-100 rounded-lg p-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <p className="text-sm text-gray-600">
                      {report.type} • {report.generatedDate} • {report.size}
                    </p>
                  </div>
                </div>
                <button className="flex items-center space-x-2 px-3 py-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Reports Generated</h4>
            <p className="text-3xl font-bold text-gray-900">24</p>
            <p className="text-sm text-green-600">This month</p>
          </Card>
          <Card className="p-6 text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Data Points Analyzed</h4>
            <p className="text-3xl font-bold text-gray-900">1,247</p>
            <p className="text-sm text-blue-600">Last 30 days</p>
          </Card>
          <Card className="p-6 text-center">
            <h4 className="text-sm font-medium text-gray-600 mb-2">Storage Used</h4>
            <p className="text-3xl font-bold text-gray-900">18.5 MB</p>
            <p className="text-sm text-purple-600">Of 100 MB limit</p>
          </Card>
        </div>
      </div>
    </OwnerLayout>
  );
};
