
import axiosInstance from "../../utils/axiosInstance";

// Create a new channel
// - Requires multipart/form-data (if uploading banner/profile images)
// - Uses Authorization header with JWT
export const createChannelAPI = async (formData) => {
  try {
    const res = await axiosInstance.post("/channels", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
    return res.data; // returns { channel }
  } catch (err) {
    console.error("Error creating channel:", err);
    throw new Error(err.response?.data?.message || "Error creating channel");
  }
};

// Fetch channel details by ID
// - Returns channel info + list of videos
export const fetchChannelAPI = async (channelId) => {
  try {
    const res = await axiosInstance.get(`/channels/${channelId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data; // { channel, videos }
  } catch (err) {
    console.error("Error fetching channel:", err);
    throw new Error(err.response?.data?.message || "Error fetching channel");
  }
};

// Update channel info
// - Accepts { id, updateData } (updateData can be JSON or form data)
export const updateChannelAPI = async ({ id, updateData }) => {
  try {
    const res = await axiosInstance.put(`/channels/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data; // Returns the updated channel data
  } catch (err) {
    console.error("Error updating channel:", err);
    throw new Error(err.response?.data?.message || "Error updating channel");
  }
};

// Delete a channel by ID
export const deleteChannelAPI = async (id) => {
  try {
    const res = await axiosInstance.delete(`/channels/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, 
      },
    });
    return res.data; 
  } catch (err) {
    console.error("Error deleting channel:", err);
    throw new Error(err.response?.data?.message || "Error deleting channel");
  }
};

// Subscribe / Unsubscribe toggle
// - If user is subscribed → unsubscribes
// - If not subscribed → subscribes
export const toggleSubscription = async (channelId) => {
  try {
    const res = await axiosInstance.post(
      `/channels/${channelId}/subscribe`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Subscription error:", err);
    throw new Error(err.response?.data?.message || "Subscription error");
  }
};
