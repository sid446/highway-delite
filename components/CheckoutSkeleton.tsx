'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';

export function EventDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Skeleton */}
      <div className="h-16 bg-white border-b border-gray-200 animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2">
            {/* Back Button Skeleton */}
            <div className="flex items-center mb-6">
              <div className="w-5 h-5 bg-gray-300 rounded animate-pulse mr-2" />
              <div className="w-16 h-4 bg-gray-300 rounded animate-pulse" />
            </div>

            {/* Image Skeleton */}
            <div className="mb-6 w-full lg:w-[765px] h-[200px] sm:h-[300px] md:h-[381px] bg-gray-300 rounded-xl animate-pulse" />

            {/* Title Skeleton */}
            <div className="mb-2">
              <div className="h-7 bg-gray-300 rounded w-3/4 animate-pulse" />
            </div>

            {/* Description Skeleton */}
            <div className="mb-6 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            </div>

            {/* Choose Date Section */}
            <div className="mb-6">
              <div className="h-4 bg-gray-300 rounded w-24 mb-3 animate-pulse" />
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-[34px] w-[69px] bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Choose Time Section */}
            <div className="mb-6">
              <div className="h-4 bg-gray-300 rounded w-28 mb-3 animate-pulse" />
              <div className="flex gap-3 flex-wrap">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-[34px] w-32 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
              <div className="h-3 bg-gray-200 rounded w-48 mt-2 animate-pulse" />
            </div>

            {/* About Section */}
            <div className="mb-6">
              <div className="h-4 bg-gray-300 rounded w-16 mb-3 animate-pulse" />
              <div className="bg-gray-200 rounded-sm h-20 w-full max-w-[765px] animate-pulse" />
            </div>
          </div>

          {/* Right Section - Booking Card Skeleton */}
          <div className="lg:col-span-1 lg:mt-10">
            <div className="bg-gray-200 w-full max-w-[387px] mx-auto lg:mx-0 min-h-[303px] rounded-lg p-6 animate-pulse">
              {/* Price Details */}
              <div className="space-y-3 mb-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-20" />
                    <div className="h-4 bg-gray-300 rounded w-16" />
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between pt-4 border-t border-gray-300 mb-6">
                <div className="h-6 bg-gray-300 rounded w-16" />
                <div className="h-6 bg-gray-300 rounded w-20" />
              </div>

              {/* Button */}
              <div className="w-full h-11 bg-gray-300 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}