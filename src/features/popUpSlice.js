// popupSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showPopup: false,
    isNavigate: false,
};

const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setShowPopup: (state, action) => {
            state.showPopup = action.payload;
        },
        setIsNavigate: (state, action) => {
            state.isNavigate = action.payload;
        }
    },
});

export const { setShowPopup, setIsNavigate } = popupSlice.actions;
export default popupSlice.reducer;
