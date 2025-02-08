import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const generateVideo = async (url) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate`, { url });
    return response.data.videoUrl;
  } catch (error) {
    console.error("Error generating video:", error);
    throw error;
  }
};