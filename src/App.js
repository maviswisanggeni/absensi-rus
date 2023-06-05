import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import Kehadiran from './pages/Kehadiran';
import Karyawan from './pages/Karyawan';
import Kalender from './pages/Kalender';
import './styles/css/App.css';
import Login from './pages/Login';
import Detail from './components/kehadiran/Detail';
import { KehadiranJmlKehadiranProvider } from './contexts/api/kehadiran/ContextApiKehadiran';
import { KehadiranListProvider } from './contexts/api/kehadiran/ContextApiKehadiranListData';
import { DashboardApiProvider } from './contexts/api/dashboard/ContextApiDashboard';
import { Route, Routes } from 'react-router';
import { ProfileApiProvider } from './contexts/api/ApiProfile';
import { DashboardApiStatistikProvider } from './contexts/api/dashboard/ApiDashboardStatistik';
import AddKaryawan from './components/karyawan/AddKaryawan';
import { KaryawanProvider } from './contexts/api/karyawan/ContextApiKaryawan';
import { KaryawanStoreUserProvider } from './contexts/api/karyawan/ContextApiKaryawanStoreUser';
import DetailKaryawan from './components/karyawan/DetailKaryawan';
import { KaryawanUpdateProvider } from './contexts/api/karyawan/ContextApiKaryawanEdit';
import WrapperCalendar from './contexts/app/WrapperCalendar';
import { KalenderProvider } from './contexts/api/kalender/ContextApiKalender';
import NotFound from './components/NotFound';
import { WrapperAddKaryawanProvider } from './contexts/app/WrapperAddKaryawan';
import { WrapperEditKaryawanProvider } from './contexts/app/WrapperEditKaryawan';
import KalenderAdd from './pages/KalenderAdd';
import Pengaturan from './pages/pengaturan/Pengaturan';
import ImportUser from './pages/pengaturan/ImportUser';

function App() {
  return (
    <>
      <Routes>
        <Route path='/dashboard'
          element={
            <DashboardApiProvider>
              <DashboardApiStatistikProvider>
                <Dashboard />
              </DashboardApiStatistikProvider>
            </DashboardApiProvider>
          }
        />

        <Route path='/kehadiran/*'
          element={
            <KehadiranJmlKehadiranProvider>
              <KehadiranListProvider>
                <Kehadiran />
              </KehadiranListProvider>
            </KehadiranJmlKehadiranProvider>
          }
        />

        <Route path='/kehadiran/detail/:id' element={<Detail />} />

        <Route path='/karyawan/*'
          element={
            <KaryawanProvider>
              <KaryawanStoreUserProvider>
                <KaryawanUpdateProvider>
                  <Karyawan />
                </KaryawanUpdateProvider>
              </KaryawanStoreUserProvider>
            </KaryawanProvider>
          }
        />

        <Route path='/kalender'
          element={
            <KalenderProvider>
              <WrapperCalendar>
                <Kalender />
              </WrapperCalendar>
            </KalenderProvider>
          }
        />

        <Route path='/kalender/add/:date?/:id?' element={<KalenderAdd />} />

        <Route path='/karyawan/add' element={
          <KaryawanStoreUserProvider>
            <WrapperAddKaryawanProvider>
              <AddKaryawan />
            </WrapperAddKaryawanProvider>
          </KaryawanStoreUserProvider>}
        />

        <Route path='/karyawan/edit/:id' element={
          <KaryawanUpdateProvider>
            <WrapperEditKaryawanProvider>
              <DetailKaryawan />
            </WrapperEditKaryawanProvider>
          </KaryawanUpdateProvider>
        }
        />

        <Route path='/pengaturan/*' element={<Pengaturan />} />

        <Route path='*' element={<NotFound />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
