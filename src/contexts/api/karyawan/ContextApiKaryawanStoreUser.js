import { createContext, useEffect, useState, useContext } from "react";
import axios from 'axios';

const ContextApiKaryawanStoreUser = createContext({})

function useApiKaryawanStoreUser() {
    return useContext(ContextApiKaryawanStoreUser)
}

function KaryawanStoreUserProvider({ children }) {
    const [nama, setNama] = useState('')
    const [email, setEmail] = useState('')
    const [niy, setNiy] = useState('')
    const [password, setPassword] = useState('')
    const [alamat, setAlamat] = useState('')
    const [noHp, setnoHp] = useState('')
    const [jenisUser, setjenisUser] = useState('Pengajar')
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    async function storeUser() {
        const url = "https://absensiguru.smkrus.com/api/karyawan/store-user"
        setLoading(false);
        const formData = new FormData();
        formData.append('nama', nama);
        formData.append('email', email);
        formData.append('niy', niy);
        formData.append('password', password);
        formData.append('alamat', alamat);
        formData.append('no_hp', noHp);
        formData.append('jenis_user', jenisUser);

        return axios({
            method: 'post',
            url,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log(response);
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
        niy, setNiy,
        password, setPassword,
        alamat, setAlamat,
        noHp, setnoHp,
        jenisUser, setjenisUser,
        loading, setLoading,
        storeUser,
    }
    return (
        <ContextApiKaryawanStoreUser.Provider value={contextValue}>
            {children}
        </ContextApiKaryawanStoreUser.Provider>
    )
}

export { ContextApiKaryawanStoreUser, useApiKaryawanStoreUser, KaryawanStoreUserProvider }