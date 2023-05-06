import { createContext, useContext, useEffect, useState } from "react";
import formatDate from "../../components/useFormatCalendar";

const ContextTanggalKehadiran = createContext({})

function useTanggalKehadiran(){
    return useContext(ContextTanggalKehadiran)
}

function TanggalKehadiranProvider ({children}) {
    const [startTanggal, setStartTanggal] = useState(new Date());
    const [endTanggal, setEndTanggal] = useState(new Date());
    const [startText, setStartText] = useState('Tanggal mulai')
    const [endText, setEndText] = useState('Tanggal berakhir')
    const [startTime, setStartTime] = useState(formatDate(new Date()))
    const [endTime, setEndTime] = useState(formatDate(new Date()))
    const [id, setId] = useState(null)
    const [detail, setDetail]  = useState(null);

    useEffect(() => {
        // console.log(startText)
    }, [startText])

    const contextValue = {
        startTanggal,
        setStartTanggal,
        endTanggal,
        setEndTanggal,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        startText,
        setStartText,
        endText,
        setEndText,
        id,
        setId,
        detail,
        setDetail,
    }

    return(
        <ContextTanggalKehadiran.Provider value={contextValue}>
            {children}
        </ContextTanggalKehadiran.Provider>
    )
}

export {ContextTanggalKehadiran, TanggalKehadiranProvider, useTanggalKehadiran}