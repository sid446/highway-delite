// app/api/events/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Event from '@/model/Events';

// Define the interface for params - params is now a Promise in Next.js 15
interface Params {
  params: Promise<{ id: string }>;
}

/**
 * -----------------------------------------------------------------
 * GET /api/events/[id]
 * Fetches a single event by its ID.
 * -----------------------------------------------------------------
 */
export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const { id } = await params; // ✅ Await params before destructuring
    
    const event = await Event.findById(id);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    return NextResponse.json(event);

  } catch (error: any) {
    console.error('Failed to fetch event:', error);
    if (error.name === 'CastError') {
      return NextResponse.json({ error: 'Invalid event ID format' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch event', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * -----------------------------------------------------------------
 * PUT /api/events/[id]
 * Updates a single event by its ID.
 * -----------------------------------------------------------------
 */
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();

    const { id } = await params; // ✅ Await params before destructuring
    const body = await req.json();

    const updatedEvent = await Event.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(updatedEvent);

  } catch (error: any) {
    console.error('Failed to update event:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: error.message },
        { status: 400 }
      );
    }
    if (error.name === 'CastError') {
      return NextResponse.json({ error: 'Invalid event ID format' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to update event', details: error.message },
      { status: 500 }
    );
  }
}

/**
 * -----------------------------------------------------------------
 * DELETE /api/events/[id]
 * Deletes a single event by its ID.
 * -----------------------------------------------------------------
 */
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const { id } = await params; // ✅ Await params before destructuring
    
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Event deleted successfully' });

  } catch (error: any) {
    console.error('Failed to delete event:', error);
    if (error.name === 'CastError') {
      return NextResponse.json({ error: 'Invalid event ID format' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to delete event', details: error.message },
      { status: 500 }
    );
  }
}