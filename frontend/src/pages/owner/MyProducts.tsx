import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { Button } from '../../components/common/Button';
import { useData } from '../../contexts/DataContext';
import { Edit, Trash2, Eye, MoreVertical, X } from 'lucide-react';

export const MyProducts: React.FC = () => {
  const { products, updateProduct, deleteProduct } = useData();
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    return product.status === filter;
  });

  const statusColors = {
    available: 'bg-green-100 text-green-800',
    rented: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-blue-100 text-blue-800'
  };

  const handleEdit = (productId: string) => {
    navigate('/owner/add-product', { state: { editProduct: products.find(p => p.id === productId) } });
  };

  const handleViewImage = (imageUrl: string, product: any) => {
    setSelectedImage(imageUrl);
    setSelectedProduct(product);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
    setSelectedProduct(null);
  };

  const handleDelete = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  const handleToggleStatus = (productId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'available' ? 'pending' : 'available';
    updateProduct(productId, { status: newStatus as any });
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-600">Manage your rental listings</p>
          </div>
          <Button onClick={() => window.location.href = '/owner/add-product'}>
            Add New Product
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { key: 'all', label: 'All Products' },
            { key: 'available', label: 'Available' },
            { key: 'rented', label: 'On Rent' },
            { key: 'pending', label: 'Pending' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                {/* Product Image */}
                <div className="relative h-48">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[product.status]}`}>
                      {product.status}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-lg font-bold text-gray-900">₹{product.rentPrice}/day</p>
                      <p className="text-xs text-gray-500">Security: ₹{product.securityAmount}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Available</p>
                      <p className="text-sm font-semibold">{product.availableQuantity}/{product.quantity}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleEdit(product.id)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleViewImage(product.images[0], product)}
                      variant="secondary"
                      size="sm"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="danger"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Toggle Status */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleToggleStatus(product.id, product.status)}
                      className="w-full text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      {product.status === 'available' ? 'Mark as Unavailable' : 'Mark as Available'}
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "You haven't added any products yet." 
                  : `No products with status: ${filter}`
                }
              </p>
              <Button onClick={() => window.location.href = '/owner/add-product'}>
                Add Your First Product
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Image and Details Modal */}
      {isImageModalOpen && selectedImage && selectedProduct && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-6xl max-h-[90vh] bg-white rounded-lg overflow-hidden flex"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white/90 transition-colors"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>

            {/* Left side - Image */}
            <div className="flex-1 min-w-0">
              <img
                src={selectedImage}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Product Details */}
            <div className="w-96 bg-gray-50 p-6 overflow-y-auto">
              <div className="space-y-4">
                {/* Product Title and Status */}
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedProduct.title}
                  </h2>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[selectedProduct.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedProduct.status}
                  </span>
                </div>

                {/* Pricing */}
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-emerald-600">
                      ₹{selectedProduct.rentPrice}/day
                    </span>
                    <span className="text-sm text-gray-600">
                      Security: ₹{selectedProduct.securityAmount}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Available: {selectedProduct.availableQuantity}/{selectedProduct.quantity}
                  </div>
                </div>

                {/* Full Description */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Category */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                  <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {selectedProduct.category}
                  </span>
                </div>

                {/* Location */}
                {selectedProduct.location && (
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-700 text-sm">{selectedProduct.location}</p>
                  </div>
                )}

                {/* Additional Details */}
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product ID:</span>
                      <span className="text-gray-900">{selectedProduct.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Quantity:</span>
                      <span className="text-gray-900">{selectedProduct.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="text-gray-900">{selectedProduct.availableQuantity}</span>
                    </div>
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