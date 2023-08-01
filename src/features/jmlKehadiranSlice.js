import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";
import formatDate from "../components/useFormatCalendar";

export const getJmlKehadiranDashboard = createAsyncThunk("dashboard/jmlKehadiran", async (tanggal, { rejectWithValue }) => {
    try {
        const response = await axios.get(getBaseUrl() + 'dashboard', {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: { tanggal: tanggal },
            timeout: 20000,
        });

        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            throw new Error('Request canceled');
        }

        if (error.code === 'ECONNABORTED') {
            return rejectWithValue('Request timeout');
        } else if (error.response.data.admin === false) {
            return rejectWithValue('Permission denied');
        }
        console.log(error);

        return rejectWithValue(error.message)
    }
})

export const getJmlKehadiranKehadiran = createAsyncThunk("kehadiran/jmlKehadiran", async ({ start_time, end_time }, { rejectWithValue }) => {
    try {
        const response = await axios.get(getBaseUrl() + 'kehadiran/jml-kehadiran', {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: {
                start_time,
                // end_time
            },
            timeout: 20000,
        });

        return response.data;
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

const jmlKehadiranSlice = createSlice({
    name: 'jmlKehadiran',
    initialState: {
        jmlKehadiran: {},
        tanggalDashboard: formatDate(new Date()),
        tanggalKehadiran: formatDate(new Date()),
        loading: false,

        statusResApi: '',
        messageResApi: '',
        isDisplayMessage: false,
    },
    reducers: {
        setJmlKehadiran: (state, action) => {
            state.jmlKehadiran = action.payload
        },
        updateStateJmlKehadiran: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getJmlKehadiranDashboard.pending, (state) => {
                state.loading = false;
            })
            .addCase(getJmlKehadiranDashboard.fulfilled, (state, action) => {
                state.loading = true;
                state.jmlKehadiran = action.payload.data;
            })
            .addCase(getJmlKehadiranDashboard.rejected, (state, action) => {
                state.loading = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(getJmlKehadiranKehadiran.pending, (state) => {
                state.loading = false;
            })
            .addCase(getJmlKehadiranKehadiran.fulfilled, (state, action) => {
                state.loading = true;
                state.jmlKehadiran = action.payload.data;
            })
            .addCase(getJmlKehadiranKehadiran.rejected, (state, action) => {
                state.loading = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            });
    }
})

export const { setJmlKehadiran, updateStateJmlKehadiran } = jmlKehadiranSlice.actions
export default jmlKehadiranSlice.reducer