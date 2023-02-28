import React, { useMemo } from 'react'
import Pagination from '../Pagination';
import { useKehadiranListAbsensi } from '../../contexts/api/kehadiran/ContextApiKehadiranListData';
import { useApiKehadiranSearch } from '../../contexts/api/kehadiran/ContextApiKehadiranSearch';
import { Link } from 'react-router-dom';

let PageSize = 10;

function Table() {
    const context = useKehadiranListAbsensi()
    const contextSearch = useApiKehadiranSearch()

    const currentTableData = useMemo(() => {
        const firstPageIndex = (context.currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return context.keterangan === 'Pulang' ? context.listAbsensiKeluar?.slice(firstPageIndex, lastPageIndex)
            : context.listAbsensiMasuk?.slice(firstPageIndex, lastPageIndex);
    }, [context.currentPage, context.keterangan, context.listAbsensiKeluar, context.listAbsensiMasuk]);

    console.log(context.listAbsensiKeluar)
    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>NIY</th>
                        <th>Jabatan</th>
                        <th>Masuk</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        !context.loading || !contextSearch.loading ? <tr><td>Loading...</td></tr> :
                        currentTableData.length === 0 ? <tr><td>Data tidak ditemukan</td></tr>
                            :
                            // context.listAbsensiMasuk?.data?.map((item, key) => {
                            currentTableData?.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td className='row-img'>
                                            <img src={item?.foto_masuk} alt="" />
                                            {item?.user?.nama}
                                        </td>
                                        <td>{item?.user?.niy}</td>
                                        <td>{item?.user?.jenis_user}</td>
                                        <td>{item?.waktu_masuk}</td>
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
                currentPage={context.currentPage}
                totalCount={context?.keterangan === 'Masuk' ? context.listAbsensiMasuk?.length : context?.keterangan === 'Pulang' ? context.listAbsensiKeluar?.length : 0}
                pageSize={PageSize}
                onPageChange={page => context.setCurrentPage(page)}
            />
        </>
    )
}

export default Table