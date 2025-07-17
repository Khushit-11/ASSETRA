import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Upload, Mic, Sparkles, Camera } from 'lucide-react';

interface ProductForm {
  category: string;
  quantity: number;
  rentPrice: number;
  securityAmount: number;
  title?: string;
  description?: string;
  language: string;
}

export const AddProduct: React.FC = () => {
  const { user } = useAuth();
  const { addProduct } = useData();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProductForm>({
    defaultValues: {
      language: 'english'
    }
  });

  const categories = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'home-appliances', label: 'Home Appliances' },
    { value: 'clothing', label: 'Clothing Items' },
    { value: 'fitness', label: 'Fitness Equipment' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'tools', label: 'Tools & Equipment' }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'gujarati', label: 'Gujarati' }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setUploadedImages(prev => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const generateTitleAndDescription = async () => {
    if (uploadedImages.length === 0) {
      alert('Please upload at least one image first');
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockTitles = [
        'Professional DSLR Camera Kit',
        'Gaming Laptop High Performance',
        'Fitness Equipment Set',
        'Home Theater System',
        'Power Tools Collection'
      ];
      
      const mockDescriptions = [
        'High-quality professional equipment perfect for events and photography. Includes all necessary accessories and comes in excellent condition.',
        'Latest generation device with premium features and outstanding performance. Ideal for both professional and personal use.',
        'Complete set with all essential components. Well-maintained and ready for immediate use. Perfect for your needs.'
      ];

      setValue('title', mockTitles[Math.floor(Math.random() * mockTitles.length)]);
      setValue('description', mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)]);
      setIsGenerating(false);
    }, 2000);
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setValue('description', transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.start();
    } else {
      alert('Voice input not supported in this browser');
    }
  };

  const onSubmit = (data: ProductForm) => {
    if (uploadedImages.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    if (!user) return;

    addProduct({
      ownerId: user.id,
      title: data.title || 'Untitled Product',
      description: data.description || '',
      category: data.category,
      images: uploadedImages,
      quantity: data.quantity,
      availableQuantity: data.quantity,
      rentPrice: data.rentPrice,
      securityAmount: data.securityAmount,
      status: 'available'
    });

    alert('Product added successfully!');
    // Reset form
    setUploadedImages([]);
  };

  return (
    <OwnerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600">List your items for rent with AI-powered assistance</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload images or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </label>
              </div>

              {/* Preview uploaded images */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={image} 
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== index))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* AI Generation Section */}
            <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                    AI-Powered Generation
                  </h3>
                  <p className="text-xs text-gray-600">Generate title and description from your images</p>
                </div>
                <Button
                  type="button"
                  onClick={generateTitleAndDescription}
                  disabled={isGenerating || uploadedImages.length === 0}
                  variant="secondary"
                  size="sm"
                >
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
              </div>
            </Card>

            {/* Category and Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Product Category"
                options={categories}
                {...register('category', { required: 'Category is required' })}
                error={errors.category?.message}
              />

              <Input
                label="Quantity Available"
                type="number"
                min="1"
                {...register('quantity', { 
                  required: 'Quantity is required',
                  min: { value: 1, message: 'Quantity must be at least 1' }
                })}
                error={errors.quantity?.message}
              />
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Rent Price (₹/day)"
                type="number"
                min="1"
                placeholder="e.g., 500"
                {...register('rentPrice', { 
                  required: 'Rent price is required',
                  min: { value: 1, message: 'Price must be greater than 0' }
                })}
                error={errors.rentPrice?.message}
              />

              <Input
                label="Security Amount (₹)"
                type="number"
                min="0"
                placeholder="e.g., 5000"
                {...register('securityAmount', { 
                  required: 'Security amount is required',
                  min: { value: 0, message: 'Security amount cannot be negative' }
                })}
                error={errors.securityAmount?.message}
              />
            </div>

            {/* Title and Description */}
            <div className="space-y-4">
              <Input
                label="Product Title (AI Generated)"
                placeholder="AI will generate based on images..."
                {...register('title')}
              />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Description
                  </label>
                  <div className="flex space-x-2">
                    <Select
                      options={languages}
                      {...register('language')}
                      className="text-xs"
                    />
                    <Button
                      type="button"
                      onClick={startVoiceInput}
                      disabled={isListening}
                      variant="outline"
                      size="sm"
                    >
                      <Mic className={`w-4 h-4 ${isListening ? 'text-red-500' : ''}`} />
                    </Button>
                  </div>
                </div>
                <textarea
                  className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                  placeholder="Describe your product or use voice input..."
                  {...register('description')}
                />
                {isListening && (
                  <p className="text-sm text-red-600 mt-1">Listening... Speak now</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" size="lg">
                Post Product
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </OwnerLayout>
  );
};