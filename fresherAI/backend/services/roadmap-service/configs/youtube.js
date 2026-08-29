import dotenv from "dotenv";
dotenv.config();

import axios from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const searchVideo = async (topic) => {
  try {
    // Check YouTube API key
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey) {
      console.error("❌ YOUTUBE_API_KEY is missing in .env");
      return null;
    }

    // 1. Search Virtual Code first
    let query = `Virtual Code ${topic}`;

    let { data } = await axios.get(BASE_URL, {
      params: {
        key: apiKey,
        part: "snippet",
        q: query,
        maxResults: 1,
        type: "video",
      },
    });

    // If Virtual Code has a result
    if (data.items && data.items.length > 0) {
      const video = data.items[0];

      if (
        video.snippet?.channelTitle
          ?.toLowerCase()
          .includes("virtual code")
      ) {
        return {
          title: video.snippet.title,
          channel: video.snippet.channelTitle,
          url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        };
      }
    }

    // 2. General YouTube search
    query = `${topic} tutorial`;

    ({ data } = await axios.get(BASE_URL, {
      params: {
        key: apiKey,
        part: "snippet",
        q: query,
        maxResults: 1,
        type: "video",
      },
    }));

    if (data.items && data.items.length > 0) {
      const video = data.items[0];

      return {
        title: video.snippet.title,
        channel: video.snippet.channelTitle,
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
      };
    }

    return null;

  } catch (error) {
    console.error("❌ YouTube API Error");

    console.error("Status:", error.response?.status);

    console.error(
      "Response:",
      error.response?.data || error.message
    );

    return null;
  }
};

export default searchVideo;