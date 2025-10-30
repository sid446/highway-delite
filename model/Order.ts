import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
    
    // --- What was booked ---
    event: { // This is the "Experience"
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    
    // --- When it was booked for ---
    selectedDate: { // The "date" the user chose
        type: Date,
        required: true
    },
    selectedTime: { // The "time" the user chose
        type: String,
        required: true
    },
    quantity: { // The "quantity" of slots
        type: Number,
        required: true,
        min: 1
    },

    // --- Who booked it ---
    customerName: { // The user's "name"
        type: String,
        required: true
    },
    customerEmail: { // The user's "EMAIL"
        type: String,
        required: true
    }

}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const Order = mongoose.model("Order", orderSchema);
export default Order;