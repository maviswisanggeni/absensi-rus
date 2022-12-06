import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
const ContextApiDashboard = createContext({})

function useApiDashboard(){
    return useContext(ContextApiDashboard)
}

function DashboardApiProvider ({children}) {
    const [jmlKehadiran, setJmlKehadiran] = useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        async function getData() {
            const url = "http://absensiguru.smkradenumarsaidkudus.sch.id/api/dashboard/jml-kehadiran"
            const request = {
                start_time: "2022-11-27",
                end_time: "2022-11-28",
            }
            axios.get(url, request).then((response) => {
                setJmlKehadiran(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
        getData();
    }, []);

    const contextValue = [jmlKehadiran, setJmlKehadiran, loading, setLoading]

    return(
        <ContextApiDashboard.Provider value={contextValue}>
            {children}
        </ContextApiDashboard.Provider>
    )
}

export {ContextApiDashboard, DashboardApiProvider, useApiDashboard}