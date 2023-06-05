import React, { useEffect, useMemo } from 'react'
import Pagination from '../Pagination';
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData';
import { Link } from 'react-router-dom';
import defaultFoto from '../../assets/images/user-foto.png'
import { useDispatch, useSelector } from 'react-redux';
import Pusher from "pusher-js";
import { setKehadiranIzin, setKehadiranKeluar, setKehadiranMasuk } from '../../features/kehadiranSlice';

let PageSize = 10;

function Table() {
    const context = useKehadiranListAbsensi()
    const dispatch = useDispatch()

    const {
        kehadiranMasuk, kehadiranKeluar,
        kehadiranIzin, currentPage,
        keterangan, urutan, startTime, loading
    } = useSelector(state => state.kehadiran)

    // const currentTableData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return keterangan === 'Keluar' ? kehadiranKeluar?.slice(firstPageIndex, lastPageIndex)
    //         : keterangan === 'Masuk' ? kehadiranMasuk?.slice(firstPageIndex, lastPageIndex)
    //             : kehadiranIzin?.slice(firstPageIndex, lastPageIndex)
    // }, [currentPage, keterangan, kehadiranKeluar, kehadiranMasuk, kehadiranIzin]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;

        let slicedData;

        if (keterangan === 'Keluar') {
            slicedData = kehadiranKeluar?.slice(firstPageIndex, lastPageIndex);
        } else if (keterangan === 'Masuk') {
            slicedData = kehadiranMasuk?.slice(firstPageIndex, lastPageIndex);
        } else {
            slicedData = kehadiranIzin?.slice(firstPageIndex, lastPageIndex);
        }

        const sortedData = [...slicedData].sort((a, b) => {
            const time1 = new Date(`2000-01-01T${a.waktu_masuk}`);
            const time2 = new Date(`2000-01-01T${b.waktu_masuk}`);
            if (urutan === 'Tercepat') {
                return time2 - time1;
            } else {
                return time1 - time2;
            }
        });

        return sortedData;
    }, [currentPage, keterangan, kehadiranKeluar, kehadiranMasuk, kehadiranIzin, urutan]);

    // useEffect(() => {
    //     Pusher.logToConsole = true;

    //     const pusher = new Pusher('7b9c2c870e01322901d9', {
    //         cluster: 'ap1'
    //     });

    //     const channel = pusher.subscribe('kehadiran-channel');
    //     channel.bind('kehadiran-event', function (data) {
    //         dispatch(setKehadiranMasuk(data.kehadiran))
    //         dispatch(setKehadiranKeluar(data.kehadiran))
    //         dispatch(setKehadiranIzin(data.kehadiran))
    //     });

    //     return () => {
    //         pusher.unsubscribe('kehadiran-channel')
    //     }
    // }, []);

    function checkKeterangan(masuk, pulang) {
        if (keterangan === 'Masuk') {
            return masuk
        } else {
            return pulang
        }
    }
    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>NIY</th>
                        <th>Jabatan</th>
                        <th>Tanggal</th>
                        <th>Waktu</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        !loading ? <tr className='loading loading-table'><td>Loading...</td></tr>
                            : currentTableData.length === 0 ? <tr className='loading-table'><td>Data tidak ditemukan </td></tr>
                                :
                                currentTableData?.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className='row-img'>
                                                <div className={`valid-masuk-pulang ${checkKeterangan(item?.is_valid_masuk, item?.is_valid_pulang) === '1' ? 'valid-masuk' : 'valid-pulang'}`}></div>
                                                <img src={item?.pf_foto ? item?.pf_foto : defaultFoto} alt="" />
                                                {item?.user?.nama}
                                            </td>
                                            <td>{item?.user?.niy}</td>
                                            <td>{item?.user?.ktgkaryawan.map(item => item.kategori)}</td>
                                            <td>{checkKeterangan(item?.tanggal_masuk, item?.tanggal_pulang)}</td>
                                            <td>{item?.waktu_masuk?.slice(0, 5)}</td>
                                            <td>
                                                <Link className='btn-detail' to={`/kehadiran/detail/${item?.id}`}>Detail</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                    }
                </tbody>

            </table>
            <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={keterangan === 'Masuk' ? kehadiranMasuk?.length : keterangan === 'Keluar' ? kehadiranKeluar?.length : 0}
                pageSize={PageSize}
                onPageChange={page => context.setCurrentPage(page)}
            />
        </>
    )
}

export default Table