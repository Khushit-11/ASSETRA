import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Select } from '../../components/common/Select';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff } from 'lucide-react';

interface SignupForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  userType: 'owner' | 'renter'; 
  confirmPassword: string;
  country: string;
  city: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  landmark?: string;
  acceptTerms: boolean;
}

export const SignupPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userType = (searchParams.get('type') as 'owner' | 'renter') || 'renter';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setError, watch } = useForm<SignupForm>();
  const password = watch('password');

  const countries = [
    { value: 'india', label: 'India' },
    { value: 'usa', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' }
  ];

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Location detected: ${position.coords.latitude}, ${position.coords.longitude}`);
        },
        (error) => {
          alert('Unable to detect location. Please enter manually.');
        }
      );
    }
  };

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    try {
      const { confirmPassword, acceptTerms, ...userData } = data;

      const success = await signup({
        ...userData,
        userType,
        address: {
          country: data.country,
          city: data.city,
          pincode: data.pincode,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          addressLine3: data.addressLine3,
          landmark: data.landmark
        },
        password: data.password
      });

      if (success) {
        navigate(userType === 'owner' ? '/owner/dashboard' : '/renter/home');
      } else {
        setError('root', { message: 'Signup failed. Please try again.' });
      }
    } catch (error) {
      setError('root', { message: 'Signup failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => setCurrentStep(2);
  const prevStep = () => setCurrentStep(1);

  return (
    <AuthLayout 
      title={`${userType === 'owner' ? 'Owner' : 'Renter'} Registration`}
      subtitle="Create your account to get started"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              icon={<User className="w-5 h-5 text-gray-400" />}
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="+91 9876543210"
              icon={<Phone className="w-5 h-5 text-gray-400" />}
              {...register('phone', { required: 'Phone number is required' })}
              error={errors.phone?.message}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                icon={<Lock className="w-5 h-5 text-gray-400" />}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                error={errors.password?.message}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                icon={<Lock className="w-5 h-5 text-gray-400" />}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                error={errors.confirmPassword?.message}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button type="button" onClick={nextStep} fullWidth size="lg">
              Next: Address Details
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Address Information</h3>
              <Button type="button" onClick={detectLocation} variant="outline" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                Auto-detect
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Country"
                options={countries}
                {...register('country', { required: 'Country is required' })}
                error={errors.country?.message}
              />

              <Input
                label="City"
                placeholder="Enter your city"
                {...register('city', { required: 'City is required' })}
                error={errors.city?.message}
              />
            </div>

            <Input
              label="Pincode"
              placeholder="Enter pincode"
              {...register('pincode', { required: 'Pincode is required' })}
              error={errors.pincode?.message}
            />

            <Input
              label="Address Line 1"
              placeholder="House/Flat number, Street name"
              {...register('addressLine1', { required: 'Address is required' })}
              error={errors.addressLine1?.message}
            />

            <Input
              label="Address Line 2 (Optional)"
              placeholder="Area, Locality"
              {...register('addressLine2')}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Address Line 3 (Optional)"
                placeholder="District"
                {...register('addressLine3')}
              />

              <Input
                label="Landmark (Optional)"
                placeholder="Near..."
                {...register('landmark')}
              />
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="acceptTerms"
                className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                {...register('acceptTerms', { required: 'You must accept the terms' })}
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="text-emerald-600 hover:text-emerald-700">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>
            )}

            {errors.root && (
              <div className="text-red-600 text-sm text-center">{errors.root.message}</div>
            )}

            <div className="flex space-x-4">
              <Button type="button" onClick={prevStep} variant="outline" fullWidth>
                Back
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                fullWidth
                size="lg"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </div>
        )}

        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link 
            to={`/login?type=${userType}`}
            className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
          >
            Sign In
          </Link>
        </div>

        <div className="text-center">
          <Link 
            to={`/signup?type=${userType === 'owner' ? 'renter' : 'owner'}`}
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            {userType === 'owner' ? 'Register as Renter' : 'Register as Owner'}
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};