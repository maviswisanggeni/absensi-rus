import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import formatDate from "../../components/useFormatCalendar";
const ContextApiKehadiranList = createContext({})

function useKehadiranListAbsensi(){
    return useContext(ContextApiKehadiranList)
}

function KehadiranListProvider ({children}) {
    const [listAbsensi, setListAbsensi] = useState(null);
    const [urutan, setUrutan] = useState('tercepat');
    const [keterangan, setKeterangan] = useState('masuk')
    const [startTime, setStartTime] = useState(formatDate(new Date()))
    const [endTime, setEndTime] = useState(formatDate(new Date()))
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // async function getDataListAbsensi() {
        //     const url = "http://absensiguru.smkradenumarsaidkudus.sch.id/api/kehadiran/list-absensi"
        //     const headers = {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': '*',
        //     }
        //     const request = {
        //             start_time: startTime,
        //             end_time: endTime,
        //             keterangan: keterangan,
        //             urutan: urutan,
        //             per_page: 1, 
        //     }
        //     setLoading(false);
        //     axios.post(url, {params: request}, {headers: headers}).then((response) => {
        //         setListAbsensi(response.data);
        //         setLoading(true);
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        // }
        // getDataListAbsensi();
    }, [startTime, endTime, keterangan, urutan]);

    const contextValue = {
        listAbsensi, 
        setListAbsensi, 
        urutan, 
        setUrutan, 
        keterangan, 
        setKeterangan, 
        startTime, 
        setStartTime, 
        endTime, 
        setEndTime,
        loading,
        setLoading
    }

    return(
        <ContextApiKehadiranList.Provider value={contextValue}>
            {children}
        </ContextApiKehadiranList.Provider>
    )
}

export {ContextApiKehadiranList, KehadiranListProvider, useKehadiranListAbsensi}