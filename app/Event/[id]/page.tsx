// app/Event/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Minus, Plus, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

interface TimeSlot {
  time: string;
  slotsAvailable: number;
}

interface UpcomingDate {
  date: string;
  timeSlots: TimeSlot[];
}

interface Event {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  mainImage: string;
  images: string[];
  upcomingDates: UpcomingDate[];
  createdBy: {
    _id: string;
    name?: string;
  };
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState('');

  const taxRate = 0.09;

  useEffect(() => {
    async function fetchEvent() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/events/${eventId}`);

        if (!res.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await res.json();
        setEvent(data);

        // Set default selected time from first available time slot
        if (data.upcomingDates?.[0]?.timeSlots?.[0]) {
          setSelectedTime(data.upcomingDates[0].timeSlots[0].time);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error || 'Event not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="text-yellow-400 hover:text-yellow-500 font-medium"
          >
            Go back to home
          </button>
        </div>
      </div>
    );
  }

  const subtotal = event.price * quantity;
  const taxes = Math.round(subtotal * taxRate);
  const total = subtotal + taxes;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const selectedDate = event.upcomingDates[selectedDateIndex];

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2">
            {/* Back Button */}
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-700 mb-6 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-1" />
              <span className="font-medium text-[14px]">Details</span>
            </button>

            {/* Combined Image Gallery - Horizontal Scroll */}
            <div className="mb-6 w-full">
              <div className="">
                <div className="flex gap-4" style={{ width: 'max-content' }}>
                  {/* Main Image First */}
                  <div className="relative rounded-xl overflow-hidden flex-shrink-0 w-[765px] h-[381px]">
                    <img
                      src={event.mainImage || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=450&fit=crop'}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                  
                 
                </div>
              </div>
            </div>

            {/* Title and Description */}
            <h1 className="text-[24px] font-bold text-gray-900 mb-2">{event.title}</h1>
            
            <p className="text-[#6c6c6c] text-[16px] mb-6">{event.description}</p>

            {/* Choose Date */}
            <div className="mb-6">
              <h2 className="text-[14px] font-semibold text-gray-900 mb-2">Choose date</h2>
              <div className="flex gap-3 flex-wrap">
                {event.upcomingDates.map((dateObj, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedDateIndex(index);
                      // Reset selected time to first available slot
                      if (dateObj.timeSlots[0]) {
                        setSelectedTime(dateObj.timeSlots[0].time);
                      }
                    }}
                    className={`h-[34px] w-[69px]   font-medium transition-all ${
                      selectedDateIndex === index
                        ? ' bg-[#FFD643] border-0 border-[#FFD643] text-gray-900'
                        : ' bg-white border-2 border-zinc-300 text-zinc-400 hover:border-gray-300'
                    }`}
                  >
                    {formatDate(dateObj.date)}
                  </button>
                ))}
              </div>
            </div>

            {/* Choose Time */}
            <div className="mb-6">
              <h2 className="text-[14px] font-semibold text-gray-900 mb-3">Choose time</h2>
              <div className="flex gap-3 flex-wrap">
                {selectedDate?.timeSlots.map((timeSlot, index) => {
                  const isSoldOut = timeSlot.slotsAvailable === 0;
                  const isLowStock = timeSlot.slotsAvailable > 0 && timeSlot.slotsAvailable <= 5;

                  return (
                    <button
                      key={index}
                      onClick={() => !isSoldOut && setSelectedTime(timeSlot.time)}
                      disabled={isSoldOut}
                      className={`px-3 h-[34px]  border-2 font-medium transition-all text-[14px] relative ${
                        selectedTime === timeSlot.time && !isSoldOut
                          ? 'border-yellow-400 bg-yellow-400 text-gray-900'
                          : !isSoldOut
                          ? 'border-gray-200 bg-white text-zinc-400 hover:border-gray-300'
                          : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <span>{timeSlot.time}</span>
                      <span
                        className={`text-[10px] ml-2 ${
                          isSoldOut
                            ? 'text-gray-400'
                            : isLowStock
                            ? 'text-orange-500'
                            : 'text-green-500'
                        }`}
                      >
                        {isSoldOut
                          ? 'Sold out'
                          : isLowStock
                          ? `${timeSlot.slotsAvailable} left`
                          : `${timeSlot.slotsAvailable} avail`}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[12px] text-zinc-400 mt-2">All times are in IST (GMT +5:30)</p>
            </div>

            {/* About */}
            <div>
              <h2 className="text-[14px] font-semibold text-gray-900 mb-3">About</h2>
              <div className="bg-[#EEEEEE] rounded-sm h-[32px] w-[765px] flex items-center p-3">
                <p className="text-gray-600 text-[12px]">{event.description}</p>
              </div>
            </div>
          </div>

          {/* Right Section - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white w-[387px] h-[303px] rounded-2xl shadow-lg p-6 sticky top-6">
              

              {/* Pricing Details */}
              <div className="space-y-3 mb-3">
                <div className="flex justify-between text-[16px]">
                  <span className="text-gray-600 ">Starts at</span>
                  <span className=" text-gray-900">₹{event.price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className=" text-gray-900 w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className=" text-gray-900">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className=" text-gray-900">₹{taxes}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-6">
                <span className="text-[20px] font-semibold text-gray-900">Total</span>
                <span className="text-[20px] font-semibold text-black">₹{total}</span>
              </div>

              {/* Confirm Button */}
              <button
                onClick={() => {
                  // Handle booking confirmation
                  console.log('Booking:', {
                    eventId: event._id,
                    date: selectedDate.date,
                    time: selectedTime,
                    quantity,
                    total,
                  });
                  alert('Booking functionality to be implemented!');
                }}
                className="w-[339px] h-[44px] bg-[#D7D7D7] text-[16px] hover:bg-yellow-500 text-[#7F7F7F]  flex justify-center items-center rounded-sm transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}