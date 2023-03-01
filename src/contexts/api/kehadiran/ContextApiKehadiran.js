import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';
import formatDate from "../../../components/useFormatCalendar";

const ContextApiKehadiranJmlKehadiran = createContext({})

function useKehadiranJmlKehadiran(){
    return useContext(ContextApiKehadiranJmlKehadiran)
}

function KehadiranJmlKehadiranProvider ({children}) {
    const [jmlKehadiran, setJmlKehadiran] = useState(null);
    const [date, setDate] = useState(formatDate(new Date()))
    const [tanggal, setTanggal] = useState(new Date().getDate())
    const [bulan, setBulan] = useState(new Date().getMonth() + 1)
    const [tahun, setTahun] = useState(new Date().getFullYear())
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function getDataJmlKehadiran() {
            const url = "https://absensiguru.smkrus.com/api/kehadiran"
            setLoading(false);
            const request = {
                tanggal: tanggal,
                bulan: bulan,
                tahun: tahun,
            }
            axios.get(url, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: request
                })
                .then((response) => {
                    setJmlKehadiran(response.data.data.jml_kehadiran); 
                    setLoading(true);
                }).catch((error) => {
                    console.log(error);
                })
        }
        getDataJmlKehadiran();
    }, [tanggal, bulan, tahun]);

    const contextValue = {
        jmlKehadiran,
        setJmlKehadiran, 
        date, 
        setDate,        
        loading,
        setLoading,
        tahun, setTahun,
        bulan, setBulan,
        tanggal, setTanggal,
    }
    return(
        <ContextApiKehadiranJmlKehadiran.Provider value={contextValue}>
            {children}
        </ContextApiKehadiranJmlKehadiran.Provider>
    )
}

export {ContextApiKehadiranJmlKehadiran, useKehadiranJmlKehadiran, KehadiranJmlKehadiranProvider}