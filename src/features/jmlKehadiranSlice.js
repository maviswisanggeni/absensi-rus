import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";
import formatDate from "../components/useFormatCalendar";

export const getJmlKehadiranDashboard = createAsyncThunk("dashboard/jmlKehadiran", async (tanggal) => {
    const response = await axios.get(
        getBaseUrl() + 'dashboard',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: { tanggal: formatDate(new Date()) }
        }
    )
    return response.data
})

export const getJmlKehadiranKehadiran = createAsyncThunk("kehadiran/jmlKehadiran", async (tanggal) => {
    const response = await axios.get(
        getBaseUrl() + 'kehadiran/jml-kehadiran',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: { tanggal: tanggal }
        }
    )
    return response.data
})

const jmlKehadiranSlice = createSlice({
    name: 'jmlKehadiran',
    initialState: {
        jmlKehadiran: {},
        tanggal: formatDate(new Date()),
        loading: false,
    },
    reducers: {
        setJmlKehadiran: (state, action) => {
            state.jmlKehadiran = action.payload
        },
        updateStateValue: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
    },
    extraReducers: {
        [getJmlKehadiranDashboard.pending]: (state) => {
            state.loading = false
        },
        [getJmlKehadiranDashboard.fulfilled]: (state, action) => {
            state.loading = true
            state.jmlKehadiran = action.payload.data
        },
        [getJmlKehadiranDashboard.rejected]: (state, action) => {
            state.loading = false
        },
        [getJmlKehadiranKehadiran.pending]: (state) => {
            state.loading = false
        },
        [getJmlKehadiranKehadiran.fulfilled]: (state, action) => {
            state.loading = true
            state.jmlKehadiran = action.payload.data
        },
        [getJmlKehadiranKehadiran.rejected]: (state, action) => {
            state.loading = false
        },
    }
})

export const { setJmlKehadiran, updateStateValue } = jmlKehadiranSlice.actions
export default jmlKehadiranSlice.reducer