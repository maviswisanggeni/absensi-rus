import { createContext, useContext, useState } from "react";

const WrapperEditKaryawan = createContext({})

function useWrapperEditKaryawan(){
    return useContext(WrapperEditKaryawan)
}

function WrapperEditKaryawanProvider ({children}) {
    const [validatorNama, setValidatorNama] = useState(true)
    const [validatorPwd, setValidatorPwd] = useState(true)
    const [validatorEmail, setValidatorEmail] = useState(true)
    const [validatorNoHP, setValidatorNoHP] = useState(true)
    const [validatorAlamat, setValidatorAlamat] = useState(true)

    const contextValue = {
        validatorNama, setValidatorNama,
        validatorPwd, setValidatorPwd,
        validatorEmail, setValidatorEmail,
        validatorNoHP, setValidatorNoHP,
        validatorAlamat, setValidatorAlamat,
    }

    return(
        <WrapperEditKaryawan.Provider value={contextValue}>
            {children}
        </WrapperEditKaryawan.Provider>
    )
}

export {WrapperEditKaryawan, WrapperEditKaryawanProvider, useWrapperEditKaryawan}