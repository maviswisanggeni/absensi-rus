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

function App() {
  return (
    <div className='body'>
      <WrapperCalendar>
        <KaryawanUpdateProvider>
          <KaryawanStoreUserProvider>
            <KaryawanProvider>
              <KehadiranSearchProvider>
                <KehadiranListProvider>
                  <KehadiranJmlKehadiranProvider>
                    <Sidebar />
                    <DashboardApiProvider>
                      <DashboardApiStatistikProvider>
                        <ProfileApiProvider>
                          <Routes>
                            <Route path='/' element={<Dashboard />} />
                            <Route path='/kehadiran' element={<Kehadiran />} />
                            <Route path='/kehadiran/detail/:id' element={<Detail />} />
                            <Route path='/karyawan' element={<Karyawan />} />
                            <Route path='/kalender' element={<Kalender />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/karyawan/add' element={<AddKaryawan/>}/>
                            <Route path='/karyawan/edit/:id' element={<DetailKaryawan />} />
                          </Routes>
                        </ProfileApiProvider>
                      </DashboardApiStatistikProvider>
                    </DashboardApiProvider>
                  </KehadiranJmlKehadiranProvider>
                </KehadiranListProvider>
              </KehadiranSearchProvider>
            </KaryawanProvider>
          </KaryawanStoreUserProvider>
        </KaryawanUpdateProvider>
      </WrapperCalendar>
    </div>
  );
}

export default App;
