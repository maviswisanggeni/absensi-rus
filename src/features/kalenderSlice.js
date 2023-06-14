import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

const initialState = {
    listEvent: [],
    daySelected: null,
    listSearchPeserta: [],
    isAddPage: true,

    judul: '',
    kategoriEvent: 'event',
    lokasi: '',
    waktuMulai: '',
    waktuSelesai: '',
    waktuMulaiLibur: '',
    waktuSelesaiLibur: '',
    deskripsi: '',
    peserta: [],
    errors: {
        judul: '',
        kategoriEvent: '',
        lokasi: '',
        waktuMulai: '',
        waktuSelesai: '',
        deskripsi: '',
        peserta: []
    },

    statusResApi: '',
    messageResApi: '',
    isDisplayMessage: false,

    loading: false,
    loadngGetKaryawan: false,
    loadingSearch: false
}

export const getKalender = createAsyncThunk("kalender/getKalender", async (bulan) => {
    const response = await axios.get(
        getBaseUrl() + 'kalender',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: {
                bulan: bulan
            }
        }
    )
    return response.data
})

export const getDetailKalender = createAsyncThunk("kalender/detailKalender", async (id) => {
    const response = await axios.get(
        getBaseUrl() + `kalender/detail/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
    return response.data
})

export const getKaryawanKalender = createAsyncThunk("kalender/getKaryawanKalender", async ({ kategori_id, search }) => {
    const response = await axios.get(
        getBaseUrl() + `kalender/get-karyawan`,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: {
                kategori_id: kategori_id,
                search: search
            }
        }
    )
    return response.data
})

export const storeKalender = createAsyncThunk("kalender/store", async ({ judul, lokasi, kategori_event, waktu_mulai, waktu_selesai, deskripsi, peserta }) => {
    const formData = new FormData()
    formData.append('judul', judul)
    if (kategori_event === 'event') {
        formData.append('lokasi', lokasi)
    }
    formData.append('kategori_event', kategori_event)
    formData.append('waktu_mulai', waktu_mulai)
    formData.append('waktu_selesai', waktu_selesai)
    formData.append('deskripsi', deskripsi)
    peserta.forEach((item, index) => {
        formData.append(`peserta[${index}]`, item.id)
    })
    const response = await axios.post(
        getBaseUrl() + `kalender/create`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
    return response.data
})

export const updateKalender = createAsyncThunk("kalender/update", async ({ id, judul, lokasi, kategori_event, waktu_mulai, waktu_selesai, deskripsi, peserta }) => {
    const formData = new FormData()
    formData.append('judul', judul)
    if (kategori_event === 'event') {
        formData.append('lokasi', lokasi)
    }
    formData.append('kategori_event', kategori_event)
    formData.append('waktu_mulai', waktu_mulai)
    formData.append('waktu_selesai', waktu_selesai)
    formData.append('deskripsi', deskripsi)
    peserta.forEach((item, index) => {
        formData.append(`peserta[${index}]`, item.id)
    })
    const response = await axios.post(
        getBaseUrl() + `kalender/update/${id}`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
    return response.data
})

export const deleteKalender = createAsyncThunk("kalender/delete", async (id) => {
    const response = await axios.get(
        getBaseUrl() + `kalender/destroy/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
    return response.data
})

const kalenderSlice = createSlice({
    name: 'kalender',
    initialState,
    reducers: {
        updateFieldKalender: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
            if (state.judul.trim() === '' && name === 'judul') {
                state.errors.judul = 'Isi Judul';
            } else if (state.kategoriEvent.trim() === '' && name === 'kategoriEvent') {
                state.errors.kategoriEvent = 'Pilih Kategori event';
            } else if (state.lokasi?.trim() === '' && name === 'lokasi') {
                state.errors.lokasi = 'Isi lokasi';
            } else if (state.waktuMulai.slice(11) === ':00' && name === 'waktuMulai') {
                state.errors.waktuMulai = 'Isi waktu mulai';
            } else if (state.waktuSelesai.slice(11) === ':00' && name === 'waktuSelesai') {
                state.errors.waktuSelesai = 'Isi waktu selesai';
            } else if (state.deskripsi.trim() === '' && name === 'deskripsi') {
                state.errors.deskripsi = 'Isi deskripsi';
            } else if (state.peserta.length === 0 && name === 'peserta') {
                state.errors.peserta = 'Isi peseta';
            } else {
                state.errors[name] = '';
            }
        },
        updateFieldError: (state, action) => {
            const { field, error } = action.payload;
            state.errors[field] = error;
        },
        updateStateKalender: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
            // state.errors = validateForm(state)
        }, updateListPeserta: (state, action) => {
            const isIdAlreadyAdded = state.peserta.some((pesertaItem) => pesertaItem.id === action.payload.id)
            if (!isIdAlreadyAdded) {
                state.peserta.push(action.payload)
            }
        },
        deletePesertaByKategori: (state, action) => {
            const pesertaToRemove = action.payload;
            state.peserta = state.peserta.filter(
                (item) => !pesertaToRemove.some((p) => p.id === item.id)
            );
        },
        deletePeserta: (state, action) => {
            const index = action.payload
            state.peserta[index].isChecked = !state.peserta[index].isChecked
        },
        resetePeserta: (state) => {
            state.peserta = [];
        },
        resetFieldKalender: (state) => {
            state.judul = ''
            state.kategoriEvent = 'event'
            state.lokasi = ''
            state.waktuMulai = ''
            state.waktuSelesai = ''
            state.deskripsi = ''
            state.peserta = []
        },
        setLoading: (state, action) => {
            state.loadingSearch = action.payload
        },
        checkIsAddPage: (state, action) => {
            state.isAddPage = action.payload === undefined ? true : false;
        }
    },
    extraReducers: {
        [getKalender.pending]: (state) => {
            state.loading = true
        },
        [getKalender.fulfilled]: (state, action) => {
            state.loading = false
            state.listEvent = action.payload.data
        },
        [getKalender.rejected]: (state) => {
            state.loading = false
        },


        [getDetailKalender.pending]: (state) => {
            state.loading = true
        },
        [getDetailKalender.fulfilled]: (state, action) => {
            state.loading = false
            state.judul = action.payload.data.judul
            state.kategoriEvent = action.payload.data.kategori_event
            state.lokasi = action.payload.data.lokasi
            state.waktuMulai = action.payload.data.waktu_mulai
            state.waktuSelesai = action.payload.data.waktu_selesai
            state.waktuMulaiLibur = action.payload.data.waktu_mulai
            state.waktuSelesaiLibur = action.payload.data.waktu_selesai
            state.deskripsi = action.payload.data.deskripsi
            state.peserta = action.payload.data.peserta.map((participant) => ({
                ...participant,
                isChecked: true,
            }));
        },
        [getDetailKalender.rejected]: (state) => {
            state.loading = false
        },


        [getKaryawanKalender.pending]: (state, action) => {
            state.loadngGetKaryawan = true
            if (action.meta.arg && action.meta.arg.search) {
                state.loadingSearch = true
            }
        },
        [getKaryawanKalender.fulfilled]: (state, action) => {
            state.loadngGetKaryawan = false
            if (action.meta.arg && action.meta.arg.kategori_id) {
                const newItems = action.payload.data.filter((payloadItem) =>
                    !state.peserta.some((pesertaItem) => pesertaItem.id === payloadItem.id)
                );
                state.peserta.push(...newItems.map((item) => ({ ...item, isChecked: true })));
            } else if (action.meta.arg && action.meta.arg.search) {
                state.listSearchPeserta = action.payload.data.map((item) => ({ ...item, isChecked: true }));
                state.loadingSearch = false
            } else {
                const newItems = action.payload.data.filter((payloadItem) =>
                    !state.peserta.some((pesertaItem) => pesertaItem.id === payloadItem.id)
                );
                state.peserta.push(...newItems.map((item) => ({ ...item, isChecked: true })));
            }
        },
        [getKaryawanKalender.rejected]: (state) => {
            state.loadngGetKaryawan = false
            state.loadingSearch = false
        },


        [storeKalender.pending]: (state) => {
            state.loading = true
        },
        [storeKalender.fulfilled]: (state) => {
            state.loading = false
            state.statusResApi = 'success'
            state.messageResApi = 'Kalender berhasil ditambahkan'
            state.isDisplayMessage = true
        },
        [storeKalender.rejected]: (state, action) => {
            state.loading = false
            state.statusResApi = action.error.code
            state.messageResApi = action.error.message
            state.isDisplayMessage = true
        },


        [updateKalender.pending]: (state) => {
            state.loading = true
        },
        [updateKalender.fulfilled]: (state) => {
            state.loading = false
            state.statusResApi = 'success'
            state.messageResApi = 'Kalender berhasil diedit'
            state.isDisplayMessage = true
        },
        [updateKalender.rejected]: (state, action) => {
            state.loading = false
            state.statusResApi = action.error.code
            state.messageResApi = action.error.message
            state.isDisplayMessage = true
        },


        [deleteKalender.pending]: (state) => {
            state.loading = true
        },
        [deleteKalender.fulfilled]: (state) => {
            state.loading = false
            state.statusResApi = 'success'
            state.messageResApi = 'Kalender berhasil dihapus'
            state.isDisplayMessage = true
        },
        [deleteKalender.rejected]: (state, action) => {
            state.loading = false
            state.statusResApi = action.error.code
            state.messageResApi = action.error.message
            state.isDisplayMessage = true
        },
    }
})

// export const karyawanSelectors = karyawanEntity.getSelectors(state => state.karyawan)
export const { updateFieldKalender, updateListPeserta, deletePesertaByKategori,
    resetePeserta, setLoading, checkIsAddPage, resetFieldKalender, deletePeserta, updateStateKalender
} = kalenderSlice.actions
export default kalenderSlice.reducer;