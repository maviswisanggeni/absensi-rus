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
        getBaseUrl() + 'setting/kategori/store',
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
        latitude: '',
        longitude: '',
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

export const { updateStateKordinat } = koordinatSlice.actions
export default koordinatSlice.reducer;