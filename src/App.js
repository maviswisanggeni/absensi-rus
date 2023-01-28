import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import Kehadiran from './pages/Kehadiran';
import Karyawan from './pages/Karyawan';
import Kalender from './pages/Kalender';
import './styles/css/App.css';
import Login from './pages/Login';
import Detail from './components/kehadiran/Detail';
import { KehadiranJmlKehadiranProvider } from './contexts/api/ContextApiKehadiran';
import { KehadiranListProvider } from './contexts/api/ContextApiKehadiranListData';
import { DashboardApiProvider } from './contexts/api/ContextApiDashboard';

function App() {
  return (
    <div className='body'>
      <KehadiranListProvider>
        <KehadiranJmlKehadiranProvider>
          <Sidebar/>
          <DashboardApiProvider>
            <Routes>
              <Route path='/' element={<Dashboard/>}/>
              <Route path='/kehadiran' element={<Kehadiran/>}/>
              <Route path='/kehadiran/detail-:id' element={<Detail/>}/>
              <Route path='/karyawan' element={<Karyawan/>}/>
              <Route path='/kalender' element={<Kalender/>}/>
              <Route path='/login' element={<Login/>}/>
            </Routes>
            </DashboardApiProvider>
        </KehadiranJmlKehadiranProvider>
      </KehadiranListProvider>
    </div>
  );
}

export default App;
