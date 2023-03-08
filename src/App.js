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
import { KehadiranSearchProvider } from './contexts/api/kehadiran/ContextApiKehadiranSearch';
import { KehadiranDetailProvider } from './contexts/api/kehadiran/ContextApiKehadiranDetail';
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

function App() {
  return (
    <div className='body'>
      <Sidebar />
      <ProfileApiProvider>
            <Routes>
              <Route path='/'
                element={
                  <DashboardApiProvider>
                    <DashboardApiStatistikProvider>
                      <Dashboard />
                    </DashboardApiStatistikProvider>
                  </DashboardApiProvider>
                }
              />

              <Route path='/kehadiran'
                element={
                  <KehadiranJmlKehadiranProvider>
                    <KehadiranListProvider>
                      <KehadiranSearchProvider>
                        <Kehadiran />
                      </KehadiranSearchProvider>
                    </KehadiranListProvider>
                  </KehadiranJmlKehadiranProvider>
                }
              />

              <Route path='/kehadiran/detail/:id' element={<Detail />} />

              <Route path='/karyawan'
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
              <Route path='/login' element={<Login />} />
              <Route path='/karyawan/add' element={
                <KaryawanStoreUserProvider>
                  <WrapperAddKaryawanProvider>
                    <AddKaryawan />
                  </WrapperAddKaryawanProvider>                  
                </KaryawanStoreUserProvider>} 
              />
              <Route path='/karyawan/edit/:id' element={<KaryawanUpdateProvider><DetailKaryawan /></KaryawanUpdateProvider>} />
              <Route path='*' element={<NotFound />}/>
            </Routes>
      </ProfileApiProvider>
    </div>
  );
}

export default App;
