import { configureStore } from '@reduxjs/toolkit';
import karyawanSlice from './features/karyawanSlice';

export const store = configureStore({
  reducer: {
    karyawan: karyawanSlice
  },
});
