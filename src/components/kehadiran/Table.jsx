import React, { useMemo, useState } from 'react'
import Pagination from '../Pagination';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Pusher from "pusher-js";
import { updateStateKehadiran } from '../../features/kehadiranSlice';
import { useEffect } from 'react';
import useImgError from '../../utils/imgErrorValidation';
import DisplayKategoriList from '../DisplayKategoriList';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import IndicatorValid from './IndicatorValid';
import RowTanggal from './RowTanggal';
import RowJam from './RowJam';
import ColumnMasukAndKeluar from './ColumnMasukAndKeluar';
import ColumnSuksesAndAbsen from './ColumnSuksesAndAbsen';
import ColumnIzin from './ColumnIzin';

let PageSize = 10;

function Table() {
    const dispatch = useDispatch()
    let [searchParams] = useSearchParams();

    const {
        kehadiranMasuk,
        kehadiranKeluar,
        kehadiranIzin,
        kehadiranSukses,
        kehadiranAbsen,
        currentPage,
        keterangan,
        urutan,
        loading
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
            selectedData = kehadiranKeluar
        } else if (keterangan === 'Masuk') {
            selectedData = kehadiranMasuk;
        } else if (keterangan === 'Sukses') {
            selectedData = kehadiranSukses;
        } else if (keterangan === 'Absen') {
            selectedData = kehadiranAbsen
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

    //     const pusher = new Pusher('', {
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

    return (
        <>
            <table className='table'>
                <thead>
                    <tr className='column'>
                        {keterangan === 'Masuk' || keterangan === 'Keluar' ? 
                            <ColumnMasukAndKeluar/>
                        : keterangan === 'Sukses' || keterangan === 'Absen' ? 
                            <ColumnSuksesAndAbsen/>
                        : <ColumnIzin/>
                    }
                    </tr>
                </thead>

                <tbody>
                    {currentTableData.length === 0 ? (
                        <tr className='loading-table'>
                            <td>Data tidak ditemukan </td>
                        </tr>
                    ) : currentTableData?.map((item, key) => {
                        return (
                            <tr key={key}>
                                <td className='row-img'>
                                    <IndicatorValid
                                        keteranganState={keterangan}
                                        keteranganApi={item?.keterangan}
                                        is_valid_radius_masuk={item?.is_valid_masuk}
                                        is_valid_radius_pulang={item?.is_valid_pulang}
                                    />
                                    <img src={item?.user?.link_foto} onError={useImgError} alt={item.user?.nama} />
                                    {item?.user?.nama}
                                </td>

                                <td>{item?.user?.niy}</td>

                                <td className='td-jabatan'>
                                    <DisplayKategoriList list={item.user?.ktgkaryawan} />
                                </td>

                                <RowTanggal
                                    keterangan={keterangan}
                                    tgl_masuk={dayjs(item?.tanggal_masuk).format('ddd DD MMM YYYY')}
                                    tgl_pulang={dayjs(item?.tanggal_pulang).format('ddd DD MMM YYYY')}
                                    tgl_mulai_izin={item?.mulai_izin}
                                    tgl_selesai_izin={item?.selesai_izin}
                                />

                                <RowJam
                                    keteranganApi={item?.keterangan}
                                    keteranganState={keterangan}
                                    waktu_masuk={item?.waktu_masuk?.slice(0, 5)}
                                    waktu_pulang={item?.waktu_pulang?.slice(0, 5)}
                                    isvld_wkt_masuk={item?.isvld_wkt_masuk}
                                    isvld_wkt_pulang={item?.isvld_wkt_pulang}
                                />

                                <td className='wrapper__btn__detail'>
                                    <Link
                                        className='btn-detail'
                                        to={
                                            item.jenis_izin === undefined
                                                ? `/kehadiran/detail/${item?.id}`
                                                : `/kehadiran/detail/izin/${item?.id}`
                                        }
                                    >
                                        Detail
                                    </Link>
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
                        keterangan === 'Masuk' ? kehadiranMasuk?.length :
                        keterangan === 'Keluar' ? kehadiranKeluar?.length : 
                        keterangan === 'Izin' ? kehadiranIzin?.length :
                        keterangan === 'Sukses' ? kehadiranSukses?.length :
                        kehadiranAbsen?.length
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