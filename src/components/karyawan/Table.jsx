import Pagination from '../Pagination'
import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import copy from '../../assets/icons/copy.svg'
import edit from '../../assets/icons/edit.svg'
import trash from '../../assets/icons/trashRed.svg'
import { useApiKaryawan } from '../../contexts/api/karyawan/ContextApiKaryawan';
import defaultUser from '../../assets/images/user-foto.png'
import { useDispatch, useSelector } from 'react-redux';
import { deleteKaryawan, getKaryawan } from '../../features/detailKaryawanSlice';

let PageSize = 10;

function Table() {
  const { listKaryawan, isLoading, urutan } = useSelector(state => state.detailKaryawanSlice)
  const { kategoriId } = useSelector(state => state.kategori)
  const navigate = useNavigate()
  const context = useApiKaryawan()
  const dispatch = useDispatch()

  const currentTableData = useMemo(() => {
    const firstPageIndex = (context.currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    let slicedData;
    slicedData = listKaryawan?.slice(firstPageIndex, lastPageIndex);

    const sortedData = [...slicedData].sort((a, b) => {
      if (urutan === 'Sesuai abjad') {
        return a.nama.localeCompare(b.nama)
      }
      return a.niy.localeCompare(b.niy)
    });

    return sortedData;
  }, [isLoading, listKaryawan, kategoriId]);

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
            isLoading ? <tr className='loading loading-table'><td>loading...</td></tr>
              : currentTableData.length === 0 ? <tr className='loading-table'><td>Data tidak ditemukan</td></tr> :
                currentTableData?.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td className='niy-col'>{item?.niy}</td>
                      <td className='row-img' onClick={() => handleDetail(item.id)}>
                        <img src={isImgUrl(item?.link_foto) ? item?.link_foto : defaultUser} alt="" />
                        {item?.nama}
                      </td>
                      <td>{item?.ktgkaryawan[0].kategori}</td>
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