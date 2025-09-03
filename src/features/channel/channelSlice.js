import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createChannelAPI,
  fetchChannelAPI,
  updateChannelAPI,
  deleteChannelAPI,
  toggleSubscription,
} from "./channelAPI";
import { fetchUser } from "../auth/authSlice";

/* --------------------- ASYNC THUNKS --------------------- */

// Create Channel
// - Calls API, then refreshes user data (since user may now own a channel)el
export const createChannel = createAsyncThunk(
  "channel/createChannel",
  async (formData, thunkAPI) => {
    try {
      const response = await createChannelAPI(formData);
      await thunkAPI.dispatch(fetchUser());
      return response; // Backend sends the entire channel object
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error creating channel"
      );
    }
  }
);

// Get a channel and its videos by ID
export const getChannel = createAsyncThunk(
  "channel/getChannel",
  async (id, thunkAPI) => {
    try {
      const response = await fetchChannelAPI(id);
      return {
        channel: response.channel,
        videos: response.videos || [],
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error fetching channel"
      );
    }
  }
);

// Update an existing channel
export const updateChannel = createAsyncThunk(
  "channel/updateChannel",
  async ({ id, updateData }, thunkAPI) => {
    try {
      const response = await updateChannelAPI({ id, updateData });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error updating channel"
      );
    }
  }
);

// Delete a channel
// - Also refreshes user info, since user may no longer own a channel
export const deleteChannel = createAsyncThunk(
  "channel/deleteChannel",
  async (id, thunkAPI) => {
    try {
      const response = await deleteChannelAPI(id);
      await thunkAPI.dispatch(fetchUser());
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error deleting channel"
      );
    }
  }
);

// Subscribe to a channel
// - Calls toggleSubscription, then refreshes user subscriptions
export const subscribeToChannel = createAsyncThunk(
  "channel/subscribe",
  async (channelId, { dispatch, rejectWithValue }) => {
    try {
      const data = await toggleSubscription(channelId); 
      dispatch(fetchUser()); 
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Unsubscribe from a channel
// - Uses same toggleSubscription API (acts like a switch)
export const unsubscribeFromChannel = createAsyncThunk(
  "channel/unsubscribe",
  async (channelId, { dispatch, rejectWithValue }) => {
    try {
      const data = await toggleSubscription(channelId); 
      dispatch(fetchUser()); 
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* --------------------- SLICE --------------------- */

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    currentChannel: null,
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Clear channel state (e.g., on logout or navigating away)
    clearChannelState: (state) => {
      state.currentChannel = null;
      state.videos = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Channel
      .addCase(createChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChannel = action.payload; 
      })
      .addCase(createChannel.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "Failed to create channel";
      })

      // Get Channel
      .addCase(getChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChannel = action.payload.channel;
        state.videos = action.payload.videos;
      })
      .addCase(getChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Channel
      .addCase(updateChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChannel = action.payload;
      })
      .addCase(updateChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Channel
      .addCase(deleteChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteChannel.fulfilled, (state) => {
        state.loading = false;
        state.currentChannel = null;
        state.videos = [];
      })
      .addCase(deleteChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Subscribe
      .addCase(subscribeToChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(subscribeToChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChannel = action.payload;
      })
      .addCase(subscribeToChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Unsubscribe
      .addCase(unsubscribeFromChannel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unsubscribeFromChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChannel = action.payload;
      })
      .addCase(unsubscribeFromChannel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearChannelState } = channelSlice.actions;
export default channelSlice.reducer;