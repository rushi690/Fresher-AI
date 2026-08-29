import mongoose from "mongoose";
import redis from "../../../shared/redis/redis.js";
import graph from "../graph/roadmap.graph.js";
import Roadmap from "../model/roadmap.model.js";


// ======================================================
// GENERATE ROADMAP
// POST /roadmap/generate
// ======================================================
export const generateRoadmap = async (req, res) => {
  try {
    const {
      role,
      targetPackage,
      useResume = false,
      resume,
    } = req.body;

    const userId = req.headers["x-user-id"];

    // Validate user
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Validate required fields
    if (!role || !targetPackage) {
      return res.status(400).json({
        success: false,
        message: "Role and Target Package are required.",
      });
    }

    // Validate resume
    if (useResume && !resume) {
      return res.status(400).json({
        success: false,
        message: "Resume data is required.",
      });
    }

    // Generate roadmap using AI graph
    const result = await graph.invoke({
      role,
      targetPackage,
      useResume,
      resume,
    });

    // Check AI result
    if (!result || !result.roadmap) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate roadmap.",
      });
    }

    // Save roadmap
    const roadmap = await Roadmap.create({
      userId,
      ...result.roadmap,
    });

    // Cache individual roadmap
    await redis.set(
      `roadmap:${roadmap._id}`,
      JSON.stringify(roadmap),
      "EX",
      60 * 60
    );

    // Clear user's roadmap history cache
    await redis.del(`userRoadmaps:${userId}`);

    return res.status(201).json({
      success: true,
      message: "Roadmap generated successfully.",
      data: roadmap,
    });

  } catch (error) {
    console.error("Generate roadmap error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// GET ALL ROADMAPS
// GET /roadmap
// ======================================================
export const getAllRoadmaps = async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];

    // Validate user
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID is required.",
      });
    }

    const cacheKey = `userRoadmaps:${userId}`;

    // Check Redis cache
    const cache = await redis.get(cacheKey);

    if (cache) {
      return res.json({
        success: true,
        fromCache: true,
        data: JSON.parse(cache),
      });
    }

    // Get roadmaps from MongoDB
    const roadmaps = await Roadmap.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    // Save result in Redis
    await redis.set(
      cacheKey,
      JSON.stringify(roadmaps),
      "EX",
      60 * 60
    );

    return res.json({
      success: true,
      fromCache: false,
      data: roadmaps,
    });

  } catch (error) {
    console.error("Get all roadmaps error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ======================================================
// GET ROADMAP BY ID
// GET /roadmap/:id
// ======================================================
export const getRoadmapById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers["x-user-id"];

    // Validate user
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // ⭐ IMPORTANT FIX
    // Prevent "generate" or any other string
    // from being passed to MongoDB as ObjectId.
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid roadmap ID.",
      });
    }

    const cacheKey = `roadmap:${id}`;

    // Check Redis cache
    const cache = await redis.get(cacheKey);

    if (cache) {
      const cachedRoadmap = JSON.parse(cache);

      // Security check:
      // Make sure cached roadmap belongs to current user
      if (String(cachedRoadmap.userId) === String(userId)) {
        return res.json({
          success: true,
          fromCache: true,
          data: cachedRoadmap,
        });
      }
    }

    // Find roadmap in MongoDB
    const roadmap = await Roadmap.findOne({
      _id: id,
      userId: userId,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found.",
      });
    }

    // Save roadmap in Redis
    await redis.set(
      cacheKey,
      JSON.stringify(roadmap),
      "EX",
      60 * 60
    );

    return res.json({
      success: true,
      fromCache: false,
      data: roadmap,
    });

  } catch (error) {
    console.error("Get roadmap by ID error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};