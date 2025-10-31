export function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Skeleton */}
      <div className="h-16 bg-white border-b border-gray-200 animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back Button Skeleton */}
        <div className="flex items-center mb-6">
          <div className="w-5 h-5 bg-gray-300 rounded animate-pulse mr-2" />
          <div className="w-20 h-4 bg-gray-300 rounded animate-pulse" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Left Section - Form Skeleton */}
          <div className="space-y-4 py-5 px-6 rounded-md w-full max-w-[787px] bg-gray-200 animate-pulse">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <div className="h-4 bg-gray-300 rounded w-20 mb-2" />
                <div className="w-full h-[42px] bg-gray-300 rounded-sm" />
              </div>

              {/* Email */}
              <div>
                <div className="h-4 bg-gray-300 rounded w-16 mb-2" />
                <div className="w-full h-[42px] bg-gray-300 rounded-sm" />
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex gap-2">
              <div className="flex-1 h-[42px] bg-gray-300 rounded-sm" />
              <div className="w-20 h-[42px] bg-gray-400 rounded-sm" />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 pt-2">
              <div className="w-3 h-3 bg-gray-300 rounded mt-1" />
              <div className="h-3 bg-gray-300 rounded w-56" />
            </div>
          </div>

          {/* Right Section - Order Summary Skeleton */}
          <div className="bg-gray-200 rounded-lg p-6 w-full max-w-[387px] mx-auto lg:mx-0 animate-pulse">
            <div className="space-y-4">
              {/* Summary Items */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-300 rounded w-24" />
                  <div className="h-4 bg-gray-300 rounded w-20" />
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between pt-4 border-t border-gray-300">
                <div className="h-5 bg-gray-300 rounded w-16" />
                <div className="h-5 bg-gray-300 rounded w-20" />
              </div>

              {/* Pay Button */}
              <div className="w-full h-[44px] bg-gray-300 rounded-sm mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
