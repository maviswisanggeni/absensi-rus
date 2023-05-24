import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router";
import formatDate from "../../../components/useFormatCalendar";
import { useSearchParams } from "react-router-dom";

const ContextApiKehadiranList = createContext({})

function useKehadiranListAbsensi() {
    return useContext(ContextApiKehadiranList)
}

function KehadiranListProvider({ children }) {
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();

    const [listAbsensiMasuk, setListAbsensiMasuk] = useState([]);
    const [listAbsensiKeluar, setListAbsensiKeluar] = useState([]);
    const [keterangan, setKeterangan] = useState('Masuk');
    const [urutan, setUrutan] = useState('Tercepat')
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState(
        searchParams.get('search') ? searchParams.get('search') : ''
    );

    const [startTime, setStartTime] = useState(
        searchParams.get('start_time') ? searchParams.get('start_time') : formatDate(new Date())
    )

    const [endTime, setEndTime] = useState(
        searchParams.get('end_time') === 'null' ? null : searchParams.get('end_time')
    )

    const [jmlKehadiran, setJmlKehadiran] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const token = localStorage.getItem("token")

    function getDataJmlKehadiran() {
        const url = "https://absensiguru.smkrus.com/api/kehadiran"
        const request = {
            search: search,
            start_time: startTime,
            end_time: endTime,
        }

        if (search === '') {
            delete request.search
        } else if (endTime) {
            delete request.end_time
        }

        setLoading(false);
        return axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: request
            })
            .then((response) => {
                if (response.config.params.search === undefined) {
                    setListAbsensiMasuk(response.data.data.list_absen.masuk.data);
                    setListAbsensiKeluar(response.data.data.list_absen.pulang.data);
                } else {
                    setListAbsensiMasuk(response.data.data.list_absen.masuk);
                    setListAbsensiKeluar(response.data.data.list_absen.pulang);
                }
                setJmlKehadiran(response.data.data.jml_kehadiran);
                setLoading(true);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, []);


    const contextValue = {
        listAbsensiMasuk, setListAbsensiMasuk,
        listAbsensiKeluar, setListAbsensiKeluar,
        loading, setLoading,
        search, setSearch,
        keterangan, setKeterangan,
        jmlKehadiran, setJmlKehadiran,
        currentPage, setCurrentPage,
        urutan, setUrutan,
        startTime, setStartTime,
        endTime, setEndTime,
        searchParams, setSearchParams,
        getDataJmlKehadiran
    }

    return (
        <ContextApiKehadiranList.Provider value={contextValue}>
            {children}
        </ContextApiKehadiranList.Provider>
    )
}

export { ContextApiKehadiranList, KehadiranListProvider, useKehadiranListAbsensi }