import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import formatDate from "../../components/useFormatCalendar";
import { useNavigate } from "react-router";
const ContextApiDashboard = createContext({})

function useApiDashboard(){
    return useContext(ContextApiDashboard)
}

function DashboardApiProvider ({children}) {
    const [jmlKehadiran, setJmlKehadiran] = useState(null);
    const [date, setDate] = useState(formatDate(new Date()))
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    async function getData() {
        const url = "http://absensiguru.smkradenumarsaidkudus.sch.id/api/dashboard"
        const urlLocal = "http://127.0.0.1:8000/api/dashboard/"; 
        const request = {
            start_time: date,
            end_time: date,
        }
        setLoading(false);
        axios.get(
            urlLocal, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Content-Type': 'application/json'
                },
                crossdomain: true
            }
            )
            .then((response) => {
            setJmlKehadiran(response.data.data.jml_kehadiran);
            setLoading(true);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if(!token){
            navigate('/login')
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