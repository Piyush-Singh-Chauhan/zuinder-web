import mongoose from "mongoose";
import TeamMember from "../models/teamMember.js";
import enTranslations from "../i18n/translations/en.json" with { type: "json" };
import ptTranslations from "../i18n/translations/pt.json" with { type: "json" };

// Connect to MongoDB
const connectDB = async () => {
  try {
    // Try to get MongoDB URI from environment or use default
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/zuinder";
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri);
      console.log("MongoDB connected successfully");
    }
    return true;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.log("\nPlease ensure MongoDB is running and accessible.");
    console.log("You can start MongoDB with: mongod");
    console.log("Or check your MONGODB_URI environment variable.");
    return false;
  }
};

// Get team member names and roles from English translations
const getTeamMemberData = () => {
  const enTeamMembers = enTranslations.teamMembers || [];
  const ptTeamMembers = ptTranslations.teamMembers || [];
  
  return enTeamMembers.map((member, index) => {
    const ptMember = ptTeamMembers[index] || {};
    
    return {
      name: {
        en: member.name || "",
        pt: ptMember.name || member.name || ""
      },
      role: {
        en: member.role || "",
        pt: ptMember.role || member.role || ""
      },
      image: member.image || "",
      isActive: true,
      order: index + 1
    };
  });
};

const migrateTeamMembers = async () => {
  console.log("Starting team members migration from translation files...");
  
  // Try to connect to database
  const isConnected = await connectDB();
  if (!isConnected) {
    console.log("Skipping migration due to database connection failure.");
    process.exit(1);
  }
  
  try {
    // Get team member data from translations
    const teamMembersData = getTeamMemberData();
    console.log(`Found ${teamMembersData.length} team members in translation files.`);
    
    // Check if there are existing team members
    const existingCount = await TeamMember.countDocuments();
    if (existingCount > 0) {
      console.log(`\nDatabase already contains ${existingCount} team members.`);
      console.log("Migration skipped to prevent data duplication.");
      console.log("If you want to re-migrate, please clear the teammembers collection first.");
      mongoose.connection.close();
      console.log("Database connection closed");
      return;
    }
    
    // Insert team members from translations
    if (teamMembersData.length > 0) {
      const result = await TeamMember.insertMany(teamMembersData);
      console.log(`\n${result.length} team members migrated successfully!`);
      console.log("Migration completed.");
    } else {
      console.log("No team members found in translations");
    }
    
    mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error migrating team members:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run the migration function
migrateTeamMembers();