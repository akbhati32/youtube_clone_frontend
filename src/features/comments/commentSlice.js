import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./commentAPI";

/* -------------------- ASYNC THUNKS -------------------- */

// Fetch comments for a specific video
export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (videoId) => await api.getComments(videoId)
);

// Create a new comment for a video
export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({ videoId, text }) => await api.addComment({ videoId, text })
);

// Update an existing comment
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ commentId, text, videoId }) => await api.editComment({ commentId, text, videoId })
);

// Remove a comment by ID
export const removeComment = createAsyncThunk(
  "comments/removeComment",
  async ({ commentId, videoId }) => {
    await api.deleteComment({ commentId, videoId });
    return commentId;
  }
);

/* -------------------- SLICE -------------------- */

const commentSlice = createSlice({
  name: "comments",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload;   // Replace with fetched comments
        state.loading = false;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.error = action.error.message;   // Save error message
        state.loading = false;
      })

       // Add new comment
      .addCase(createComment.fulfilled, (state, action) => {
        state.items.unshift(action.payload.comment);
      })

      // Update comment
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.items.findIndex(c => c._id === action.payload.comment._id);
        if (index !== -1) state.items[index] = action.payload.comment;  // Replace old comment with updated one
      })

      // Remove comment
      .addCase(removeComment.fulfilled, (state, action) => {
        state.items = state.items.filter(c => c._id !== action.payload);
      });
  },
});

export default commentSlice.reducer;