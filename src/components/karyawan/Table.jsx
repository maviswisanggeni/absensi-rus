import Pagination from '../Pagination'
import React, { useMemo } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import copy from '../../assets/icons/copy.svg'
import edit from '../../assets/icons/edit.svg'
import trash from '../../assets/icons/trashRed.svg'
import { useDispatch, useSelector } from 'react-redux';
import { deleteKaryawan, getKaryawan, updateStateKaryawan } from '../../features/karyawanSlice';
import DisplayKategoriList from '../DisplayKategoriList';
import imgErrorValidation from '../../utils/imgErrorValidation';
import arrowDownIcon from '../../assets/icons/arrow-right.svg'
import AlertModal from '../AlertModal';
import { useState } from 'react';

let PageSize = 10;

function Table() {
  const { listKaryawan, isLoading, urutan, currentPage } = useSelector(state => state.karyawan)
  const { kategoriId } = useSelector(state => state.kategori)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [alertModalDelete, setAlertModalDelete] = useState(false)
  const [idUserToDelete, setIdUserToDelete] = useState(null)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    const sortedData = [...listKaryawan].sort((a, b) => {
      if (urutan.column === 'nama') {
        return urutan.order === 'asc'
          ? a.nama.localeCompare(b.nama)
          : b.nama.localeCompare(a.nama);
      } else if (urutan.column === 'niy') {
        return urutan.order === 'asc'
          ? parseInt(a.niy) - parseInt(b.niy)
          : parseInt(b.niy) - parseInt(a.niy);
      }
    });

    return sortedData?.slice(firstPageIndex, lastPageIndex);
  }, [isLoading, listKaryawan, kategoriId, urutan, currentPage]);

  function handleDetail(id) {
    navigate(`/karyawan/edit/${id}`)
  }

  function handleDelete(id) {
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

  function handleCopyNiy(niy) {
    navigator.clipboard.writeText(niy)
  }

  function handleSort(column) {
    if (urutan.column === column) {
      dispatch(
        updateStateKaryawan({
          name: 'urutan',
          value: {
            column,
            order: urutan.order === 'asc' ? 'desc' : 'asc'
          }
        })
      )
    } else {
      dispatch(
        updateStateKaryawan({
          name: 'urutan',
          value: {
            column,
            order: 'asc'
          }
        })
      )
    }
  }

  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th className='th-niy'>
              <div className='wrap-filter'>
                NIY
                <img src={arrowDownIcon} alt=""
                  onClick={() => handleSort('niy')}
                  className={urutan.column === 'niy' && urutan.order === 'asc' ? 'arrow-up' : 'arrow-down'}
                />
              </div>
            </th>
            <th className='th-name'>
              <div className='wrap-filter'>
                Nama
                <img src={arrowDownIcon} alt="" onClick={() => handleSort('nama')}
                  className={urutan.column === 'nama' && urutan.order === 'asc' ? 'arrow-up' : 'arrow-down'}
                />
              </div>
            </th>
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
                        <img src={item?.link_foto} onError={imgErrorValidation} alt="" />
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
                          <img src={trash} alt='' onClick={() => {
                            setAlertModalDelete(true)
                            setIdUserToDelete(item.id)
                          }}
                          />
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

      {alertModalDelete && <AlertModal
        heading={'Hapus Karyawan'}
        message={'Apakah anda yakin ingin menghapus karyawan ini?'}
        onCancel={() => setAlertModalDelete(false)}
        onConfirm={() => handleDelete(idUserToDelete)}
      />}
    </>
  )
}

export default Table