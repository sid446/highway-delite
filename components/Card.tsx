// components/Card.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CardProps {
  id: string;
  image?: string;
  title: string;
  location: string;
  description: string;
  price: number;
}

function Card({ id, image, title, location, description, price }: CardProps) {
  const router = useRouter();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  // Get first word of location
  const displayLocation = location.split(' ')[0];

  const handleViewDetails = () => {
    router.push(`/Event/${id}`);
  };

  return (
    <div className='h-auto min-h-[312px] w-[280px] bg-[#F0F0F0] flex flex-col rounded-lg transition-transform hover:scale-105 cursor-pointer'>
      <div 
        className='h-[170px] w-full bg-gray-300 rounded-t-lg overflow-hidden flex-shrink-0'
        onClick={handleViewDetails}
      >
        <img 
          className="h-full w-full object-cover" 
          src={image || 'https://via.placeholder.com/280x170'} 
          alt={title || 'Activity'} 
        />
      </div>
      
      <div className='w-full px-[10px] py-[5px]'>
        <div 
          className='w-full flex text-[#161616] justify-between p-2'
          onClick={handleViewDetails}
        >
          <span className='font-semibold text-[16px] truncate pr-2'>{title}</span>
          <div className="h-[24px] bg-[#D6D6D6] px-2 flex justify-center items-center rounded-sm flex-shrink-0">
            <span className='text-[11px] whitespace-nowrap'>{displayLocation}</span>
          </div>
        </div>

        <div className='w-full p-2 mb-[12px]'>
          <span 
            className={`text-[#6C6C6C] text-[12px] leading-[14px] cursor-pointer ${
              isDescriptionExpanded ? '' : 'line-clamp-2'
            }`}
            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
          >
            {description}
          </span>
        </div>

        <div className='w-full flex justify-between text-[#161616] px-2'>
          <h4 className='text-[12px]'> 
            From <span className='text-[18px] h-10 font-medium'>₹{price}</span>
          </h4>
          <button 
            onClick={handleViewDetails}
            className="bg-[#FFD643] text-[#161616] h-[30px] w-[99px] text-[14px] flex justify-center items-center rounded-sm hover:bg-[#F5CC3D] transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;