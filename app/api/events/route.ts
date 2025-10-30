// File: app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import Event from '@/model/Events'

/**
 * -----------------------------------------------------------------
 * POST /api/events
 * Creates (uploads) a new event.
 * -----------------------------------------------------------------
 */
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()

    const body = await req.json()
    // --- REMOVED createdBy ---
    const { 
        title, 
        description, 
        location, 
        price, 
        upcomingDates,
        mainImage, // New field
        images     // New field
    } = body

    // --- 1. Basic Validation ---
    // --- REMOVED createdBy from validation ---
    if (!title || !description || !location || !price || !upcomingDates) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!Array.isArray(upcomingDates) || upcomingDates.length === 0) {
      return NextResponse.json({ error: 'upcomingDates must be a non-empty array' }, { status: 400 })
    }

    // --- 2. Create and Save the Event ---
    const newEvent = new Event({
      title,
      description,
      location,
      price,
      // createdBy, // Removed
      upcomingDates,
      mainImage, // Add mainImage to the new event
      images     // Add images array to the new event
    })

    const savedEvent = await newEvent.save()
    return NextResponse.json(savedEvent, { status: 201 })

  } catch (error: any) {
    console.error('Failed to create event:', error)
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: 'Validation failed', details: error.message }, { status: 400 })
    }
    // --- REMOVED CastError check, as it was for createdBy ---
    return NextResponse.json(
      { error: 'Failed to create event', details: error.message },
      { status: 500 }
    )
  }
}

/**
 * -----------------------------------------------------------------
 * GET /api/events
 * Returns all events.
 * -----------------------------------------------------------------
 */
export async function GET() {
  try {
    await connectToDatabase()
    // --- REMOVED .populate() ---
    const events = await Event.find({})
      .sort({ createdAt: -1 }) 
    return NextResponse.json(events)
  } catch (error: any) {
    console.error('Failed to fetch events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events', details: error.message },
      { status: 500 }
    )
  }
}