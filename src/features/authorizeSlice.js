import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import token from '../utils/tokenAuthorization';
import getBaseUrl from '../utils/apiUrl';
import axios from 'axios';

const initialState = {
    showPopup: false,
    isNavigate: false,
};

export const getAuthorize = createAsyncThunk("authorize", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + '/api/dashboard/statistik',
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
                timeout: 20000
            }
        )
        return response.data

    } catch (error) {
        if (axios.isCancel(error)) {
            throw new Error('Request canceled');
        }

        if (error.code === 'ECONNABORTED') {
            return rejectWithValue('Request timeout');
        } else if (error.response.data.admin === false) {
            return rejectWithValue('Permission denied');
        }

        return rejectWithValue(error.message)
    }
})

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
