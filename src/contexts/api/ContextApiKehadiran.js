import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';

const ContextApiKehadiranJmlKehadiran= createContext({})

function useKehadiranJmlKehadiran(){
    return useContext(ContextApiKehadiranJmlKehadiran)
}

function KehadiranJmlKehadiranProvider ({children}) {
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const [jmlKehadiran, setJmlKehadiran] = useState(null);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(formatDate(new Date()))

    useEffect(() => {
        async function getDataJmlKehadiran() {
            const url = "http://absensiguru.smkradenumarsaidkudus.sch.id/api/kehadiran/jml-kehadiran"
            const request = {   
                start_time: '2021-11-30',
                end_time: '2022-11-30',
            }
            axios.get(url,
                ).then((response) => {
                setJmlKehadiran(response.data);
                console.log(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
        getDataJmlKehadiran();
    }, []);

    const contextValue = [jmlKehadiran, setJmlKehadiran, date, setDate]

    return(
        <ContextApiKehadiranJmlKehadiran.Provider value={contextValue}>
            {children}
        </ContextApiKehadiranJmlKehadiran.Provider>
    )
}


export {ContextApiKehadiranJmlKehadiran, useKehadiranJmlKehadiran, KehadiranJmlKehadiranProvider}