import React, { useMemo, useState } from 'react'
import Pagination from './Pagination';
import people2 from '../../assets/images/Rectangle 39.jpg'
import { useKehadiranListAbsensi } from '../../contexts/api/ContextApiKehadiranListData';
import { Link } from 'react-router-dom';

let PageSize = 10;

function Table() {
    const context = useKehadiranListAbsensi()
    // console.log(context);
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
            context.listAbsensi?.data?.data?.map((item, key) => {
                return (
                <tr key={key}>
                    <td className='row-img'>
                        {/* <img src={require(`../../assets/images/${item.src}`)} alt="" /> */}
                        <img src={item?.foto} alt="" />
                        {/* <img src={people2} alt="" /> */}
                        {item?.karyawan?.nama}
                    </td>
                    <td>{item?.karyawan?.niy}</td>
                    <td>{item?.karyawan?.role_id}</td>
                    <td>{item?.waktu}</td>
                    <td>
                        <Link className='btn-detail' to={`/kehadiran/detail-${item?.id}`}>Detail</Link>
                        {/* <button className='btn-detail'>Detail</button> */}
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