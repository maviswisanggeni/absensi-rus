import React, { useMemo, useState } from 'react'
import Pagination from './Pagination';
import { useKehadiranListAbsensi } from '../../contexts/api/ContextApiKehadiranListData';
import { Link } from 'react-router-dom';

let PageSize = 10;

function Table() {
    const context = useKehadiranListAbsensi()
    const [currentPage, setCurrentPage] = useState(1);
    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return context.listAbsensi?.data?.data?.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

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
            {!context.loading ? <tr><td>Loading...</td></tr>
            : 
            context.listAbsensi.masuk?.data?.map((item, key) => {
                return (
                <tr key={key}>
                    <td className='row-img'>
                        {/* <img src={require(`../../assets/images/${item.src}`)} alt="" /> */}
                        <img src={item?.foto_masuk} alt="" />
                        {/* <img src={people2} alt="" /> */}
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
        currentPage={currentPage}
        totalCount={context.listAbsensi?.data?.data?.length === undefined ? 0 : context.listAbsensi?.data?.data?.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
    />
    </>
  )
}

export default Table