import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import Kehadiran from './pages/Kehadiran';
import Karyawan from './pages/Karyawan';
import Kalender from './pages/Kalender';
import Login from './pages/Login';
import './styles/App.css';

function App() {
  return (
    <div className='body'>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/kehadiran' element={<Kehadiran/>}/>
        <Route path='/karyawan' element={<Karyawan/>}/>
        <Route path='/kalender' element={<Kalender/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>

      
    </div>
  );
}

export default App;
