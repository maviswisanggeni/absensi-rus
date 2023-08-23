import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../utils/apiUrl";
import token from "../utils/tokenAuthorization";

export const getKategoriPengaturan = createAsyncThunk("pengaturan/getKategori", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + '/api/setting/kategori',
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

export const detailKategori = createAsyncThunk("pengaturan/detailKategori", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + `/api/setting/kategori/detail/${id}`,
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

export const storeKategori = createAsyncThunk("pengaturan/storeKategori", async (nama_kategori, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            getBaseUrl + '/api/setting/kategori/store',
            {
                nama_kategori: nama_kategori
            },
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

export const updateKategori = createAsyncThunk("pengaturan/updateKategori", async ({ id, nama_kategori }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            getBaseUrl + `/api/setting/kategori/update/${id}`,
            {
                nama_kategori: nama_kategori
            },
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

export const deleteKategori = createAsyncThunk("pengaturan/deleteKategori", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + `/api/setting/kategori/delete/${id}`,
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

export const getKaryawanPengaturan = createAsyncThunk("pengaturan/getKaryawan", async ({ search, kategori_id, route }, { rejectWithValue }) => {
    let url;
    if (route === 'setting') {
        url = '/api/setting/kategori/get-karyawan'
    } else if (route === 'karyawan') {
        url = '/api/karyawan'
    }
    try {
        const params = {};

        if (kategori_id !== 'all') {
            params.kategori_id = kategori_id;
        }

        const response = await axios.get(
            getBaseUrl + url,
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
                params: {
                    search,
                    ...params
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

export const assignKategori = createAsyncThunk("pengaturan/assignKategori", async ({ kategori_id, listKaryawan }, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('kategori_id', kategori_id)
    listKaryawan.forEach((item, index) => {
        formData.append(`karyawan_id[${index}]`, item.id)
    })

    try {
        const response = await axios.post(
            getBaseUrl + `/api/setting/kategori/assign`,
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

export const unassignKategori = createAsyncThunk("pengaturan/unassignKategori", async ({ kategori_id, listKaryawan }, { rejectWithValue }) => {
    const formData = new FormData()
    listKaryawan.forEach((item, index) => {
        const prefix = `unassign[${index}]`;
        formData.append(`${prefix}[kategori_id]`, kategori_id)
        formData.append(`${prefix}[user_id]`, item.id)
    });

    try {
        const response = await axios.post(
            getBaseUrl + `/api/setting/kategori/unassign`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
                timeout: 20000
            },
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

export const getBatasWaktu = createAsyncThunk("pengaturan/getBatasWaktu", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl + `/api/setting/batas-waktu`,
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
                timeout: 20000
            },
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

export const updateBatasWaktu = createAsyncThunk("pengaturan/updateBatasWaktu", async ({ waktu_masuk, waktu_pulang }, { rejectWithValue }) => {

    const formData = new FormData()
    formData.append('waktu_masuk', waktu_masuk)
    formData.append('waktu_pulang', waktu_pulang)

    try {
        const response = await axios.post(
            getBaseUrl + `/api/setting/batas-waktu/update`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
                timeout: 20000
            },
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

export const importKaryawan = createAsyncThunk("pengaturan/importKaryawan", async ({ file }, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('file', file)

    try {
        const response = await axios.post(
            getBaseUrl + `/api/karyawan/import`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
                timeout: 20000
            },
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

const pengaturanSlice = createSlice({
    name: 'pengaturan',
    initialState: {
        listKategori: [],
        listKaryawan: [],
        listSearchKaryawan: [],
        listKaryawanNotFinal: [],

        currentKategori: null,
        kategoriId: null,
        currentPage: 1,

        batasWaktuMasuk: '',
        batasWaktuPulang: '',

        loadingKategori: true,
        loadingKaryawan: true,
        loadingSearch: true,
        loadingImport: false,
        loadingAssign: false,
        loadingCUD: false,

        kategoriInput: '',

        statusResApi: '',
        messageResApi: '',
        isDisplayMessage: false,
    },
    reducers: {
        updateStatePengaturan: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
        setKategoriId: (state, action) => {
            state.kategoriId = action.payload
        },
        setCurrentKategori: (state, action) => {
            state.currentKategori = action.payload
        },
        toggleCheck: (state, action) => {
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
        },
        emptyKaryawan: (state, action) => {
            state.listKaryawan = []
            state.loadingKaryawan = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKategoriPengaturan.pending, (state) => {
                state.loadingKategori = true;
                state.currentKategori = null;
            })
            .addCase(getKategoriPengaturan.fulfilled, (state, action) => {
                state.loadingKategori = false;
                let initialKategori = [
                    { id: 'all', kategori: 'Semua Karyawan' },
                ]
                // state.listKategori = [...initialKategori, ...action.payload.data];
                state.listKategori = action.payload.data;
            })
            .addCase(getKategoriPengaturan.rejected, (state, action) => {
                state.loadingKategori = false;
                state.currentKategori = null;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(storeKategori.pending, (state) => {
                state.loadingCUD = true;
            })
            .addCase(storeKategori.fulfilled, (state) => {
                state.loadingCUD = false;
                state.statusResApi = 'success'
                state.messageResApi = 'Kategori berhasil ditambah'
                state.isDisplayMessage = true
            })
            .addCase(storeKategori.rejected, (state, action) => {
                state.loadingCUD = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(deleteKategori.pending, (state) => {
                state.loadingCUD = true;
            })
            .addCase(deleteKategori.fulfilled, (state) => {
                state.loadingCUD = false;
                state.statusResApi = 'success'
                state.messageResApi = 'Kategori berhasil dihapus'
                state.isDisplayMessage = true
            })
            .addCase(deleteKategori.rejected, (state, action) => {
                state.loadingCUD = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(updateKategori.pending, (state) => {
                state.loadingCUD = true;
            })
            .addCase(updateKategori.fulfilled, (state) => {
                state.loadingCUD = false;
                state.statusResApi = 'success'
                state.messageResApi = 'Kategori berhasil diupdate'
                state.isDisplayMessage = true
            })
            .addCase(updateKategori.rejected, (state, action) => {
                state.loadingCUD = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(getKaryawanPengaturan.pending, (state) => {
                state.loadingKaryawan = true;
                state.loadingSearch = true;
            })
            .addCase(getKaryawanPengaturan.fulfilled, (state, action) => {
                state.loadingKaryawan = false
                state.listKaryawanNotFinal = action.payload.data.map((item) => ({
                    ...item,
                    isChecked: false,
                }));
                state.listSearchKaryawan = action.payload.data.map((item) => ({
                    ...item,
                    isChecked: false,
                }));
                if (action.meta.arg.kategori_id) {
                    state.listKaryawan = action.payload.data
                }
            })
            .addCase(getKaryawanPengaturan.rejected, (state, action) => {
                state.loadingKaryawan = false;
                state.loadingSearch = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(detailKategori.pending, (state) => {
                state.loadingKategori = true;
            })
            .addCase(detailKategori.fulfilled, (state, action) => {
                state.loadingKategori = false;
                state.listKaryawan = action.payload.data[0].users.map((item) => ({
                    ...item,
                    isChecked: true,
                }));
            })
            .addCase(detailKategori.rejected, (state, action) => {
                state.loadingKategori = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(assignKategori.pending, (state) => {
                state.loadingAssign = true;
            })
            .addCase(assignKategori.fulfilled, (state) => {
                state.loadingAssign = false;
                state.statusResApi = 'success'
                state.messageResApi = 'Karyawan berhasil ditambahkan'
                state.isDisplayMessage = true
            })

            .addCase(assignKategori.rejected, (state, action) => {
                state.loadingAssign = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(unassignKategori.pending, (state) => {
                state.loadingAssign = true;
            })
            .addCase(unassignKategori.fulfilled, (state) => {
                state.loadingAssign = false;
                state.statusResApi = 'success'
                state.messageResApi = 'Karyawan berhasil dihapus'
                state.isDisplayMessage = true
            })
            .addCase(unassignKategori.rejected, (state, action) => {
                state.loadingAssign = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(getBatasWaktu.pending, (state) => {
                state.loadingKategori = true;
            })
            .addCase(getBatasWaktu.fulfilled, (state, action) => {
                state.loadingKategori = false;
                state.batasWaktuMasuk = action.payload.data.batas_waktu_absen_masuk
                state.batasWaktuPulang = action.payload.data.batas_waktu_absen_pulang
            })
            .addCase(getBatasWaktu.rejected, (state, action) => {
                state.loadingKategori = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(updateBatasWaktu.pending, (state) => {
                state.loadingKategori = true;
            })
            .addCase(updateBatasWaktu.fulfilled, (state) => {
                state.loadingKategori = false;
                state.statusResApi = 'success'
                state.messageResApi = 'Batas waktu berhasil diupdate'
                state.isDisplayMessage = true
            })

            .addCase(updateBatasWaktu.rejected, (state, action) => {
                state.loadingKategori = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(importKaryawan.pending, (state) => {
                state.loadingImport = true;
            })
            .addCase(importKaryawan.fulfilled, (state) => {
                state.loadingImport = false;
                state.statusResApi = 'success'
                state.messageResApi = 'Karyawan berhasil diimport'
                state.isDisplayMessage = true
            })
            .addCase(importKaryawan.rejected, (state, action) => {
                state.loadingImport = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })
    }
})

export const { setKategoriId, setCurrentKategori, updateStatePengaturan, toggleCheck, searchKaryawan, emptyKaryawan } = pengaturanSlice.actions
export default pengaturanSlice.reducer;