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
import AlertNotAuthorize from './middleware/AlertNotAuthorize';
import NoInternetConnection from './middleware/NoInternetConnection';
import WrapperCalendar from './contexts/app/WrapperCalendar';
import ResponsiveAlert from './middleware/ResponsiveAlert';
import PrivateRoutes from './middleware/PrivateRoutes';

function App() {
  return (
    <>
      <ResponsiveAlert>
        <NoInternetConnection>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/' element={<Dashboard />} />

              <Route path='/kehadiran/*' element={<Kehadiran />} />
              <Route path='/kehadiran/detail/:izin?/:id' element={<Detail />} />

              <Route path='/karyawan/*' element={<Karyawan />} />
              <Route path='/karyawan/add' element={<AddKaryawan />} />
              <Route path='/karyawan/edit/:id' element={<DetailKaryawan />} />

              <Route
                path='/kalender'
                element={
                  <WrapperCalendar>
                    <Kalender />
                  </WrapperCalendar>
                }
              />
              <Route path='/kalender/add/:date?/:id?' element={<KalenderAddOrDetail />} />

              <Route path='/pengaturan/*' element={<Pengaturan />} />
              <Route path='*' element={<NotFound />} />
            </Route>

            <Route path='/login' element={<Login />} />
          </Routes>
          <AlertNotAuthorize />
        </NoInternetConnection>
      </ResponsiveAlert>
    </>
  );
}

export default App;
