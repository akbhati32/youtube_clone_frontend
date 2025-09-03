import axiosInstance from '../../utils/axiosInstance';

//  Add a Comment
export const addComment = async ({ videoId, text }) => {
  const res = await axiosInstance.post(`/videos/${videoId}/comments`, { text });
  return res.data;
};

// Get Comments for a Video
export const getComments = async (videoId) => {
  const res = await axiosInstance.get(`/videos/${videoId}/comments`);
  return res.data;
};

// Edit a Comment
export const editComment = async ({ commentId, text, videoId }) => {
  const res = await axiosInstance.put(`/videos/${videoId}/comments/${commentId}`, { text });
  return res.data;
};

// Delete a Comment
export const deleteComment = async ({ commentId, videoId }) => {
  const res = await axiosInstance.delete(`/videos/${videoId}/comments/${commentId}`);
  return res.data;
};