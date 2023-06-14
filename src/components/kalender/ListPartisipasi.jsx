import React from 'react'
import orang from '../../assets/images/orang.png'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { deletePeserta } from '../../features/kalenderSlice'

function ListPartisipasi() {
    const { peserta, loadngGetKaryawan } = useSelector((state) => state.kalender)
    const dispatch = useDispatch()

    const handleCheckboxChange = (index) => {
        dispatch(deletePeserta(index))
    };

    return (
        <div className='wrapper-column'>
            {peserta.map((item, index) => (
                <div className='wrapper-list' key={index}>
                    <div className='list-content-left'>
                        <img src={item.link_foto} alt="" />
                        <div>
                            <p>{item.nama}</p>
                            <span>
                                {item.ktgkaryawan.map((itemKategori, index) => (
                                    <React.Fragment key={itemKategori.id}>
                                        {itemKategori.kategori}
                                        {index !== item.ktgkaryawan.length - 1 && ','}{' '}
                                    </React.Fragment>
                                ))}
                            </span>
                        </div>
                    </div>
                    <input type='checkbox' checked={item.isChecked} onChange={() => handleCheckboxChange(index)} />
                </div>
            ))}
            {loadngGetKaryawan ? <p>Loading...</p> : null}
        </div>
    )
}

export default ListPartisipasi