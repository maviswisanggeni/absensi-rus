import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

let PageSize = 10;

function Table() {

    const data = [
        {
            "id": "1",
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "id": "2",
            "name": "Leanne Graham",
            "src": "people-2.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "Rectangle 35.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-2.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "Rectangle 35.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-2.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "Rectangle 35.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-2.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "Rectangle 35.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-2.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-2.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "Rectangle 35.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
        {
            "name": "Leanne Graham",
            "src": "people-1.jpg",
            "niy": "1234567",
            "jabatan": "Guru Produktif PPLG",
            "masuk": '06.44 WIB'
        },
    ]

    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      return data.slice(firstPageIndex, lastPageIndex);
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
            {currentTableData.map((item, key) => {
                return (
                <tr key={key}>
                    <td className='row-img'>
                        <img src={require(`../../assets/images/${item.src}`)} alt="" />
                        {item.name}
                    </td>
                    <td>{item.niy}</td>
                    <td>{item.jabatan}</td>
                    <td>{item.masuk}</td>
                    <td>
                        <Link className='btn-detail' to={`/kehadiran/detail-${item.id}`}>Detail</Link>
                        {/* <button className='btn-detail'></button> */}
                    </td>
                </tr>
                )
            })}
        </tbody>
    </table>
    <Pagination 
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
    />
    </>
  )
}

export default Table