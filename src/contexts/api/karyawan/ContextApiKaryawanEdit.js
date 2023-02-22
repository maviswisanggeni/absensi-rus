import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';

const ContextApiKaryawanUpadate = createContext({})

function useApiKaryawanUpdate(){
    return useContext(ContextApiKaryawanUpadate)
}

function KaryawanUpdateProvider ({children}) {
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [alamat, setAlamat] = useState('')
    const [noHp, setnoHp] = useState('')
    const [jenisUser, setjenisUser] = useState('Pengajar')
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    async function updateUser() {
        const url = "https://absensiguru.smkrus.com/api/karyawan/update-user"
        setLoading(false);
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('email', email);
        formData.append('alamat', alamat);
        formData.append('no_hp', noHp);
        formData.append('jenis_user', jenisUser);

        axios({
            method: 'post',
            url,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setLoading(true);
            }).catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        
    }, []);

    const contextValue = {
        nama, setNama,
        email, setEmail,
        alamat, setAlamat,
        noHp, setnoHp,
        jenisUser, setjenisUser,
        loading, setLoading,
        updateUser,
    }

    return(
        <ContextApiKaryawanUpadate.Provider value={contextValue}>
            {children}
        </ContextApiKaryawanUpadate.Provider>
    )
}

export {ContextApiKaryawanUpadate, useApiKaryawanUpdate, KaryawanUpdateProvider}