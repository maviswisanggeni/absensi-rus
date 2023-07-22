import React, { useMemo, useState } from 'react'
import Pagination from '../Pagination';
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pusher from "pusher-js";
import { updateStateKehadiran } from '../../features/kehadiranSlice';
import { useEffect } from 'react';
import useImgError from '../../hooks/useImgError';
import DisplayKategoriList from '../DisplayKategoriList';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

let PageSize = 10;

function Table() {
    const context = useKehadiranListAbsensi()
    const dispatch = useDispatch()
    let [searchParams] = useSearchParams();
    const [filteredKehadiranKeluar, setFilteredKehadiranKeluar] = useState([])
    const [filteredKehadiranMasuk, setFilteredKehadiranMasuk] = useState([])

    const {
        kehadiranMasuk, kehadiranKeluar,
        kehadiranIzin, currentPage,
        keterangan, urutan, loading
    } = useSelector(state => state.kehadiran)

    useEffect(() => {
        dayjs.locale('id');
    }, [])

    useEffect(() => {
        const currentPageParams = searchParams.get('paginate') ? searchParams.get('paginate') : 1;
        dispatch(updateStateKehadiran({ name: 'currentPage', value: parseInt(currentPageParams) }))
    }, [searchParams, dispatch]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;

        let selectedData;

        if (keterangan === 'Keluar') {
            const filteredKeluar = kehadiranKeluar.filter((item) =>
                !kehadiranIzin.some((data) => data.mulai_izin === item.tanggal_masuk && data.user.id === item.user.id)
            );
            setFilteredKehadiranKeluar(filteredKeluar)
            selectedData = filteredKeluar
        } else if (keterangan === 'Masuk') {
            const filteredMasuk = kehadiranMasuk.filter((item) =>
                !kehadiranIzin.some((data) => data.mulai_izin === item.tanggal_masuk && data.user.id === item.user.id)
            );
            setFilteredKehadiranMasuk(filteredMasuk)
            selectedData = filteredMasuk;
        } else {
            selectedData = kehadiranIzin;
        }

        const sortedData = [...selectedData].sort((a, b) => {
            let tanggalMasukA;
            let tanggalMasukB;

            if (keterangan === 'Izin') {
                tanggalMasukA = a.mulai_izin
                tanggalMasukB = b.mulai_izin
            } else {
                tanggalMasukA = `${a.tanggal_masuk} ${a.waktu_masuk}`
                tanggalMasukB = `${b.tanggal_masuk} ${b.waktu_masuk}`
            }

            const time1 = new Date(`${tanggalMasukA}`);
            const time2 = new Date(`${tanggalMasukB}`);
            if (urutan === 'Tercepat') {
                return time2 - time1;
            } else {
                return time1 - time2;
            }
        });

        return sortedData.slice(firstPageIndex, lastPageIndex);
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

    function isIzin() {
        if (keterangan === 'Izin') {
            return true
        } else {
            return false
        }
    }

    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th className='th-name'>Nama</th>
                        <th className='th-niy'>NIY</th>
                        <th className='th-jabatan'>Jabatan</th>
                        <th className={`th-tanggal ${isIzin() ? 'izin' : ''}`}>Tanggal</th>
                        {!isIzin() && <th className='th-waktu'>Waktu</th>}
                        <th className='th-action'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        loading ? <tr className='loading loading-table'><td>Loading...</td></tr>
                            : currentTableData.length === 0 ? <tr className='loading-table'><td>Data tidak ditemukan </td></tr>
                                :
                                currentTableData?.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className='row-img'>
                                                <div
                                                    className={`valid-masuk-pulang 
                                                    ${checkKeterangan(item?.is_valid_masuk, item?.is_valid_pulang) === '1' && checkKeterangan(item?.isvld_wkt_masuk, item?.isvld_wkt_pulang) === '1'
                                                            ? 'valid-masuk' : 'valid-pulang'
                                                        }`}
                                                >
                                                </div>
                                                <img src={item?.user?.link_foto} onError={useImgError} alt={item.user?.nama} />

                                                {item?.user?.nama}
                                            </td>
                                            <td>{item?.user?.niy}</td>
                                            <td>
                                                <DisplayKategoriList list={item.user?.ktgkaryawan} />
                                            </td>
                                            <td>
                                                {isIzin()
                                                    ? `${item?.mulai_izin} - ${item?.selesai_izin}`
                                                    : checkKeterangan(dayjs(item?.tanggal_masuk).format('ddd DD MMM YYYY'), dayjs(item?.tanggal_pulang).format('ddd DD MMM YYYY'))
                                                }
                                            </td>
                                            {isIzin() ? null
                                                : <td>
                                                    <p
                                                        className={`row__jam 
                                                        ${checkKeterangan(item?.isvld_wkt_masuk, item?.isvld_wkt_pulang) === '1'
                                                                ? 'valid-masuk-text' : 'valid-pulang-text'
                                                            }`}
                                                    >

                                                        {checkKeterangan(item?.waktu_masuk?.slice(0, 5), item?.waktu_pulang?.slice(0, 5))} WIB
                                                    </p>
                                                </td>
                                            }

                                            <td>
                                                <Link className='btn-detail' to={`/kehadiran/detail/${item?.id}`}>Detail</Link>
                                            </td>
                                        </tr>
                                    )
                                })
                    }
                </tbody>

            </table>

            {!loading &&
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={
                        keterangan === 'Masuk' ? filteredKehadiranMasuk?.length
                            : keterangan === 'Keluar' ? filteredKehadiranKeluar?.length
                                : kehadiranIzin?.length
                    }
                    pageSize={PageSize}
                    onPageChange={
                        page => dispatch(updateStateKehadiran({ name: 'currentPage', value: page }))}
                />
            }
        </>
    )
}

export default Table