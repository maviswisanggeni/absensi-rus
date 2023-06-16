import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

const validateForm = (state) => {
    const errors = {
        nama: '',
        niy: '',
        email: '',
        password: '',
        noHp: '',
        alamat: '',
    };

    const isValidEmail = (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    };

    if (state.nama.trim() === '') {
        errors.nama = 'Isi nama';
    }

    if (state.niy.trim() === '') {
        errors.niy = 'NIY is required.';
    }

    if (state.password.trim() === '' || state.password.length < 8) {
        errors.password = 'Isi password minimal 8 karakter';
    }

    if (state.noHp.trim() === '' || state.noHp.length < 10) {
        errors.noHp = 'Nomor tidak valid';
    }

    if (state.alamat.trim() === '') {
        errors.alamat = 'Isi Alamat';
    }

    if (state.email.trim() === '') {
        errors.email = 'Email is required.';
    } else if (!isValidEmail(state.email)) {
        errors.email = 'Email tidak valid';
    }

    return errors;
};

const initialState = {
    listKaryawan: [],
    currentPage: 1,
    keterangan: null,
    urutan: 'Sesuai abjad',
    search: '',

    nama: '',
    niy: '',
    email: '',
    password: 'password',
    noHp: '',
    alamat: '',
    linkFoto: '',
    errors: validateForm({
        nama: '',
        niy: '',
        email: '',
        password: '',
        noHp: '',
        alamat: '',
    }),
    listKtgkaryawan: [],
    listJadwal: [
        {
            hari: 'senin',
            jam_masuk: '',
            jam_pulang: ''
        },
        {
            hari: 'selasa',
            jam_masuk: '',
            jam_pulang: ''
        },
        {
            hari: 'rabu',
            jam_masuk: '',
            jam_pulang: ''
        },
        {
            hari: 'kamis',
            jam_masuk: '',
            jam_pulang: ''
        },
        {
            hari: 'jumat',
            jam_masuk: '',
            jam_pulang: ''
        },
        {
            hari: 'sabtu',
            jam_masuk: '',
            jam_pulang: ''
        },
        {
            hari: 'minggu',
            jam_masuk: '',
            jam_pulang: ''
        }
    ],

    isInitialGet: false,
    statusResApi: '',
    messageResApi: '',
    isDisplayMessage: false,

    ktgKaryawan: '',
    kategoriId: null,
    isLoading: true,
};

export const getKaryawan = createAsyncThunk("karyawan/getKaryawan", async ({ kategori_id, search }) => {
    const response = await axios.get(
        getBaseUrl() + 'karyawan',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
            params: {
                kategori_id,
                search
            }
        }
    )
    return response.data
})

export const detailKaryawan = createAsyncThunk("karyawan/detailKaryawan", async (id) => {
    const response = await axios.get(
        getBaseUrl() + `karyawan/detail/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            }
        }
    )
    return response.data
});

export const storeKaryawan = createAsyncThunk("karyawan/storeKaryawan", async ({
    nama, niy, email, password, alamat, no_hp, pf_foto, jadwal, ktg_karyawan
}) => {

    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('niy', niy);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('alamat', alamat);
    formData.append('no_hp', no_hp);
    formData.append('pf_foto', pf_foto);

    jadwal.forEach((item, index) => {
        const prefix = `jadwal[${index}]`;
        formData.append(`${prefix}[hari]`, item.hari);
        formData.append(`${prefix}[jam_masuk]`, item.jam_masuk);
        formData.append(`${prefix}[jam_pulang]`, item.jam_pulang);
    });
    ktg_karyawan.forEach((item, index) => {
        formData.append(`ktg_karyawan[${index}]`, item);
    });

    const response = await axios.post(
        getBaseUrl() + `karyawan/store`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
                'Content-Type': 'multipart/form-data',
            }
        },
    )
    return response.data
});

export const updateKaryawan = createAsyncThunk("karyawan/editKaryawan", async ({
    id, nama, email, password, alamat, no_hp, pf_foto, jadwal, ktg_karyawan
}) => {

    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('alamat', alamat);
    formData.append('no_hp', no_hp);
    if (pf_foto) {
        formData.append('pf_foto', pf_foto);
    }

    jadwal.forEach((item, index) => {
        const prefix = `jadwal[${index}]`;
        formData.append(`${prefix}[hari]`, item.hari);
        formData.append(`${prefix}[jam_masuk]`, item.jam_masuk);
        formData.append(`${prefix}[jam_pulang]`, item.jam_pulang);
    });
    ktg_karyawan.forEach((item, index) => {
        formData.append(`ktg_karyawan[${index}]`, item);
    });

    const response = await axios.post(
        getBaseUrl() + `karyawan/update/${id}`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
                'Content-Type': 'multipart/form-data'
            },
        }
    )
    return response.data
});

export const deleteKaryawan = createAsyncThunk("karyawan/deleteKaryawan", async (id) => {
    const response = await axios.get(
        getBaseUrl() + `karyawan/delete/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            },
        }
    )
    return response.data
});

