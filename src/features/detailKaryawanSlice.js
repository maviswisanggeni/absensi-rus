import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

const initialState = {
    nama: '',
    niy: '',
    email: '',
    password: '',
    noHp: '',
    alamat: '',
    linkFoto: '',
    errors: {
        nama: '',
        niy: '',
        email: '',
        password: '',
        noHp: '',
        alamat: '',
    },
    listKtgkaryawan: [],
    ktgKaryawan: '',
    listJadwal: [],
    isLoading: false,
};

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

export const storeKaryawan = createAsyncThunk("karyawan/storeKaryawan", async ({ nama, niy, email, password, alamat, no_hp, pf_foto, jadwal, ktg_karyawan }) => {
    console.log(pf_foto);
    const response = await axios.post(
        getBaseUrl() + `karyawan/store`,
        {
            nama: nama,
            email: email,
            password: password,
            alamat: alamat,
            no_hp: no_hp,
            pf_foto: pf_foto,
            jadwal: jadwal,
            ktg_karyawan: ktg_karyawan
        },
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            }
        }
    )
    return response.data
});

export const updateKaryawan = createAsyncThunk("karyawan/editKaryawan", async ({ id, nama, email, password, alamat, no_hp, pf_foto, jadwal, ktg_karyawan }) => {
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('alamat', alamat);
    formData.append('no_hp', no_hp);
    formData.append('pf_foto', pf_foto);
    formData.append('jadwal', jadwal);
    formData.append('ktg_karyawan', ktg_karyawan);
    const response = await axios.post(
        getBaseUrl() + `karyawan/update/${id}`,
        formData,
        // {
        //     nama: nama,
        //     email: email,
        //     password: password,
        //     alamat: alamat,
        //     no_hp: no_hp,
        //     pf_foto: pf_foto,
        //     jadwal: jadwal,
        //     ktg_karyawan: ktg_karyawan
        // },
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            }
        }
    )
    return response.data
});

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

    // Perform validation checks on the form fields
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

    // Perform more validation checks for other fields...

    return errors;
};

const detailKaryawanSlice = createSlice({
    name: 'detailKaryawan',
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
        deleteListItemKtgkaryawan: (state, action) => {
            const { id } = action.payload;
            state.listKtgkaryawan = state.listKtgkaryawan.filter((item) => item.id !== id);
        }
    },
    extraReducers: (builder) => {
        builder
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
            })
            .addCase(detailKaryawan.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const { updateFieldValue, updateFieldError, resetForm, setFormLoading, resetField, setImgUpload, updateListKtgkaryawan, deleteListItemKtgkaryawan } = detailKaryawanSlice.actions;
export default detailKaryawanSlice.reducer;