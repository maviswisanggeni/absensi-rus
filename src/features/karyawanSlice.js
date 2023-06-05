import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

export const getKaryawan = createAsyncThunk("karyawan/getKaryawan", async ({ kategori_id, search }) => {
    const response = await axios.get(
        getBaseUrl() + 'karyawan',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: {
                kategori_id,
                search
            }
        }
    )
    return response.data
})

const karyawanSlice = createSlice({
    name: 'karyawan',
    initialState: {
        listKaryawan: [],
        loading: false,
        currentPage: 1,
        keterangan: null,
        urutan: 'Sesuai abjad',
    },
    reducers: {
        filterToggle: (state, action) => {
            state.urutan = action.payload
        },
        updateState: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
    },
    extraReducers: {
        [getKaryawan.pending]: (state) => {
            state.loading = false
        },
        [getKaryawan.fulfilled]: (state, action) => {
            state.loading = true
            state.listKaryawan = action.payload.data
        },
    }
})

// export const karyawanSelectors = karyawanEntity.getSelectors(state => state.karyawan)
export const { tabbarToggle, filterToggle, updateState } = karyawanSlice.actions
export default karyawanSlice.reducer;