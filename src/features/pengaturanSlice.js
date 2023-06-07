import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

export const getKategoriPengaturan = createAsyncThunk("pengaturan/getKategori", async () => {
    const response = await axios.get(
        getBaseUrl() + 'setting/kategori',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
    return response.data
})

export const detailKategori = createAsyncThunk("pengaturan/detailKategori", async (id) => {
    const response = await axios.get(
        getBaseUrl() + `setting/kategori/detail/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
    return response.data
})

export const storeKategori = createAsyncThunk("pengaturan/storeKategori", async (nama_kategori) => {
    const response = await axios.post(
        getBaseUrl() + 'setting/kategori/store',
        {
            nama_kategori: nama_kategori
        },
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            }
        }
    )
    return response.data
})

export const updateKategori = createAsyncThunk("pengaturan/updateKategori", async ({ id, nama_kategori }) => {
    const response = await axios.post(
        getBaseUrl() + `setting/kategori/update/${id}`,
        {
            nama_kategori: nama_kategori
        },
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            }
        }
    )
    return response.data
})

export const deleteKategori = createAsyncThunk("pengaturan/deleteKategori", async (id) => {
    const response = await axios.get(
        getBaseUrl() + `setting/kategori/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
    return response.data
})

export const getKaryawanPengaturan = createAsyncThunk("pengaturan/getKaryawan", async ({ search }) => {
    const response = await axios.get(
        getBaseUrl() + `setting/kategori/get-karyawan`,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: {
                search
            }
        }
    )
    return response.data
})

export const assignKategori = createAsyncThunk("pengaturan/assignKategori", async ({ kategori_id, karyawan_id }) => {
    const formData = new FormData()
    formData.append('kategori_id', kategori_id)
    karyawan_id.forEach((item, index) => {
        formData.append(`karyawan_id[${index}]`, item.id)
    })
    const response = await axios.post(
        getBaseUrl() + `setting/kategori/assign`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            }
        }
    )
    return response.data
})

const pengaturanSlice = createSlice({
    name: 'pengaturan',
    initialState: {
        listKategori: [],
        listKaryawan: [],
        listSearchKaryawan: [],
        listKaryawanNotFinal: [],

        currentKaryawan: null,
        currentKategori: null,
        kategoriId: null,

        loadingKategori: true,
        loadingKaryawan: true,
        loadingSearch: true,

        kategoriInput: ''
    },
    reducers: {
        updateInputPengaturan: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
        setKategoriId: (state, action) => {
            state.kategoriId = action.payload
        },
        setCurrentKategori: (state, action) => {
            state.currentKategori = action.payload
        },
        deleteKaryawan: (state, action) => {
            const { name, index } = action.payload
            state[name] = state[name].map((item, i) => {
                if (item.id === index) {
                    return {
                        ...item,
                        isChecked: !item.isChecked
                    };
                }
                return item;
            });
            state.listSearchKaryawan = state[name]
        },
        searchKaryawan: (state, action) => {
            const { name, value } = action.payload;

            const filteredArray = state[name].filter(item =>
                item.nama.toLowerCase().includes(value.toLowerCase())
            );
            return {
                ...state,
                listKaryawanNotFinal: filteredArray
            };
        }
    },
    extraReducers: {
        [getKategoriPengaturan.pending]: (state) => {
            state.loadingKategori = true
            state.currentKategori = null
        },
        [getKategoriPengaturan.fulfilled]: (state, action) => {
            state.loadingKategori = false
            state.listKategori = action.payload.data
            // state.currentKategori = action.payload.data[0].kategori
        },
        [getKategoriPengaturan.rejected]: (state) => {
            state.loadingKategori = false
            state.currentKategori = null
        },
        [storeKategori.pending]: (state) => {
            state.loadingKategori = true
        },
        [storeKategori.fulfilled]: (state) => {
            state.loadingKategori = false
        },
        [storeKategori.rejected]: (state) => {
            state.loadingKategori = false
        },
        [deleteKategori.pending]: (state) => {
            state.loadingKategori = true
        },
        [deleteKategori.fulfilled]: (state) => {
            state.loadingKategori = false
        },
        [deleteKategori.rejected]: (state) => {
            state.loadingKategori = false
        },
        [updateKategori.pending]: (state) => {
            state.loadingKategori = true
        },
        [updateKategori.fulfilled]: (state) => {
            state.loadingKategori = false
        },
        [updateKategori.rejected]: (state) => {
            state.loadingKategori = false
        },
        [getKaryawanPengaturan.pending]: (state) => {
            state.loadingKaryawan = true
            state.loadingSearch = true
        },
        [getKaryawanPengaturan.fulfilled]: (state, action) => {
            state.listKaryawanNotFinal = action.payload.data.map((item) => ({ ...item, isChecked: false }));
            state.listSearchKaryawan = action.payload.data.map((item) => ({ ...item, isChecked: false }));
            if (action.meta.arg && action.meta.arg.search) {
                state.listSearchKaryawan = action.payload.data.map((item) => ({ ...item, isChecked: true }));;
                state.loadingSearch = false
            }
        },
        [getKaryawanPengaturan.rejected]: (state) => {
            state.loadingKaryawan = false
            state.loadingSearch = false
        },
        [detailKategori.pending]: (state) => {
            state.loadingKategori = true
        },
        [detailKategori.fulfilled]: (state, action) => {
            state.loadingKategori = false
            state.listKaryawan = action.payload.data[0].users.map((item) => ({ ...item, isChecked: true }));
        },
        [detailKategori.rejected]: (state) => {
            state.loadingKategori = false
        },
        [assignKategori.pending]: (state) => {
            state.loadingKategori = true
        },
        [assignKategori.fulfilled]: (state) => {
            state.loadingKategori = false
        },
        [assignKategori.rejected]: (state) => {
            state.loadingKategori = false
        },
    }
})

export const { setKategoriId, setCurrentKategori, updateInputPengaturan, deleteKaryawan, searchKaryawan } = pengaturanSlice.actions
export default pengaturanSlice.reducer;