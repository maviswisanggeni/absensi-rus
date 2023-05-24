import React from 'react'
import Button from '../../components/Button'
import Tabbar from '../../components/Tabbar'
import Table from '../../components/Table'
import people1 from '../../assets/images/Ellipse 5.jpg'
import people2 from '../../assets/images/orang.png'
import people3 from '../../assets/images/people-1.jpg'


function ImportUser({ test }) {
    const columnData = [
        {
            Header: 'NIY',
            accessor: 'NIY'
        },
        {
            Header: 'Nama',
            accessor: 'Nama'
        },
        {
            Header: 'Jabatan',
            accessor: 'Jabatan'
        },
        {
            Header: 'Nomer HP',
            accessor: 'NomerHp'
        },
        {
            Header: 'Email',
            accessor: 'email'
        }
    ]

    const data = [
        {
            NIY: '12345678',
            Foto: people1,
            Nama: 'Samuel Umtiti',
            Jabatan: 'Guru Produktif Animasi',
            NomerHp: '0812-3456-9789',
            email: 'Samuel@gmail.com'
        },
        {
            NIY: '12345678',
            Foto: people2,
            Nama: 'Muhammad Firdan Azhari',
            Jabatan: 'Guru Produktif Grafika',
            NomerHp: '08123456789',
            email: 'Firdan@gmail.com'
        },
        {
            NIY: '12345678',
            Foto: people3,
            Nama: 'Antariksa Kusuma Hermawan',
            Jabatan: 'Guru Agama Islam',
            NomerHp: '08123456789',
            email: 'Antariksa@gmail.com'
        },
        {
            NIY: '123456',
            Foto: people1,
            Nama: 'Rizky',
            Jabatan: 'Guru',
            NomerHp: '08123456789',
            email: 'rizky@gmail.com'
        },
        {
            NIY: '123456',
            Foto: people2,
            Nama: 'Rizky',
            Jabatan: 'Guru',
            NomerHp: '08123456789',
            email: 'rizky@gmail.com'
        },
        {
            NIY: '123456',
            Foto: people3,
            Nama: 'Rizky',
            Jabatan: 'Guru',
            NomerHp: '08123456789',
            email: 'rizky@gmail.com'
        }, {
            NIY: '123456',
            Foto: people1,
            Nama: 'Rizky',
            Jabatan: 'Guru',
            NomerHp: '08123456789',
            email: 'rizky@gmail.com'
        },
        {
            NIY: '123456',
            Foto: people2,
            Nama: 'Rizky',
            Jabatan: 'Guru',
            NomerHp: '08123456789',
            email: 'rizky@gmail.com'
        }
    ]

    return (
        <div className='import-user'>
            {test}
            <div className='top-table'>
                <p>57 Guru, 21 Staff</p>
                <Button text={'Import Data'} style={{ width: '157px', height: '45px' }} />
            </div>
            <div className='wrapper-tabbar'>
                {/* <Tabbar option1='Guru' option2='Staff' /> */}
            </div>
            <Table columns={columnData} loading={true} data={data} tableClassName='table' />
        </div>
    )
}

export default ImportUser