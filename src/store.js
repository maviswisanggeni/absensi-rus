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
import popupSlice from './features/popUpSlice';

export const store = configureStore({
  reducer: {
    statistik: statistikSlice,
    jmlKehadiran: jmlKehadiranSlice,
    kehadiran: kehadiranSlice,
    kategori: kategoriSlice,
    karyawan: karyawanSlice,
    kalender: kalenderSlice,
    pengaturan: pengaturanSlice,
    koordinat: koordinatSlice,
    popup: popupSlice,
  },
  middleware: [...getDefaultMiddleware(), apiMiddleware]
});