import { configureStore } from '@reduxjs/toolkit';
import karyawanSlice from './features/karyawanSlice';
import statistikSlice from './features/statistikSlice';
import jmlKehadiranSlice from './features/jmlKehadiranSlice';
import kehadiranSlice from './features/kehadiranSlice';
import kategoriSlice from './features/ketegoriSlice';
import detailKaryawanSlice from './features/detailKaryawanSlice';
import kalenderSlice from './features/kalenderSlice';
import pengaturanSlice from './features/pengaturanSlice';
import koordinatSlice from './features/koordinatSlice';

export const store = configureStore({
  reducer: {
    statistik: statistikSlice,
    jmlKehadiran: jmlKehadiranSlice,
    karyawan: karyawanSlice,
    kehadiran: kehadiranSlice,
    kategori: kategoriSlice,
    detailKaryawanSlice: detailKaryawanSlice,
    kalender: kalenderSlice,
    pengaturan: pengaturanSlice,
    koordinat: koordinatSlice
  },
});
