import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { CartProvider } from './context/CartContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import {SignupPage} from './pages/auth/SignupPage';

// Owner Pages
import { OwnerDashboard } from './pages/owner/OwnerDashboard';
import { AddProduct } from './pages/owner/AddProduct';
import { MyProducts } from './pages/owner/MyProducts';
import { RentalStatus } from './pages/owner/RentalStatus';
import { RentalRequests } from './pages/owner/RentalRequests';
import { DamageDetection } from './pages/owner/DamageDetection';
import { ImageLog } from './pages/owner/ImageLog';
import { Notifications } from './pages/owner/Notifications';
import { OwnerAccount } from './pages/owner/OwnerAccount';
import { Analytics } from './pages/owner/Analytics';
import { Reports } from './pages/owner/Reports';
import { Settings } from './pages/owner/Settings';

// Renter Pages
import { RenterHome } from './pages/renter/RenterHome';
import { CategoryProducts } from './pages/renter/CategoryProducts';
import { ProductDetails } from './pages/renter/ProductDetails';
import { Checkout } from './pages/renter/Checkout';
import { OrderSuccess } from './pages/renter/OrderSuccess';
import { RenterRentals } from './pages/renter/RenterRentals';
import { AddressManagement } from './pages/renter/AddressManagement';
import { RenterAccount } from './pages/renter/RenterAccount';
import Cart from './pages/renter/Cart';

// Admin Pages
import UsersPage from './pages/UsersPage';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; userType?: 'owner' | 'renter' }> = ({
  children,
  userType,
}) => {
  const { user, isLoading } = useAuth();

  console.log("ProtectedRoute check - isLoading:", isLoading, "user:", user);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (userType && user.userType !== userType) {
    const redirectPath = user.userType === "owner" ? "/owner/dashboard" : "/renter/home";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};


// App Component
const AppContent: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Owner Routes */}
        <Route path="/owner/dashboard" element={
          <ProtectedRoute userType="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        } />
        <Route path="/owner/add-product" element={
          <ProtectedRoute userType="owner">
            <AddProduct />
          </ProtectedRoute>
        } />
        <Route path="/owner/my-products" element={
          <ProtectedRoute userType="owner">
            <MyProducts />
          </ProtectedRoute>
        } />
        <Route path="/owner/rental-status" element={
          <ProtectedRoute userType="owner">
            <RentalStatus />
          </ProtectedRoute>
        } />
        <Route path="/owner/rental-requests" element={
          <ProtectedRoute userType="owner">
            <RentalRequests />
          </ProtectedRoute>
        } />
        <Route path="/owner/damage-detection" element={
          <ProtectedRoute userType="owner">
            <DamageDetection />
          </ProtectedRoute>
        } />
        <Route path="/owner/image-log" element={
          <ProtectedRoute userType="owner">
            <ImageLog />
          </ProtectedRoute>
        } />
        <Route path="/owner/notifications" element={
          <ProtectedRoute userType="owner">
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/owner/account" element={
          <ProtectedRoute userType="owner">
            <OwnerAccount />
          </ProtectedRoute>
        } />
        <Route path="/owner/analytics" element={
          <ProtectedRoute userType="owner">
            <Analytics />
          </ProtectedRoute>
        } />
        <Route path="/owner/reports" element={
          <ProtectedRoute userType="owner">
            <Reports />
          </ProtectedRoute>
        } />
        <Route path="/owner/settings" element={
          <ProtectedRoute userType="owner">
            <Settings />
          </ProtectedRoute>
        } />

        {/* Renter Routes */}
        <Route path="/renter/home" element={
          <ProtectedRoute userType="renter">
            <RenterHome />
          </ProtectedRoute>
        } />
        <Route path="/renter/category/:category" element={
          <ProtectedRoute userType="renter">
            <CategoryProducts />
          </ProtectedRoute>
        } />
        <Route path="/renter/product/:productId" element={
          <ProtectedRoute userType="renter">
            <ProductDetails />
          </ProtectedRoute>
        } />
        <Route path="/renter/checkout" element={
          <ProtectedRoute userType="renter">
            <Checkout />
          </ProtectedRoute>
        } />
        <Route path="/renter/order-success" element={
          <ProtectedRoute userType="renter">
            <OrderSuccess />
          </ProtectedRoute>
        } />
        <Route path="/renter/cart" element={
          <ProtectedRoute userType="renter">
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/renter/rentals" element={
          <ProtectedRoute userType="renter">
            <RenterRentals />
          </ProtectedRoute>
        } />
        <Route path="/renter/addresses" element={
          <ProtectedRoute userType="renter">
            <AddressManagement />
          </ProtectedRoute>
        } />
        <Route path="/renter/account" element={
          <ProtectedRoute userType="renter">
            <RenterAccount />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/users" element={<UsersPage />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};


function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;