import Pagination from '../Pagination'
import React, { useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import copy from '../../assets/icons/copy.svg'
import edit from '../../assets/icons/edit.svg'
import trash from '../../assets/icons/trashRed.svg'
import { useApiKaryawan } from '../../contexts/api/karyawan/ContextApiKaryawan';
import axios from 'axios';
import defaultUser from '../../assets/images/user-foto.png'
import { useDispatch, useSelector } from 'react-redux';
import { getKaryawan } from '../../features/karyawanSlice';

let PageSize = 10;

function Table() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getKaryawan())
  }, [dispatch])

  const { listPengajar, listStaff, loading, keterangan } = useSelector(state => state.karyawan)

  const context = useApiKaryawan()
  const navigate = useNavigate()
  const token = localStorage.getItem("token");

  const currentTableData = useMemo(() => {
    const firstPageIndex = (context.currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return keterangan ?
      listPengajar.slice(firstPageIndex, lastPageIndex) :
      listStaff.slice(firstPageIndex, lastPageIndex)
  }, [context.currentPage, keterangan, listPengajar, listStaff, context.urutan]);

  function handleDetail(id) {
    // navigate(`/karyawan/detail/${id}`)
  }

  function handleDelete(id) {
    console.log(id);
    if (window.confirm('yakin hapus user?')) {
      axios.get(
        `https://absensiguru.smkrus.com/api/karyawan/delete-user/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(() => {
        console.log('sukses');
        context.getKaryawan()
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  function isImgUrl(url) {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url)
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
            !loading ? <tr className='loading loading-table'><td>loading...</td></tr>
              : currentTableData.length === 0 ? <tr className='loading-table'><td>Data tidak ditemukan</td></tr> :
                currentTableData?.map((item, key) => {
                  return (
                    <tr key={key} onClick={() => handleDetail(item.id)}>
                      <td className='niy-col'>{item?.niy}</td>
                      <td className='row-img'>
                        <img src={isImgUrl(item?.pf_foto) ? item?.pf_foto : defaultUser} alt="" />
                        {item?.nama}
                      </td>
                      <td>{item?.jenis_user}</td>
                      <td>{item?.no_hp}</td>
                      <td>{item?.email}</td>
                      <td className='action-col'>
                        <img src={copy} alt='' />
                        <Link to={`/karyawan/edit/${item?.id}`}>
                          <img src={edit} alt="" />
                        </Link>
                        <img src={trash} alt='' onClick={() => handleDelete(item.id)} />
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
        totalCount={context.keterangan ? context.listPengajar?.length : context?.keterangan ? context.listStaff?.length : 0}
        pageSize={PageSize}
        onPageChange={page =>
          context.setCurrentPage(page)

          // console.log(page)
        }
      />
    </>
  )
}

export default Table