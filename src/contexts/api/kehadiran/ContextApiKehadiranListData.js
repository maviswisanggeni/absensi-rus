import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import formatDate from "../../../components/useFormatCalendar";

const ContextApiKehadiranList = createContext({})

function useKehadiranListAbsensi(){
    return useContext(ContextApiKehadiranList)
}

function KehadiranListProvider ({children}) {
    const [listAbsensiMasuk, setListAbsensiMasuk] = useState([]);
    const [listAbsensiKeluar, setListAbsensiKeluar] = useState([]);
    const [keterangan, setKeterangan] = useState('Masuk');
    const [urutan, setUrutan] = useState('Tercepat')
    const [loading, setLoading] = useState(false);
    const [tanggal, setTanggal] = useState(new Date().getDate())
    const [bulan, setBulan] = useState(new Date().getMonth() + 1)
    const [tahun, setTahun] = useState(new Date().getFullYear())
    const [jmlKehadiran, setJmlKehadiran] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const token = localStorage.getItem("token");

    function getDataJmlKehadiran() {
        const url = "https://absensiguru.smkrus.com/api/kehadiran"
        const request = {
            tanggal: tanggal,
            bulan: bulan,
            tahun: tahun,
        }
        setLoading(false);
        axios.get(url, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: request
            })
            .then((response) => {
                setListAbsensiMasuk(response.data.data.list_absen.masuk.data);
                setListAbsensiKeluar(response.data.data.list_absen.pulang.data);
                setJmlKehadiran(response.data.data.jml_kehadiran);
                setLoading(true);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getDataJmlKehadiran();
    }, []);

    const contextValue = {
        listAbsensiMasuk, setListAbsensiMasuk, 
        listAbsensiKeluar, setListAbsensiKeluar,
        loading, setLoading,
        tanggal, setTanggal,
        bulan, setBulan,
        tahun, setTahun,
        keterangan, setKeterangan,
        jmlKehadiran, setJmlKehadiran,
        currentPage, setCurrentPage,
        urutan, setUrutan,
        getDataJmlKehadiran
    }

    return(
        <ContextApiKehadiranList.Provider value={contextValue}>
            {children}
        </ContextApiKehadiranList.Provider>
    )
}

export {ContextApiKehadiranList, KehadiranListProvider, useKehadiranListAbsensi}