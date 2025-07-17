import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginForm {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userType = (searchParams.get('type') as 'owner' | 'renter') || 'renter';
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginForm>();

  const onLogin = async (data: LoginForm) => {
  setIsLoading(true);
  try {
    console.log("Attempting login with", data);
    const success = await login(data.email, data.password, userType);
    if (success) {
      console.log("Login successful, navigating...");
      navigate(userType === 'owner' ? '/owner/dashboard' : '/renter/home');
    } else {
      console.log("Login failed");
      setError('root', { message: 'Login failed. Please try again.' });
    }
  } catch (error) {
    console.log("Login exception:", error);
    setError('root', { message: 'Login failed. Please try again.' });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <AuthLayout 
      title={`${userType === 'owner' ? 'Owner' : 'Renter'} Login`}
      subtitle="Welcome back! Please sign in to your account"
    >
      <form onSubmit={handleSubmit(onLogin)} className="space-y-6">
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

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
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

        {errors.root && (
          <div className="text-red-600 text-sm text-center">{errors.root.message}</div>
        )}

        <div className="flex items-center justify-between">
          <Link 
            to={`/forgot-password?type=${userType}`}
            className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          fullWidth
          size="lg"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link 
            to={`/signup?type=${userType}`}
            className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
          >
            Sign Up
          </Link>
        </div>

        <div className="text-center">
          <Link 
            to={`/login?type=${userType === 'owner' ? 'renter' : 'owner'}`}
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            {userType === 'owner' ? 'Login as Renter' : 'Login as Owner'}
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};