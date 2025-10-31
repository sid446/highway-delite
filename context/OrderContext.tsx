// context/OrderContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Order {
  _id: string;
  event: string;
  selectedDate: string;
  selectedTime: string;
  quantity: number;
  customerName: string;
  customerEmail: string;
  totalPrice: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PendingOrder {
  event: string;
  eventId: string;
  selectedDate: string;
  selectedTime: string;
  quantity: number;
  totalPrice: number;
}

interface OrderContextType {
  orders: Order[];
  currentOrder: PendingOrder | null;
  loading: boolean;
  error: string | null;
  setCurrentOrder: (order: PendingOrder) => void;
  createOrder: (orderData: Omit<Order, '_id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<Order | null>;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByEmail: (email: string) => Order[];
  clearCurrentOrder: () => void;
  refreshOrders: (email?: string) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<PendingOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a new order
  const createOrder = async (
    orderData: Omit<Order, '_id' | 'status' | 'createdAt' | 'updatedAt'>
  ): Promise<Order | null> => {
    try {
      setLoading(true);
      setError(null);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const newOrder = await res.json();
      
      // Add to orders list
      setOrders(prev => [...prev, newOrder]);
      
      console.log('Order created successfully:', newOrder);
      return newOrder;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create order';
      console.error('Error creating order:', err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Get order by ID
  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order._id === id);
  };

  // Get orders by customer email
  const getOrdersByEmail = (email: string): Order[] => {
    return orders.filter(order => order.customerEmail === email);
  };

  // Clear current order
  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  // Refresh orders (fetch from API)
  const refreshOrders = async (email?: string) => {
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      
      // If email is provided, fetch only that user's orders
      const url = email 
        ? `${baseUrl}/api/order?email=${email}`
        : `${baseUrl}/api/order`;
      
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await res.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        currentOrder,
        loading,
        error,
        setCurrentOrder,
        createOrder,
        getOrderById,
        getOrdersByEmail,
        clearCurrentOrder,
        refreshOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}