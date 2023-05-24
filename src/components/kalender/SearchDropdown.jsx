import React, { useState } from 'react'
import orang from '../../assets/images/orang.png'

function SearchDropdown() {
    const [activeDropdown, setActiveDropdown] = useState(false)
    const dataDummy = [
        {
            nama: 'Danar Gading',
            jabatan: 'Guru PPLG'
        },
        {
            nama: 'Dani Alves',
            jabatan: 'Guru Animasi'
        },
        {
            nama: 'Doni Si Manusia Ikan',
            jabatan: 'Guru DKV'
        },
    ]

    function handleChange(e) {
        if (e.target.value) {
            setActiveDropdown(true)
        } else {
            setActiveDropdown(false)
        }
    }

    return (
        <div className='wrapper-search-dropdown'>
            <input type='text' placeholder='Invite Karyawan' className='input' onChange={handleChange} onBlur={() => setActiveDropdown(false)} />
            <div className='dropdown-container'>
                {
                    activeDropdown &&
                    dataDummy.map((item, index) => {
                        return (
                            <div className='dropdown-outer-item' key={index}>
                                <div className='dropdown-item' key={index}>
                                    <div>
                                        <img src={orang} alt="" />
                                        <p>{item.nama}</p>
                                        <span>/{item.jabatan}</span>
                                    </div>
                                    <button onClick={() => setActiveDropdown(false)}>Tambahkan</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SearchDropdown