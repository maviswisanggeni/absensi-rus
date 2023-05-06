import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";
import getBaseUrl from "../datas/apiUrl";
import token from "../datas/tokenAuthorization";

export const getKaryawan = createAsyncThunk("karyawan/getKaryawan", async () => {
    const response = await axios.get(
        getBaseUrl() + 'karyawan',
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            }
        }
    )
    return response.data
})

export const detailKaryawan = createAsyncThunk("karyawan/detailKaryawan", async (id) => {
    console.log(id)
    const response = await axios.get(
        getBaseUrl() + `karyawan/edit/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token()}`,
            }
        }
    )
    return response.data
});

// export const addKaryawan = createAsyncThunk("karyawan/addKaryawan", async({}) => {
//     const response = await axios.post('http://localhost:5000/products', {
//         title, 
//         price
//     })
//     return response.data
// })

// export const deleteProducts = createAsyncThunk("products/deleteProduct", async(id) => {
//     await axios.delete(`http://localhost:5000/products/${id}`,)
//     return id
// })

// export const updateProducts = createAsyncThunk("products/updateProduct", async({id, title, price}) => {
//     const response = await axios.patch(`http://localhost:5000/products/${id}`, {
//         title, 
//         price
//     })
//     return response.data
// })

const karyawanEntity = createEntityAdapter({
    selectId: (karyawan) => karyawan.id
})

const karyawanSlice = createSlice({
    name: 'karyawan',
    initialState: {
        listPengajar: [],
        listStaff: [],
        loading: false,
        currentPage: 1,
        keterangan: true,
        urutan: 'Sesuai abjad',
    },
    reducers: {
        tabbarToggle: (state, action) => {
            state.keterangan = action.payload
        }
    },
    extraReducers: {
        [getKaryawan.pending]: (state) => {
            state.loading = false
        },
        [getKaryawan.fulfilled]: (state, action) => {
            state.loading = true
            state.listPengajar = action.payload.pengajar
            state.listStaff = action.payload.staff
        },
        [detailKaryawan.pending]: (state) => {
            state.loading = false
        },
        [detailKaryawan.fulfilled]: (state, action) => {
            state.loading = true
            state.singleKaryawan = [action.payload]
        },
        // [savedProducts.fulfilled]: (state, action) => {
        //     productEntity.addOne(state, action.payload)
        // },
        // [deleteProducts.fulfilled]: (state, action) => {
        //     productEntity.removeOne(state, action.payload)
        // },
        // [updateProducts.fulfilled]: (state, action) => {
        //     productEntity.updateOne(state, {id: action.payload.id, updates: action.payload})
        // },
    }
})

// export const karyawanSelectors = karyawanEntity.getSelectors(state => state.karyawan)
export const { tabbarToggle } = karyawanSlice.actions
export default karyawanSlice.reducer;