'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function ConfirmationContent() {
  const refId = 'HUF568SO';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex justify-center w-full min-h-[calc(100vh-87px)] pt-8 sm:pt-12 lg:pt-16 px-4">
        <div className="text-center max-w-md">
          {/* Success Icon */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-8 h-8 sm:w-12 sm:h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Booking Confirmed Text */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 sm:mb-4">
            Booking Confirmed
          </h1>

          {/* Reference ID */}
          <p className="text-gray-600 text-xs sm:text-sm mb-8">
            Ref ID: {refId}
          </p>

          {/* Back to Home Button */}
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#FFD643] text-[#161616] text-sm sm:text-base font-medium rounded hover:bg-[#FFC700] transition-colors active:scale-95">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
