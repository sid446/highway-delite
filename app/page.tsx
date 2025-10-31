// app/page.tsx
'use client';

import Card from '@/components/Card';
import Navbar from "@/components/Navbar";
import { useEvents } from "@/context/EventContext";

export default function Home() {
  const { filteredEvents, loading, error, setSearchTerm, searchTerm } = useEvents();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <Navbar onSearch={handleSearch} />
      
      <div className="px-4 sm:px-8 lg:px-[124px] mt-6">
        {/* Search Results Info */}
        {searchTerm && (
          <div className="mb-4">
            <p className="text-gray-600">
              {filteredEvents.length === 0 ? (
                <span>No results found for "<span className="font-semibold">{searchTerm}</span>"</span>
              ) : (
                <span>
                  Found {filteredEvents.length} {filteredEvents.length === 1 ? 'result' : 'results'} for "<span className="font-semibold">{searchTerm}</span>"
                </span>
              )}
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#FFD643] hover:text-[#FFC700] text-sm font-medium mt-1"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center items-start gap-6 mt-12">
        {loading ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 mt-20">
            <p className="text-xl">Error: {error}</p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">
              {searchTerm ? 'No events match your search' : 'No events available at the moment'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-6 py-2 bg-[#FFD643] text-[#161616] font-medium rounded-sm hover:bg-[#FFC700] transition-colors"
              >
                View all events
              </button>
            )}
          </div>
        ) : (
          filteredEvents.map((event) => (
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