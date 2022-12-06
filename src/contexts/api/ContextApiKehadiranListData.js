import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
const ContextApiKehadiranList = createContext({})

function useKehadiranListAbsensi(){
    return useContext(ContextApiKehadiranList)
}

function KehadiranListProvider ({children}) {
    const [listAbsensi, setListAbsensi] = useState(null);

    useEffect(() => {
        async function getDataListAbsensi() {
            const url = "http://absensiguru.smkradenumarsaidkudus.sch.id/api/kehadiran/list-absensi"
            const request = {   
                    start_time: "2022-11-10",
                    end_time: "2022-11-12",
                    keterangan: "masuk",
                    urutan: "terlambat",
                    per_page: 4, 
              }
            const response = await axios.post(url, request); 
            setListAbsensi(response.data);
        }
        getDataListAbsensi();
    }, []);

    const contextValue = [listAbsensi, setListAbsensi]

    return(
        <ContextApiKehadiranList.Provider value={contextValue}>
            {children}
        </ContextApiKehadiranList.Provider>
    )
}

export {ContextApiKehadiranList, KehadiranListProvider, useKehadiranListAbsensi}