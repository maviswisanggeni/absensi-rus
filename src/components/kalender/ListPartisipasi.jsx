import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePeserta } from '../../features/kalenderSlice'
import useImgError from '../../hooks/useImgError'
import DisplayKategoriList from '../DisplayKategoriList'

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
                        <img src={item.link_foto} onError={useImgError} alt="" />
                        <div>
                            <p>{item.nama}</p>
                            <span>
                                <DisplayKategoriList list={item.ktgkaryawan} />
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