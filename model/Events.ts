// File: models/Event.ts
import mongoose, { Schema } from "mongoose";

// --- Sub-Schemas (Unchanged) ---
const timeSlotSchema = new Schema({
    time: { 
        type: String, 
        required: true 
    }, 
    slotsAvailable: { 
        type: Number, 
        required: true, 
        min: 0 
    } 
}, { _id: false });

const upcomingDateSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    timeSlots: {
        type: [timeSlotSchema], 
        required: true
    }
}, { _id: false });


// --- Main Event Schema (Updated) ---
const eventSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    upcomingDates: {
        type: [upcomingDateSchema], 
        required: true
    },

    // --- IMAGE FIELDS ADDED BACK ---
    mainImage: {
        type: String,
        required: false // Optional: for a single cover image
    },
    images: {
        type: [String], // An array of image URLs
        required: false,
        default: []      
    }
});

// Handle model recompilation in Next.js dev environment
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;