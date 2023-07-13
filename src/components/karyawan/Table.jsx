import Pagination from '../Pagination'
import React, { useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import copy from '../../assets/icons/copy.svg'
import edit from '../../assets/icons/edit.svg'
import trash from '../../assets/icons/trashRed.svg'
import { useApiKaryawan } from '../../contexts/api/karyawan/ContextApiKaryawan';
import { useDispatch, useSelector } from 'react-redux';
import { deleteKaryawan, getKaryawan, updateStateKaryawan } from '../../features/karyawanSlice';
import DisplayKategoriList from '../DisplayKategoriList';
import useImgError from '../../hooks/useImgError';

let PageSize = 10;

function Table() {
  const { listKaryawan, isLoading, urutan, currentPage } = useSelector(state => state.karyawan)
  const { kategoriId } = useSelector(state => state.kategori)
  const navigate = useNavigate()
  const context = useApiKaryawan()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    let slicedData;
    slicedData = listKaryawan?.slice(firstPageIndex, lastPageIndex);

    const sortedData = [...slicedData].sort((a, b) => {
      if (urutan === 'Sesuai abjad') {
        return a.nama.localeCompare(b.nama)
      } else {
        return parseInt(a.niy) - parseInt(b.niy)
      }
    });

    return sortedData;
  }, [isLoading, listKaryawan, kategoriId, urutan, currentPage]);

  function handleDetail(id) {
    navigate(`/karyawan/edit/${id}`)
  }

  function handleDelete(id) {
    if (window.confirm('yakin hapus user?')) {
      dispatch(deleteKaryawan(id))
        .then((res) => {
          const totalItems = listKaryawan.length - 1;
          const lastItemOnPage = totalItems % PageSize === 0;
          if (lastItemOnPage && currentPage > 1) {
            dispatch(updateStateKaryawan({ name: 'currentPage', value: 1 }));
            setSearchParams({ 'paginate': 1 });
          }

          if (res.meta.requestStatus === 'fulfilled') {

          }
          dispatch(getKaryawan({ kategori_id: kategoriId }))
        })
    }
  }

  function handleCopyNiy(niy) {
    navigator.clipboard.writeText(niy)
  }

  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th className='th-niy'>NIY</th>
            <th className='th-name'>Nama</th>
            <th className='th-jabatan'>Jabatan</th>
            <th className='th-nohp'>Nomer HP</th>
            <th className='th-email'>Email</th>
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
                        <img src={item?.link_foto} onError={useImgError} alt="" />
                        {item?.nama}
                      </td>
                      <td>
                        <DisplayKategoriList list={item.ktgkaryawan} />
                      </td>
                      <td>{item?.no_hp}</td>
                      <td>{item?.email}</td>
                      <td className='action-col'>
                        <div>
                          <img src={copy} alt='' onClick={() => handleCopyNiy(item?.niy)} />
                          <Link to={`/karyawan/edit/${item?.id}`}>
                            <img src={edit} alt="" />
                          </Link>
                          <img src={trash} alt='' onClick={() => handleDelete(item.id)} />
                        </div>
                      </td>
                    </tr>
                  )
                })
          }
        </tbody>

      </table>

      {!isLoading &&
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={listKaryawan?.length}
          pageSize={PageSize}
          onPageChange={page =>
            dispatch(updateStateKaryawan({ name: 'currentPage', value: page }))
          }
        />
      }
    </>
  )
}

export default Table