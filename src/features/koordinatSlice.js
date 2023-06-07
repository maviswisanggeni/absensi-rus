import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

export const getKoordinat = createAsyncThunk("pengaturan/getKoordinat", async () => {
    const response = await axios.get(
        getBaseUrl() + 'setting/kordinat',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
    return response.data
})

export const updateKoordinat = createAsyncThunk("pengaturan/updateKoordinat", async ({ latitude, longitude, radius }) => {
    const formData = new FormData()
    formData.append('latitude', latitude)
    formData.append('longitude', longitude)
    formData.append('radius', radius)

    const response = await axios.post(
        getBaseUrl() + 'setting/kordinat/update',
        formData,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            }
        }
    )
    return response.data
})

const koordinatSlice = createSlice({
    name: 'koordinat',
    initialState: {
        latitude: 0,
        longitude: 0,
        latitudeWhileEdit: '',
        longitudeWhiteEdit: '',
        radius: '',
        loading: false
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
    extraReducers: {
        [getKoordinat.pending]: (state) => {
            state.loading = true
        },
        [getKoordinat.fulfilled]: (state, action) => {
            state.loading = false
            state.latitude = action.payload.data[1].value
            state.longitude = action.payload.data[0].value
            state.latitudeWhileEdit = action.payload.data[1].value
            state.longitudeWhiteEdit = action.payload.data[0].value
            state.radius = action.payload.data[2].value
        },
        [getKoordinat.rejected]: (state) => {
            state.loading = false
        },
        [updateKoordinat.pending]: (state) => {
            state.loading = true
        },
        [updateKoordinat.fulfilled]: (state) => {
            state.loading = false
        },
        [updateKoordinat.rejected]: (state) => {
            state.loading = false
        },

    }
})

export const { updateStateKordinat, inputKordinat } = koordinatSlice.actions
export default koordinatSlice.reducer;