import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import formatDate from "../../../components/useFormatCalendar";
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
        const url = "https://absensiguru.smkrus.com/api/dashboard"
        const request = {
            tanggal: date
        }
        setLoading(false);
        axios.get(url, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: request
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