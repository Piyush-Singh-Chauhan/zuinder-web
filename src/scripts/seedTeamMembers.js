import mongoose from "mongoose";
import TeamMember from "../models/teamMember.js";

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/zuinder";
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri, {
        // Remove deprecated options
      });
      console.log("MongoDB connected successfully");
    }
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.log("Please ensure MongoDB is running and accessible.");
    console.log("You can start MongoDB with: mongod");
    return false;
  }
};

// Sample team members data
const sampleTeamMembers = [
  {
    name: {
      en: "Alex Johnson",
      pt: "Alex Johnson"
    },
    role: {
      en: "CEO & Founder",
      pt: "CEO & Fundador"
    },
    image: "/assets/images/team/alex-johnson.jpg",
    isActive: true,
    order: 1
  },
  {
    name: {
      en: "Maria Garcia",
      pt: "Maria Garcia"
    },
    role: {
      en: "CTO",
      pt: "CTO"
    },
    image: "/assets/images/team/maria-garcia.jpg",
    isActive: true,
    order: 2
  },
  {
    name: {
      en: "David Smith",
      pt: "David Smith"
    },
    role: {
      en: "Lead Developer",
      pt: "Desenvolvedor Principal"
    },
    image: "/assets/images/team/david-smith.jpg",
    isActive: true,
    order: 3
  },
  {
    name: {
      en: "Sarah Williams",
      pt: "Sarah Williams"
    },
    role: {
      en: "UX Designer",
      pt: "Designer UX"
    },
    image: "/assets/images/team/sarah-williams.jpg",
    isActive: true,
    order: 4
  },
  {
    name: {
      en: "Michael Brown",
      pt: "Michael Brown"
    },
    role: {
      en: "Marketing Director",
      pt: "Diretor de Marketing"
    },
    image: "/assets/images/team/michael-brown.jpg",
    isActive: true,
    order: 5
  }
];

const seedTeamMembers = async () => {
  console.log("Starting team members seeding...");
  
  // Try to connect to database
  const isConnected = await connectDB();
  if (!isConnected) {
    console.log("Skipping seeding due to database connection failure.");
    process.exit(1);
  }
  
  try {
    // Check if there are existing team members
    const existingCount = await TeamMember.countDocuments();
    if (existingCount > 0) {
      console.log(`Database already contains ${existingCount} team members.`);
      console.log("Use 'npm run migrate:team' to migrate from translation files or manually clear the collection first.");
      mongoose.connection.close();
      console.log("Database connection closed");
      return;
    }
    
    // Insert sample team members
    const result = await TeamMember.insertMany(sampleTeamMembers);
    console.log(`${result.length} sample team members inserted successfully`);
    
    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding team members:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seed function
seedTeamMembers();