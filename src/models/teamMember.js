import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      en: {
        type: String,
        required: [true, "English name is required"],
        maxlength: [100, "Name must not exceed 100 characters"],
      },
      pt: {
        type: String,
        required: [true, "Portuguese name is required"],
        maxlength: [100, "Name must not exceed 100 characters"],
      },
    },
    role: {
      en: {
        type: String,
        required: [true, "English role is required"],
        maxlength: [100, "Role must not exceed 100 characters"],
      },
      pt: {
        type: String,
        required: [true, "Portuguese role is required"],
        maxlength: [100, "Role must not exceed 100 characters"],
      },
    },
    image: {
      type: String,
      required: [true, "Team member image is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search functionality
teamMemberSchema.index({ 
  "name.en": "text", 
  "name.pt": "text", 
  "role.en": "text", 
  "role.pt": "text" 
});

// Clear cached model to ensure fresh schema
if (mongoose.models.TeamMember) {
  delete mongoose.models.TeamMember;
}

// Prevent model overwrite issue
const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;