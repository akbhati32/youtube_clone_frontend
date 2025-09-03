import axiosInstance from "../../utils/axiosInstance";

/**
 * Search videos from backend by a given search term
 * @param {string} searchTerm - The text query to search videos
 * @returns {Promise<Array>} - List of matching videos from server
 */

export const searchVideosAPI = async (searchTerm) => {
  try {
    // Send GET request to /videos/search with encoded query
    const res = await axiosInstance.get(`/videos/search?query=${encodeURIComponent(searchTerm)}`);
    return res.data; // return array of videos
  } catch (err) {
    // Log error to console for debugging
    console.error("Error searching videos:", err);

    // Throw a custom error message (either from server or fallback)
    throw new Error(err.response?.data?.message || "Error searching videos");
  }
};