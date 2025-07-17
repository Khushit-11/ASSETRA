import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { useData } from '../../contexts/DataContext';
import { Image, Calendar, Eye, Download, Filter } from 'lucide-react';

export const ImageLog: React.FC = () => {
  const { products } = useData();
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Flatten all product images with metadata
  const allImages = products.flatMap(product => 
    product.images.map(image => ({
      id: `${product.id}-${image}`,
      url: image,
      productId: product.id,
      productName: product.title,
      category: product.category,
      uploadDate: product.createdAt,
      type: 'product'
    }))
  );

  const filteredImages = allImages.filter(image => {
    if (filter === 'all') return true;
    return image.category === filter;
  });

  const categories = [
    { value: 'all', label: 'All Images' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'home-appliances', label: 'Home Appliances' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'tools', label: 'Tools' }
  ];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleDownload = (imageUrl: string, productName: string) => {
    // In a real app, this would trigger a download
    console.log('Downloading image:', imageUrl, productName);
  };

  return (
    <OwnerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Image Log</h1>
            <p className="text-gray-600">View and manage all product images for damage comparison</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Image className="w-4 h-4" />
            <span>{filteredImages.length} images</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-400" />
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => setFilter(category.value)}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  filter === category.value
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden group cursor-pointer">
                <div className="relative aspect-square">
                  <img
                    src={image.url}
                    alt={image.productName}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onClick={() => handleImageClick(image.url)}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(image.url);
                      }}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(image.url, image.productName);
                      }}
                      className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Download className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex px-2 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full">
                      Product
                    </span>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-1 mb-1">
                    {image.productName}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{image.uploadDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No images found</h3>
              <p className="text-gray-600">
                {filter === 'all' 
                  ? "Upload product images to see them here" 
                  : `No images found in ${filter} category`
                }
              </p>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage}
                alt="Full size"
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </OwnerLayout>
  );
};