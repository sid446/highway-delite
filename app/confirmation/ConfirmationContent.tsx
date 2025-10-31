// app/confirmation/ConfirmationContent.tsx

'use client'; // This directive stays here

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check } from 'lucide-react';
import Navbar from '@/components/Navbar';

// 1. Rename the function (e.g., to ConfirmationContent)
export default function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refId = searchParams.get('refId') || 'HUF568SO';

  // 2. All your existing JSX and logic stays exactly the same
  return (
    <div className="min-h-screen   bg-gray-50">
      <Navbar />

      {/* Added w-full here to fix horizontal centering */}
      <div className="flex justify-center  w-full min-h-[calc(100vh-80px)] pt-14">
        <div className="text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-[80px] h-20 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-12 h-12 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Booking Confirmed Text */}
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">
            Booking Confirmed
          </h1>

          {/* Reference ID */}
          <p className="text-gray-600 text-sm mb-8">
            Ref ID: {refId}
          </p>

          {/* Back to Home Button */}
          <button
            onClick={() => router.push('/')}
            className="px-8 py-2.5 bg-[#e3e3e3] text-[#656565] text-sm font-medium rounded hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}