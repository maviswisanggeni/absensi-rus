import Pagination from '../Pagination'
import React, { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import copy from '../../assets/icons/copy.svg'
import edit from '../../assets/icons/edit.svg'
import trash from '../../assets/icons/trashRed.svg'
import defaultUser from '../../assets/images/user-foto.png'
import { useDispatch, useSelector } from 'react-redux';
import { deleteKaryawan, getKaryawan, updateStateKaryawan } from '../../features/karyawanSlice';
import { updateStatePengaturan } from '../../features/pengaturanSlice';
import imgErrorValidation from '../../utils/imgErrorValidation';
import DisplayKategoriList from '../DisplayKategoriList';

let PageSize = 10;

function Table() {
    const { kategoriId, listKaryawan, currentPage, loadingKaryawan } = useSelector(state => state.pengaturan)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;

        let slicedData;
        slicedData = listKaryawan?.slice(firstPageIndex, lastPageIndex);

        return slicedData;
    }, [loadingKaryawan, listKaryawan, kategoriId, currentPage]);

    function handleDetail(id) {
        navigate(`/karyawan/edit/${id}`)
    }

    function handleDelete(id) {
        if (window.confirm('yakin hapus user?')) {
            dispatch(deleteKaryawan(id))
                .then(() => {
                    dispatch(getKaryawan({ kategori_id: kategoriId }))
                })
        }
    }

    function isImgUrl(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
    }

    function handleCopyNiy(niy) {
        navigator.clipboard.writeText(niy)
    }

    return (
        <>
            <table className='table'>
                <thead>
                    <tr>
                        <th>NIY</th>
                        <th>Nama</th>
                        <th>Jabatan</th>
                        <th>Nomer HP</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        loadingKaryawan ? <tr className='loading loading-table'><td>loading...</td></tr>
                            : currentTableData.length === 0 ? <tr className='loading-table'><td>Data tidak ditemukan</td></tr>
                                : currentTableData?.map((item, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className='niy-col'>{item?.niy}</td>
                                            <td className='row-img' onClick={() => handleDetail(item.id)}>
                                                <img src={isImgUrl(item?.link_foto) ? item?.link_foto : defaultUser} onError={imgErrorValidation} alt="" />
                                                {item?.nama}
                                            </td>
                                            <td>
                                                <DisplayKategoriList list={item.ktgkaryawan} />
                                            </td>
                                            <td>{item?.no_hp}</td>
                                            <td>{item?.email}</td>
                                        </tr>
                                    )
                                })
                    }
                </tbody>

            </table>

            {!loadingKaryawan &&
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={listKaryawan?.length}
                    pageSize={PageSize}
                    onPageChange={page =>
                        dispatch(updateStatePengaturan({ name: 'currentPage', value: page }))
                    }
                />
            }
        </>
    )
}

export default Table