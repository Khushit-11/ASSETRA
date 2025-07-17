import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components/common/Button';
import { Heart, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, addToWishlist, addToCart } = useCart();
  const navigate = useNavigate();
  // Track wishlist state locally for heart color
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  // Helper to increment quantity
  const increment = (item: any) => {
    addToCart({ ...item, quantity: 1 });
  };
  // Helper to decrement quantity
  const decrement = (item: any) => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: -1 });
    }
  };

  // Wishlist toggle
  const handleWishlist = (item: any) => {
    addToWishlist(item);
    setWishlistIds((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
  };

  // Calculate total cost
  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Rental details for each product
  const [rentalDetails, setRentalDetails] = useState<{ [id: string]: { startDate: string; endDate: string; duration: number } }>({});
  const [showRentModal, setShowRentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Helper to calculate days between two dates
  function getDays(start: string, end: string) {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    return Math.max(1, Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
  }

  // Helper to calculate pricing for each product
  function getPricing(item: any, days: number) {
    const rentTotal = item.price * days;
    const securityDeposit = item.securityDeposit || 5000; // fallback
    const total = rentTotal + securityDeposit;
    return { rentTotal, securityDeposit, total, days };
  }

  // Open modal for a specific product
  const handleSetRental = (item: any) => {
    setSelectedProduct(item);
    setShowRentModal(true);
  };

  // Modal state for rental details
  const [modalStartDate, setModalStartDate] = useState('');
  const [modalEndDate, setModalEndDate] = useState('');
  const [modalDuration, setModalDuration] = useState(1);

  const handleDurationSelect = (days: number) => {
    setModalDuration(days);
    setModalEndDate(modalStartDate ? new Date(new Date(modalStartDate).getTime() + (days - 1) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : '');
  };

  const handleStartDateChange = (date: string) => {
    setModalStartDate(date);
    if (modalDuration) {
      setModalEndDate(new Date(new Date(date).getTime() + (modalDuration - 1) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10));
    }
  };

  const handleEndDateChange = (date: string) => {
    setModalEndDate(date);
    if (modalStartDate) {
      setModalDuration(getDays(modalStartDate, date));
    }
  };

  // Save rental details for a product
  const handleSaveRentalDetails = () => {
    if (!modalStartDate || !modalEndDate) {
      window.alert('Please select rental dates');
      return;
    }
    setRentalDetails(prev => ({
      ...prev,
      [selectedProduct.id]: {
        startDate: modalStartDate,
        endDate: modalEndDate,
        duration: modalDuration
      }
    }));
    setShowRentModal(false);
    setSelectedProduct(null);
    setModalStartDate('');
    setModalEndDate('');
    setModalDuration(1);
  };

  // Proceed to checkout with all products and their rental details
  const handleProceedToCheckout = () => {
    // Check all products have rental details
    const missing = cart.filter(item => !rentalDetails[item.id] || !rentalDetails[item.id].startDate || !rentalDetails[item.id].endDate);
    if (missing.length > 0) {
      window.alert('Please set rental dates for all products before proceeding.');
      return;
    }
    // Prepare products with rental info
    const productsWithRental = cart.map(item => {
      const { startDate, endDate, duration } = rentalDetails[item.id];
      const pricing = getPricing(item, duration);
      return { ...item, startDate, endDate, duration, pricing };
    });
    navigate('/renter/checkout', {
      state: {
        products: productsWithRental
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-left">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex flex-col gap-4 items-start">
            {cart.map((item) => {
              const rental = rentalDetails[item.id] || {};
              return (
                <div key={item.id} className="flex w-full items-center bg-white rounded-lg shadow p-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg mr-4" />
                  <div className="flex-1 text-left">
                    <h2 className="font-semibold text-lg text-gray-900">{item.name}</h2>
                    <div className="flex items-center gap-2 mb-2">
                      <Button size="sm" variant="outline" onClick={() => decrement(item)} disabled={item.quantity === 1}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-2 text-gray-700 font-medium">{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => increment(item)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-emerald-600 font-bold">₹{item.price} <span className="text-xs text-gray-500">per unit</span></p>
                    <p className="text-gray-800 font-semibold mt-1">Total: ₹{item.price * item.quantity}</p>
                    <div className="mt-2">
                      <Button size="sm" variant="secondary" onClick={() => handleSetRental(item)}>
                        {rental.startDate && rental.endDate ? 'Edit Rental Details' : 'Set Rental Details'}
                      </Button>
                      {rental.startDate && rental.endDate && (
                        <div className="text-xs text-gray-600 mt-1">
                          {`From ${rental.startDate} to ${rental.endDate} (${rental.duration} day${rental.duration > 1 ? 's' : ''})`}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ml-4 items-end">
                    <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => handleWishlist(item)}>
                      <Heart className={`w-4 h-4 mr-1 ${wishlistIds.includes(item.id) ? 'text-red-500 fill-red-500' : ''}`} /> Add to Wishlist
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Total and Proceed to Checkout */}
          <div className="mt-8 w-full flex flex-col items-start text-left">
            <div className="text-lg font-bold mb-4">Total: ₹{totalCost}</div>
            <Button size="lg" className="w-full sm:w-auto" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </Button>
          </div>
          {/* Rent Modal */}
          {showRentModal && selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h2 className="text-lg font-bold mb-4">Set Rental Details</h2>
                <div className="flex items-center gap-4 mb-4">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <div className="font-semibold text-lg">{selectedProduct.name}</div>
                    <div className="text-emerald-600 font-bold">₹{selectedProduct.price} <span className="text-xs text-gray-500">per day</span></div>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Start Date</label>
                  <input type="date" className="border rounded px-2 py-1 w-full" value={modalStartDate} onChange={e => handleStartDateChange(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">End Date</label>
                  <input type="date" className="border rounded px-2 py-1 w-full" value={modalEndDate} onChange={e => handleEndDateChange(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Duration (days)</label>
                  <div className="flex gap-2 flex-wrap">
                    {[1, 3, 7, 15, 30].map((d) => (
                      <Button key={d} size="sm" variant={modalDuration === d ? 'secondary' : 'outline'} onClick={() => handleDurationSelect(d)}>
                        {d} day{d > 1 ? 's' : ''}
                      </Button>
                    ))}
                  </div>
                </div>
                {/* Price Details */}
                <div className="mb-4 border-t pt-4">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Rent (₹{selectedProduct.price} × {modalDuration} days)</span>
                    <span>₹{selectedProduct.price * modalDuration}</span>
                  </div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Security Deposit</span>
                    <span>₹{selectedProduct.securityDeposit || 5000}</span>
                  </div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span className="text-gray-500">Total</span>
                    <span className="font-bold">₹{(selectedProduct.price * modalDuration) + (selectedProduct.securityDeposit || 5000)}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">*Security deposit will be refunded after return</div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowRentModal(false)}>Cancel</Button>
                  <Button onClick={handleSaveRentalDetails}>Save</Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Cart;
