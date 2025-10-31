// app/page.tsx
'use client';

import Card from '@/components/Card';
import Navbar from "@/components/Navbar";
import { useEvents } from "@/context/EventContext";


export default function Home() {
  const { events, loading, error } = useEvents();

  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar />
      <div className="flex flex-wrap justify-center items-start gap-6 mt-12">
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
              id={event._id}
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