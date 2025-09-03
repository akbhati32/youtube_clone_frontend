import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  uploadVideoAPI,
  fetchAllVideosAPI,
  fetchMyVideosAPI,
  updateVideoAPI,
  deleteVideoAPI,
  fetchVideoByIdAPI,
  likeVideoAPI,
  dislikeVideoAPI,
  incrementViewCount,
} from "./videoAPI";

/* -------------------- ASYNC THUNKS -------------------- */

// Fetch single video by ID
export const getVideoById = createAsyncThunk(
  "videos/getVideoById",
  async (id, thunkAPI) => {
    try {
      const res = await fetchVideoByIdAPI(id);
      return res.video;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Upload a new video
export const uploadVideo = createAsyncThunk(
  "videos/uploadVideo",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await uploadVideoAPI(formData);
      return response;
    } catch (error) {
      console.error("Error in uploadVideo thunk:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Fetch all videos
export const fetchAllVideos = createAsyncThunk(
  "videos/fetchAllVideos",
  async (_, thunkAPI) => {
    try {
      const res = await fetchAllVideosAPI();
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Fetch logged-in user's videos
export const fetchMyVideos = createAsyncThunk(
  "videos/fetchMyVideos",
  async (_, thunkAPI) => {
    try {
      const res = await fetchMyVideosAPI();
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Update a video (title, description, etc.)
export const updateVideo = createAsyncThunk(
  "videos/updateVideo",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await updateVideoAPI({ id, formData });
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Delete a video by ID
export const deleteVideo = createAsyncThunk(
  "videos/deleteVideo",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await deleteVideoAPI(videoId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Like a video
export const likeVideo = createAsyncThunk(
  "videos/likeVideo",
  async (videoId, { rejectWithValue }) => {
    try {
      const res = await likeVideoAPI(videoId);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Dislike a video
export const dislikeVideo = createAsyncThunk(
  "videos/dislikeVideo",
  async (videoId, { rejectWithValue }) => {
    try {
      const res = await dislikeVideoAPI(videoId);
      return res;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Increase view count
export const increaseViewCount = createAsyncThunk(
  "videos/increaseViewCount",
  async (videoId, thunkAPI) => {
    try {
      const response = await incrementViewCount(videoId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to increase view count"
      );
    }
  }
);

/* -------------------- SLICE -------------------- */

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    myVideos: [],
    selectedVideo: null,
    uploading: false,
    videoFetching: false,
    videoUpdating: false,
    loading: false, 
    error: null,
    uploadedVideo: null,
  
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Upload video
      .addCase(uploadVideo.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploadedVideo = action.payload.video;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      })

      // Fetch all videos
      .addCase(fetchAllVideos.pending, (state) => {
        state.videoFetching = true;
        state.error = null;
      })
      .addCase(fetchAllVideos.fulfilled, (state, action) => {
        state.videoFetching = false;
        state.videos = action.payload;
      })
      .addCase(fetchAllVideos.rejected, (state, action) => {
        state.videoFetching = false;
        state.error = action.payload;
      })

      // Fetch user's videos
      .addCase(fetchMyVideos.pending, (state) => {
        state.videoFetching = true;
        state.error = null;
      })
      .addCase(fetchMyVideos.fulfilled, (state, action) => {
        state.videoFetching = false;
        state.myVideos = action.payload;
      })
      .addCase(fetchMyVideos.rejected, (state, action) => {
        state.videoFetching = false;
        state.error = action.payload;
      })

      // Update video
      .addCase(updateVideo.pending, (state) => {
        state.videoUpdating = true;
        state.error = null;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.videoUpdating = false;
        const updated = action.payload;

        // Update inside myVideos
        const index = state.myVideos.findIndex((v) => v._id === updated._id);
        if (index !== -1) state.myVideos[index] = updated;

        // Update inside all videos
        const allIndex = state.videos.findIndex((v) => v._id === updated._id);
        if (allIndex !== -1) state.videos[allIndex] = updated;

        // Update if it's the currently selected video
        if (state.selectedVideo && state.selectedVideo._id === updated._id) {
          state.selectedVideo = updated;
        }
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.videoUpdating = false;
        state.error = action.payload;
      })

      // Delete video
      .addCase(deleteVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVideo.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload.videoId;
        // Remove from both arrays
        state.videos = state.videos.filter((v) => v._id !== deletedId);
        state.myVideos = state.myVideos.filter((v) => v._id !== deletedId);
      })
      .addCase(deleteVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get video by ID
      .addCase(getVideoById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedVideo = null;
      })
      .addCase(getVideoById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedVideo = action.payload;
      })
      .addCase(getVideoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Like / Dislike Video
      .addCase(likeVideo.fulfilled, (state, action) => {
        const updatedVideo = action.payload;
        if (
          state.selectedVideo &&
          state.selectedVideo._id === updatedVideo._id
        ) {
          state.selectedVideo = updatedVideo;
        }
      })
      .addCase(dislikeVideo.fulfilled, (state, action) => {
        const updatedVideo = action.payload;
        if (
          state.selectedVideo &&
          state.selectedVideo._id === updatedVideo._id
        ) {
          state.selectedVideo = updatedVideo;
        }
      })

      // Increase View Count
      .addCase(increaseViewCount.fulfilled, (state, action) => {
        if (
          state.selectedVideo &&
          state.selectedVideo._id === action.payload._id
        ) {
          // Update only the views field
          state.selectedVideo.views = action.payload.views;
        }
      })
      .addCase(increaseViewCount.rejected, (state, action) => {
        console.error("Failed to increase view count:", action.payload);
      });

  },
});

export default videoSlice.reducer;