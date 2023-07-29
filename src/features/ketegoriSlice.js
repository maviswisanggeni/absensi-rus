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
        } else if (error.response.data.admin === false) {
            return rejectWithValue('Permission denied');
        }

        return rejectWithValue(error.message)
    }
})

const kategoriSlice = createSlice({
    name: 'kategori',
    initialState: {
        listKategori: [],
        currentKategori: null,
        kategoriId: null,
        loadingKategori: true,
        isInitialPage: true,
        searchedKategori: [],
        search: '',

        statusResApi: '',
        messageResApi: '',
        isDisplayMessage: false,
    },
    reducers: {
        setIsInitial: (state, action) => {
            state.isInitialPage = action.payload
        },
        setKategoriId: (state, action) => {
            state.kategoriId = action.payload
        },
        setCurrentKategori: (state, action) => {
            state.currentKategori = action.payload
        },
        updateStateKategori: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
            if (name === 'search') {
                const filteredList = state.listKategori.filter((item) =>
                    item.kategori.toLowerCase().includes(state.search.toLowerCase())
                );
                state.searchedKategori = filteredList;
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getKategori.pending, (state) => {
                state.loadingKategori = true;
                state.currentKategori = null;
            })
            .addCase(getKategori.fulfilled, (state, action) => {
                state.loadingKategori = false;
                state.listKategori = action.payload.data;
                state.searchedKategori = action.payload.data;
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

export const { setKategoriId, setCurrentKategori, setIsInitial, updateStateKategori } = kategoriSlice.actions
export default kategoriSlice.reducer;