import { configureStore } from "@reduxjs/toolkit";
// Import all feature slices (reducers) for different parts of the app
import authReducer from "./features/auth/authSlice";
import channelReducer from "./features/channel/channelSlice";
import videoReducer from "./features/video/videoSlice";
import commentReducer from "./features/comments/commentSlice";
import searchReducer from "./features/search/searchSlice";
import uiReducer from "./features/ui/uiSlice";

// Configure and create the Redux store
export default configureStore({
  reducer: {
     // Handles authentication state (login, register, user info, token, etc.)
    auth: authReducer,
    // Manages channel-related state (create channel, fetch channel info, etc.)
    channel: channelReducer,
    // Manages video-related state (upload, edit, fetch videos, etc.)
    videos: videoReducer,
    // Handles comments on videos (fetch, create, update, delete comments)
    comments: commentReducer,
    // Stores search results and search-related state
    search: searchReducer,
    // Controls UI state (sidebar toggle, theme, etc.)
    ui: uiReducer,
  },
});
