import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

export const getKategori = createAsyncThunk("karyawan/getKategori", async (test, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl() + 'karyawan/kategori',
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

const kategoriSlice = createSlice({
    name: 'kategori',
    initialState: {
        listKategori: [],
        currentKategori: null,
        kategoriId: null,
        loadingKategori: false,

        statusResApi: '',
        messageResApi: '',
        isDisplayMessage: false,
    },
    reducers: {
        setKategoriId: (state, action) => {
            state.kategoriId = action.payload
        },
        setCurrentKategori: (state, action) => {
            state.currentKategori = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKategori.pending, (state) => {
                state.loadingKategori = false;
                state.currentKategori = null;
            })
            .addCase(getKategori.fulfilled, (state, action) => {
                state.loadingKategori = true;
                state.listKategori = action.payload.data;
            })
            .addCase(getKategori.rejected, (state, action) => {
                state.loadingKategori = false;
                state.currentKategori = null;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            });
    }
})

export const { setKategoriId, setCurrentKategori } = kategoriSlice.actions
export default kategoriSlice.reducer;