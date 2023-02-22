import Pagination from '../Pagination'
import React, { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import data from './data.json'
import copy from '../../assets/icons/copy.svg'
import edit from '../../assets/icons/edit.svg'
import trash from '../../assets/icons/trash.svg'
import { useApiKaryawan } from '../../contexts/api/karyawan/ContextApiKaryawan';
import axios from 'axios';

let PageSize = 10;

function Table() {
  const context = useApiKaryawan()
  const navigate = useNavigate()
  const token = localStorage.getItem("token");

  const currentTableData = useMemo(() => {
    const firstPageIndex = (context.currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return context.keterangan ?
      context.listPengajar.slice(firstPageIndex, lastPageIndex) :
      context.listStaff.slice(firstPageIndex, lastPageIndex)
  }, [context.currentPage, context.keterangan, context.listPengajar, context.listStaff]);

  function handleDetail(id){
    // navigate(`/karyawan/detail/${id}`)
  }

  function handleDelete(id){
    console.log(id);
    if(window.confirm('yakin hapus user?')){
      axios.get(
        `https://absensiguru.smkrus.com/api/karyawan/delete-user/${id}`,
        {headers: {Authorization: `Bearer ${token}`}}
      ).then(() => {
        console.log('sukses');
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th>NIY</th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Gender</th>
            <th>Nomer HP</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {
            currentTableData?.map((item, key) => {
              return (
                <tr key={key} onClick={() => handleDetail(item.id)}>
                  <td className='niy-col'>{item?.niy}</td>
                  <td className='row-img'>
                    <img src={item?.pf_foto} alt="" />
                    {item?.nama}
                  </td>
                  <td>{item?.jenis_user}</td>
                  <td>{item?.alamat}</td>
                  <td>{item?.no_hp}</td>
                  <td>{item?.email}</td>
                  <td className='action-col'>
                    <img src={copy} alt='' />
                    <Link to={`/karyawan/edit/${item?.id}`}>
                      <img src={edit} alt="" />
                    </Link>
                    <img src={trash} alt='' onClick={() => handleDelete(item.id)}/>
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
        totalCount={context.keterangan === 'Guru' ? context.listPengajar?.length : context?.keterangan === 'Staff' ? context.listStaff?.length : 0}
        pageSize={PageSize}
        onPageChange={page => context.setCurrentPage(page)}
      />
    </>
  )
}

export default Table