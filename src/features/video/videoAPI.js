import axiosInstance from "../../utils/axiosInstance";

// Upload a video
export const uploadVideoAPI = async (formData) => {
  try {
    const res = await axiosInstance.post("/videos/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data; 
  } catch (err) {
    console.error("Error uploading video:", err);
    throw new Error(err.response?.data?.message || "Error uploading video");
  }
};

// Get all videos
export const fetchAllVideosAPI = async () => {
  try {
    const res = await axiosInstance.get("/videos");
    return res.data;
  } catch (err) {
    console.error("Error fetching all videos:", err);
    throw new Error(err.response?.data?.message || "Error fetching videos");
  }
};

// Get videos of the logged-in user
export const fetchMyVideosAPI = async () => {
  try {
    const res = await axiosInstance.get("/videos/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching my videos:", err);
    throw new Error(err.response?.data?.message || "Error fetching my videos");
  }
};

// Update a video
export const updateVideoAPI = async ({ id, formData }) => {
  try {
    const res = await axiosInstance.put(`/videos/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data; 
  } catch (err) {
    console.error("Error updating video:", err);
    throw new Error(err.response?.data?.message || "Error updating video");
  }
};

// Delete a video
export const deleteVideoAPI = async (id) => {
  try {
    const res = await axiosInstance.delete(`/videos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data; 
  } catch (err) {
    console.error("Error deleting video:", err);
    throw new Error(err.response?.data?.message || "Error deleting video");
  }
};

// Fetch video by ID
export const fetchVideoByIdAPI = async (id) => {
  try {
    const res = await axiosInstance.get(`/videos/${id}`);
    return res.data; 
  } catch (err) {
    console.error("Error fetching video by ID:", err);
    throw new Error(err.response?.data?.message || "Error fetching video");
  }
};

// Like a video
export const likeVideoAPI = async (videoId) => {
  try {
    const res = await axiosInstance.post(`/videos/${videoId}/like`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error liking video:", err);
    throw err;
  }
};

// Dislike a video
export const dislikeVideoAPI = async (videoId) => {
  try {
    const res = await axiosInstance.post(`/videos/${videoId}/dislike`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error disliking video:", err);
    throw err;
  }
};

// Increase view count
export const incrementViewCount = async (videoId) => {
  const res = await axiosInstance.patch(`/videos/${videoId}/views`);
  return res.data;
};


