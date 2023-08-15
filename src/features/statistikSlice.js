import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../utils/apiUrl";
import token from "../utils/tokenAuthorization";

export const getStatistik = createAsyncThunk("dashboard/statistik", async (_, { rejectWithValue }) => {
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

const statistikSlice = createSlice({
    name: 'statistik',
    initialState: {
        statistikData: [],
        kategori: 'Minggu',
        loading: true,

        statusResApi: '',
        messageResApi: '',
        isDisplayMessage: false,
    },
    reducers: {
        setKategoriStatistik: (state, action) => {
            state.kategori = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStatistik.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStatistik.fulfilled, (state, action) => {
                state.loading = false;
                state.statistikData = action.payload.data;
            })
            .addCase(getStatistik.rejected, (state, action) => {
                state.loading = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })
    }
})

export const { setKategoriStatistik } = statistikSlice.actions
export default statistikSlice.reducer