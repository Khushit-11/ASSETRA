import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { OwnerLayout } from '../../components/owner/OwnerLayout';
import { Card } from '../../components/common/Layout';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Upload, Mic, Sparkles } from 'lucide-react';

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
  // Mistral API key (NOTE: In production, use environment variables)
  const MISTRAL_API_KEY = 'RmVklbrpC36qrge8VomtXGxYWJSIG0Oq';

  const { user } = useAuth();
  const { addProduct, updateProduct } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Get product data if editing
  const editProduct = location.state?.editProduct;
  const isEditing = !!editProduct;

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<ProductForm>({
    defaultValues: {
      language: 'english',
      ...(editProduct && {
        category: editProduct.category,
        quantity: editProduct.quantity,
        rentPrice: editProduct.rentPrice,
        securityAmount: editProduct.securityAmount,
        title: editProduct.title,
        description: editProduct.description
      })
    }
  });

  // Watch form values to enable/disable generate button
  const watchedValues = watch(['description']);
  const [description] = watchedValues;
  
  const isGenerateEnabled = description && description.trim().length > 0;

  // Set images when editing
  useEffect(() => {
    if (editProduct && editProduct.images) {
      setUploadedImages(editProduct.images);
    }
  }, [editProduct]);

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

  const generateWithMistral = async (prompt: string) => {
    try {
      const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MISTRAL_API_KEY}`
        },
        body: JSON.stringify({
          model: 'mistral-tiny',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error(`Mistral API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error calling Mistral API:', error);
      throw error;
    }
  };

  const generateTitleAndDescription = async () => {
    if (!isGenerateEnabled) {
      alert('Please add a product description first');
      return;
    }

    setIsGenerating(true);
    
    try {
      // Create a detailed prompt for Mistral
      const userDescription = watch('description') || '';
      const category = watch('category') || '';
      const language = watch('language') || 'english';
      const rentPrice = watch('rentPrice') || 0;
      const securityAmount = watch('securityAmount') || 0;
      
      const prompt = `
      You are an expert product description generator for a rental platform. 
      Create a compelling product title and detailed description in ${language} based on the following information:
      
      Product Details:
      - Category: ${categories.find(c => c.value === category)?.label || category}
      - Daily Rent Price: ₹${rentPrice}
      - Security Deposit: ₹${securityAmount}
      - User's description: "${userDescription}"
      
      Guidelines:
      1. Generate a professional product title (max 10 words)
      2. Create a detailed description (150-200 words) with:
         - Key features and specifications
         - Benefits for renters
         - Condition and quality assessment
         - Rental terms and usage suggestions
         - Safety and maintenance information
      3. Make it appealing for potential renters
      4. Use markdown formatting with **bold** for important features
      5. Include emojis where appropriate to enhance readability
      6. Structure the description with clear paragraphs
      
      Output format:
      Title: [generated title here]
      Description: [generated description here]
      `;

      const result = await generateWithMistral(prompt);
      
      // Parse the response
      const titleMatch = result.match(/Title:\s*(.*)/);
      const descriptionMatch = result.match(/Description:\s*([\s\S]*)/);
      
      if (titleMatch && titleMatch[1]) {
        setValue('title', titleMatch[1].trim());
      }
      
      if (descriptionMatch && descriptionMatch[1]) {
        setValue('description', descriptionMatch[1].trim());
      }
    } catch (error) {
      alert('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
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

    const productData = {
      ownerId: user.id,
      title: data.title || 'Untitled Product',
      description: data.description || '',
      category: data.category,
      images: uploadedImages,
      quantity: data.quantity,
      availableQuantity: data.quantity,
      rentPrice: data.rentPrice,
      securityAmount: data.securityAmount,
      status: 'available' as const
    };

    if (isEditing && editProduct) {
      // Update existing product
      updateProduct(editProduct.id, productData);
      alert('Product updated successfully!');
      navigate('/owner/my-products');
    } else {
      // Add new product
      addProduct(productData);
      alert('Product added successfully!');
      // Reset form
      setUploadedImages([]);
    }
  };

  return (
    <OwnerLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-600">
            {isEditing ? 'Update your product details with AI-powered assistance' : 'List your items for rent with AI-powered assistance'}
          </p>
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

              {/* AI Generation Section */}
              <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                      AI-Powered Generation
                    </h3>
                    <p className="text-xs text-gray-600">Generate professional title and description</p>
                    {!isGenerateEnabled && (
                      <p className="text-xs text-amber-600 mt-1">Add product description to enable generation</p>
                    )}
                  </div>
                  <Button
                    type="button"
                    onClick={generateTitleAndDescription}
                    disabled={isGenerating || !isGenerateEnabled}
                    variant="secondary"
                    size="sm"
                  >
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </Button>
                </div>
              </Card>

              <Input
                label="Product Title"
                placeholder="AI will generate based on your description..."
                {...register('title')}
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Product Description
                </label>
                <textarea
                  placeholder="AI will enhance your description..."
                  rows={6}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors resize-vertical"
                  {...register('description')}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" size="lg">
                {isEditing ? 'Update Product' : 'Post Product'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </OwnerLayout>
  );
};