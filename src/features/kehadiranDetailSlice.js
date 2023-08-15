import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../utils/apiUrl";
import token from "../utils/tokenAuthorization";

export const getDetailKehadiran = createAsyncThunk("detail/getDetail", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + '/api/kehadiran/detail/' + id,
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

export const getDetailIzinKehadiran = createAsyncThunk("detail/getDetailIzin", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + '/api/kehadiran/detail-izin/' + id,
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

const kehadiranDetailSlice = createSlice({
    name: 'kehadiranDetail',
    initialState: {
        detailData: {},
        loading: false,

        statusResApi: '',
        messageResApi: '',
        isDisplayMessage: false,
    },
    reducers: {
        updateStateDetailKehadiran: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
        resetDetail: (state) => {
            state.detailData = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDetailKehadiran.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDetailKehadiran.fulfilled, (state, action) => {
                state.loading = false;
                state.detailData = action.payload.data;
            })
            .addCase(getDetailKehadiran.rejected, (state, action) => {
                state.loading = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(getDetailIzinKehadiran.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDetailIzinKehadiran.fulfilled, (state, action) => {
                state.loading = false;
                state.detailData = action.payload.data;
            })
            .addCase(getDetailIzinKehadiran.rejected, (state, action) => {
                state.loading = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            });
    }
})

export const { updateStateDetailKehadiran, resetDetail } = kehadiranDetailSlice.actions
export default kehadiranDetailSlice.reducer;