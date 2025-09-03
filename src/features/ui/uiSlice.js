import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSidebarOpen: true
};

/* -------------------- UI SLICE -------------------- */

const uiSlice = createSlice({
    name: "ui",
    initialState,

    // Reducers = synchronous actions that update state
    reducers: {
        // Toggle sidebar (open → close or close → open)
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },

        // Force sidebar to open
        openSidebar: (state) => {
            state.isSidebarOpen = true;
        },

        // Force sidebar to close
        closeSidebar: (state) => {
            state.isSidebarOpen = false;
        }
    }

});

export const {toggleSidebar, openSidebar, closeSidebar} = uiSlice.actions;
export default uiSlice.reducer;