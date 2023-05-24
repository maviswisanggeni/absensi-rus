import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

export const getStatistik = createAsyncThunk("dashboard/statistik", async () => {
    const response = await axios.get(
        getBaseUrl() + 'dashboard/statistik',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
    return response.data
})

const statistikSlice = createSlice({
    name: 'statistik',
    initialState: {
        statistikData: [],
        loading: false,
    },
    extraReducers: {
        [getStatistik.pending]: (state) => {
            state.loading = false
        },
        [getStatistik.fulfilled]: (state, action) => {
            state.loading = true
            state.statistikData = action.payload.data
        }
    }
})

export default statistikSlice.reducer