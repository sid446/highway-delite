import React from 'react';

// Skeleton Card Component
function CardSkeleton() {
  return (
    <div className='h-auto min-h-[312px] w-[280px] bg-[#F0F0F0] flex flex-col rounded-lg animate-pulse'>
      {/* Image skeleton */}
      <div className='h-[170px] w-full bg-gray-300 rounded-t-lg shrink-0'></div>
      
      <div className='w-full px-2.5 py-[5px]'>
        {/* Title and location skeleton */}
        <div className='w-full flex text-[#161616] justify-between p-2'>
          <div className='h-5 bg-gray-300 rounded w-32'></div>
          <div className='h-6 bg-[#D6D6D6] px-2 rounded-sm w-16'></div>
        </div>

        {/* Description skeleton */}
        <div className='w-full p-2 mb-3 space-y-2'>
          <div className='h-3 bg-gray-300 rounded w-full'></div>
          <div className='h-3 bg-gray-300 rounded w-3/4'></div>
        </div>

        {/* Price and button skeleton */}
        <div className='w-full flex justify-between items-center px-2'>
          <div className='space-y-1'>
            <div className='h-3 bg-gray-300 rounded w-12'></div>
            <div className='h-6 bg-gray-300 rounded w-16'></div>
          </div>
          <div className='h-[30px] w-[99px] bg-gray-300 rounded-sm'></div>
        </div>
      </div>
    </div>
  );
}



// Main Page Component
export default function EventPageSkeleton() {
  return (
    <div className="bg-white min-h-screen w-full">
     
      
      

      {/* Cards Grid */}
      <div className="flex flex-wrap justify-center items-start gap-6 mt-12 px-[124px]">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}