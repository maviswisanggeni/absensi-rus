import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import formatDate from "../../../components/useFormatCalendar";
import { useNavigate } from "react-router";
import getBaseUrl from "../../../datas/apiUrl";
const ApiDashboardStatistik = createContext({})

function useApiDashboardStatistik() {
    return useContext(ApiDashboardStatistik)
}

function DashboardApiStatistikProvider({ children }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    async function getData() {
        const url = getBaseUrl() + "dashboard/statistik"
        setLoading(false);
        axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setData(response.data);
                setLoading(true);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
        // getData();
    }, []);

    const contextValue = { loading, setLoading, data, setData }

    return (
        <ApiDashboardStatistik.Provider value={contextValue}>
            {children}
        </ApiDashboardStatistik.Provider>
    )
}

export { ApiDashboardStatistik, DashboardApiStatistikProvider, useApiDashboardStatistik }