import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';

const ContextApiKalender = createContext({})

function useApiKalender(){
    return useContext(ContextApiKalender)
}

function KalenderProvider ({children}) {
    const [listKalender, setListKalender] = useState([])
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function getKalender() {
            const url = "https://absensiguru.smkrus.com/api/kalender"
            setLoading(false);
            axios.get(url, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setListKalender(response.data.events);
                    setLoading(true);
                }).catch((error) => {
                    console.log(error);
                })
        }
        getKalender();
    }, []);

    const contextValue = {
        listKalender,
        setListKalender,
        loading,
        setLoading
    }
    return(
        <ContextApiKalender.Provider value={contextValue}>
            {children}
        </ContextApiKalender.Provider>
    )
}

export {ContextApiKalender, useApiKalender, KalenderProvider}