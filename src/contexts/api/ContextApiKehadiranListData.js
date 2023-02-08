import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
const ContextApiKehadiranList = createContext({})

function useKehadiranListAbsensi(){
    return useContext(ContextApiKehadiranList)
}

function KehadiranListProvider ({children}) {
    const [listAbsensiMasuk, setListAbsensiMasuk] = useState(null);
    const [listAbsensiKeluar, setListAbsensiKeluar] = useState(null);
    const [keterangan, setKeterangan] = useState('Masuk');
    const [loading, setLoading] = useState(false);
    const [tanggal, setTanggal] = useState(new Date().getDate())
    const [bulan, setBulan] = useState(new Date().getMonth() + 1)
    const [tahun, setTahun] = useState(new Date().getFullYear())
    const token = localStorage.getItem("token");
    useEffect(() => {
        async function getDataJmlKehadiran() {
            const url = "https://absensiguru.smkrus.com/api/kehadiran/history"
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
                    setListAbsensiMasuk(response.data.data.masuk);
                    setListAbsensiKeluar(response.data.data.pulang);
                    setLoading(true);
                }).catch((error) => {
                    console.log(error);
                })
        }
        getDataJmlKehadiran();
    }, [tanggal, bulan, tahun]);

    const contextValue = {
        listAbsensiMasuk, 
        setListAbsensiMasuk, 
        listAbsensiKeluar,
        setListAbsensiKeluar,
        loading,
        setLoading,
        tanggal,
        setTanggal,
        bulan,
        setBulan,
        tahun,
        setTahun,
        keterangan,
        setKeterangan
    }

    return(
        <ContextApiKehadiranList.Provider value={contextValue}>
            {children}
        </ContextApiKehadiranList.Provider>
    )
}

export {ContextApiKehadiranList, KehadiranListProvider, useKehadiranListAbsensi}