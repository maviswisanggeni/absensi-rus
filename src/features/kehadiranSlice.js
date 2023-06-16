import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";
import formatDate from "../components/useFormatCalendar";

export const getKehadiran = createAsyncThunk("kehadiran/getKehadiran", async ({ start_time, end_time, search }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl() + 'kehadiran',
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
                params: {
                    start_time,
                    end_time,
                    search
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

export const getKehadiranTerbaru = createAsyncThunk("kehadiran/getKehadiranTerbaru", async ({ start_time }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl() + 'kehadiran',
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
                params: {
                    start_time,
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

const kehadiranSlice = createSlice({
    name: 'kehadiran',
    initialState: {
        kehadiranMasuk: [],
        kehadiranKeluar: [],
        kehadiranIzin: [],
        kehadiranTerbaru: [],
        search: '',
        startTime: formatDate(new Date()),
        endTime: null,
        startText: 'Tanggal mulai',
        endText: 'Tanggal berakhir',
        currentPage: 1,
        keterangan: 'Masuk',
        urutan: 'Tercepat',
        loading: false,
        loadingKehadiranTerbaru: false,
        kategoriId: null,
        isPaginationClicked: false,

        statusResApi: '',
        messageResApi: '',
        isDisplayMessage: false,
    },
    reducers: {
        updateStateKehadiran: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKehadiran.pending, (state) => {
                state.loading = true;
            })
            .addCase(getKehadiran.fulfilled, (state, action) => {
                state.loading = false;
                state.kehadiranMasuk = action.payload.data.masuk;
                state.kehadiranKeluar = action.payload.data.pulang;
                state.kehadiranIzin = action.payload.data.izin;
            })
            .addCase(getKehadiran.rejected, (state, action) => {
                state.loading = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(getKehadiranTerbaru.pending, (state) => {
                state.loadingKehadiranTerbaru = true;
            })
            .addCase(getKehadiranTerbaru.fulfilled, (state, action) => {
                state.loadingKehadiranTerbaru = false;
                state.kehadiranTerbaru = action.payload.data.masuk;
            })
            .addCase(getKehadiranTerbaru.rejected, (state, action) => {
                state.loadingKehadiranTerbaru = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            });
    }
})

export const {
    updateStateKehadiran
} = kehadiranSlice.actions
export default kehadiranSlice.reducer;