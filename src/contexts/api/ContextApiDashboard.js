import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import formatDate from "../../components/useFormatCalendar";
const ContextApiDashboard = createContext({})

function useApiDashboard(){
    return useContext(ContextApiDashboard)
}

function DashboardApiProvider ({children}) {
    const [jmlKehadiran, setJmlKehadiran] = useState(null);
    const [date, setDate] = useState(formatDate(new Date()))
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        async function getData() {
            const url = "http://absensiguru.smkradenumarsaidkudus.sch.id/api/dashboard/jml-kehadiran"
            const request = {
                start_time: date,
                end_time: date,
            }
            setLoading(false);
            axios.get(url, {params: request}).then((response) => {
                setJmlKehadiran(response.data);
                setLoading(true);
            }).catch((error) => {
                console.log(error);
            })
        }
        getData();
    }, [date]);

    const contextValue = {jmlKehadiran, setJmlKehadiran, loading, setLoading, date, setDate}

    return(
        <ContextApiDashboard.Provider value={contextValue}>
            {children}
        </ContextApiDashboard.Provider>
    )
}

export {ContextApiDashboard, DashboardApiProvider, useApiDashboard}