import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";
import formatDate from "../components/useFormatCalendar";

export const getKehadiran = createAsyncThunk("kehadiran/getKehadiran", async ({ start_time, end_time, search }) => {
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
            }
        }
    )
    return response.data
})

export const getKehadiranTerbaru = createAsyncThunk("kehadiran/getKehadiranTerbaru", async ({ start_time }) => {
    const response = await axios.get(
        getBaseUrl() + 'kehadiran',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: {
                start_time,
            }
        }
    )
    return response.data
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
    },
    reducers: {
        updateStateKehadiran: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
    },
    extraReducers: {
        [getKehadiran.pending]: (state) => {
            state.loading = false
        },
        [getKehadiran.fulfilled]: (state, action) => {
            state.loading = true
            state.kehadiranMasuk = action.payload.data.masuk
            state.kehadiranKeluar = action.payload.data.pulang
            state.kehadiranIzin = action.payload.data.izin
        },
        [getKehadiranTerbaru.pending]: (state) => {
            state.loadingKehadiranTerbaru = false
        },
        [getKehadiranTerbaru.fulfilled]: (state, action) => {
            state.loadingKehadiranTerbaru = true
            state.kehadiranTerbaru = action.payload.data.masuk
        }
    }
})

export const {
    updateStateKehadiran
} = kehadiranSlice.actions
export default kehadiranSlice.reducer;