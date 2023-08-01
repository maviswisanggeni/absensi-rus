import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showPopup: false,
    isNavigate: false,
};

const authorizeSlice = createSlice({
    name: 'authorize',
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

export const { setShowPopup, setIsNavigate } = authorizeSlice.actions;
export default authorizeSlice.reducer;
