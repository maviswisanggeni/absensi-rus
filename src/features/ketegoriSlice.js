import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

export const getKategori = createAsyncThunk("karyawan/getKategori", async () => {
    const response = await axios.get(
        getBaseUrl() + 'karyawan/kategori',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
    return response.data
})

const kategoriSlice = createSlice({
    name: 'kategori',
    initialState: {
        listKategori: [],
        currentKategori: null,
        kategoriId: null,
        loadingKategori: false,
    },
    reducers: {
        setKategoriId: (state, action) => {
            state.kategoriId = action.payload
        },
        setCurrentKategori: (state, action) => {
            state.currentKategori = action.payload
        }
    },
    extraReducers: {
        [getKategori.pending]: (state) => {
            state.loadingKategori = false
            state.currentKategori = null
        },
        [getKategori.fulfilled]: (state, action) => {
            state.loadingKategori = true
            state.listKategori = action.payload.data
            state.currentKategori = action.payload.data[0].kategori
        },
    }
})

export const { setKategoriId, setCurrentKategori } = kategoriSlice.actions
export default kategoriSlice.reducer;