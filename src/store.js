import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import statistikSlice from './features/statistikSlice';
import jmlKehadiranSlice from './features/jmlKehadiranSlice';
import kehadiranSlice from './features/kehadiranSlice';
import kategoriSlice from './features/ketegoriSlice';
import kalenderSlice from './features/kalenderSlice';
import pengaturanSlice from './features/pengaturanSlice';
import koordinatSlice from './features/koordinatSlice';
import karyawanSlice from './features/karyawanSlice';
import apiMiddleware from './middleware/apiMiddleware';
import authorizeSlice from './features/authorizeSlice';
import kehadiranDetailSlice from './features/kehadiranDetailSlice';

export const store = configureStore({
  reducer: {
    statistik: statistikSlice,
    jmlKehadiran: jmlKehadiranSlice,
    kehadiran: kehadiranSlice,
    kehadiranDetail: kehadiranDetailSlice,
    kategori: kategoriSlice,
    karyawan: karyawanSlice,
    kalender: kalenderSlice,
    pengaturan: pengaturanSlice,
    koordinat: koordinatSlice,
    authorize: authorizeSlice,
  },
  middleware: [...getDefaultMiddleware(), apiMiddleware]
});