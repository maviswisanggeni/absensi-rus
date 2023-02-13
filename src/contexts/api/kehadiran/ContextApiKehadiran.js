import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';
import formatDate from "../../../components/useFormatCalendar";

const ContextApiKehadiranJmlKehadiran = createContext({})

function useKehadiranJmlKehadiran(){
    return useContext(ContextApiKehadiranJmlKehadiran)
}

function KehadiranJmlKehadiranProvider ({children}) {
    const [jmlKehadiran, setJmlKehadiran] = useState(null);
    const [date, setDate] = useState(formatDate(new Date()))
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function getDataJmlKehadiran() {
            const url = "https://absensiguru.smkrus.com/api/kehadiran"
            setLoading(false);
            axios.get(url, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setJmlKehadiran(response.data.data.jml_kehadiran); 
                    setLoading(true);
                }).catch((error) => {
                    console.log(error);
                })
        }
        getDataJmlKehadiran();
    }, []);

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