import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import Event from '@/model/Events'
import Order from '@/model/Order'
import mongoose from 'mongoose' // We need mongoose to use transactions

/**
 * -----------------------------------------------------------------
 * POST /api/orders
 * Creates a new order (books an event)
 * -----------------------------------------------------------------
 */
export async function POST(req: NextRequest) {
  await connectToDatabase()

  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const body = await req.json()
    const {
      event: eventId,
      selectedDate,
      selectedTime,
      quantity,
      customerName,
      customerEmail,
    } = body

    // --- 1. Validate Input ---
    if (
      !eventId ||
      !selectedDate ||
      !selectedTime ||
      !quantity ||
      !customerName ||
      !customerEmail
    ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (isNaN(parseInt(quantity)) || parseInt(quantity) <= 0) {
      return NextResponse.json({ error: 'Quantity must be a positive number' }, { status: 400 })
    }

    // --- 2. Check for existing booking by the same user ---
    // This is Constraint: "same user can not same event"
    const existingOrder = await Order.findOne({
      event: eventId,
      customerEmail: customerEmail,
    })

    if (existingOrder) {
      return NextResponse.json(
        { error: 'You have already booked this event.' },
        { status: 409 } // 409 Conflict is appropriate here
      )
    }

    // --- 3. Find the Event and the specific slot (within the transaction) ---
    const event = await Event.findById(eventId).session(session)
    if (!event) {
      throw new Error('Event not found')
    }

    // Find the specific date
    const dateToBook = event.upcomingDates.find(
      (d:any) => new Date(d.date).toISOString() === new Date(selectedDate).toISOString()
    )
    if (!dateToBook) {
      throw new Error('The selected date is not available for this event')
    }

    // Find the specific time slot
    const timeSlotToBook = dateToBook.timeSlots.find(
      (t:any) => t.time === selectedTime
    )
    if (!timeSlotToBook) {
      throw new Error('The selected time is not available for this date')
    }

    // --- 4. Check slot availability ---
    // This is Constraint: "available slots reduce by one" (or by quantity)
    if (timeSlotToBook.slotsAvailable < quantity) {
      throw new Error('Not enough available slots for the selected time')
    }

    // --- 5. Reduce the slot count ---
    timeSlotToBook.slotsAvailable -= quantity

    // Save the updated event document
    await event.save({ session })

    // --- 6. Create the Order (within the transaction) ---
    const totalPrice = event.price * quantity

    const newOrder = new Order({
      event: eventId,
      selectedDate,
      selectedTime,
      quantity,
      customerName,
      customerEmail,
      totalPrice, // This was from your recommended fields, needed for the order
      status: 'confirmed', // Assuming payment is processed
    })

    const savedOrder = await newOrder.save({ session })

    // --- 7. If all steps succeeded, commit the transaction ---
    await session.commitTransaction()

    return NextResponse.json(savedOrder, { status: 201 })
    
  } catch (error: any) {
    // --- 8. If any step failed, abort the transaction ---
    await session.abortTransaction()
    console.error('Booking transaction failed:', error)

    // Send back the specific error message (e.g., "Not enough slots")
    return NextResponse.json(
      { error: error.message || 'Failed to create booking' },
      { status: 400 } // 400 Bad Request is good for business logic errors
    )
  } finally {
    // --- 9. Always end the session ---
    session.endSession()
  }
}