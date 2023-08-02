import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

export const getKoordinat = createAsyncThunk("pengaturan/getKoordinat", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + '/api/setting/kordinat',
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

export const updateKoordinat = createAsyncThunk("pengaturan/updateKoordinat", async ({ latitude, longitude, radius }, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    formData.append('radius', radius)

    try {
        const response = await axios.post(
            getBaseUrl + '/api/setting/kordinat/update',
            formData,
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

const koordinatSlice = createSlice({
    name: 'koordinat',
    initialState: {
        latitude: 0,
        longitude: 0,
        latitudeWhileEdit: '',
        longitudeWhiteEdit: '',
        radius: '',
        loading: false,

        statusResApi: '',
        messageResApi: '',
        isDisplayMessage: false,
    },
    reducers: {
        updateStateKordinat: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
        inputKordinat: (state, action) => {
            const { name, value } = action.payload
            const isLatitude = num => isFinite(num) && Math.abs(num) <= 90;
            const isLongitude = num => isFinite(num) && Math.abs(num) <= 180;
            state[name] = value
            if (name === 'latitudeWhileEdit' && isLatitude(value) && value !== '') {
                state.latitude = state.latitudeWhileEdit
            } else if (name === 'longitudeWhiteEdit' && isLongitude(value) && value !== '') {
                state.longitude = state.longitudeWhiteEdit
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKoordinat.pending, (state) => {
                state.loading = true;
            })
            .addCase(getKoordinat.fulfilled, (state, action) => {
                state.loading = false;
                state.latitude = action.payload.data[1].value;
                state.longitude = action.payload.data[0].value;
                state.latitudeWhileEdit = action.payload.data[1].value;
                state.longitudeWhiteEdit = action.payload.data[0].value;
                state.radius = action.payload.data[2].value;
            })
            .addCase(getKoordinat.rejected, (state, action) => {
                state.loading = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(updateKoordinat.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateKoordinat.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateKoordinat.rejected, (state, action) => {
                state.loading = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            });
    }
})

export const { updateStateKordinat, inputKordinat } = koordinatSlice.actions
export default koordinatSlice.reducer;