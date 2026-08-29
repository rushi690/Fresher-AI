import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true,
    },

    extractedText: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    summary: {
      type: String,
      default: "",
    },

    name: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    // ✅ Education is an array of objects
    education: [
      {
        degree: {
          type: String,
          default: "",
        },
        field: {
          type: String,
          default: "",
        },
        institution: {
          type: String,
          default: "",
        },
        period: {
          type: String,
          default: "",
        },
        year: {
          type: String,
          default: "",
        },
      },
    ],

    // Skills remain strings
    skills: {
      type: [String],
      default: [],
    },

    // ✅ Projects are objects
    projects: [
      {
        name: {
          type: String,
          default: "",
        },
        technologies: {
          type: [String],
          default: [],
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],

    // ✅ Experience is objects
    experience: [
      {
        title: {
          type: String,
          default: "",
        },
        company: {
          type: String,
          default: "",
        },
        period: {
          type: String,
          default: "",
        },
        duration: {
          type: String,
          default: "",
        },
        responsibilities: {
          type: [String],
          default: [],
        },
      },
    ],

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    suggestedRole: {
      type: String,
      default: "",
    },

    recommendations: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;