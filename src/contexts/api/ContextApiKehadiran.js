import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';
import formatDate from "../../components/useFormatCalendar";

const ContextApiKehadiranJmlKehadiran = createContext({})

function useKehadiranJmlKehadiran(){
    return useContext(ContextApiKehadiranJmlKehadiran)
}

function KehadiranJmlKehadiranProvider ({children}) {
    const [jmlKehadiran, setJmlKehadiran] = useState(null);
    const [date, setDate] = useState(formatDate(new Date()))
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // async function getDataJmlKehadiran() {
        //     const url = "http://absensiguru.smkradenumarsaidkudus.sch.id/api/kehadiran/jml-kehadiran"
        //     const request = {   
        //         start_time: date,
        //         end_time: date,
        //     }
        //     setLoading(false);
        //     axios.get(url, {params: request}).then((response) => {
        //         setJmlKehadiran(response.data); 
        //         setLoading(true);
        //     }).catch((error) => {
        //         console.log(error);
        //     })
        // }
        // getDataJmlKehadiran();
    }, [date]);

    const contextValue = {
        jmlKehadiran,
        setJmlKehadiran, 
        date, 
        setDate,        
        loading,
        setLoading
    }
    return(
        <ContextApiKehadiranJmlKehadiran.Provider value={contextValue}>
            {children}
        </ContextApiKehadiranJmlKehadiran.Provider>
    )
}

export {ContextApiKehadiranJmlKehadiran, useKehadiranJmlKehadiran, KehadiranJmlKehadiranProvider}