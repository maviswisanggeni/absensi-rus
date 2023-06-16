import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

export const getKategoriPengaturan = createAsyncThunk("pengaturan/getKategori", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl() + 'setting/kategori',
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

export const detailKategori = createAsyncThunk("pengaturan/detailKategori", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl() + `setting/kategori/detail/${id}`,
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

export const storeKategori = createAsyncThunk("pengaturan/storeKategori", async (nama_kategori, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            getBaseUrl() + 'setting/kategori/store',
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
        }

        return rejectWithValue(error.code)
    }
})

export const updateKategori = createAsyncThunk("pengaturan/updateKategori", async ({ id, nama_kategori }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            getBaseUrl() + `setting/kategori/update/${id}`,
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
        }

        return rejectWithValue(error.code)
    }
})

export const deleteKategori = createAsyncThunk("pengaturan/deleteKategori", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl() + `setting/kategori/delete/${id}`,
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

export const getKaryawanPengaturan = createAsyncThunk("pengaturan/getKaryawan", async ({ search }, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            getBaseUrl() + `setting/kategori/get-karyawan`,
            {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
                params: {
                    search
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

export const assignKategori = createAsyncThunk("pengaturan/assignKategori", async ({ kategori_id, karyawan_id }, { rejectWithValue }) => {
    const formData = new FormData()
    formData.append('kategori_id', kategori_id)
    karyawan_id.forEach((item, index) => {
        formData.append(`karyawan_id[${index}]`, item.id)
    })

    try {
        const response = await axios.post(
            getBaseUrl() + `setting/kategori/assign`,
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
        }

        return rejectWithValue(error.code)
    }
})

export const unassignKategori = createAsyncThunk("pengaturan/unassignKategori", async ({ kategori_id, user_id }, { rejectWithValue }) => {
    const reqBody = JSON.stringify({
        "unassign": [
            {
                "user_id": user_id,
                "kategori_id": kategori_id
            }
        ]
    })

    try {
        const response = await axios.post(
            getBaseUrl() + `setting/kategori/unassign`,
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
        }

        return rejectWithValue(error.code)
    }
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

        kategoriInput: '',

        statusResApi: '',
        messageResApi: '',
        isDisplayMessage: false,
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
    extraReducers: (builder) => {
        builder
            .addCase(getKategoriPengaturan.pending, (state) => {
                state.loadingKategori = true;
                state.currentKategori = null;
            })
            .addCase(getKategoriPengaturan.fulfilled, (state, action) => {
                state.loadingKategori = false;
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
                state.loadingKategori = true;
            })
            .addCase(storeKategori.fulfilled, (state) => {
                state.loadingKategori = false;
            })
            .addCase(storeKategori.rejected, (state, action) => {
                state.loadingKategori = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(deleteKategori.pending, (state) => {
                state.loadingKategori = true;
            })
            .addCase(deleteKategori.fulfilled, (state) => {
                state.loadingKategori = false;
            })
            .addCase(deleteKategori.rejected, (state, action) => {
                state.loadingKategori = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(updateKategori.pending, (state) => {
                state.loadingKategori = true;
            })
            .addCase(updateKategori.fulfilled, (state) => {
                state.loadingKategori = false;
            })
            .addCase(updateKategori.rejected, (state, action) => {
                state.loadingKategori = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(getKaryawanPengaturan.pending, (state) => {
                state.loadingKaryawan = true;
                state.loadingSearch = true;
            })
            .addCase(getKaryawanPengaturan.fulfilled, (state, action) => {
                state.listKaryawanNotFinal = action.payload.data.map((item) => ({
                    ...item,
                    isChecked: false,
                }));
                state.listSearchKaryawan = action.payload.data.map((item) => ({
                    ...item,
                    isChecked: false,
                }));
                if (action.meta.arg && action.meta.arg.search) {
                    state.listSearchKaryawan = action.payload.data.map((item) => ({
                        ...item,
                        isChecked: true,
                    }));
                    state.loadingSearch = false;
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
                state.loadingKategori = true;
            })
            .addCase(assignKategori.fulfilled, (state) => {
                state.loadingKategori = false;
            })

            .addCase(assignKategori.rejected, (state, action) => {
                state.loadingKategori = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            })


            .addCase(unassignKategori.pending, (state) => {
                state.loadingKategori = true;
            })
            .addCase(unassignKategori.fulfilled, (state) => {
                state.loadingKategori = false;
            })
            .addCase(unassignKategori.rejected, (state, action) => {
                state.loadingKategori = false;
                state.statusResApi = action.error.message
                state.messageResApi = action.payload
                state.isDisplayMessage = true
            });
    }
})

export const { setKategoriId, setCurrentKategori, updateInputPengaturan, deleteKaryawan, searchKaryawan } = pengaturanSlice.actions
export default pengaturanSlice.reducer;