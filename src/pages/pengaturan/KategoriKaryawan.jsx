import React, { useEffect, useState } from 'react'
import plusIcon from '../../assets/icons/icon-plus.svg'
import orang from '../../assets/images/orang.png'
import Checkbox from '../../components/kalender/Checkbox'

function KategoriKaryawan() {
    const [current, setCurrent] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const dataKategori = [
        {
            kategori: 'Guru Produktif PPLG',
            jumlah: '5 Guru'
        },
        {
            kategori: 'Guru Produktif Animasi',
            jumlah: '12 Guru'
        },
        {
            kategori: 'Guru Produktif DKV',
            jumlah: '15 Guru'
        },
        {
            kategori: 'Guru Normadav',
            jumlah: '23 Guru'
        },
        {
            kategori: 'Security',
            jumlah: '12 Guru'
        },
        {
            kategori: 'K3',
            jumlah: '5 Guru'
        }
    ]

    function handleShowModal() {
        setShowModal(prevShowModal => !prevShowModal)
    }

    useEffect(() => {
        if (showModal) {
            document.body.classList.add("no-scroll")
        } else {
            document.body.classList.remove("no-scroll")
        }
    }, [showModal])

    return (
        <div className='kategori-karyawan'>
            {/* <div className='tambah-kategori'>Tambah Kategori <img src={plusIcon} alt="" /></div> */}
            <div className='wrapper-kategori'>
                <h1>Kategori Karyawan</h1>
                {dataKategori.map((data, index) => (
                    <div key={index} className={`${index === current ? 'active' : ''} kategori`} onClick={() => setCurrent(index)}>
                        <p>{data.kategori}</p>
                        <span>{data.jumlah}</span>
                    </div>
                ))}
            </div>

            <div className='wrapper-edit-kategori'>
                <div className='wrapper-text'>
                    <h1>Edit Kategori Karyawan</h1>
                    <h2 onClick={() => handleShowModal()}>Tambahkan Karyawan</h2>
                </div>
                <div className='wrapper-column'>
                    <div className='wrapper-list'>
                        <div className='list-content-left'>
                            <img src={orang} alt="" />
                            <div>
                                <p>Toni Kroos</p>
                                <span>Guru PPLG</span>
                            </div>
                        </div>
                        <input type="checkbox" />
                    </div>
                </div>
            </div>

            {showModal && <div className='bg-modal'>
                <div className='modal-tambah-anggota'>
                    <h1>Tambah Anggota</h1>
                    <h3>Guru Anggota PPLG</h3>
                    <div className='padding'>
                        <input type="text" placeholder='Cari Anggota' />
                        <p>Anggota</p>
                        <div className='container-anggota'>
                            <Checkbox control={'samuel'} />
                            <img src={orang} alt="" />
                            <label htmlFor='samuel'>Samuel Umtiti la Parisiens</label>
                        </div>
                    </div>
                    <div className='wrappper-btn'>
                        <button onClick={() => handleShowModal()}>Cancel</button>
                        <button>Tambah</button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default KategoriKaryawan