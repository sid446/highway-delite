import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Event from '@/model/Events';
import Order from '@/model/Order';
import mongoose from 'mongoose';

/**
 * POST /api/orders
 * Creates a new order (books an event)
 */
export async function POST(req: NextRequest) {
  await connectToDatabase();

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const body = await req.json();
    const {
      event: eventId,
      selectedDate,
      selectedTime,
      quantity,
      customerName,
      customerEmail,
    } = body;

    // 1. Validate Input
    if (
      !eventId ||
      !selectedDate ||
      !selectedTime ||
      !quantity ||
      !customerName ||
      !customerEmail
    ) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (isNaN(parseInt(quantity)) || parseInt(quantity) <= 0) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ error: 'Quantity must be a positive number' }, { status: 400 });
    }

    // 2. Check for existing booking by the same user
    const existingOrder = await Order.findOne({
      event: eventId,
      customerEmail: customerEmail,
    }).session(session);

    if (existingOrder) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        { error: 'You have already booked this event.' },
        { status: 409 }
      );
    }

    // 3. Find the Event and the specific slot
    const event = await Event.findById(eventId).session(session);
    if (!event) {
      throw new Error('Event not found');
    }

    // Find the specific date
    const dateToBook = event.upcomingDates.find(
      (d: any) => new Date(d.date).toISOString() === new Date(selectedDate).toISOString()
    );
    if (!dateToBook) {
      throw new Error('The selected date is not available for this event');
    }

    // Find the specific time slot
    const timeSlotToBook = dateToBook.timeSlots.find(
      (t: any) => t.time === selectedTime
    );
    if (!timeSlotToBook) {
      throw new Error('The selected time is not available for this date');
    }

    // 4. Check slot availability
    if (timeSlotToBook.slotsAvailable < quantity) {
      throw new Error('Not enough available slots for the selected time');
    }

    // 5. Reduce the slot count
    timeSlotToBook.slotsAvailable -= quantity;

    // Save the updated event document
    await event.save({ session });

    // 6. Create the Order
    const totalPrice = event.price * quantity;

    const newOrder = new Order({
      event: eventId,
      selectedDate,
      selectedTime,
      quantity,
      customerName,
      customerEmail,
      totalPrice,
      status: 'confirmed',
    });

    const savedOrder = await newOrder.save({ session });

    // 7. Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(savedOrder, { status: 201 });
    
  } catch (error: any) {
    // 8. Abort the transaction on error
    await session.abortTransaction();
    session.endSession();
    console.error('Booking transaction failed:', error);

    return NextResponse.json(
      { error: error.message || 'Failed to create booking' },
      { status: 400 }
    );
  }
}

/**
 * GET /api/orders
 * Retrieves orders (optionally filtered by email)
 */
export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    let orders;
    if (email) {
      orders = await Order.find({ customerEmail: email })
        .populate('event')
        .sort({ createdAt: -1 });
    } else {
      orders = await Order.find()
        .populate('event')
        .sort({ createdAt: -1 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}