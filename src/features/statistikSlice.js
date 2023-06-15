import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

export const getStatistik = createAsyncThunk("dashboard/statistik", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl() + 'dashboard/statistik',
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
        }

        return rejectWithValue(error.code)
    }
})

const statistikSlice = createSlice({
    name: 'statistik',
    initialState: {
        statistikData: [],
        loading: false,

        statusResApi: '',
        messageResApi: '',
        isDisplayMessage: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStatistik.pending, (state) => {
                state.loading = false;
            })
            .addCase(getStatistik.fulfilled, (state, action) => {
                state.loading = true;
                state.statistikData = action.payload.data;
            })
            .addCase(getStatistik.rejected, (state, action) => {
                state.loading = true;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })
    }
})

export default statistikSlice.reducer