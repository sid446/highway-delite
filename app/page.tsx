// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Navbar from "@/components/Navbar";

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
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const res = await fetch(`${baseUrl}/api/events`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await res.json();
        console.log('Fetched events:', data); // Debug log
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err); // Debug log
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar />
      <div className="flex flex-wrap justify-center items-start gap-6 mt-[48px]">
        {loading ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mt-20">
            <p className="text-xl">Error: {error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">No events available at the moment</p>
          </div>
        ) : (
          events.map((event) => (
            <Card
              key={event._id}
              id={event._id}  // ✅ Added the id prop
              image={event.mainImage}
              title={event.title}
              location={event.location}
              description={event.description}
              price={event.price}
            />
          ))
        )}
      </div>
    </div>
  );
}