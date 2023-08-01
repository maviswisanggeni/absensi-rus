import Dashboard from './pages/dashboard/Dashboard';
import Kehadiran from './pages/kehadiran/Kehadiran';
import Karyawan from './pages/karyawan/Karyawan';
import Kalender from './pages/kalender/Kalender';
import './styles/css/App.css';
import Login from './pages/Auth/Login';
import Detail from './pages/kehadiran/Detail';
import { Route, Routes } from 'react-router';
import AddKaryawan from './pages/karyawan/AddKaryawan';
import DetailKaryawan from './pages/karyawan/DetailKaryawan';
import NotFound from './components/NotFound';
import KalenderAddOrDetail from './pages/kalender/KalenderAddOrDetail';
import Pengaturan from './pages/pengaturan/Pengaturan';
import AlertNotAuthorize from './components/AlertNotAuthorize';
import NoInternetConnection from './components/NoInternetConnection';

function App() {
  return (
    <>
      <NoInternetConnection>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/kehadiran/*' element={<Kehadiran />} />
          <Route path='/kehadiran/detail/:izin?/:id' element={<Detail />} />
          <Route path='/karyawan/*' element={<Karyawan />} />
          <Route path='/kalender' element={<Kalender />} />
          <Route path='/kalender/add/:date?/:id?' element={<KalenderAddOrDetail />} />
          <Route path='/karyawan/add' element={<AddKaryawan />} />
          <Route path='/karyawan/edit/:id' element={<DetailKaryawan />} />
          <Route path='/pengaturan/*' element={<Pengaturan />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <AlertNotAuthorize />
      </NoInternetConnection>
    </>
  );
}

export default App;
