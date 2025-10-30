// File: scripts/seedData.ts
import mongoose from "mongoose";

// --- Data Interfaces ---

export interface ISeedEvent {
  title: string;
  description: string;
  location: string;
  price: number;
  mainImage: string; // Added
  images: string[]; // Added
  upcomingDates: {
    date: Date;
    timeSlots: {
      time: string;
      slotsAvailable: number;
    }[];
  }[];
}

// --- Seed Data ---

// Placeholder ID for the 'createdBy' field
export const placeholderUserId = new mongoose.Types.ObjectId("60c72b2f9b1e8b001c8e4d3a");

export const eventsData: ISeedEvent[] = [
  // --- 1. Kayaking Adventure (Updated to 4 Dates) ---
  {
    title: "Kayaking Adventure",
    description: "Experience the thrill of kayaking in beautiful waters. All skill levels welcome!",
    location: "Karnataka",
    price: 999,
    mainImage: "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720057/kyak1_yvwysy.jpg",
    images: [
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720067/kayak2_hfi30c.jpg",
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720075/kayak3_u7nzou.jpg",
    ],
    upcomingDates: [
      {
        date: new Date("2026-07-15T09:00:00Z"),
        timeSlots: [
          { time: "10:00 AM", slotsAvailable: 5 },
          { time: "2:00 PM", slotsAvailable: 10 },
        ],
      },
      {
        date: new Date("2026-07-16T09:00:00Z"),
        timeSlots: [
          { time: "10:00 AM", slotsAvailable: 8 },
          { time: "2:00 PM", slotsAvailable: 12 },
        ],
      },
      {
        date: new Date("2026-07-22T09:00:00Z"),
        timeSlots: [
          { time: "10:00 AM", slotsAvailable: 6 },
          { time: "2:00 PM", slotsAvailable: 10 },
        ],
      },
      {
        date: new Date("2026-07-23T09:00:00Z"),
        timeSlots: [
          { time: "10:00 AM", slotsAvailable: 10 },
          { time: "2:00 PM", slotsAvailable: 15 },
        ],
      },
    ],
  },

  // --- 2. White Spiral Stairs Under the Blue Sky (Updated to 4 Dates) ---
  {
    title: "White Spiral Stairs Under the Blue Sky",
    description: "Bungee jumping from the top of a spiral stairway. An experience like no other!",
    location: "Netherlands",
    price: 1299,
    mainImage: "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720277/pexels-esma-yildiz-774891768-19988371_iwcspu.jpg",
    images: [
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720284/pexels-jaralol-18253217_lls27b.jpg",
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720288/pexels-marton-novak-81427533-13393808_obw0gs.jpg",
    ],
    upcomingDates: [
      {
        date: new Date("2026-08-01T10:00:00Z"),
        timeSlots: [
          { time: "11:00 AM - 1:00 PM", slotsAvailable: 10 },
          { time: "2:00 PM - 4:00 PM", slotsAvailable: 4 },
        ],
      },
      {
        date: new Date("2026-08-08T10:00:00Z"),
        timeSlots: [
          { time: "11:00 AM - 1:00 PM", slotsAvailable: 8 },
          { time: "2:00 PM - 4:00 PM", slotsAvailable: 5 },
        ],
      },
      {
        date: new Date("2026-08-15T10:00:00Z"),
        timeSlots: [
          { time: "11:00 AM - 1:00 PM", slotsAvailable: 12 },
          { time: "2:00 PM - 4:00 PM", slotsAvailable: 6 },
        ],
      },
      {
        date: new Date("2026-08-22T10:00:00Z"),
        timeSlots: [
          { time: "11:00 AM - 1:00 PM", slotsAvailable: 9 },
          { time: "2:00 PM - 4:00 PM", slotsAvailable: 4 },
        ],
      },
    ],
  },

  // --- 3. Himalayan Mountain Trek (Updated to 6 Dates) ---
  {
    title: "Himalayan Mountain Trek",
    description: "A breathtaking 5-day trek through the Garhwal Himalayas. Moderate difficulty, unparalleled views.",
    location: "Uttarakhand",
    price: 8999,
    mainImage: "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720573/pexels-susan-pandey-2151395285-31651196_xvoadt.jpg",
    images: [
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720572/pexels-pooja-savvashe-36746626-29167628_vlocg8.jpg",
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720574/pexels-pankaj-gosai-878171-34363682_d1agph.jpg",
    ],
    upcomingDates: [
      {
        date: new Date("2026-09-10T06:00:00Z"),
        timeSlots: [{ time: "7:00 AM (Batch 1)", slotsAvailable: 15 }],
      },
      {
        date: new Date("2026-09-17T06:00:00Z"),
        timeSlots: [{ time: "7:00 AM (Batch 2)", slotsAvailable: 15 }],
      },
      {
        date: new Date("2026-09-24T06:00:00Z"),
        timeSlots: [{ time: "7:00 AM (Batch 3)", slotsAvailable: 10 }],
      },
      {
        date: new Date("2026-10-01T06:00:00Z"),
        timeSlots: [{ time: "7:00 AM (Batch 4)", slotsAvailable: 12 }],
      },
      {
        date: new Date("2026-10-08T06:00:00Z"),
        timeSlots: [{ time: "7:00 AM (Batch 5)", slotsAvailable: 15 }],
      },
      {
        date: new Date("2026-10-15T06:00:00Z"),
        timeSlots: [{ time: "7:00 AM (Batch 6)", slotsAvailable: 8 }],
      },
    ],
  },

  // --- 4. Andaman Scuba Diving (Updated to 4 Dates) ---
  {
    title: "Andaman Scuba Diving",
    description: "Explore the vibrant coral reefs and marine life of the Andaman Islands. PADI certification course available.",
    location: "Havelock Island, Andaman",
    price: 5500,
    mainImage: "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720663/pexels-pspov-3046582_ngeznd.jpg",
    images: [
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720661/pexels-pixabay-68767_jnksou.jpg",
      "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720660/pexels-carlos-jamaica-173742194-11061272_reocxo.jpg",
    ],
    upcomingDates: [
      {
        date: new Date("2026-11-20T08:00:00Z"),
        timeSlots: [
          { time: "9:00 AM", slotsAvailable: 8 },
          { time: "1:00 PM", slotsAvailable: 8 },
        ],
      },
      {
        date: new Date("2026-11-21T08:00:00Z"),
        timeSlots: [
          { time: "9:00 AM", slotsAvailable: 10 },
          { time: "1:00 PM", slotsAvailable: 7 },
        ],
      },
      {
        date: new Date("2026-11-27T08:00:00Z"),
        timeSlots: [
          { time: "9:00 AM", slotsAvailable: 6 },
          { time: "1:00 PM", slotsAvailable: 10 },
        ],
      },
      {
        date: new Date("2026-11-28T08:00:00Z"),
        timeSlots: [
          { time: "9:00 AM", slotsAvailable: 9 },
          { time: "1:00 PM", slotsAvailable: 9 },
        ],
      },
    ],
  },

  // --- 5. Rishikesh River Zipline (Updated to 5 Dates) ---
    {
        title: "Rishikesh River Zipline",
        description: "Soar across the Ganges river on one of India's longest ziplines. A quick thrill for all ages!",
        location: "Rishikesh, Uttarakhand",
        price: 1500,
        mainImage: "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720757/pexels-walther-camasca-16869332-6422046_lwegb1.jpg",
        images: [
        "https://res.cloudinary.com/db2qa9dzs/image/upload/v1761720755/pexels-photoin-9339288_sgdh5z.jpg",
        ],
        upcomingDates: [
        {
            date: new Date("2026-10-05T10:00:00Z"),
            timeSlots: [
            { time: "11:00 AM", slotsAvailable: 20 },
            { time: "12:00 PM", slotsAvailable: 20 },
            { time: "2:00 PM", slotsAvailable: 20 },
            { time: "3:00 PM", slotsAvailable: 20 },
            ],
        },
        {
            date: new Date("2026-10-06T10:00:00Z"),
            timeSlots: [
            { time: "11:00 AM", slotsAvailable: 15 },
            { time: "2:00 PM", slotsAvailable: 15 },
            ],
        },
        {
            date: new Date("2026-10-12T10:00:00Z"),
            timeSlots: [
            { time: "11:00 AM", slotsAvailable: 25 },
            { time: "2:00 PM", slotsAvailable: 25 },
            ],
        },
        {
            date: new Date("2026-10-13T10:00:00Z"),
            timeSlots: [
            { time: "11:00 AM", slotsAvailable: 18 },
            { time: "2:00 PM", slotsAvailable: 18 },
            ],
        },
        {
            date: new Date("2026-10-19T10:00:00Z"),
            timeSlots: [
            { time: "11:00 AM", slotsAvailable: 20 },
            { time: "2:00 PM", slotsAvailable: 20 },
            ],
        },
        ],
    },
];