import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
const ApiProfile = createContext({})

function useApiProfile(){
    return useContext(ApiProfile)
}

function ProfileApiProvider ({children}) {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    async function getData() {
        const url = "https://absensiguru.smkrus.com/api/profile"
        setLoading(false);
        axios.get(
            url, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            )
            .then((response) => {
            setProfileData(response.data.data);
            setLoading(true);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getData();
    }, []);

    const contextValue = {profileData, setProfileData, loading, setLoading}

    return(
        <ApiProfile.Provider value={contextValue}>
            {children}
        </ApiProfile.Provider>
    )
}

export {ApiProfile, ProfileApiProvider, useApiProfile}