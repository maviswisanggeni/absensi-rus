import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../utils/apiUrl";
import token from "../utils/tokenAuthorization";

const initialState = {
    listEvent: [],
    daySelected: null,
    listSearchPeserta: [],
    isAddPage: true,

    judul: '',
    kategoriEvent: 'event',
    lokasi: '',
    tanggalMulai: '',
    jamMulai: '',
    tanggalSelesai: '',
    jamSelesai: '',
    waktuMulaiLibur: '',
    waktuSelesaiLibur: '',
    deskripsi: '',
    peserta: [],
    errors: {
        judul: '',
        kategoriEvent: '',
        lokasi: '',
        jamMulai: '',
        jamSelesai: '',
        deskripsi: '',
        peserta: []
    },
    isFormValid: false,
    isFormShow: false,
    isFormEditted: false,

    statusResApi: '',
    messageResApi: '',
    isDisplayMessage: false,

    loading: false,
    loadngGetKaryawan: false,
    loadingSearch: false
}

export const getKalender = createAsyncThunk("kalender/getKalender", async ({ bulan, tahun }, { rejectWithValue }) => {
    if (bulan > 12) {
        bulan = bulan % 12;
        if (bulan === 0) {
            bulan = 12;
        }
    } else if (bulan < 1) {
        bulan = 12 - (Math.abs(bulan) % 12);
    }

    try {
        const response = await axios.get(
            getBaseUrl + '/api/kalender',
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
                params: {
                    bulan: bulan,
                    tahun: tahun
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

export const getDetailKalender = createAsyncThunk("kalender/detailKalender", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + `/api/kalender/detail/${id}`,
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

export const getKaryawanKalender = createAsyncThunk("kalender/getKaryawanKalender", async ({ kategori_id, search }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + `/api/kalender/get-karyawan`,
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
                params: {
                    kategori_id: kategori_id,
                    search: search
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

export const storeKalender = createAsyncThunk("kalender/store", async ({
    judul, lokasi, kategori_event, waktu_mulai, waktu_selesai, deskripsi, peserta
}, { rejectWithValue }) => {

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

    try {
        const response = await axios.post(
            getBaseUrl + `/api/kalender/create`,
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

export const updateKalender = createAsyncThunk("kalender/update", async (
    { id, judul, lokasi, kategori_event, waktu_mulai, waktu_selesai, deskripsi, peserta },
    { rejectWithValue }
) => {
    console.log(waktu_mulai, waktu_selesai);
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

    try {
        const response = await axios.post(
            getBaseUrl + `/api/kalender/update/${id}`,
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

export const deleteKalender = createAsyncThunk("kalender/delete", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + `/api/kalender/destroy/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
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

export const importEvents = createAsyncThunk("kalender/import", async (file, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await axios.post(
            getBaseUrl + `/api/kalender/import`,
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

const kalenderSlice = createSlice({
    name: 'kalender',
    initialState,
    reducers: {
        updateFieldKalender: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
        updateFieldError: (state, action) => {
            const { field, error } = action.payload;
            state.errors[field] = error;
        },
        updateStateKalender: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
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
            state.tanggalMulai = ''
            state.jamMulai = ''
            state.tanggalSelesai = ''
            state.jamSelesai = ''
            state.deskripsi = ''
            state.peserta = []
        },
        setLoading: (state, action) => {
            state.loadingSearch = action.payload
        },
        checkIsAddPage: (state, action) => {
            state.isAddPage = action.payload === undefined ? true : false;
        },
        showFormError: (state) => {
            if (state.judul.trim() === '') {
                state.errors.judul = 'Isi Judul';
            }

            if (state.kategoriEvent.trim() === '') {
                state.errors.kategoriEvent = 'Pilih Kategori event';
            }

            if (state.lokasi?.trim() === '' || state.lokasi === null) {
                state.errors.lokasi = 'Isi lokasi';
            }

            if (state.jamMulai.trim() === '') {
                state.errors.jamMulai = 'Isi jam';
            }

            if (state.jamSelesai.trim() === '') {
                state.errors.jamSelesai = 'Isi jam';
            }

            if (state.deskripsi.trim() === '') {
                state.errors.deskripsi = 'Isi deskripsi';
            }

            if (state.peserta.length === 0) {
                state.errors.peserta = 'Isi peseta';
            }

            state.isFormShow = true
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getKalender.pending, (state) => {
                state.loading = true
            })
            .addCase(getKalender.fulfilled, (state, action) => {
                state.loading = false
                state.listEvent = action.payload.data
            })
            .addCase(getKalender.rejected, (state, action) => {
                state.loading = false

                if (action.payload === 'Request failed with status code 404') {
                    // state.statusResApi = action.error.message
                    // state.messageResApi = action.payload
                    // state.isDisplayMessage = true
                    // console.log(action);
                } else {
                    state.statusResApi = action.error.message
                    state.messageResApi = action.payload
                    state.isDisplayMessage = true
                }
            })


            .addCase(getDetailKalender.pending, (state) => {
                state.loading = true
            })
            .addCase(getDetailKalender.fulfilled, (state, action) => {
                state.loading = false
                state.judul = action.payload.data.judul
                state.kategoriEvent = action.payload.data.kategori_event
                state.lokasi = action.payload.data.lokasi
                state.tanggalMulai = action.payload.data.waktu_mulai.slice(0, 10)
                state.jamMulai = action.payload.data.waktu_mulai.slice(-8)
                state.tanggalSelesai = action.payload.data.waktu_selesai.slice(0, 10)
                state.jamSelesai = action.payload.data.waktu_selesai.slice(-8)
                state.waktuMulaiLibur = action.payload.data.waktu_mulai
                state.waktuSelesaiLibur = action.payload.data.waktu_selesai
                state.deskripsi = action.payload.data.deskripsi
                state.peserta = action.payload.data.peserta.map((participant) => ({
                    ...participant,
                    isChecked: true,
                }));
            })
            .addCase(getDetailKalender.rejected, (state, action) => {
                state.loading = false
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(getKaryawanKalender.pending, (state, action) => {
                if (action.meta.arg && action.meta.arg.search) {
                    state.loadingSearch = true
                } else {
                    state.loadngGetKaryawan = true
                }
            })
            .addCase(getKaryawanKalender.fulfilled, (state, action) => {
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
            })
            .addCase(getKaryawanKalender.rejected, (state, action) => {
                state.loadngGetKaryawan = false
                state.loadingSearch = false
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(storeKalender.pending, (state) => {
                state.loading = true
            })
            .addCase(storeKalender.fulfilled, (state) => {
                state.loading = false
                state.statusResApi = 'success'
                state.messageResApi = 'Kalender berhasil ditambahkan'
                state.isDisplayMessage = true
            })
            .addCase(storeKalender.rejected, (state, action) => {
                state.loading = false
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(updateKalender.pending, (state) => {
                state.loading = true
            })
            .addCase(updateKalender.fulfilled, (state) => {
                state.loading = false
                state.statusResApi = 'success'
                state.messageResApi = 'Kalender berhasil diedit'
                state.isDisplayMessage = true
            })
            .addCase(updateKalender.rejected, (state, action) => {
                state.loading = false
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(deleteKalender.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteKalender.fulfilled, (state) => {
                state.loading = false
                state.statusResApi = 'success'
                state.messageResApi = 'Kalender berhasil dihapus'
                state.isDisplayMessage = true
            })
            .addCase(deleteKalender.rejected, (state, action) => {
                state.loading = false
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(importEvents.pending, (state) => {
                state.loading = true
            })
            .addCase(importEvents.fulfilled, (state) => {
                state.loading = false
                state.statusResApi = 'success'
                state.messageResApi = 'Event berhasil diimport'
                state.isDisplayMessage = true
            })
            .addCase(importEvents.rejected, (state, action) => {
                state.loading = false
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })
    }
})

// export const karyawanSelectors = karyawanEntity.getSelectors(state => state.karyawan)
export const { updateFieldKalender, updateListPeserta, deletePesertaByKategori, showFormError, updateFieldError,
    resetePeserta, setLoading, checkIsAddPage, resetFieldKalender, deletePeserta, updateStateKalender
} = kalenderSlice.actions
export default kalenderSlice.reducer;