const karyawanSlice = createSlice({
    name: 'karyawan',
    initialState,
    reducers: {
        updateFieldValue: (state, action) => {
            const { field, value } = action.payload;
            if (field === 'listJadwal') {
                state.listJadwal = value;
            } else {
                state[field] = value;
                state.errors = validateForm(state)
            }
        },
        updateFieldError: (state, action) => {
            const { field, error } = action.payload;
            state.errors[field] = error;
        },
        updateStateKaryawan: (state, action) => {
            const { name, value } = action.payload
            state[name] = value
        },
        resetForm: () => initialState,
        resetField: (state, action) => {
            const field = action.payload;
            state[field] = '';
            state.errors[field] = 'Isi nama';
        },
        setImgUpload: (state, action) => {
            return action.payload
        },
        updateListKtgkaryawan: (state, action) => {
            const { kategori, id } = action.payload;
            const isIdAlreadyAdded = state.listKtgkaryawan.some((item) => item.id === id);
            if (!isIdAlreadyAdded) {
                state.listKtgkaryawan.push({ kategori, id });
            } else {
                console.log("Item with the same id already exists.");
            }
        },
        deleteKategori: (state, action) => {
            const { id } = action.payload;
            state.listKtgkaryawan = state.listKtgkaryawan.filter((item) => item.id !== id);
        },
        resetListKaryawan: (state) => {
            state.listKaryawan = []
        },
        resetTable: (state) => {
            state.listKaryawan = []
            state.isLoading = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getKaryawan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getKaryawan.fulfilled, (state, action) => {
                state.isLoading = false;
                state.listKaryawan = action.payload.data;
                state.isInitialGet = true
            })
            .addCase(getKaryawan.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(detailKaryawan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(detailKaryawan.fulfilled, (state, action) => {
                state.isLoading = false;
                const initialData = action.payload.user;
                state.nama = initialData.nama;
                state.niy = initialData.niy;
                state.email = initialData.email;
                state.noHp = initialData.no_hp;
                state.alamat = initialData.alamat;
                state.linkFoto = initialData.link_foto;
                state.listKtgkaryawan = initialData.ktgkaryawan;
                state.ktgKaryawan = initialData.ktgkaryawan[0].kategori;
                state.listJadwal = initialData.jadwal;
                state.errors = validateForm(state);
            })
            .addCase(detailKaryawan.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(storeKaryawan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(storeKaryawan.fulfilled, (state) => {
                state.isLoading = false;
                state.statusResApi = 'success'
                state.messageResApi = 'Karyawan berhasil ditambahkan'
                state.isDisplayMessage = true
            })
            .addCase(storeKaryawan.rejected, (state, action) => {
                state.isLoading = false;
                state.statusResApi = action.error.code
                state.messageResApi = action.error.message
                state.isDisplayMessage = true
            })
            .addCase(updateKaryawan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateKaryawan.fulfilled, (state) => {
                state.isLoading = false;
                state.statusResApi = 'success'
                state.messageResApi = 'Karyawan berhasil diedit'
                state.isDisplayMessage = true
            })
            .addCase(updateKaryawan.rejected, (state, action) => {
                state.isLoading = false;
                state.statusResApi = action.error.code
                state.messageResApi = action.error.message
                state.isDisplayMessage = true
            })
            .addCase(deleteKaryawan.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteKaryawan.fulfilled, (state) => {
                state.isLoading = false;
                state.statusResApi = 'success'
                state.messageResApi = 'Karyawan berhasil dihapus'
                state.isDisplayMessage = true
            })
            .addCase(deleteKaryawan.rejected, (state, action) => {
                state.isLoading = false;
                state.statusResApi = action.error.code
                state.messageResApi = action.error.message
                state.isDisplayMessage = true
            })
    }
});

export const {
    updateFieldValue, updateFieldError, resetForm, setFormLoading, resetField, resetTable,
    setImgUpload, updateListKtgkaryawan, deleteKategori, updateStateKaryawan, resetListKaryawan
} = karyawanSlice.actions;
export default karyawanSlice.reducer;