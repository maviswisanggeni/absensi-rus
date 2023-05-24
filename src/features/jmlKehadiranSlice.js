import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";
import formatDate from "../components/useFormatCalendar";

export const getJmlKehadiran = createAsyncThunk("jml_kehadiran", async () => {
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

const jmlKehadiranSlice = createSlice({
    name: 'jmlKehadiran',
    initialState: {
        jmlKehadiran: {},
        loading: false,
    },
    reducers: {
        setJmlKehadiran: (state, action) => {
            state.jmlKehadiran = action.payload
        }
    },
    extraReducers: {
        [getJmlKehadiran.pending]: (state) => {
            state.loading = false
        },
        [getJmlKehadiran.fulfilled]: (state, action) => {
            state.loading = true
            state.jmlKehadiran = action.payload.data
        },
    }
})

export const { setJmlKehadiran } = jmlKehadiranSlice.actions
export default jmlKehadiranSlice.reducer