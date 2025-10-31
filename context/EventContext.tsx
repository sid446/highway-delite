// context/EventContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface EventContextType {
  events: Event[];
  loading: boolean;
  error: string | null;
  getEventById: (id: string) => Event | undefined;
  refreshEvents: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      const res = await fetch(`/api/events`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      
      const data = await res.json();
      console.log('Fetched events:', data);
      setEvents(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if events array is empty (prevents reload on every mount)
    if (events.length === 0) {
      fetchEvents();
    } else {
      setLoading(false);
    }
  }, []);

  const getEventById = (id: string): Event | undefined => {
    return events.find(event => event._id === id);
  };

  const refreshEvents = async () => {
    await fetchEvents();
  };

  return (
    <EventContext.Provider 
      value={{ 
        events, 
        loading, 
        error, 
        getEventById, 
        refreshEvents 
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}