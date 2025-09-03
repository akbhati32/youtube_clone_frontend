import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchVideosAPI } from "./searchAPI";

/**
 * Async thunk to search videos by a search term
 * Dispatches pending → fulfilled/rejected depending on API result
 */
export const searchVideos = createAsyncThunk(
  "videos/searchVideos",
  async (searchTerm, thunkAPI) => {
    try {
      const res = await searchVideosAPI(searchTerm);
      return res;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/* -------------------- SLICE -------------------- */

const searchSlice = createSlice({
  name: "search",
  initialState: {
    term: "",
    searchLoading: false,
    searchResults: [],
    searchError: null,
  },

  // Reducers for synchronous actions
  reducers: {
    // Save user’s search term
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    },

    // Clear search term, results, and error
    clearSearchTerm: (state) => {
      state.term = "";
      state.searchResults = [];
      state.searchError = null;
    },
  },

  // Handle async states from searchVideos thunk
  extraReducers: (builder) => {
    builder
      // While search is in progress
      .addCase(searchVideos.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
        state.searchResults = [];
      })
      // When search succeeds
      .addCase(searchVideos.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      // When search fails
      .addCase(searchVideos.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      });
  },
});

export const { setSearchTerm, clearSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;