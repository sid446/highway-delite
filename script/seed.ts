// File: scripts/seed.ts
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/model/Events";
import Order from "@/model/Order";
import { eventsData, placeholderUserId } from "./seedData";

async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log("Connected to database...");

    // --- 1. Clear Existing Data ---
    console.log("Clearing old data...");
    await Event.deleteMany({});
    await Order.deleteMany({});

    // --- 2. Create Events ---
    console.log("Creating events...");
    
    const eventsToCreate = eventsData.map((event) => {
      return {
        ...event, // This now automatically includes mainImage and images
        createdBy: placeholderUserId, 
      };
    });

    const createdEvents = await Event.insertMany(eventsToCreate);
    console.log(`Created ${createdEvents.length} events.`);

    console.log("✅ Database seeding completed successfully!");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1); 
  } finally {
    // --- 3. Disconnect ---
    await mongoose.connection.close();
    console.log("Disconnected from database.");
  }
}

// Run the seeder
seedDatabase();