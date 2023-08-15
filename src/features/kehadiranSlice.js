import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../utils/apiUrl";
import token from "../utils/tokenAuthorization";
import formatDate from "../utils/formatDate";

export const getKehadiran = createAsyncThunk("kehadiran/getKehadiran", async ({ start_time, end_time, search }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + '/api/kehadiran',
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
        } else if (error.response.data.admin === false) {
            return rejectWithValue('Permission denied');
        }

        return rejectWithValue(error.message)
    }
})

export const getKehadiranTerbaru = createAsyncThunk("kehadiran/getKehadiranTerbaru", async ({ start_time }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + '/api/kehadiran',
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
        } else if (error.response.data.admin === false) {
            return rejectWithValue('Permission denied');
        }

        return rejectWithValue(error.message)
    }
})

const kehadiranSlice = createSlice({
    name: 'kehadiran',
    initialState: {
        listTabbar: [
            { kategori: 'Masuk', id: 1 },
            { kategori: 'Keluar', id: 2 },
            { kategori: 'Sukses', id: 3 },
            { kategori: 'Izin', id: 4 },
            { kategori: 'Absen', id: 5 },
        ],
        kehadiranMasuk: [],
        kehadiranKeluar: [],
        kehadiranIzin: [],
        kehadiranSukses: [],
        kehadiranAbsen: [],
        kehadiranTerbaru: [],
        detailKehadiranIzin: {},
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

                const kehadiranMasuk = action.payload.data.masuk
                const kehadiranKeluar = action.payload.data.pulang
                const kehadiranIzin = action.payload.data.izin

                const filteredMasuk = kehadiranMasuk.filter((item) =>
                    !kehadiranIzin.some((data) => data.mulai_izin === item.tanggal_masuk && data.user.id === item.user.id)
                );
                
                const filteredKeluar = kehadiranKeluar.filter((item) =>
                    !kehadiranIzin.some((data) => data.mulai_izin === item.tanggal_masuk && data.user.id === item.user.id)
                );

                const mergedMasukKeluar = [...filteredMasuk, ...kehadiranKeluar];
                
                state.kehadiranMasuk = mergedMasukKeluar;
                state.kehadiranKeluar = filteredKeluar;
                state.kehadiranIzin = kehadiranIzin;

                const listSuksesMasuk = action.payload.data.masuk.filter((item) =>
                    item.isvld_wkt_masuk === '1'
                    && item.isvld_wkt_pulang === '1'
                    && item.is_valid_masuk === '1'
                    && item.is_valid_pulang === '1'
                )

                const listSuksesPulang = action.payload.data.pulang.filter((item) =>
                    item.isvld_wkt_masuk === '1'
                    && item.isvld_wkt_pulang === '1'
                    && item.is_valid_masuk === '1'
                    && item.is_valid_pulang === '1'
                )

                state.kehadiranSukses = [
                    ...(listSuksesMasuk || []),
                    ...(listSuksesPulang || [])
                ];
                state.kehadiranAbsen = [
                    ...(action.payload.data.masuk || []),
                    ...(action.payload.data.pulang || [])
                ];
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
                let kehadiranMasuk = action.payload.data.masuk;
                let kehadiranKeluar = action.payload.data.pulang;

                state.kehadiranTerbaru = [...kehadiranMasuk, ...kehadiranKeluar];
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