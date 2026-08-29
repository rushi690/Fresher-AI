export const getRoadmapById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers["x-user-id"];

        // Validate MongoDB ObjectId before querying
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid roadmap ID"
            });
        }

        const cacheKey = `roadmap:${id}`;

        // Check Redis cache
        const cachedRoadmap = await redis.get(cacheKey);

        if (cachedRoadmap) {
            return res.status(200).json({
                success: true,
                fromCache: true,
                data: JSON.parse(cachedRoadmap)
            });
        }

        // Find roadmap
        const roadmap = await Roadmap.findOne({
            _id: id,
            userId: userId
        });

        if (!roadmap) {
            return res.status(404).json({
                success: false,
                message: "Roadmap not found"
            });
        }

        // Store in Redis
        await redis.set(
            cacheKey,
            JSON.stringify(roadmap),
            "EX",
            60 * 60
        );

        return res.status(200).json({
            success: true,
            fromCache: false,
            data: roadmap
        });

    } catch (error) {
        console.error("Get roadmap error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};