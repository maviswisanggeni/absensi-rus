import { createContext, useContext, useState } from "react";

const WrapperAddKaryawan = createContext({})

function useWrapperAddKaryawan(){
    return useContext(WrapperAddKaryawan)
}

function WrapperAddKaryawanProvider ({children}) {
    const [validatorNama, setValidatorNama] = useState(false)
    const [validatorNIY, setValidatorNIY] = useState(false)
    const [validatorPwd, setValidatorPwd] = useState(false)
    const [validatorEmail, setValidatorEmail] = useState(false)
    const [validatorNoHP, setValidatorNoHP] = useState(false)
    const [validatorAlamat, setValidatorAlamat] = useState(false)

    const contextValue = {
        validatorNama, setValidatorNama,
        validatorNIY, setValidatorNIY,
        validatorPwd, setValidatorPwd,
        validatorEmail, setValidatorEmail,
        validatorNoHP, setValidatorNoHP,
        validatorAlamat, setValidatorAlamat,
    }

    return(
        <WrapperAddKaryawan.Provider value={contextValue}>
            {children}
        </WrapperAddKaryawan.Provider>
    )
}

export {WrapperAddKaryawan, WrapperAddKaryawanProvider, useWrapperAddKaryawan}