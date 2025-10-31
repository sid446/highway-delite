'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useOrders } from '@/context/OrderContext';
import Navbar from '@/components/Navbar';

export default function CheckoutPage() {
  const router = useRouter();
  const { currentOrder, clearCurrentOrder, createOrder } = useOrders();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // 1. Add state to track navigation
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // 2. Update useEffect to respect the isNavigating flag
    // Only redirect if there's no order AND we aren't trying to pay
    if (!currentOrder && !isNavigating) {
      router.push('/');
    }
  }, [currentOrder, router, isNavigating]); // 3. Add isNavigating to dependency array

  if (!currentOrder) {
    return null;
  }

  const handleApplyPromo = () => {
    // Promo code logic here
    console.log('Applying promo code:', promoCode);
  };

  const handlePayment = async () => {
    if (!fullName || !email) {
      alert('Please fill in all required fields');
      return;
    }

    if (!agreedToTerms) {
      alert('Please agree to the terms and safety policy');
      return;
    }

    // 4. Set isNavigating to true before starting the async operation
    setIsNavigating(true);

    try {
      // Create the order
      const orderData = {
        event: currentOrder.eventId, // Use eventId instead of event name
        selectedDate: currentOrder.selectedDate,
        selectedTime: currentOrder.selectedTime,
        quantity: currentOrder.quantity,
        customerName: fullName,
        customerEmail: email,
        totalPrice: currentOrder.totalPrice,
      };

      const createdOrder = await createOrder(orderData);

      if (createdOrder) {
        // Generate reference ID
        const refId = createdOrder._id.substring(0, 8).toUpperCase();
        
        // Clear current order
        clearCurrentOrder();
        
        // Navigate to confirmation page with ref ID
        // The useEffect will NOT redirect to '/' because isNavigating is true
        router.push(`/confirmation?refId=${refId}`);
      } else {
        alert('Failed to process payment. Please try again.');
        // 5. Reset flag on failure
        setIsNavigating(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('An error occurred during payment. Please try again.');
      // 6. Reset flag on error
      setIsNavigating(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-700 mb-6 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium text-[14px]">Checkout</span>
        </button>

        {/* This container now centers its children */}
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Left Section - Form */}
          <div className="space-y-4 h-fit py-[20px] px-[24px] rounded-md w-[787px] bg-[#efefef]">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="w-full h-[42px] px-4 bg-[#DDDDDD] text-[13px] text-black rounded-sm focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[14px] font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full h-[42px] text-[13px] text-black px-4 bg-[#DDDDDD] rounded-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Promo Code */}
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  placeholder='Promo Code'
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 h-[42px] text-[13px] text-black px-4 bg-[#DDDDDD] rounded-sm focus:outline-none"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-6 h-[42px] text-[14px] bg-black text-white rounded-sm hover:bg-gray-800 transition-colors font-medium"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-3 h-3 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="text-[12px] text-[#5b5b5b]">
                I agree to the terms and safety policy
              </label>
            </div>
          </div>

          {/* Right Section - Order Summary */}
          <div className="bg-[#efefef] rounded-lg p-6 h-fit w-[387px]">
            <div className="space-y-4">
              {/* Experience */}
              <div className="flex justify-between">
                <span className="text-[14px] text-gray-600">Experience</span>
                <span className="text-[14px] font-medium text-gray-900">
                  {currentOrder.event}
                </span>
              </div>

              {/* Date */}
              <div className="flex justify-between">
                <span className="text-[14px] text-gray-600">Date</span>
                <span className="text-[14px] font-medium text-gray-900">
                  {formatDate(currentOrder.selectedDate)}
                </span>
              </div>

              {/* Time */}
              <div className="flex justify-between">
                <span className="text-[14px] text-gray-600">Time</span>
                <span className="text-[14px] font-medium text-gray-900">
                  {currentOrder.selectedTime}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex justify-between">
                <span className="text-[14px] text-gray-600">Qty</span>
                <span className="text-[14px] font-medium text-gray-900">
                  {currentOrder.quantity}
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex justify-between">
                <span className="text-[14px] text-gray-600">Subtotal</span>
                <span className="text-[14px] font-medium text-gray-900">
                  ₹
                  {currentOrder.totalPrice -
                    Math.round((currentOrder.totalPrice * 0.09) / 1.09)}
                </span>
              </div>

              {/* Taxes */}
              <div className="flex justify-between">
                <span className="text-[14px] text-gray-600">Taxes</span>
                <span className="text-[14px] font-medium text-gray-900">
                  ₹{Math.round((currentOrder.totalPrice * 0.09) / 1.09)}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <span className="text-[18px] font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-[18px] font-semibold text-gray-900">
                  ₹{currentOrder.totalPrice}
                </span>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                className="w-full h-[44px] bg-[#FFD643] text-[16px] font-medium text-gray-900 rounded-sm hover:bg-yellow-500 transition-colors mt-4"
              >
                Pay and Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}